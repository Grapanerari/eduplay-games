import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useMonetization } from "@/lib/monetization-context";
import { useLanguage } from "@/lib/language-context";

const POWER_UPS = [
  {
    id: "extra-time",
    name: "⏱️ Tempo Extra",
    description: "+30 segundos em qualquer jogo",
    price: "R$ 2,99",
    color: "#F59E0B",
  },
  {
    id: "double-points",
    name: "2️⃣ Pontos Duplos",
    description: "Ganhe 2x de pontos na próxima sessão",
    price: "R$ 3,99",
    color: "#EC4899",
  },
  {
    id: "hint-pack",
    name: "💡 Pacote de Dicas",
    description: "5 dicas extras para qualquer jogo",
    price: "R$ 1,99",
    color: "#10B981",
  },
  {
    id: "shield",
    name: "🛡️ Escudo",
    description: "Proteja-se de 1 erro sem penalidade",
    price: "R$ 2,99",
    color: "#6366F1",
  },
];

export default function ShopScreen() {
  const { purchasedPowerUps, buyPowerUp } = useMonetization();
  const { t } = useLanguage();

  const handleBuyPowerUp = (powerUpId: string) => {
    buyPowerUp(powerUpId);
    // In a real app, you would integrate with Google Play Billing here
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">🛍️ Loja</Text>
            <Text className="text-base text-muted">
              Compre power-ups para melhorar seu desempenho
            </Text>
          </View>

          <View className="gap-3">
            {POWER_UPS.map((powerUp) => {
              const isPurchased = purchasedPowerUps.includes(powerUp.id);

              return (
                <View
                  key={powerUp.id}
                  className="rounded-2xl p-4 border border-border overflow-hidden"
                  style={{
                    backgroundColor: isPurchased ? "#f0f0f0" : "#ffffff",
                  }}
                >
                  <View className="flex-row items-start justify-between gap-3">
                    <View className="flex-1 gap-2">
                      <Text className="text-lg font-bold text-foreground">
                        {powerUp.name}
                      </Text>
                      <Text className="text-sm text-muted">
                        {powerUp.description}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => handleBuyPowerUp(powerUp.id)}
                      disabled={isPurchased}
                      className="rounded-xl px-4 py-2 items-center"
                      style={{
                        backgroundColor: isPurchased ? "#ccc" : powerUp.color,
                      }}
                    >
                      <Text className="text-sm font-bold text-white">
                        {isPurchased ? "✓ Comprado" : powerUp.price}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>

          <View className="bg-blue-50 rounded-2xl p-4 border border-blue-200 gap-2">
            <Text className="text-sm font-semibold text-blue-900">
              💡 Dica: Upgrade para Premium para acesso ilimitado a todos os power-ups!
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
