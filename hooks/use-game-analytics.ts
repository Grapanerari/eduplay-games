import { useEffect } from "react";
import { analyticsManager } from "@/lib/analytics";

export function useGameAnalytics(gameType: "quiz" | "math" | "platform" | "logic") {
  useEffect(() => {
    // Tracker le début du jeu
    analyticsManager.trackEvent("game_started", { gameType });

    return () => {
      // Cleanup si nécessaire
    };
  }, [gameType]);

  const trackGameCompleted = (score: number, duration?: number) => {
    analyticsManager.trackEvent("game_completed", {
      gameType,
      score,
      duration,
    });
  };

  const trackGameFailed = () => {
    analyticsManager.trackEvent("game_failed", { gameType });
  };

  const trackPaywallShown = () => {
    analyticsManager.trackEvent("paywall_shown", { gameType });
  };

  const trackPaywallConverted = () => {
    analyticsManager.trackEvent("paywall_converted", { gameType });
  };

  const trackPowerUpPurchased = (powerUpId: string) => {
    analyticsManager.trackEvent("power_up_purchased", {
      metadata: { powerUpId },
    });
  };

  const trackPremiumUpgrade = () => {
    analyticsManager.trackEvent("premium_upgrade");
  };

  return {
    trackGameCompleted,
    trackGameFailed,
    trackPaywallShown,
    trackPaywallConverted,
    trackPowerUpPurchased,
    trackPremiumUpgrade,
  };
}
