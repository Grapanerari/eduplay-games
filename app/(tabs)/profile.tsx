import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useGame } from "@/lib/game-context";

export default function ProfileScreen() {
  const { stats } = useGame();

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="items-center gap-4">
            <View className="w-24 h-24 rounded-full bg-primary items-center justify-center">
              <Text className="text-5xl">🎮</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-foreground">
                Player
              </Text>
              <Text className="text-sm text-muted">Level {stats.currentLevel}</Text>
            </View>
          </View>

          {/* Stats */}
          <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
            <View className="flex-row justify-between items-center pb-4 border-b border-border">
              <Text className="text-base text-muted">Total Points</Text>
              <Text className="text-2xl font-bold text-primary">
                {stats.totalPoints}
              </Text>
            </View>

            <View className="flex-row justify-between items-center pb-4 border-b border-border">
              <Text className="text-base text-muted">Games Played</Text>
              <Text className="text-2xl font-bold text-foreground">
                {stats.gamesPlayed}
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-base text-muted">Current Level</Text>
              <Text className="text-2xl font-bold text-foreground">
                {stats.currentLevel}
              </Text>
            </View>
          </View>

          {/* Module Scores */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Module Scores
            </Text>

            <View className="bg-surface rounded-2xl p-4 border border-border flex-row justify-between items-center">
              <Text className="text-base text-foreground">Quiz</Text>
              <Text className="text-lg font-bold text-primary">
                {stats.quizHighScore}
              </Text>
            </View>

            <View className="bg-surface rounded-2xl p-4 border border-border flex-row justify-between items-center">
              <Text className="text-base text-foreground">Math</Text>
              <Text className="text-lg font-bold text-primary">
                {stats.mathHighScore}
              </Text>
            </View>

            <View className="bg-surface rounded-2xl p-4 border border-border flex-row justify-between items-center">
              <Text className="text-base text-foreground">Platform</Text>
              <Text className="text-lg font-bold text-primary">
                {stats.platformHighScore}
              </Text>
            </View>

            <View className="bg-surface rounded-2xl p-4 border border-border flex-row justify-between items-center">
              <Text className="text-base text-foreground">Logic</Text>
              <Text className="text-lg font-bold text-primary">
                {stats.logicHighScore}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
