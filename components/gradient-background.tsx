import { View, type ViewProps } from "react-native";

interface GradientBackgroundProps extends ViewProps {
  colors: string[];
  children?: React.ReactNode;
}

export function GradientBackground({
  colors,
  children,
  ...props
}: GradientBackgroundProps) {
  // Utilise la première couleur comme fallback (gradient CSS simulé)
  const backgroundColor = colors[0] || "#ffffff";
  
  return (
    <View {...props} style={[{ flex: 1, backgroundColor }, props.style]}>
      {children}
    </View>
  );
}
