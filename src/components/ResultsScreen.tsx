import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw } from "lucide-react";

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const ResultsScreen = ({ score, totalQuestions, onRestart }: ResultsScreenProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getMessage = () => {
    if (percentage === 100) return "Perfect! You're a fraction master! 🎉";
    if (percentage >= 80) return "Excellent work! Keep it up! 🌟";
    if (percentage >= 60) return "Good job! Practice makes perfect! 👏";
    return "Keep learning! You'll get better! 💪";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-card rounded-3xl shadow-2xl p-12 text-center">
        <div className="mb-8">
          <Trophy className="w-24 h-24 mx-auto text-accent mb-4" />
          <h1 className="text-4xl font-bold mb-4">Quiz Complete!</h1>
          <p className="text-xl text-muted-foreground">{getMessage()}</p>
        </div>

        <div className="bg-secondary rounded-2xl p-8 mb-8">
          <div className="text-6xl font-bold text-primary mb-2">
            {score}/{totalQuestions}
          </div>
          <div className="text-2xl text-muted-foreground">
            Score: {percentage}%
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-left bg-muted/50 p-6 rounded-xl">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Correct Answers</div>
              <div className="text-3xl font-bold text-success">{score}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Incorrect Answers</div>
              <div className="text-3xl font-bold text-destructive">{totalQuestions - score}</div>
            </div>
          </div>
        </div>

        <Button
          onClick={onRestart}
          size="lg"
          className="mt-8 rounded-full bg-accent hover:bg-accent/90 text-lg px-8"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Try Again
        </Button>
      </div>
    </div>
  );
};
