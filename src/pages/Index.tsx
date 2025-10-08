import { useState } from "react";
import { QuizQuestion } from "@/components/QuizQuestion";
import { ResultsScreen } from "@/components/ResultsScreen";
import { Button } from "@/components/ui/button";

const QUESTIONS = [
  {
    id: 1,
    numerator1: 2,
    denominator1: 3,
    numerator2: 1,
    denominator2: 3,
    operation: "+" as const,
    correctNumerator: 3,
    correctDenominator: 3,
  },
  {
    id: 2,
    numerator1: 3,
    denominator1: 7,
    numerator2: 1,
    denominator2: 7,
    operation: "+" as const,
    correctNumerator: 4,
    correctDenominator: 7,
  },
  {
    id: 3,
    numerator1: 1,
    denominator1: 3,
    numerator2: 0,
    denominator2: 3,
    operation: "-" as const,
    correctNumerator: 1,
    correctDenominator: 3,
  },
];

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [started, setStarted] = useState(false);

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setStarted(false);
  };

  if (showResults) {
    return (
      <ResultsScreen
        score={score}
        totalQuestions={QUESTIONS.length}
        onRestart={handleRestart}
      />
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-card rounded-3xl shadow-2xl p-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Math Learning Game
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Learn fractions through interactive games and activities!
          </p>
          <p className="text-lg text-muted-foreground mb-12">
            Perfect for grades 4-7 students
          </p>
          
          <div className="bg-secondary/50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Today's Topic: Fractions</h2>
            <p className="text-muted-foreground mb-6">
              You'll learn how to add and subtract fractions with visual aids and interactive quizzes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <div className="bg-background px-4 py-2 rounded-lg">
                ✓ Visual Learning
              </div>
              <div className="bg-background px-4 py-2 rounded-lg">
                ✓ Interactive Exercises
              </div>
              <div className="bg-background px-4 py-2 rounded-lg">
                ✓ Instant Feedback
              </div>
              <div className="bg-background px-4 py-2 rounded-lg">
                ✓ Hints Available
              </div>
            </div>
          </div>

          <Button
            onClick={() => setStarted(true)}
            size="lg"
            className="rounded-full bg-accent hover:bg-accent/90 text-xl px-12 py-6 h-auto"
          >
            Start Learning! 🚀
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <QuizQuestion
        question={QUESTIONS[currentQuestion]}
        questionNumber={currentQuestion + 1}
        totalQuestions={QUESTIONS.length}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    </div>
  );
};

export default Index;
