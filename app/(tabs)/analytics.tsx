import { ScrollView, Text, View, TouchableOpacity, Share } from "react-native";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useLanguage } from "@/lib/language-context";
import { analyticsManager } from "@/lib/analytics";

interface GameStats {
  totalPlayed: number;
  totalCompleted: number;
  averageScore: number;
  highScore: number;
  completionRate: number;
}

interface MonetizationStats {
  paywallShown: number;
  paywallConversions: number;
  conversionRate: number;
  powerUpsPurchased: number;
  premiumUpgrades: number;
  totalMonetizationEvents: number;
}

export default function AnalyticsScreen() {
  const { t } = useLanguage();
  const [gameStats, setGameStats] = useState<Record<string, GameStats>>({});
  const [monetization, setMonetization] = useState<MonetizationStats | null>(null);
  const [funnel, setFunnel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [quiz, math, platform, logic, monetizationData, funnelData] = await Promise.all([
        analyticsManager.getGameStats("quiz"),
        analyticsManager.getGameStats("math"),
        analyticsManager.getGameStats("platform"),
        analyticsManager.getGameStats("logic"),
        analyticsManager.getMonetizationStats(),
        analyticsManager.getMonetizationFunnel(),
      ]);

      setGameStats({ quiz, math, platform, logic });
      setMonetization(monetizationData);
      setFunnel(funnelData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load analytics:", error);
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const data = await analyticsManager.exportAnalytics();
      if (data) {
        await Share.share({
          message: JSON.stringify(data, null, 2),
          title: "EduPlay Analytics Export",
        });
      }
    } catch (error) {
      console.error("Failed to export analytics:", error);
    }
  };

  const StatCard = ({ title, value, subtitle }: { title: string; value: string | number; subtitle?: string }) => (
    <View className="bg-surface rounded-2xl p-4 border border-border gap-2">
      <Text className="text-sm text-muted">{title}</Text>
      <Text className="text-3xl font-bold text-primary">{value}</Text>
      {subtitle && <Text className="text-xs text-muted">{subtitle}</Text>}
    </View>
  );

  if (loading) {
    return (
      <ScreenContainer className="p-6 items-center justify-center">
        <Text className="text-lg text-muted">Chargement des analytics...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">📊 Analytics</Text>
            <Text className="text-base text-muted">Suivi du comportement utilisateur</Text>
          </View>

          {/* Monetization Funnel */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">🎯 Funnel de Monétisation</Text>
            <StatCard title="App Ouvertes" value={funnel?.appOpened || 0} />
            <StatCard title="Jeux Joués" value={`${funnel?.gamesPlayed || 0}%`} subtitle="% d'utilisateurs" />
            <StatCard title="Paywall Affichés" value={`${funnel?.paywallShown || 0}%`} subtitle="% d'utilisateurs" />
            <StatCard title="Conversions" value={`${funnel?.converted || 0}%`} subtitle="% d'utilisateurs convertis" />
          </View>

          {/* Monetization Stats */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">💰 Statistiques de Monétisation</Text>
            <StatCard
              title="Taux de Conversion Paywall"
              value={`${monetization?.conversionRate || 0}%`}
              subtitle={`${monetization?.paywallConversions || 0} conversions sur ${monetization?.paywallShown || 0}`}
            />
            <StatCard
              title="Power-ups Achetés"
              value={monetization?.powerUpsPurchased || 0}
            />
            <StatCard
              title="Upgrades Premium"
              value={monetization?.premiumUpgrades || 0}
            />
          </View>

          {/* Game Stats */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">🎮 Statistiques des Jeux</Text>

            {Object.entries(gameStats).map(([gameType, stats]) => (
              <View key={gameType} className="bg-surface rounded-2xl p-4 border border-border gap-3">
                <Text className="text-base font-bold text-foreground capitalize">
                  {gameType === "quiz" && "🧠 Quiz"}
                  {gameType === "math" && "🔢 Mathématiques"}
                  {gameType === "platform" && "🎮 Plateforme"}
                  {gameType === "logic" && "🧩 Logique"}
                </Text>

                <View className="flex-row justify-between">
                  <View>
                    <Text className="text-xs text-muted">Joués</Text>
                    <Text className="text-xl font-bold text-foreground">{stats.totalPlayed}</Text>
                  </View>
                  <View>
                    <Text className="text-xs text-muted">Complétés</Text>
                    <Text className="text-xl font-bold text-foreground">{stats.totalCompleted}</Text>
                  </View>
                  <View>
                    <Text className="text-xs text-muted">Taux</Text>
                    <Text className="text-xl font-bold text-foreground">{stats.completionRate}%</Text>
                  </View>
                </View>

                <View className="flex-row justify-between">
                  <View>
                    <Text className="text-xs text-muted">Score Moyen</Text>
                    <Text className="text-lg font-bold text-primary">{stats.averageScore}</Text>
                  </View>
                  <View>
                    <Text className="text-xs text-muted">Meilleur Score</Text>
                    <Text className="text-lg font-bold text-primary">{stats.highScore}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Export Button */}
          <TouchableOpacity
            onPress={handleExport}
            className="bg-primary rounded-xl p-4 items-center mt-4"
          >
            <Text className="text-base font-semibold text-white">📥 Exporter les Données</Text>
          </TouchableOpacity>

          <View className="h-4" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
