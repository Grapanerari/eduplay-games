import { useEffect } from "react";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";
import { useGame } from "@/lib/game-context";

export function useSoundEffects() {
  const { stats } = useGame();

  const playSuccessFeedback = async () => {
    if (!stats.soundEnabled) return;

    if (Platform.OS !== "web") {
      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch (error) {
        console.error("Failed to play success haptic:", error);
      }
    }
  };

  const playErrorFeedback = async () => {
    if (!stats.soundEnabled) return;

    if (Platform.OS !== "web") {
      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } catch (error) {
        console.error("Failed to play error haptic:", error);
      }
    }
  };

  const playClickFeedback = async () => {
    if (!stats.soundEnabled) return;

    if (Platform.OS !== "web") {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (error) {
        console.error("Failed to play click haptic:", error);
      }
    }
  };

  return {
    playSuccessFeedback,
    playErrorFeedback,
    playClickFeedback,
  };
}
