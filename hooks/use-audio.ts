import { useEffect, useState, useRef } from "react";
import { useAudioPlayer, setAudioModeAsync } from "expo-audio";
import { useGame } from "@/lib/game-context";

export function useAudio() {
  const { stats } = useGame();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAudio = async () => {
      try {
        await setAudioModeAsync({
          playsInSilentMode: true,
        });
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize audio:", error);
      }
    };

    initAudio();
  }, []);

  const playSuccessSound = async () => {
    if (!stats.soundEnabled || !isInitialized) return;
    try {
      // Simple beep using Web Audio API simulation
      // In production, you would load an actual sound file
      console.log("Playing success sound");
    } catch (error) {
      console.error("Failed to play success sound:", error);
    }
  };

  const playErrorSound = async () => {
    if (!stats.soundEnabled || !isInitialized) return;
    try {
      console.log("Playing error sound");
    } catch (error) {
      console.error("Failed to play error sound:", error);
    }
  };

  const playClickSound = async () => {
    if (!stats.soundEnabled || !isInitialized) return;
    try {
      console.log("Playing click sound");
    } catch (error) {
      console.error("Failed to play click sound:", error);
    }
  };

  return {
    isInitialized,
    playSuccessSound,
    playErrorSound,
    playClickSound,
  };
}
