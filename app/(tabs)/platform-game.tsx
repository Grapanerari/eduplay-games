import { ScrollView, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { ProgressBar } from "@/components/progress-bar";
import { useGame } from "@/lib/game-context";
import { useSoundEffects } from "@/components/sound-effects";
import { useGameAnalytics } from "@/hooks/use-game-analytics";

export default function PlatformGameScreen() {
  const router = useRouter();
  const { addPoints, updatePlatformScore } = useGame();
  const { playClickFeedback } = useSoundEffects();
  const { trackGameCompleted } = useGameAnalytics("platform");

  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [gameStartTime] = useState(Date.now());

  useEffect(() => {
    if (timeLeft <= 0) {
      finishGame();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleCollectCoin = async () => {
    setCoinsCollected(coinsCollected + 1);
    setScore(score + 10);
    await playClickFeedback();
  };

  const finishGame = () => {
    const duration = Math.round((Date.now() - gameStartTime) / 1000);
    addPoints(score);
    updatePlatformScore(score);
    trackGameCompleted(score, duration);
    setGameFinished(true);
  };

  if (gameFinished) {
    return (
      <ScreenContainer className="p-6">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 items-center justify-center gap-6">
            <Text className="text-5xl">🎉</Text>
            <Text className="text-3xl font-bold text-foreground">Game Over!</Text>

            <View className="bg-surface rounded-2xl p-6 border border-border w-full gap-4">
              <View className="flex-row justify-between items-center pb-4 border-b border-border">
                <Text className="text-base text-muted">Final Score</Text>
                <Text className="text-3xl font-bold text-primary">{score}</Text>
              </View>

              <View className="flex-row justify-between items-center pb-4 border-b border-border">
                <Text className="text-base text-muted">Coins Collected</Text>
                <Text className="text-2xl font-bold text-success">
                  {coinsCollected}
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-base text-muted">Time Played</Text>
                <Text className="text-2xl font-bold text-foreground">
                  60s
                </Text>
              </View>
            </View>

            <View className="w-full gap-3">
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/platform")}
                className="bg-primary rounded-xl p-4 items-center"
              >
                <Text className="text-base font-semibold text-white">Play Again</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/(tabs)")}
                className="bg-surface border border-border rounded-xl p-4 items-center"
              >
                <Text className="text-base font-semibold text-foreground">Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="gap-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-semibold text-muted">
                Time Left: {timeLeft}s
              </Text>
              <Text className="text-sm font-semibold text-primary">{score} pts</Text>
            </View>
            <ProgressBar
              current={60 - timeLeft}
              total={60}
              color="#F59E0B"
            />
          </View>

          {/* Game Area */}
          <View className="bg-gradient-to-b from-blue-300 to-blue-100 rounded-2xl p-6 min-h-96 border border-border items-center justify-center gap-6">
            <Text className="text-6xl">🎮</Text>
            <Text className="text-2xl font-bold text-foreground">Collect the Coins!</Text>
            <Text className="text-base text-muted text-center">
              Tap the coin button to collect coins and earn points!
            </Text>

            <TouchableOpacity
              onPress={handleCollectCoin}
              className="bg-yellow-400 rounded-full w-20 h-20 items-center justify-center border-4 border-yellow-500"
            >
              <Text className="text-5xl">💰</Text>
            </TouchableOpacity>

            <Text className="text-lg font-semibold text-foreground">
              Coins: {coinsCollected}
            </Text>
          </View>

          {/* Instructions */}
          <View className="bg-surface rounded-2xl p-4 border border-border gap-2">
            <Text className="text-sm font-semibold text-foreground">How to Play:</Text>
            <Text className="text-xs text-muted leading-relaxed">
              • Tap the coin to collect it{"\n"}
              • Each coin gives you 10 points{"\n"}
              • You have 60 seconds to collect as many coins as possible{"\n"}
              • Try to get the highest score!
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
