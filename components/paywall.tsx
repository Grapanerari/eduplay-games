import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useMonetization } from "@/lib/monetization-context";
import { useLanguage } from "@/lib/language-context";

interface PaywallProps {
  onClose: () => void;
  onUpgrade: () => void;
}

export function Paywall({ onClose, onUpgrade }: PaywallProps) {
  const { t } = useLanguage();

  const features = [
    "🎮 Tentativas ilimitadas",
    "🚫 Sem anúncios",
    "⭐ Acesso a conteúdo exclusivo",
    "🏆 Modo desafio avançado",
    "💎 Temas premium",
  ];

  return (
    <View className="absolute inset-0 bg-black bg-opacity-50 items-center justify-center z-50">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        className="w-full px-4"
      >
        <View className="bg-white rounded-3xl p-6 gap-6 mx-4">
          {/* Header */}
          <View className="items-center gap-2">
            <Text className="text-5xl">👑</Text>
            <Text className="text-3xl font-bold text-foreground">Premium</Text>
            <Text className="text-base text-muted text-center">
              Desbloqueie o potencial total do EduPlay
            </Text>
          </View>

          {/* Features */}
          <View className="gap-3 bg-gray-50 rounded-2xl p-4">
            {features.map((feature, index) => (
              <View key={index} className="flex-row items-center gap-3">
                <Text className="text-lg">{feature.split(" ")[0]}</Text>
                <Text className="text-base text-foreground flex-1">
                  {feature.split(" ").slice(1).join(" ")}
                </Text>
              </View>
            ))}
          </View>

          {/* Pricing */}
          <View className="bg-gradient-to-r rounded-2xl p-4 items-center gap-2" style={{ backgroundColor: "#6366F1" }}>
            <Text className="text-sm text-white opacity-90">Apenas por</Text>
            <Text className="text-4xl font-black text-white">R$ 9,99</Text>
            <Text className="text-xs text-white opacity-80">/mês • Cancele a qualquer momento</Text>
          </View>

          {/* Buttons */}
          <View className="gap-3">
            <TouchableOpacity
              onPress={onUpgrade}
              className="bg-gradient-to-r rounded-2xl p-4 items-center"
              style={{ backgroundColor: "#6366F1" }}
            >
              <Text className="text-base font-bold text-white">
                Upgrade para Premium
              </Text>
            </TouchableOpacity>

            <Pressable
              onPress={onClose}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <Text className="text-center text-base font-semibold text-muted">
                Continuar Grátis
              </Text>
            </Pressable>
          </View>

          {/* Trust Badge */}
          <View className="items-center gap-1 pt-2 border-t border-gray-200">
            <Text className="text-xs text-muted">🔒 Pagamento seguro com Google Play</Text>
            <Text className="text-xs text-muted">30 dias de garantia de devolução</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
