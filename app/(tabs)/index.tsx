import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { GameCard } from "@/components/game-card";
import { useGame } from "@/lib/game-context";

export default function HomeScreen() {
  const router = useRouter();
  const { stats } = useGame();

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="items-center gap-2">
            <Text className="text-4xl font-bold text-foreground">EduPlay</Text>
            <Text className="text-base text-muted text-center">
              Learn through interactive games
            </Text>
          </View>

          {/* Stats Bar */}
          <View className="bg-primary rounded-2xl p-4 flex-row justify-between items-center">
            <View className="items-center">
              <Text className="text-sm text-white opacity-80">Points</Text>
              <Text className="text-2xl font-bold text-white">{stats.totalPoints}</Text>
            </View>
            <View className="w-px h-12 bg-white opacity-20" />
            <View className="items-center">
              <Text className="text-sm text-white opacity-80">Level</Text>
              <Text className="text-2xl font-bold text-white">{stats.currentLevel}</Text>
            </View>
          </View>

          {/* Game Cards */}
          <View className="gap-4">
            <Text className="text-lg font-semibold text-foreground">Choose a Game</Text>

            <GameCard
              title="Quiz"
              icon="🧠"
              description="Test your knowledge with multiple choice questions"
              highScore={stats.quizHighScore}
              onPress={() => router.push("/(tabs)/quiz")}
              color="#6366F1"
            />

            <GameCard
              title="Mathematics"
              icon="🔢"
              description="Solve math problems against the clock"
              highScore={stats.mathHighScore}
              onPress={() => router.push("/(tabs)/math")}
              color="#EC4899"
            />

            <GameCard
              title="Platform"
              icon="🎮"
              description="Jump and collect coins in this fun platformer"
              highScore={stats.platformHighScore}
              onPress={() => router.push("/(tabs)/platform")}
              color="#F59E0B"
            />

            <GameCard
              title="Logic Puzzles"
              icon="🧩"
              description="Solve riddles and logic puzzles"
              highScore={stats.logicHighScore}
              onPress={() => router.push("/(tabs)/logic")}
              color="#10B981"
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
