import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useLanguage } from "@/lib/language-context";

export default function OnboardingScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  const slides = [
    {
      icon: "🧠",
      title: t("quiz"),
      description: t("answerMultipleChoice"),
      color: "#6366F1",
    },
    {
      icon: "🔢",
      title: t("mathematics"),
      description: t("solveMathProblems"),
      color: "#EC4899",
    },
    {
      icon: "🎮",
      title: t("platformGame"),
      description: t("navigateObstacles"),
      color: "#F59E0B",
    },
    {
      icon: "🧩",
      title: t("logicPuzzles"),
      description: t("solveRiddles"),
      color: "#10B981",
    },
  ];

  return (
    <ScreenContainer className="p-0">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {slides.map((slide, index) => (
          <View
            key={index}
            className="w-full h-full items-center justify-center p-6 gap-8"
            style={{ backgroundColor: slide.color }}
          >
            <Text className="text-9xl">{slide.icon}</Text>
            <View className="gap-4 items-center">
              <Text className="text-4xl font-black text-white text-center">
                {slide.title}
              </Text>
              <Text className="text-lg text-white opacity-90 text-center leading-relaxed">
                {slide.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Button */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-white">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)")}
          className="bg-gradient-to-r rounded-2xl p-4 items-center"
          style={{
            backgroundColor: "#6366F1",
          }}
        >
          <Text className="text-lg font-bold text-white">
            {t("startGame")} →
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
