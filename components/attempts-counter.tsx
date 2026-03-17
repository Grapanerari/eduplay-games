import { Text, View, TouchableOpacity } from "react-native";
import { useMonetization } from "@/lib/monetization-context";

interface AttemptsCounterProps {
  onUpgradePress?: () => void;
}

export function AttemptsCounter({ onUpgradePress }: AttemptsCounterProps) {
  const { isPremium, dailyAttempts, maxDailyAttempts } = useMonetization();

  if (isPremium) {
    return null; // Premium users don't see limits
  }

  const remaining = maxDailyAttempts - dailyAttempts;
  const isLow = remaining <= 1;

  return (
    <View className="bg-warning bg-opacity-10 border border-warning rounded-xl p-3 gap-2">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold text-warning">
          ⚡ {remaining} tentativas restantes hoje
        </Text>
        {isLow && (
          <TouchableOpacity
            onPress={onUpgradePress}
            className="bg-warning rounded-full px-3 py-1"
          >
            <Text className="text-xs font-bold text-white">Upgrade</Text>
          </TouchableOpacity>
        )}
      </View>
      {isLow && (
        <Text className="text-xs text-warning">
          Upgrade para Premium para tentativas ilimitadas!
        </Text>
      )}
    </View>
  );
}
