import { ScrollView, Text, View, Switch, TouchableOpacity, Alert, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useGame } from "@/lib/game-context";
import { useColors } from "@/hooks/use-colors";

export default function SettingsScreen() {
  const { stats, toggleMusic, toggleSound, resetStats } = useGame();
  const colors = useColors();

  const handleResetStats = () => {
    Alert.alert(
      "Reset Statistics",
      "Are you sure you want to reset all your statistics? This cannot be undone.",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        {
          text: "Reset",
          onPress: () => resetStats(),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">Settings</Text>
            <Text className="text-base text-muted">
              Customize your experience
            </Text>
          </View>

          {/* Audio Settings */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Audio
            </Text>

            <View className="bg-surface rounded-2xl p-4 border border-border flex-row justify-between items-center">
              <Text className="text-base text-foreground">Music</Text>
              <Switch
                value={stats.musicEnabled}
                onValueChange={toggleMusic}
                trackColor={{ false: "#ccc", true: colors.primary }}
              />
            </View>

            <View className="bg-surface rounded-2xl p-4 border border-border flex-row justify-between items-center">
              <Text className="text-base text-foreground">Sound Effects</Text>
              <Switch
                value={stats.soundEnabled}
                onValueChange={toggleSound}
                trackColor={{ false: "#ccc", true: colors.primary }}
              />
            </View>
          </View>

          {/* App Info */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              About
            </Text>

            <View className="bg-surface rounded-2xl p-4 border border-border gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-base text-muted">App Version</Text>
                <Text className="text-base font-semibold text-foreground">
                  1.0.0
                </Text>
              </View>
            </View>

            <View className="bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-sm text-muted leading-relaxed">
                EduPlay is an interactive educational gaming platform designed to make learning fun and engaging through multiple game modes.
              </Text>
            </View>
          </View>

          {/* Danger Zone */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-error">
              Danger Zone
            </Text>

            <Pressable
              onPress={handleResetStats}
              style={({ pressed }) => ([
                {
                  opacity: pressed ? 0.8 : 1,
                },
              ])}
            >
              <View className="bg-error rounded-2xl p-4 items-center">
                <Text className="text-base font-semibold text-white">
                  Reset All Statistics
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
