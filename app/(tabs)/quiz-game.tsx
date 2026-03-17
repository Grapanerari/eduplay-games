import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { AnswerButton } from "@/components/answer-button";
import { ProgressBar } from "@/components/progress-bar";
import { getRandomQuizzes, type QuizQuestion } from "@/data/quiz-data";
import { useGame } from "@/lib/game-context";
import { useSoundEffects } from "@/components/sound-effects";

export default function QuizGameScreen() {
  const router = useRouter();
  const { addPoints, updateQuizScore } = useGame();
  const { playSuccessFeedback, playErrorFeedback } = useSoundEffects();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    const quizzes = getRandomQuizzes(10);
    setQuestions(quizzes);
  }, []);

  if (questions.length === 0) {
    return (
      <ScreenContainer className="p-6 items-center justify-center">
        <Text className="text-xl text-foreground">Loading...</Text>
      </ScreenContainer>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleSelectAnswer = (index: number) => {
    if (!isSubmitted) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null) return;
    setIsSubmitted(true);

    if (isCorrect) {
      setScore(score + 10);
      await playSuccessFeedback();
    } else {
      await playErrorFeedback();
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    const finalScore = isCorrect && !isSubmitted ? score + 10 : score;
    addPoints(finalScore);
    updateQuizScore(finalScore);
    setGameFinished(true);
  };

  if (gameFinished) {
    return (
      <ScreenContainer className="p-6">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 items-center justify-center gap-6">
            <Text className="text-5xl">🎉</Text>
            <Text className="text-3xl font-bold text-foreground">Quiz Complete!</Text>

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
                onPress={() => router.push("/(tabs)/quiz")}
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
                Question {currentIndex + 1}/{questions.length}
              </Text>
              <Text className="text-sm font-semibold text-primary">{score} pts</Text>
            </View>
            <ProgressBar
              current={currentIndex + 1}
              total={questions.length}
              color="#6366F1"
            />
          </View>

          {/* Question */}
          <View className="gap-4">
            <Text className="text-2xl font-bold text-foreground leading-relaxed">
              {currentQuestion.question}
            </Text>
          </View>

          {/* Answers */}
          <View className="gap-3">
            {currentQuestion.options.map((option, index) => (
              <AnswerButton
                key={index}
                label={String.fromCharCode(65 + index)}
                option={option}
                isSelected={selectedAnswer === index}
                isCorrect={index === currentQuestion.correctAnswer}
                isSubmitted={isSubmitted}
                onPress={() => handleSelectAnswer(index)}
              />
            ))}
          </View>

          {/* Feedback */}
          {isSubmitted && (
            <View
              className={`rounded-xl p-4 ${
                isCorrect ? "bg-success" : "bg-error"
              } items-center`}
            >
              <Text className="text-base font-semibold text-white">
                {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
              </Text>
            </View>
          )}

          {/* Button */}
          <TouchableOpacity
            onPress={isSubmitted ? handleNext : handleSubmit}
            disabled={selectedAnswer === null && !isSubmitted}
            className={`rounded-xl p-4 items-center ${
              selectedAnswer === null && !isSubmitted
                ? "bg-gray-300"
                : "bg-primary"
            }`}
          >
            <Text className="text-base font-semibold text-white">
              {isSubmitted
                ? currentIndex === questions.length - 1
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
