import { View, Text, Switch, ScrollView } from "react-native";
import { usePushNotifications } from "@/hooks/use-push-notifications";
import { useLanguage } from "@/lib/language-context";
import { ScreenContainer } from "@/components/screen-container";
import { translations } from "@/lib/i18n";

export function NotificationPreferences() {
  const { preferences, updatePreferences, isInitialized } = usePushNotifications();
  const { language } = useLanguage();

  if (!isInitialized || !preferences) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground">Chargement...</Text>
      </ScreenContainer>
    );
  }

  const t = (key: string) => (translations as any)[language]?.[key] || key;

  const handleToggle = async (key: keyof typeof preferences, value: boolean) => {
    await updatePreferences({ [key]: value });
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Master Toggle */}
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-foreground">
                {t("notifications_enabled")}
              </Text>
              <Switch
                value={preferences.enabled}
                onValueChange={(value) => handleToggle("enabled", value)}
                trackColor={{ false: "#767577", true: "#81c784" }}
                thumbColor={preferences.enabled ? "#4caf50" : "#f4f3f4"}
              />
            </View>
          </View>

          {/* Notification Types */}
          <View className="gap-3">
            {/* New Quiz */}
            <View className="bg-surface rounded-xl p-4 border border-border">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">
                    🧠 {t("new_quiz_notifications")}
                  </Text>
                  <Text className="text-sm text-muted mt-1">
                    {t("new_quiz_desc")}
                  </Text>
                </View>
                <Switch
                  value={preferences.newQuiz}
                  onValueChange={(value) => handleToggle("newQuiz", value)}
                  trackColor={{ false: "#767577", true: "#81c784" }}
                  thumbColor={preferences.newQuiz ? "#4caf50" : "#f4f3f4"}
                />
              </View>
            </View>

            {/* New Challenge */}
            <View className="bg-surface rounded-xl p-4 border border-border">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">
                    🎯 {t("new_challenge_notifications")}
                  </Text>
                  <Text className="text-sm text-muted mt-1">
                    {t("new_challenge_desc")}
                  </Text>
                </View>
                <Switch
                  value={preferences.newChallenge}
                  onValueChange={(value) => handleToggle("newChallenge", value)}
                  trackColor={{ false: "#767577", true: "#81c784" }}
                  thumbColor={preferences.newChallenge ? "#4caf50" : "#f4f3f4"}
                />
              </View>
            </View>

            {/* Achievements */}
            <View className="bg-surface rounded-xl p-4 border border-border">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">
                    🏆 {t("achievement_notifications")}
                  </Text>
                  <Text className="text-sm text-muted mt-1">
                    {t("achievement_desc")}
                  </Text>
                </View>
                <Switch
                  value={preferences.achievements}
                  onValueChange={(value) => handleToggle("achievements", value)}
                  trackColor={{ false: "#767577", true: "#81c784" }}
                  thumbColor={preferences.achievements ? "#4caf50" : "#f4f3f4"}
                />
              </View>
            </View>

            {/* Daily Reminder */}
            <View className="bg-surface rounded-xl p-4 border border-border">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">
                    ⏰ {t("daily_reminder")}
                  </Text>
                  <Text className="text-sm text-muted mt-1">
                    {t("daily_reminder_desc")}
                  </Text>
                </View>
                <Switch
                  value={preferences.dailyReminder}
                  onValueChange={(value) => handleToggle("dailyReminder", value)}
                  trackColor={{ false: "#767577", true: "#81c784" }}
                  thumbColor={preferences.dailyReminder ? "#4caf50" : "#f4f3f4"}
                />
              </View>
            </View>

            {/* Updates */}
            <View className="bg-surface rounded-xl p-4 border border-border">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">
                    ✨ {t("update_notifications")}
                  </Text>
                  <Text className="text-sm text-muted mt-1">
                    {t("update_desc")}
                  </Text>
                </View>
                <Switch
                  value={preferences.updates}
                  onValueChange={(value) => handleToggle("updates", value)}
                  trackColor={{ false: "#767577", true: "#81c784" }}
                  thumbColor={preferences.updates ? "#4caf50" : "#f4f3f4"}
                />
              </View>
            </View>

            {/* Special Events */}
            <View className="bg-surface rounded-xl p-4 border border-border">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">
                    🎉 {t("special_events")}
                  </Text>
                  <Text className="text-sm text-muted mt-1">
                    {t("special_events_desc")}
                  </Text>
                </View>
                <Switch
                  value={preferences.specialEvents}
                  onValueChange={(value) => handleToggle("specialEvents", value)}
                  trackColor={{ false: "#767577", true: "#81c784" }}
                  thumbColor={preferences.specialEvents ? "#4caf50" : "#f4f3f4"}
                />
              </View>
            </View>
          </View>

          {/* Info */}
          <View className="bg-blue-50 dark:bg-blue-900 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <Text className="text-sm text-blue-900 dark:text-blue-100">
              ℹ️ {t("notifications_info")}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
