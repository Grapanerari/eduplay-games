import { Pressable, Text, View } from "react-native";
import { cn } from "@/lib/utils";

interface AnswerButtonProps {
  label: string;
  option: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isSubmitted: boolean;
  onPress: () => void;
}

export function AnswerButton({
  label,
  option,
  isSelected,
  isCorrect,
  isSubmitted,
  onPress,
}: AnswerButtonProps) {
  let backgroundColor = "#F3F4F6"; // Default gray
  let textColor = "#1F2937"; // Default dark

  if (isSubmitted) {
    if (isCorrect) {
      backgroundColor = "#10B981"; // Green
      textColor = "#FFFFFF";
    } else if (isSelected && !isCorrect) {
      backgroundColor = "#EF4444"; // Red
      textColor = "#FFFFFF";
    }
  } else if (isSelected) {
    backgroundColor = "#6366F1"; // Indigo
    textColor = "#FFFFFF";
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={isSubmitted}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed && !isSubmitted ? 0.95 : 1 }],
          opacity: pressed && !isSubmitted ? 0.8 : 1,
        },
      ]}
    >
      <View
        className="p-4 rounded-xl border-2 flex-row items-center gap-4"
        style={{
          backgroundColor,
          borderColor: isSelected ? "#6366F1" : "#E5E7EB",
        }}
      >
        <View
          className="w-8 h-8 rounded-full items-center justify-center border-2"
          style={{
            borderColor: textColor,
            backgroundColor: isSelected ? textColor : "transparent",
          }}
        >
          <Text
            className="font-bold text-sm"
            style={{ color: isSelected ? backgroundColor : textColor }}
          >
            {label}
          </Text>
        </View>
        <Text
          className="flex-1 text-base font-medium"
          style={{ color: textColor }}
        >
          {option}
        </Text>
      </View>
    </Pressable>
  );
}
