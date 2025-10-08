import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FractionCircle } from "./FractionCircle";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuizQuestionProps {
  question: {
    id: number;
    numerator1: number;
    denominator1: number;
    numerator2: number;
    denominator2: number;
    operation: "+" | "-";
    correctNumerator: number;
    correctDenominator: number;
  };
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}

export const QuizQuestion = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
}: QuizQuestionProps) => {
  const [numeratorAnswer, setNumeratorAnswer] = useState("");
  const [denominatorAnswer, setDenominatorAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleCheckAnswer = () => {
    const numCorrect = parseInt(numeratorAnswer) === question.correctNumerator;
    const denCorrect = parseInt(denominatorAnswer) === question.correctDenominator;
    const correct = numCorrect && denCorrect;
    
    setIsCorrect(correct);
    setShowFeedback(true);
    onAnswer(correct);
  };

  const handleNext = () => {
    setNumeratorAnswer("");
    setDenominatorAnswer("");
    setShowFeedback(false);
    setShowHint(false);
    onNext();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Dark section */}
      <div className="bg-dark-section text-dark-section-foreground py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Visualizing Operations</h2>
        
        <div className="flex items-center justify-center gap-8 flex-wrap">
          <div className="bg-secondary/10 p-6 rounded-2xl">
            <FractionCircle
              numerator={question.numerator1}
              denominator={question.denominator1}
              size={140}
            />
          </div>
          
          <div className="text-6xl font-bold">{question.operation}</div>
          
          <div className="bg-secondary/10 p-6 rounded-2xl">
            <FractionCircle
              numerator={question.numerator2}
              denominator={question.denominator2}
              size={140}
            />
          </div>
          
          <div className="text-6xl font-bold">=</div>
          
          <div className="bg-secondary/10 p-6 rounded-2xl">
            <FractionCircle
              numerator={showFeedback ? question.correctNumerator : 0}
              denominator={question.correctDenominator}
              size={140}
              filled={showFeedback}
            />
          </div>
        </div>
      </div>

      {/* Light section */}
      <div className="bg-background py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">
            Fraction {question.operation === "+" ? "Addition" : "Subtraction"} Quiz
          </h3>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-4xl font-bold">
              {question.numerator1}
              <div className="border-t-4 border-foreground my-1"></div>
              {question.denominator1}
            </div>
            
            <div className="text-4xl font-bold">{question.operation}</div>
            
            <div className="text-4xl font-bold">
              {question.numerator2}
              <div className="border-t-4 border-foreground my-1"></div>
              {question.denominator2}
            </div>
            
            <div className="text-4xl font-bold">=</div>
            
            <div className="flex flex-col gap-2">
              <Input
                type="number"
                value={numeratorAnswer}
                onChange={(e) => setNumeratorAnswer(e.target.value)}
                className="w-24 h-14 text-center text-2xl font-bold"
                placeholder="?"
                disabled={showFeedback}
              />
              <div className="border-t-4 border-foreground"></div>
              <Input
                type="number"
                value={denominatorAnswer}
                onChange={(e) => setDenominatorAnswer(e.target.value)}
                className="w-24 h-14 text-center text-2xl font-bold"
                placeholder="?"
                disabled={showFeedback}
              />
            </div>
          </div>

          {showFeedback && (
            <div className={`flex items-center justify-center gap-2 mb-6 text-lg font-semibold ${
              isCorrect ? "text-success" : "text-destructive"
            }`}>
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6" />
                  <span>Try again! The answer is {question.correctNumerator}/{question.correctDenominator}</span>
                </>
              )}
            </div>
          )}

          {showHint && !showFeedback && (
            <div className="bg-secondary p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground">
                <strong>Hint:</strong> When adding or subtracting fractions with the same denominator, 
                keep the denominator and {question.operation === "+" ? "add" : "subtract"} the numerators!
              </p>
            </div>
          )}

          <div className="flex gap-4 justify-center items-center">
            {!showFeedback && (
              <>
                <Button
                  onClick={() => setShowHint(true)}
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                >
                  Get Hint
                </Button>
                <Button
                  onClick={handleCheckAnswer}
                  disabled={!numeratorAnswer || !denominatorAnswer}
                  size="lg"
                  className="rounded-full bg-primary hover:bg-primary/90"
                >
                  ✓ Check Answer
                </Button>
              </>
            )}
            
            {showFeedback && questionNumber < totalQuestions && (
              <Button
                onClick={handleNext}
                size="lg"
                className="rounded-full bg-accent hover:bg-accent/90"
              >
                Next Question →
              </Button>
            )}
          </div>

          <div className="text-center mt-8 text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </div>
        </div>
      </div>
    </div>
  );
};
