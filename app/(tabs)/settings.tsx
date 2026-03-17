import { ScrollView, Text, View, Switch, Alert, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useGame } from "@/lib/game-context";
import { useLanguage } from "@/lib/language-context";
import { useColors } from "@/hooks/use-colors";

export default function SettingsScreen() {
  const { stats, toggleMusic, toggleSound, resetStats } = useGame();
  const { language, setLanguage, t } = useLanguage();
  const colors = useColors();

  const handleResetStats = () => {
    Alert.alert(
      t("resetAllStatistics"),
      t("resetConfirm"),
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        {
          text: t("resetAllStatistics"),
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
            <Text className="text-3xl font-bold text-foreground">{t("settings")}</Text>
            <Text className="text-base text-muted">
              Customize your experience
            </Text>
          </View>

          {/* Language Settings */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Language</Text>

            <View className="bg-surface rounded-2xl p-4 border border-border gap-3">
              <Pressable
                onPress={() => setLanguage("fr")}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <View
                  className={`p-3 rounded-lg border-2 ${
                    language === "fr"
                      ? "bg-primary border-primary"
                      : "bg-background border-border"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      language === "fr" ? "text-white" : "text-foreground"
                    }`}
                  >
                    🇫🇷 Français
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => setLanguage("pt")}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <View
                  className={`p-3 rounded-lg border-2 ${
                    language === "pt"
                      ? "bg-primary border-primary"
                      : "bg-background border-border"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      language === "pt" ? "text-white" : "text-foreground"
                    }`}
                  >
                    🇵🇹 Português
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* Audio Settings */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              {t("audio")}
            </Text>

            <View className="bg-surface rounded-2xl p-4 border border-border flex-row justify-between items-center">
              <Text className="text-base text-foreground">{t("music")}</Text>
              <Switch
                value={stats.musicEnabled}
                onValueChange={toggleMusic}
                trackColor={{ false: "#ccc", true: colors.primary }}
              />
            </View>

            <View className="bg-surface rounded-2xl p-4 border border-border flex-row justify-between items-center">
              <Text className="text-base text-foreground">{t("soundEffects")}</Text>
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
              {t("about")}
            </Text>

            <View className="bg-surface rounded-2xl p-4 border border-border gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-base text-muted">{t("appVersion")}</Text>
                <Text className="text-base font-semibold text-foreground">
                  1.0.0
                </Text>
              </View>
            </View>

            <View className="bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-sm text-muted leading-relaxed">
                {t("appDescription")}
              </Text>
            </View>
          </View>

          {/* Danger Zone */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-error">
              {t("dangerZone")}
            </Text>

            <Pressable
              onPress={handleResetStats}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <View className="bg-error rounded-2xl p-4 items-center">
                <Text className="text-base font-semibold text-white">
                  {t("resetAllStatistics")}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
