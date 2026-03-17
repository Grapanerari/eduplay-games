import { Pressable, Text, View } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface GameCardPremiumProps {
  title: string;
  icon: string;
  description: string;
  highScore: number;
  onPress: () => void;
  gradientStart: string;
  gradientEnd: string;
}

export function GameCardPremium({
  title,
  icon,
  description,
  highScore,
  onPress,
  gradientStart,
  gradientEnd,
}: GameCardPremiumProps) {
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
      ]}
    >
      <View
        className="rounded-3xl p-6 border-2 border-white border-opacity-30 overflow-hidden"
        style={{
          backgroundColor: gradientStart,
          shadowColor: gradientStart,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        {/* Background Overlay */}
        <View
          className="absolute inset-0 opacity-20"
          style={{ backgroundColor: gradientEnd }}
        />

        {/* Content */}
        <View className="relative z-10 gap-3">
          {/* Icon & Title */}
          <View className="flex-row items-center gap-3">
            <Text className="text-5xl">{icon}</Text>
            <View className="flex-1">
              <Text className="text-2xl font-bold text-white">{title}</Text>
            </View>
          </View>

          {/* Description */}
          <Text className="text-sm text-white opacity-90 leading-relaxed">
            {description}
          </Text>

          {/* Score Badge */}
          <View className="flex-row items-center gap-2 mt-2">
            <View className="bg-white bg-opacity-20 rounded-full px-3 py-1">
              <Text className="text-xs font-bold text-white">
                🏆 {highScore} pts
              </Text>
            </View>
          </View>

          {/* CTA */}
          <View className="mt-2 bg-white bg-opacity-20 rounded-2xl p-3 items-center border border-white border-opacity-30">
            <Text className="text-sm font-bold text-white">▶ Play Now</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
