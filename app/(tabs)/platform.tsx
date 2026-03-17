import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useGame } from "@/lib/game-context";

export default function PlatformScreen() {
  const router = useRouter();
  const { stats } = useGame();

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">
              Platform Game
            </Text>
            <Text className="text-base text-muted">
              Jump and collect!
            </Text>
          </View>

          <View className="bg-surface rounded-2xl p-6 border border-border">
            <Text className="text-lg font-semibold text-foreground mb-2">
              Your Best Score
            </Text>
            <Text className="text-4xl font-bold text-primary">
              {stats.platformHighScore}
            </Text>
          </View>

          <View className="bg-surface rounded-2xl p-6 border border-border">
            <Text className="text-base text-muted">
              Navigate through obstacles and collect coins!
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/(tabs)/platform-game")}
            className="bg-primary rounded-xl p-4 items-center mt-4"
          >
            <Text className="text-base font-semibold text-white">Start Game</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
