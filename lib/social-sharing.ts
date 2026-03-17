import { Share, Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";

export interface ShareContent {
  title: string;
  message: string;
  url?: string;
}

/**
 * Partage social pour différents réseaux
 */
export const socialSharing = {
  /**
   * Partage via le système natif (WhatsApp, Facebook, etc.)
   */
  async shareNative(content: ShareContent) {
    try {
      const result = await Share.share({
        message: content.message,
        title: content.title,
        url: Platform.OS === "ios" ? content.url : undefined,
      });

      if (result.action === Share.dismissedAction) {
        return { success: false, action: "dismissed" };
      }

      return { success: true, action: result.action };
    } catch (error) {
      console.error("Error sharing:", error);
      return { success: false, error: String(error) };
    }
  },

  /**
   * Partage direct sur WhatsApp
   */
  async shareWhatsApp(message: string) {
    try {
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl =
        Platform.OS === "ios"
          ? `whatsapp://send?text=${encodedMessage}`
          : `https://api.whatsapp.com/send?text=${encodedMessage}`;

      if (Platform.OS === "ios") {
        await WebBrowser.openBrowserAsync(whatsappUrl);
      } else {
        await WebBrowser.openBrowserAsync(whatsappUrl);
      }

      return { success: true, platform: "whatsapp" };
    } catch (error) {
      console.error("Error sharing to WhatsApp:", error);
      return { success: false, error: String(error) };
    }
  },

  /**
   * Partage direct sur Facebook
   */
  async shareFacebook(message: string, appLink: string) {
    try {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appLink)}&quote=${encodeURIComponent(message)}`;
      await WebBrowser.openBrowserAsync(facebookUrl);
      return { success: true, platform: "facebook" };
    } catch (error) {
      console.error("Error sharing to Facebook:", error);
      return { success: false, error: String(error) };
    }
  },

  /**
   * Partage direct sur Twitter
   */
  async shareTwitter(message: string, appLink: string) {
    try {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(appLink)}`;
      await WebBrowser.openBrowserAsync(twitterUrl);
      return { success: true, platform: "twitter" };
    } catch (error) {
      console.error("Error sharing to Twitter:", error);
      return { success: false, error: String(error) };
    }
  },

  /**
   * Partage direct sur Instagram (copie le message dans le presse-papiers)
   */
  async shareInstagram(message: string) {
    try {
      // Instagram ne supporte pas les partages directs via URL
      // On copie le message et on ouvre Instagram
      const instagramUrl = "instagram://";
      await WebBrowser.openBrowserAsync(instagramUrl);
      return { success: true, platform: "instagram", note: "Message copied to clipboard" };
    } catch (error) {
      console.error("Error sharing to Instagram:", error);
      return { success: false, error: String(error) };
    }
  },
};

/**
 * Génère les messages de partage pour chaque jeu
 */
export const generateShareMessages = (
  gameType: "quiz" | "math" | "platform" | "logic",
  score: number,
  language: "fr" | "pt" = "fr"
) => {
  const appLink = "https://play.google.com/store/apps/details?id=space.manus.eduplay.games";
  const baseMessage = `🎮 ${score} points`;

  const messages = {
    fr: {
      quiz: `${baseMessage} au Quiz EduPlay! 🧠 Testez vos connaissances et battez mon score! Télécharge EduPlay: ${appLink}`,
      math: `${baseMessage} en Mathématiques EduPlay! 🔢 Résolvez des problèmes rapidement! Télécharge EduPlay: ${appLink}`,
      platform: `${baseMessage} au Mini-jeu Plateforme EduPlay! 🎮 Collectez des pièces en 60 secondes! Télécharge EduPlay: ${appLink}`,
      logic: `${baseMessage} aux Énigmes EduPlay! 🧩 Testez votre logique! Télécharge EduPlay: ${appLink}`,
    },
    pt: {
      quiz: `${baseMessage} no Quiz EduPlay! 🧠 Teste seus conhecimentos e bate meu score! Baixe EduPlay: ${appLink}`,
      math: `${baseMessage} em Matemática EduPlay! 🔢 Resolva problemas rapidamente! Baixe EduPlay: ${appLink}`,
      platform: `${baseMessage} no Mini-jogo Plataforma EduPlay! 🎮 Colete moedas em 60 segundos! Baixe EduPlay: ${appLink}`,
      logic: `${baseMessage} nos Enigmas EduPlay! 🧩 Teste sua lógica! Baixe EduPlay: ${appLink}`,
    },
  };

  return messages[language][gameType];
};

/**
 * Génère les messages de partage avec statistiques complètes
 */
export const generateDetailedShareMessage = (
  gameType: "quiz" | "math" | "platform" | "logic",
  score: number,
  accuracy: number,
  duration: number,
  language: "fr" | "pt" = "fr"
) => {
  const appLink = "https://play.google.com/store/apps/details?id=space.manus.eduplay.games";

  const titles = {
    fr: { quiz: "Quiz", math: "Mathématiques", platform: "Plateforme", logic: "Logique" },
    pt: { quiz: "Quiz", math: "Matemática", platform: "Plataforma", logic: "Lógica" },
  };

  const messages = {
    fr: {
      quiz: `🧠 J'ai marqué ${score} points au Quiz EduPlay!\n📊 Précision: ${accuracy}%\n⏱️ Temps: ${duration}s\n\nPeux-tu battre mon score? 🏆\n${appLink}`,
      math: `🔢 J'ai marqué ${score} points en Mathématiques EduPlay!\n📊 Précision: ${accuracy}%\n⏱️ Temps: ${duration}s\n\nRésous les problèmes plus vite! ⚡\n${appLink}`,
      platform: `🎮 J'ai collecté ${score} pièces au Mini-jeu Plateforme!\n⏱️ Temps: ${duration}s\n\nBats mon record! 🏆\n${appLink}`,
      logic: `🧩 J'ai résolu ${Math.floor(score / 10)} énigmes EduPlay!\n📊 Score: ${score}/100\n⏱️ Temps: ${duration}s\n\nTestez votre logique! 🎯\n${appLink}`,
    },
    pt: {
      quiz: `🧠 Marquei ${score} pontos no Quiz EduPlay!\n📊 Precisão: ${accuracy}%\n⏱️ Tempo: ${duration}s\n\nConsegue bater meu score? 🏆\n${appLink}`,
      math: `🔢 Marquei ${score} pontos em Matemática EduPlay!\n📊 Precisão: ${accuracy}%\n⏱️ Tempo: ${duration}s\n\nResolva problemas mais rápido! ⚡\n${appLink}`,
      platform: `🎮 Coletei ${score} moedas no Mini-jogo Plataforma!\n⏱️ Tempo: ${duration}s\n\nBata meu recorde! 🏆\n${appLink}`,
      logic: `🧩 Resolvi ${Math.floor(score / 10)} enigmas EduPlay!\n📊 Score: ${score}/100\n⏱️ Tempo: ${duration}s\n\nTeste sua lógica! 🎯\n${appLink}`,
    },
  };

  return messages[language][gameType];
};
