import { Pressable, Text, View } from "react-native";
import { cn } from "@/lib/utils";
import { useColors } from "@/hooks/use-colors";

interface GameCardProps {
  title: string;
  icon: string;
  description: string;
  highScore: number;
  onPress: () => void;
  color: string;
}

export function GameCard({
  title,
  icon,
  description,
  highScore,
  onPress,
  color,
}: GameCardProps) {
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.95 : 1 }],
          opacity: pressed ? 0.8 : 1,
        },
      ]}
      className="flex-1 rounded-2xl overflow-hidden"
    >
      <View
        className="p-6 rounded-2xl"
        style={{
          backgroundColor: color,
          minHeight: 180,
        }}
      >
        {/* Icon/Title Area */}
        <View className="mb-4">
          <Text
            className="text-4xl mb-2"
            style={{
              lineHeight: 48,
            }}
          >
            {icon}
          </Text>
          <Text className="text-xl font-bold text-white">{title}</Text>
        </View>

        {/* Description */}
        <Text className="text-sm text-white opacity-90 mb-4 leading-relaxed">
          {description}
        </Text>

        {/* High Score */}
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-white opacity-75">Best Score</Text>
          <Text className="text-lg font-bold text-white">{highScore}</Text>
        </View>
      </View>
    </Pressable>
  );
}
