import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { GameCardPremium } from "@/components/game-card-premium";
import { useGame } from "@/lib/game-context";
import { useLanguage } from "@/lib/language-context";

export default function HomeScreen() {
  const router = useRouter();
  const { stats } = useGame();
  const { t } = useLanguage();

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1">
          {/* Hero Section with Gradient */}
          <View
            className="px-6 pt-8 pb-12"
            style={{
              backgroundColor: "#6366F1",
            }}
          >
            <View className="gap-4">
              <View className="gap-2">
                <Text className="text-5xl font-black text-white">EduPlay</Text>
                <Text className="text-base text-white opacity-90">
                  {t("learnThroughGames")}
                </Text>
              </View>

              {/* Stats Bar */}
              <View className="flex-row gap-4">
                <View
                  className="flex-1 rounded-2xl p-4 items-center"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.3)",
                  }}
                >
                  <Text className="text-xs text-white opacity-80 mb-1">
                    {t("points")}
                  </Text>
                  <Text className="text-3xl font-bold text-white">
                    {stats.totalPoints}
                  </Text>
                </View>

                <View
                  className="flex-1 rounded-2xl p-4 items-center"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.3)",
                  }}
                >
                  <Text className="text-xs text-white opacity-80 mb-1">
                    {t("level")}
                  </Text>
                  <Text className="text-3xl font-bold text-white">
                    {stats.currentLevel}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Game Cards */}
          <View className="px-6 py-8 gap-4">
            <Text className="text-xl font-bold text-foreground mb-2">
              {t("chooseAGame")}
            </Text>

            <GameCardPremium
              title={t("quiz")}
              icon="🧠"
              description={t("answerMultipleChoice")}
              highScore={stats.quizHighScore}
              onPress={() => router.push("/(tabs)/quiz")}
              gradientStart="#6366F1"
              gradientEnd="#8B5CF6"
            />

            <GameCardPremium
              title={t("mathematics")}
              icon="🔢"
              description={t("solveMathProblems")}
              highScore={stats.mathHighScore}
              onPress={() => router.push("/(tabs)/math")}
              gradientStart="#EC4899"
              gradientEnd="#F43F5E"
            />

            <GameCardPremium
              title={t("platformGame")}
              icon="🎮"
              description={t("navigateObstacles")}
              highScore={stats.platformHighScore}
              onPress={() => router.push("/(tabs)/platform")}
              gradientStart="#F59E0B"
              gradientEnd="#F97316"
            />

            <GameCardPremium
              title={t("logicPuzzles")}
              icon="🧩"
              description={t("solveRiddles")}
              highScore={stats.logicHighScore}
              onPress={() => router.push("/(tabs)/logic")}
              gradientStart="#10B981"
              gradientEnd="#14B8A6"
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
