import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { ProgressBar } from "@/components/progress-bar";
import { getRandomMathProblems, type MathProblem } from "@/data/math-data";
import { useGame } from "@/lib/game-context";
import { useSoundEffects } from "@/components/sound-effects";
import { useGameAnalytics } from "@/hooks/use-game-analytics";

export default function MathGameScreen() {
  const router = useRouter();
  const { addPoints, updateMathScore } = useGame();
  const { playSuccessFeedback, playErrorFeedback } = useSoundEffects();
  const { trackGameCompleted } = useGameAnalytics("math");

  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameStartTime] = useState(Date.now());

  useEffect(() => {
    const probs = getRandomMathProblems(10);
    setProblems(probs);
    setTimeLeft(probs[0]?.timeLimit || 5);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 && !isSubmitted && problems.length > 0) {
      handleTimeout();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isSubmitted, problems]);

  if (problems.length === 0) {
    return (
      <ScreenContainer className="p-6 items-center justify-center">
        <Text className="text-xl text-foreground">Loading...</Text>
      </ScreenContainer>
    );
  }

  const currentProblem = problems[currentIndex];
  const isCorrect = parseInt(userAnswer) === currentProblem.answer;

  const handleTimeout = () => {
    setIsSubmitted(true);
  };

  const handleSubmit = async () => {
    if (userAnswer === "") return;
    setIsSubmitted(true);

    if (isCorrect) {
      const timeBonus = Math.max(0, timeLeft);
      setScore(score + 10 + timeBonus);
      await playSuccessFeedback();
    } else {
      await playErrorFeedback();
    }
  };

  const handleNext = () => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer("");
      setIsSubmitted(false);
      setTimeLeft(problems[currentIndex + 1].timeLimit);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    const finalScore = isCorrect && !isSubmitted ? score + 10 : score;
    const duration = Math.round((Date.now() - gameStartTime) / 1000);
    addPoints(finalScore);
    updateMathScore(finalScore);
    trackGameCompleted(finalScore, duration);
    setGameFinished(true);
  };

  if (gameFinished) {
    return (
      <ScreenContainer className="p-6">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 items-center justify-center gap-6">
            <Text className="text-5xl">🎉</Text>
            <Text className="text-3xl font-bold text-foreground">Math Challenge Complete!</Text>

            <View className="bg-surface rounded-2xl p-6 border border-border w-full gap-4">
              <View className="flex-row justify-between items-center pb-4 border-b border-border">
                <Text className="text-base text-muted">Score</Text>
                <Text className="text-3xl font-bold text-primary">{score}</Text>
              </View>

              <View className="flex-row justify-between items-center pb-4 border-b border-border">
                <Text className="text-base text-muted">Correct Answers</Text>
                <Text className="text-2xl font-bold text-success">
                  {Math.floor(score / 10)}/10
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-base text-muted">Accuracy</Text>
                <Text className="text-2xl font-bold text-foreground">
                  {Math.floor((score / 100) * 100)}%
                </Text>
              </View>
            </View>

            <View className="w-full gap-3">
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/math")}
                className="bg-primary rounded-xl p-4 items-center"
              >
                <Text className="text-base font-semibold text-white">Play Again</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/(tabs)")}
                className="bg-surface border border-border rounded-xl p-4 items-center"
              >
                <Text className="text-base font-semibold text-foreground">Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="gap-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-semibold text-muted">
                Problem {currentIndex + 1}/{problems.length}
              </Text>
              <View className="flex-row items-center gap-2">
                <Text
                  className={`text-sm font-semibold ${
                    timeLeft <= 3 ? "text-error" : "text-primary"
                  }`}
                >
                  {timeLeft}s
                </Text>
                <Text className="text-sm font-semibold text-primary">{score} pts</Text>
              </View>
            </View>
            <ProgressBar
              current={currentIndex + 1}
              total={problems.length}
              color="#EC4899"
            />
          </View>

          {/* Problem */}
          <View className="bg-surface rounded-2xl p-8 border border-border items-center justify-center gap-4">
            <Text className="text-5xl font-bold text-primary">
              {currentProblem.problem}
            </Text>
          </View>

          {/* Input */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-muted">Your Answer</Text>
            <TextInput
              value={userAnswer}
              onChangeText={setUserAnswer}
              placeholder="Enter your answer"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              editable={!isSubmitted}
              className="bg-surface border border-border rounded-xl p-4 text-lg text-foreground"
            />
          </View>

          {/* Feedback */}
          {isSubmitted && (
            <View
              className={`rounded-xl p-4 ${
                isCorrect ? "bg-success" : "bg-error"
              } items-center`}
            >
              <Text className="text-base font-semibold text-white">
                {isCorrect
                  ? `✓ Correct! Answer: ${currentProblem.answer}`
                  : `✗ Incorrect. Answer: ${currentProblem.answer}`}
              </Text>
            </View>
          )}

          {/* Button */}
          <TouchableOpacity
            onPress={isSubmitted ? handleNext : handleSubmit}
            disabled={userAnswer === "" && !isSubmitted}
            className={`rounded-xl p-4 items-center ${
              userAnswer === "" && !isSubmitted ? "bg-gray-300" : "bg-primary"
            }`}
          >
            <Text className="text-base font-semibold text-white">
              {isSubmitted
                ? currentIndex === problems.length - 1
                  ? "Finish"
                  : "Next"
                : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
