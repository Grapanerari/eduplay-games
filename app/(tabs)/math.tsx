import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useGame } from "@/lib/game-context";
import { useLanguage } from "@/lib/language-context";
import { useMonetization } from "@/lib/monetization-context";
import { Paywall } from "@/components/paywall";
import { AttemptsCounter } from "@/components/attempts-counter";

export default function MathScreen() {
  const router = useRouter();
  const { stats } = useGame();
  const { t } = useLanguage();
  const { useAttempt, upgradeToPremium } = useMonetization();
  const [showPaywall, setShowPaywall] = useState(false);

  const handleStartChallenge = () => {
    if (useAttempt()) {
      router.push("/(tabs)/math-game");
    } else {
      setShowPaywall(true);
    }
  };

  const handleUpgrade = () => {
    upgradeToPremium();
    setShowPaywall(false);
  };

  return (
    <ScreenContainer className="p-6">
      {showPaywall && (
        <Paywall
          onClose={() => setShowPaywall(false)}
          onUpgrade={handleUpgrade}
        />
      )}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">
              {t("mathematics")}
            </Text>
            <Text className="text-base text-muted">
              {t("solveProblemsFast")}
            </Text>
          </View>

          <AttemptsCounter onUpgradePress={() => setShowPaywall(true)} />

          <View className="bg-surface rounded-2xl p-6 border border-border">
            <Text className="text-lg font-semibold text-foreground mb-2">
              {t("yourBestScore")}
            </Text>
            <Text className="text-4xl font-bold text-primary">
              {stats.mathHighScore}
            </Text>
          </View>

          <View className="bg-surface rounded-2xl p-6 border border-border">
            <Text className="text-base text-muted">
              {t("solveMathProblems")}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleStartChallenge}
            className="bg-primary rounded-xl p-4 items-center mt-4"
          >
            <Text className="text-base font-semibold text-white">{t("startChallenge")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
