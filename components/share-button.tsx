import { Pressable, Text, View } from "react-native";
import { useLanguage } from "@/lib/language-context";
import { socialSharing, generateShareMessages, generateDetailedShareMessage } from "@/lib/social-sharing";
import { useGameAnalytics } from "@/hooks/use-game-analytics";

interface ShareButtonProps {
  gameType: "quiz" | "math" | "platform" | "logic";
  score: number;
  accuracy?: number;
  duration?: number;
  variant?: "simple" | "detailed";
}

export function ShareButton({
  gameType,
  score,
  accuracy = 0,
  duration = 0,
  variant = "simple",
}: ShareButtonProps) {
  const { language } = useLanguage();
  const { trackEvent } = useGameAnalytics(gameType);

  const shareMessage =
    variant === "detailed"
      ? generateDetailedShareMessage(gameType, score, accuracy, duration, language as "fr" | "pt")
      : generateShareMessages(gameType, score, language as "fr" | "pt");

  const handleShare = async () => {
    try {
      const result = await socialSharing.shareNative({
        title: "EduPlay - Partage mon score!",
        message: shareMessage,
      });

      if (result.success) {
        trackEvent("game_shared", {
          game_type: gameType,
          score,
          share_method: result.action,
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const labels = {
    fr: "Partager",
    pt: "Compartilhar",
  };

  return (
    <Pressable
      onPress={handleShare}
      style={({ pressed }) => [
        {
          backgroundColor: "#3B82F6",
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 8,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <View className="flex-row items-center justify-center gap-2">
        <Text className="text-base font-semibold text-white">📱 {labels[language as "fr" | "pt"]}</Text>
      </View>
    </Pressable>
  );
}

/**
 * Composant pour afficher plusieurs options de partage
 */
export function ShareOptions({
  gameType,
  score,
  accuracy = 0,
  duration = 0,
}: Omit<ShareButtonProps, "variant">) {
  const { language } = useLanguage();
  const { trackEvent } = useGameAnalytics(gameType);

  const shareMessage = generateDetailedShareMessage(
    gameType,
    score,
    accuracy,
    duration,
    language as "fr" | "pt"
  );

  const handleWhatsApp = async () => {
    const result = await socialSharing.shareWhatsApp(shareMessage);
    if (result.success) {
      trackEvent("game_shared", { game_type: gameType, score, platform: "whatsapp" });
    }
  };

  const handleFacebook = async () => {
    const result = await socialSharing.shareFacebook(
      shareMessage,
      "https://play.google.com/store/apps/details?id=space.manus.eduplay.games"
    );
    if (result.success) {
      trackEvent("game_shared", { game_type: gameType, score, platform: "facebook" });
    }
  };

  const handleTwitter = async () => {
    const result = await socialSharing.shareTwitter(
      shareMessage,
      "https://play.google.com/store/apps/details?id=space.manus.eduplay.games"
    );
    if (result.success) {
      trackEvent("game_shared", { game_type: gameType, score, platform: "twitter" });
    }
  };

  const labels = {
    fr: "Partager sur",
    pt: "Compartilhar em",
  };

  return (
    <View className="gap-3">
      <Text className="text-sm font-semibold text-muted text-center">
        {labels[language as "fr" | "pt"]}
      </Text>
      <View className="flex-row gap-3 justify-center">
        <Pressable
          onPress={handleWhatsApp}
          style={({ pressed }) => [
            {
              backgroundColor: "#25D366",
              paddingHorizontal: 12,
              paddingVertical: 10,
              borderRadius: 8,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Text className="text-lg">💬</Text>
        </Pressable>

        <Pressable
          onPress={handleFacebook}
          style={({ pressed }) => [
            {
              backgroundColor: "#1877F2",
              paddingHorizontal: 12,
              paddingVertical: 10,
              borderRadius: 8,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Text className="text-lg">f</Text>
        </Pressable>

        <Pressable
          onPress={handleTwitter}
          style={({ pressed }) => [
            {
              backgroundColor: "#000000",
              paddingHorizontal: 12,
              paddingVertical: 10,
              borderRadius: 8,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Text className="text-lg">𝕏</Text>
        </Pressable>
      </View>
    </View>
  );
}
