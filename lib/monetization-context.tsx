import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type SubscriptionTier = "free" | "premium";

interface MonetizationContextType {
  subscription: SubscriptionTier;
  isPremium: boolean;
  purchasedPowerUps: string[];
  dailyAttempts: number;
  maxDailyAttempts: number;
  upgradeToPremium: () => void;
  buyPowerUp: (powerUpId: string) => void;
  useAttempt: () => boolean;
  resetDailyAttempts: () => void;
}

export const MonetizationContext = createContext<MonetizationContextType | undefined>(undefined);

const SUBSCRIPTION_STORAGE_KEY = "eduplay_subscription";
const POWER_UPS_STORAGE_KEY = "eduplay_power_ups";
const DAILY_ATTEMPTS_STORAGE_KEY = "eduplay_daily_attempts";
const LAST_RESET_STORAGE_KEY = "eduplay_last_reset";

export function MonetizationProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscriptionState] = useState<SubscriptionTier>("free");
  const [purchasedPowerUps, setPurchasedPowerUps] = useState<string[]>([]);
  const [dailyAttempts, setDailyAttemptsState] = useState(0);
  const maxDailyAttempts = subscription === "premium" ? Infinity : 5;

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [storedSub, storedPowerUps, storedAttempts, lastReset] = await Promise.all([
          AsyncStorage.getItem(SUBSCRIPTION_STORAGE_KEY),
          AsyncStorage.getItem(POWER_UPS_STORAGE_KEY),
          AsyncStorage.getItem(DAILY_ATTEMPTS_STORAGE_KEY),
          AsyncStorage.getItem(LAST_RESET_STORAGE_KEY),
        ]);

        if (storedSub === "premium") {
          setSubscriptionState("premium");
        }

        if (storedPowerUps) {
          setPurchasedPowerUps(JSON.parse(storedPowerUps));
        }

        // Reset daily attempts if it's a new day
        const today = new Date().toDateString();
        if (lastReset !== today) {
          setDailyAttemptsState(0);
          await AsyncStorage.setItem(LAST_RESET_STORAGE_KEY, today);
        } else if (storedAttempts) {
          setDailyAttemptsState(parseInt(storedAttempts));
        }
      } catch (error) {
        console.error("Failed to load monetization data:", error);
      }
    };

    loadData();
  }, []);

  const upgradeToPremium = async () => {
    setSubscriptionState("premium");
    try {
      await AsyncStorage.setItem(SUBSCRIPTION_STORAGE_KEY, "premium");
    } catch (error) {
      console.error("Failed to upgrade subscription:", error);
    }
  };

  const buyPowerUp = async (powerUpId: string) => {
    const updated = [...purchasedPowerUps, powerUpId];
    setPurchasedPowerUps(updated);
    try {
      await AsyncStorage.setItem(POWER_UPS_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to save power-up:", error);
    }
  };

  const useAttempt = (): boolean => {
    if (subscription === "premium") {
      return true; // Premium users have unlimited attempts
    }

    if (dailyAttempts < maxDailyAttempts) {
      const newAttempts = dailyAttempts + 1;
      setDailyAttemptsState(newAttempts);
      AsyncStorage.setItem(DAILY_ATTEMPTS_STORAGE_KEY, newAttempts.toString());
      return true;
    }

    return false; // Out of attempts
  };

  const resetDailyAttempts = async () => {
    setDailyAttemptsState(0);
    try {
      await AsyncStorage.setItem(DAILY_ATTEMPTS_STORAGE_KEY, "0");
    } catch (error) {
      console.error("Failed to reset daily attempts:", error);
    }
  };

  return (
    <MonetizationContext.Provider
      value={{
        subscription,
        isPremium: subscription === "premium",
        purchasedPowerUps,
        dailyAttempts,
        maxDailyAttempts,
        upgradeToPremium,
        buyPowerUp,
        useAttempt,
        resetDailyAttempts,
      }}
    >
      {children}
    </MonetizationContext.Provider>
  );
}

export function useMonetization() {
  const context = React.useContext(MonetizationContext);
  if (!context) {
    throw new Error("useMonetization must be used within a MonetizationProvider");
  }
  return context;
}
