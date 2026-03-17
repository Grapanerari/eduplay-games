import AsyncStorage from "@react-native-async-storage/async-storage";

export type EventType =
  | "game_started"
  | "game_completed"
  | "game_failed"
  | "game_shared"
  | "premium_upgrade"
  | "power_up_purchased"
  | "paywall_shown"
  | "paywall_dismissed"
  | "paywall_converted"
  | "daily_attempt_used"
  | "daily_limit_reached"
  | "app_opened"
  | "app_closed";

export interface AnalyticsEvent {
  type: EventType;
  timestamp: number;
  gameType?: "quiz" | "math" | "platform" | "logic";
  score?: number;
  duration?: number; // en secondes
  metadata?: Record<string, any>;
}

export interface UserAnalytics {
  userId: string;
  firstOpenDate: number;
  lastOpenDate: number;
  totalSessions: number;
  totalGamesPlayed: number;
  premiumUpgradeDate?: number;
  isPremium: boolean;
  totalPowerUpsPurchased: number;
  totalMoneySpent: number;
  events: AnalyticsEvent[];
}

const ANALYTICS_STORAGE_KEY = "eduplay_analytics";
const EVENTS_STORAGE_KEY = "eduplay_events";

class AnalyticsManager {
  private userId: string;
  private sessionStartTime: number;
  private events: AnalyticsEvent[] = [];

  constructor() {
    this.userId = this.generateUserId();
    this.sessionStartTime = Date.now();
  }

  private generateUserId(): string {
    const stored = AsyncStorage.getItem("eduplay_user_id");
    if (stored) {
      return stored as any;
    }
    const newId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    AsyncStorage.setItem("eduplay_user_id", newId);
    return newId;
  }

  /**
   * Enregistrer un événement
   */
  async trackEvent(
    type: EventType,
    options?: {
      gameType?: "quiz" | "math" | "platform" | "logic";
      score?: number;
      duration?: number;
      metadata?: Record<string, any>;
    }
  ) {
    const event: AnalyticsEvent = {
      type,
      timestamp: Date.now(),
      gameType: options?.gameType,
      score: options?.score,
      duration: options?.duration,
      metadata: options?.metadata,
    };

    this.events.push(event);

    // Sauvegarder en AsyncStorage
    try {
      const stored = await AsyncStorage.getItem(EVENTS_STORAGE_KEY);
      const allEvents = stored ? JSON.parse(stored) : [];
      allEvents.push(event);

      // Garder seulement les 1000 derniers événements
      if (allEvents.length > 1000) {
        allEvents.shift();
      }

      await AsyncStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(allEvents));
    } catch (error) {
      console.error("Failed to save analytics event:", error);
    }
  }

  /**
   * Obtenir les statistiques d'un jeu
   */
  async getGameStats(gameType: "quiz" | "math" | "platform" | "logic") {
    try {
      const stored = await AsyncStorage.getItem(EVENTS_STORAGE_KEY);
      const events: AnalyticsEvent[] = stored ? JSON.parse(stored) : [];

      const gameEvents = events.filter((e) => e.gameType === gameType);
      const completedGames = gameEvents.filter((e) => e.type === "game_completed");

      const scores = completedGames
        .map((e) => e.score || 0)
        .filter((s) => s > 0);

      return {
        totalPlayed: gameEvents.filter((e) => e.type === "game_started").length,
        totalCompleted: completedGames.length,
        averageScore: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 0,
        highScore: scores.length > 0 ? Math.max(...scores) : 0,
        completionRate: gameEvents.length > 0 
          ? Math.round((completedGames.length / gameEvents.filter((e) => e.type === "game_started").length) * 100)
          : 0,
      };
    } catch (error) {
      console.error("Failed to get game stats:", error);
      return {
        totalPlayed: 0,
        totalCompleted: 0,
        averageScore: 0,
        highScore: 0,
        completionRate: 0,
      };
    }
  }

  /**
   * Obtenir les statistiques de monétisation
   */
  async getMonetizationStats() {
    try {
      const stored = await AsyncStorage.getItem(EVENTS_STORAGE_KEY);
      const events: AnalyticsEvent[] = stored ? JSON.parse(stored) : [];

      const paywallShown = events.filter((e) => e.type === "paywall_shown").length;
      const paywallConverted = events.filter((e) => e.type === "paywall_converted").length;
      const powerUpsPurchased = events.filter((e) => e.type === "power_up_purchased").length;
      const premiumUpgrades = events.filter((e) => e.type === "premium_upgrade").length;

      return {
        paywallShown,
        paywallConversions: paywallConverted,
        conversionRate: paywallShown > 0 ? Math.round((paywallConverted / paywallShown) * 100) : 0,
        powerUpsPurchased,
        premiumUpgrades,
        totalMonetizationEvents: paywallConverted + powerUpsPurchased + premiumUpgrades,
      };
    } catch (error) {
      console.error("Failed to get monetization stats:", error);
      return {
        paywallShown: 0,
        paywallConversions: 0,
        conversionRate: 0,
        powerUpsPurchased: 0,
        premiumUpgrades: 0,
        totalMonetizationEvents: 0,
      };
    }
  }

  /**
   * Obtenir le funnel de monétisation
   */
  async getMonetizationFunnel() {
    try {
      const stored = await AsyncStorage.getItem(EVENTS_STORAGE_KEY);
      const events: AnalyticsEvent[] = stored ? JSON.parse(stored) : [];

      const appOpened = events.filter((e) => e.type === "app_opened").length || 1;
      const gamesPlayed = events.filter((e) => e.type === "game_started").length;
      const paywallShown = events.filter((e) => e.type === "paywall_shown").length;
      const paywallConverted = events.filter((e) => e.type === "paywall_converted").length;

      return {
        appOpened,
        gamesPlayed: Math.round((gamesPlayed / appOpened) * 100),
        paywallShown: Math.round((paywallShown / appOpened) * 100),
        converted: Math.round((paywallConverted / appOpened) * 100),
      };
    } catch (error) {
      console.error("Failed to get monetization funnel:", error);
      return {
        appOpened: 0,
        gamesPlayed: 0,
        paywallShown: 0,
        converted: 0,
      };
    }
  }

  /**
   * Obtenir les événements récents
   */
  async getRecentEvents(limit: number = 50) {
    try {
      const stored = await AsyncStorage.getItem(EVENTS_STORAGE_KEY);
      const events: AnalyticsEvent[] = stored ? JSON.parse(stored) : [];
      return events.slice(-limit).reverse();
    } catch (error) {
      console.error("Failed to get recent events:", error);
      return [];
    }
  }

  /**
   * Exporter les données d'analytics
   */
  async exportAnalytics() {
    try {
      const stored = await AsyncStorage.getItem(EVENTS_STORAGE_KEY);
      const events: AnalyticsEvent[] = stored ? JSON.parse(stored) : [];

      const gameStats = {
        quiz: await this.getGameStats("quiz"),
        math: await this.getGameStats("math"),
        platform: await this.getGameStats("platform"),
        logic: await this.getGameStats("logic"),
      };

      const monetization = await this.getMonetizationStats();
      const funnel = await this.getMonetizationFunnel();

      return {
        userId: this.userId,
        exportDate: new Date().toISOString(),
        totalEvents: events.length,
        gameStats,
        monetization,
        funnel,
        recentEvents: events.slice(-20),
      };
    } catch (error) {
      console.error("Failed to export analytics:", error);
      return null;
    }
  }

  /**
   * Réinitialiser les données d'analytics
   */
  async resetAnalytics() {
    try {
      await AsyncStorage.removeItem(EVENTS_STORAGE_KEY);
      this.events = [];
    } catch (error) {
      console.error("Failed to reset analytics:", error);
    }
  }
}

export const analyticsManager = new AnalyticsManager();
