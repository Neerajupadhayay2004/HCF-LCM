import { useState } from "react";
import { QuizQuestion } from "@/components/QuizQuestion";
import { ResultsScreen } from "@/components/ResultsScreen";
import { AddQuestionForm } from "@/components/AddQuestionForm";
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
  {
    id: 4,
    numerator1: 4,
    denominator1: 5,
    numerator2: 1,
    denominator2: 5,
    operation: "+" as const,
    correctNumerator: 5,
    correctDenominator: 5,
  },
  {
    id: 5,
    numerator1: 5,
    denominator1: 8,
    numerator2: 2,
    denominator2: 8,
    operation: "+" as const,
    correctNumerator: 7,
    correctDenominator: 8,
  },
  {
    id: 6,
    numerator1: 7,
    denominator1: 9,
    numerator2: 1,
    denominator2: 9,
    operation: "-" as const,
    correctNumerator: 6,
    correctDenominator: 9,
  },
  {
    id: 7,
    numerator1: 3,
    denominator1: 4,
    numerator2: 1,
    denominator2: 4,
    operation: "+" as const,
    correctNumerator: 4,
    correctDenominator: 4,
  },
  {
    id: 8,
    numerator1: 5,
    denominator1: 6,
    numerator2: 1,
    denominator2: 6,
    operation: "-" as const,
    correctNumerator: 4,
    correctDenominator: 6,
  },
  {
    id: 9,
    numerator1: 2,
    denominator1: 5,
    numerator2: 2,
    denominator2: 5,
    operation: "+" as const,
    correctNumerator: 4,
    correctDenominator: 5,
  },
  {
    id: 10,
    numerator1: 8,
    denominator1: 10,
    numerator2: 3,
    denominator2: 10,
    operation: "-" as const,
    correctNumerator: 5,
    correctDenominator: 10,
  },
  {
    id: 11,
    numerator1: 1,
    denominator1: 2,
    numerator2: 1,
    denominator2: 2,
    operation: "+" as const,
    correctNumerator: 2,
    correctDenominator: 2,
  },
  {
    id: 12,
    numerator1: 6,
    denominator1: 7,
    numerator2: 2,
    denominator2: 7,
    operation: "-" as const,
    correctNumerator: 4,
    correctDenominator: 7,
  },
  {
    id: 13,
    numerator1: 3,
    denominator1: 8,
    numerator2: 4,
    denominator2: 8,
    operation: "+" as const,
    correctNumerator: 7,
    correctDenominator: 8,
  },
  {
    id: 14,
    numerator1: 9,
    denominator1: 11,
    numerator2: 2,
    denominator2: 11,
    operation: "-" as const,
    correctNumerator: 7,
    correctDenominator: 11,
  },
  {
    id: 15,
    numerator1: 4,
    denominator1: 9,
    numerator2: 3,
    denominator2: 9,
    operation: "+" as const,
    correctNumerator: 7,
    correctDenominator: 9,
  },
];

interface Question {
  id: number;
  numerator1: number;
  denominator1: number;
  numerator2: number;
  denominator2: number;
  operation: "+" | "-";
  correctNumerator: number;
  correctDenominator: number;
}

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [started, setStarted] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);
  const [useCustomQuestions, setUseCustomQuestions] = useState(false);

  const activeQuestions = useCustomQuestions && customQuestions.length > 0 
    ? customQuestions 
    : QUESTIONS;

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
    setShowAddQuestion(false);
  };

  const handleAddQuestion = (question: Question) => {
    setCustomQuestions([...customQuestions, question]);
  };

  const handleRemoveQuestion = (id: number) => {
    setCustomQuestions(customQuestions.filter(q => q.id !== id));
  };

  const handleStartQuiz = (useCustom: boolean) => {
    if (useCustom && customQuestions.length === 0) {
      return;
    }
    setUseCustomQuestions(useCustom);
    setStarted(true);
    setShowAddQuestion(false);
  };

  if (showResults) {
    return (
      <ResultsScreen
        score={score}
        totalQuestions={activeQuestions.length}
        onRestart={handleRestart}
      />
    );
  }

  if (showAddQuestion) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto mb-6 px-6">
          <Button
            variant="outline"
            onClick={() => setShowAddQuestion(false)}
            className="mb-4"
          >
            ← Back
          </Button>
        </div>
        <AddQuestionForm
          onAddQuestion={handleAddQuestion}
          customQuestions={customQuestions}
          onRemoveQuestion={handleRemoveQuestion}
        />
        {customQuestions.length > 0 && (
          <div className="max-w-4xl mx-auto px-6 mt-6">
            <Button
              onClick={() => handleStartQuiz(true)}
              size="lg"
              className="w-full rounded-full bg-accent hover:bg-accent/90"
            >
              Start Quiz with My Questions ({customQuestions.length} questions)
            </Button>
          </div>
        )}
      </div>
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => handleStartQuiz(false)}
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto"
            >
              Start with Default Questions
            </Button>
            <Button
              onClick={() => setShowAddQuestion(true)}
              size="lg"
              variant="outline"
              className="rounded-full text-lg px-8 py-6 h-auto border-2"
            >
              Create My Own Questions ✏️
            </Button>
          </div>
          
          {customQuestions.length > 0 && (
            <div className="mt-6">
              <Button
                onClick={() => handleStartQuiz(true)}
                size="lg"
                className="rounded-full bg-accent hover:bg-accent/90 text-lg px-8 py-6 h-auto"
              >
                Start with My Questions ({customQuestions.length})
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <QuizQuestion
        question={activeQuestions[currentQuestion]}
        questionNumber={currentQuestion + 1}
        totalQuestions={activeQuestions.length}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    </div>
  );
};

export default Index;
