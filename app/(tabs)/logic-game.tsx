import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { ProgressBar } from "@/components/progress-bar";
import { getRandomPuzzles, type LogicPuzzle } from "@/data/logic-data";
import { useGame } from "@/lib/game-context";
import { useSoundEffects } from "@/components/sound-effects";

export default function LogicGameScreen() {
  const router = useRouter();
  const { addPoints, updateLogicScore } = useGame();
  const { playSuccessFeedback, playErrorFeedback } = useSoundEffects();

  const [puzzles, setPuzzles] = useState<LogicPuzzle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);

  useEffect(() => {
    const probs = getRandomPuzzles(10);
    setPuzzles(probs);
  }, []);

  if (puzzles.length === 0) {
    return (
      <ScreenContainer className="p-6 items-center justify-center">
        <Text className="text-xl text-foreground">Loading...</Text>
      </ScreenContainer>
    );
  }

  const currentPuzzle = puzzles[currentIndex];
  const isCorrect = userAnswer.toLowerCase().trim() === currentPuzzle.answer.toLowerCase();

  const handleSubmit = async () => {
    if (userAnswer === "") return;
    setIsSubmitted(true);

    if (isCorrect) {
      const hintPenalty = hintUsed ? 5 : 0;
      setScore(score + 10 - hintPenalty);
      await playSuccessFeedback();
    } else {
      await playErrorFeedback();
    }
  };

  const handleNext = () => {
    if (currentIndex < puzzles.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer("");
      setIsSubmitted(false);
      setHintUsed(false);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    const finalScore = isCorrect && !isSubmitted ? score + 10 : score;
    addPoints(finalScore);
    updateLogicScore(finalScore);
    setGameFinished(true);
  };

  if (gameFinished) {
    return (
      <ScreenContainer className="p-6">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 items-center justify-center gap-6">
            <Text className="text-5xl">🎉</Text>
            <Text className="text-3xl font-bold text-foreground">Logic Challenge Complete!</Text>

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
                onPress={() => router.push("/(tabs)/logic")}
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
                Puzzle {currentIndex + 1}/{puzzles.length}
              </Text>
              <Text className="text-sm font-semibold text-primary">{score} pts</Text>
            </View>
            <ProgressBar
              current={currentIndex + 1}
              total={puzzles.length}
              color="#10B981"
            />
          </View>

          {/* Riddle */}
          <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
            <Text className="text-lg font-semibold text-foreground">Riddle:</Text>
            <Text className="text-base text-foreground leading-relaxed">
              {currentPuzzle.riddle}
            </Text>
          </View>

          {/* Hint Button */}
          {!hintUsed && !isSubmitted && (
            <TouchableOpacity
              onPress={() => setHintUsed(true)}
              className="bg-warning rounded-xl p-3 items-center"
            >
              <Text className="text-sm font-semibold text-white">💡 Show Hint</Text>
            </TouchableOpacity>
          )}

          {/* Hint Display */}
          {hintUsed && (
            <View className="bg-warning bg-opacity-10 border border-warning rounded-xl p-4">
              <Text className="text-sm text-warning font-semibold">Hint:</Text>
              <Text className="text-sm text-warning mt-1">{currentPuzzle.hint}</Text>
            </View>
          )}

          {/* Input */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-muted">Your Answer</Text>
            <TextInput
              value={userAnswer}
              onChangeText={setUserAnswer}
              placeholder="Enter your answer"
              placeholderTextColor="#9CA3AF"
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
                  ? `✓ Correct! Answer: ${currentPuzzle.answer}`
                  : `✗ Incorrect. Answer: ${currentPuzzle.answer}`}
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
                ? currentIndex === puzzles.length - 1
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
