import { View } from "react-native";

interface ProgressBarProps {
  current: number;
  total: number;
  color?: string;
}

export function ProgressBar({ current, total, color = "#6366F1" }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <View
        style={{
          width: `${percentage}%`,
          backgroundColor: color,
          height: "100%",
        }}
      />
    </View>
  );
}
