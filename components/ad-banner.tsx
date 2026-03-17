import { View, Text, TouchableOpacity } from "react-native";
import { useMonetization } from "@/lib/monetization-context";

interface AdBannerProps {
  onClose?: () => void;
}

export function AdBanner({ onClose }: AdBannerProps) {
  const { isPremium } = useMonetization();

  if (isPremium) {
    return null; // Premium users don't see ads
  }

  return (
    <View className="bg-gray-100 rounded-xl p-4 flex-row items-center justify-between border border-gray-200">
      <View className="flex-1 gap-1">
        <Text className="text-sm font-bold text-foreground">
          📢 Publicidade
        </Text>
        <Text className="text-xs text-muted">
          Upgrade para Premium e remova os anúncios
        </Text>
      </View>
      {onClose && (
        <TouchableOpacity
          onPress={onClose}
          className="ml-2 p-2"
        >
          <Text className="text-lg">✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
