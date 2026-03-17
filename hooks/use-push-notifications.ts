import { useEffect, useState } from "react";
import { pushNotificationManager, NotificationPreferences } from "@/lib/push-notifications";

export function usePushNotifications() {
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize push notifications on mount
  useEffect(() => {
    const initialize = async () => {
      try {
        await pushNotificationManager.initialize();
        const prefs = await pushNotificationManager.getPreferences();
        setPreferences(prefs);
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing push notifications:", error);
      }
    };

    initialize();

    // Cleanup on unmount
    return () => {
      pushNotificationManager.cleanup();
    };
  }, []);

  // Update preferences
  const updatePreferences = async (newPreferences: Partial<NotificationPreferences>) => {
    try {
      await pushNotificationManager.setPreferences(newPreferences);
      const updated = await pushNotificationManager.getPreferences();
      setPreferences(updated);
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  // Send new quiz notification
  const notifyNewQuiz = async (quizTitle: string, quizId: string) => {
    try {
      await pushNotificationManager.sendNewQuizNotification(quizTitle, quizId);
    } catch (error) {
      console.error("Error sending quiz notification:", error);
    }
  };

  // Send achievement notification
  const notifyAchievement = async (achievementName: string) => {
    try {
      await pushNotificationManager.sendAchievementNotification(achievementName);
    } catch (error) {
      console.error("Error sending achievement notification:", error);
    }
  };

  // Send update notification
  const notifyUpdate = async () => {
    try {
      await pushNotificationManager.sendUpdateNotification();
    } catch (error) {
      console.error("Error sending update notification:", error);
    }
  };

  // Send daily reminder
  const sendDailyReminder = async () => {
    try {
      await pushNotificationManager.sendDailyReminder();
    } catch (error) {
      console.error("Error sending daily reminder:", error);
    }
  };

  return {
    isInitialized,
    preferences,
    updatePreferences,
    notifyNewQuiz,
    notifyAchievement,
    notifyUpdate,
    sendDailyReminder,
  };
}
