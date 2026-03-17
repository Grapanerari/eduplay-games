import { ScrollView, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useGame } from "@/lib/game-context";
import { useLanguage } from "@/lib/language-context";

export default function ProfileScreen() {
  const { stats } = useGame();
  const { t } = useLanguage();

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="items-center gap-4">
            <View className="w-24 h-24 rounded-full bg-primary items-center justify-center">
              <Text className="text-5xl">👤</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-foreground">
                {t("player")}
              </Text>
              <Text className="text-sm text-muted">Level {stats.currentLevel}</Text>
            </View>
          </View>

          {/* Stats */}
          <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
            <View className="flex-row justify-between items-center pb-4 border-b border-border">
              <Text className="text-base text-muted">{t("totalPoints")}</Text>
              <Text className="text-2xl font-bold text-primary">
                {stats.totalPoints}
              </Text>
            </View>

            <View className="flex-row justify-between items-center pb-4 border-b border-border">
              <Text className="text-base text-muted">{t("gamesPlayed")}</Text>
              <Text className="text-2xl font-bold text-foreground">
                {stats.gamesPlayed}
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-base text-muted">{t("currentLevel")}</Text>
              <Text className="text-2xl font-bold text-foreground">
                {stats.currentLevel}
              </Text>
            </View>
          </View>

          {/* Module Scores */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              {t("moduleScores")}
            </Text>

            <View className="bg-surface rounded-2xl p-4 border border-border flex-row justify-between items-center">
              <View className="flex-row items-center gap-3">
                <Text className="text-2xl">🧠</Text>
                <Text className="text-base font-semibold text-foreground">{t("quiz")}</Text>
              </View>
              <Text className="text-lg font-bold text-primary">
                {stats.quizHighScore}
              </Text>
            </View>

            <View className="bg-surface rounded-2xl p-4 border border-border flex-row justify-between items-center">
              <View className="flex-row items-center gap-3">
                <Text className="text-2xl">🔢</Text>
                <Text className="text-base font-semibold text-foreground">{t("mathematics")}</Text>
              </View>
              <Text className="text-lg font-bold text-primary">
                {stats.mathHighScore}
              </Text>
            </View>

            <View className="bg-surface rounded-2xl p-4 border border-border flex-row justify-between items-center">
              <View className="flex-row items-center gap-3">
                <Text className="text-2xl">🎮</Text>
                <Text className="text-base font-semibold text-foreground">{t("platformGame")}</Text>
              </View>
              <Text className="text-lg font-bold text-primary">
                {stats.platformHighScore}
              </Text>
            </View>

            <View className="bg-surface rounded-2xl p-4 border border-border flex-row justify-between items-center">
              <View className="flex-row items-center gap-3">
                <Text className="text-2xl">🧩</Text>
                <Text className="text-base font-semibold text-foreground">{t("logicPuzzles")}</Text>
              </View>
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
