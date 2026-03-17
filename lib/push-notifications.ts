import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export type NotificationType = 
  | "new_quiz"
  | "new_challenge"
  | "achievement_unlocked"
  | "friend_challenge"
  | "daily_reminder"
  | "update_available"
  | "special_event";

export interface PushNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, any>;
  timestamp: number;
  read: boolean;
}

export interface NotificationPreferences {
  enabled: boolean;
  newQuiz: boolean;
  newChallenge: boolean;
  achievements: boolean;
  friendChallenges: boolean;
  dailyReminder: boolean;
  updates: boolean;
  specialEvents: boolean;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  enabled: true,
  newQuiz: true,
  newChallenge: true,
  achievements: true,
  friendChallenges: true,
  dailyReminder: true,
  updates: true,
  specialEvents: true,
};

class PushNotificationManager {
  private notificationListener: any = null;
  private responseListener: any = null;
  private initialized = false;

  /**
   * Initialize push notifications
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Set notification handler
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
          shouldShowBanner: true,
          shouldShowList: true,
        } as any),
      });

      // Request permissions (iOS only)
      if (Platform.OS === "ios") {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          console.warn("Notification permissions not granted");
        }
      }

      // Register for push notifications
      await this.registerForPushNotifications();

      // Set up listeners
      this.setupListeners();

      this.initialized = true;
      console.log("✅ Push notifications initialized");
    } catch (error) {
      console.error("❌ Error initializing push notifications:", error);
    }
  }

  /**
   * Register device for push notifications
   */
  private async registerForPushNotifications(): Promise<void> {
    try {
      const token = await Notifications.getExpoPushTokenAsync();
      console.log("📱 Expo Push Token:", token.data);

      // Save token to AsyncStorage
      await AsyncStorage.setItem("expoPushToken", token.data);

      // In production, send this token to your backend
      // await sendTokenToBackend(token.data);
    } catch (error) {
      console.error("❌ Error getting push token:", error);
    }
  }

  /**
   * Set up notification listeners
   */
  private setupListeners(): void {
    // Listen for notifications when app is in foreground
    this.notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("📬 Notification received:", notification);
      }
    );

    // Listen for notification responses (when user taps notification)
    this.responseListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("👆 Notification response:", response);
        // Handle navigation based on notification data
        this.handleNotificationResponse(response);
      }
    );
  }

  /**
   * Handle notification tap
   */
  private handleNotificationResponse(response: any): void {
    const { notification } = response;
    const { data } = notification.request.content;

    if (data?.type === "new_quiz") {
      // Navigate to quiz screen
      console.log("Navigating to quiz:", data.quizId);
    } else if (data?.type === "achievement_unlocked") {
      // Navigate to profile/achievements
      console.log("Navigating to achievements");
    }
  }

  /**
   * Get user notification preferences
   */
  async getPreferences(): Promise<NotificationPreferences> {
    try {
      const stored = await AsyncStorage.getItem("notificationPreferences");
      return stored ? JSON.parse(stored) : DEFAULT_PREFERENCES;
    } catch (error) {
      console.error("❌ Error getting preferences:", error);
      return DEFAULT_PREFERENCES;
    }
  }

  /**
   * Update notification preferences
   */
  async setPreferences(preferences: Partial<NotificationPreferences>): Promise<void> {
    try {
      const current = await this.getPreferences();
      const updated = { ...current, ...preferences };
      await AsyncStorage.setItem("notificationPreferences", JSON.stringify(updated));
      console.log("✅ Preferences updated");
    } catch (error) {
      console.error("❌ Error setting preferences:", error);
    }
  }

  /**
   * Send local notification (for testing)
   */
  async sendLocalNotification(
    type: NotificationType,
    title: string,
    body: string,
    data?: Record<string, any>
  ): Promise<void> {
    try {
      const preferences = await this.getPreferences();

      // Check if this type of notification is enabled
      if (!preferences.enabled || !this.isNotificationTypeEnabled(type, preferences)) {
        console.log(`⏭️  Notification type ${type} is disabled`);
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { type, ...data },
          sound: true,
          badge: 1,
        },
        trigger: null, // Send immediately
      });

      console.log(`✅ Notification sent: ${title}`);
    } catch (error) {
      console.error("❌ Error sending notification:", error);
    }
  }

  /**
   * Schedule notification for later
   */
  async scheduleNotification(
    type: NotificationType,
    title: string,
    body: string,
    delaySeconds: number,
    data?: Record<string, any>
  ): Promise<void> {
    try {
      const preferences = await this.getPreferences();

      if (!preferences.enabled || !this.isNotificationTypeEnabled(type, preferences)) {
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { type, ...data },
          sound: true,
          badge: 1,
        },
        trigger: {
          type: 'time',
          seconds: delaySeconds,
        } as any,
      });

      console.log(`✅ Notification scheduled in ${delaySeconds}s: ${title}`);
    } catch (error) {
      console.error("❌ Error scheduling notification:", error);
    }
  }

  /**
   * Check if notification type is enabled
   */
  private isNotificationTypeEnabled(
    type: NotificationType,
    preferences: NotificationPreferences
  ): boolean {
    const typeMap: Record<NotificationType, keyof NotificationPreferences> = {
      new_quiz: "newQuiz",
      new_challenge: "newChallenge",
      achievement_unlocked: "achievements",
      friend_challenge: "friendChallenges",
      daily_reminder: "dailyReminder",
      update_available: "updates",
      special_event: "specialEvents",
    };

    return preferences[typeMap[type]] as boolean;
  }

  /**
   * Send daily reminder notification
   */
  async sendDailyReminder(): Promise<void> {
    const preferences = await this.getPreferences();

    if (!preferences.enabled || !preferences.dailyReminder) {
      return;
    }

    // Schedule for 9 AM tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);

    const now = new Date();
    const delaySeconds = Math.floor((tomorrow.getTime() - now.getTime()) / 1000);

    await this.scheduleNotification(
      "daily_reminder",
      "🎮 Prêt pour un défi?",
      "Venez jouer et gagner des points!",
      delaySeconds
    );
  }

  /**
   * Send new quiz notification
   */
  async sendNewQuizNotification(quizTitle: string, quizId: string): Promise<void> {
    await this.sendLocalNotification(
      "new_quiz",
      "🧠 Nouveau Quiz!",
      `${quizTitle} est maintenant disponible`,
      { quizId }
    );
  }

  /**
   * Send achievement notification
   */
  async sendAchievementNotification(achievementName: string): Promise<void> {
    await this.sendLocalNotification(
      "achievement_unlocked",
      "🏆 Réussite Débloquée!",
      `Vous avez débloqué: ${achievementName}`,
      { achievement: achievementName }
    );
  }

  /**
   * Send update notification
   */
  async sendUpdateNotification(): Promise<void> {
    await this.sendLocalNotification(
      "update_available",
      "✨ Mise à Jour Disponible",
      "Une nouvelle version d'EduPlay est disponible",
      { action: "update" }
    );
  }

  /**
   * Cancel all notifications
   */
  async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log("✅ All notifications cancelled");
    } catch (error) {
      console.error("❌ Error cancelling notifications:", error);
    }
  }

  /**
   * Clean up listeners
   */
  cleanup(): void {
    if (this.notificationListener) {
      this.notificationListener.remove();
    }
    if (this.responseListener) {
      this.responseListener.remove();
    }
  }
}

// Export singleton instance
export const pushNotificationManager = new PushNotificationManager();
