import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const questionSchema = z.object({
  numerator1: z.number().min(0).max(100),
  denominator1: z.number().min(1).max(100),
  numerator2: z.number().min(0).max(100),
  denominator2: z.number().min(1).max(100),
  operation: z.enum(["+", "-"]),
});

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

interface AddQuestionFormProps {
  onAddQuestion: (question: Question) => void;
  customQuestions: Question[];
  onRemoveQuestion: (id: number) => void;
}

export const AddQuestionForm = ({
  onAddQuestion,
  customQuestions,
  onRemoveQuestion,
}: AddQuestionFormProps) => {
  const [numerator1, setNumerator1] = useState("");
  const [denominator1, setDenominator1] = useState("");
  const [numerator2, setNumerator2] = useState("");
  const [denominator2, setDenominator2] = useState("");
  const [operation, setOperation] = useState<"+" | "-">("+");
  const { toast } = useToast();

  const calculateAnswer = (
    num1: number,
    den1: number,
    num2: number,
    den2: number,
    op: "+" | "-"
  ) => {
    if (den1 !== den2) {
      return null; // Only same denominator for now
    }
    
    const resultNumerator = op === "+" ? num1 + num2 : num1 - num2;
    return {
      numerator: resultNumerator,
      denominator: den1,
    };
  };

  const handleAddQuestion = () => {
    try {
      const num1 = parseInt(numerator1);
      const den1 = parseInt(denominator1);
      const num2 = parseInt(numerator2);
      const den2 = parseInt(denominator2);

      // Validate inputs
      const validationResult = questionSchema.safeParse({
        numerator1: num1,
        denominator1: den1,
        numerator2: num2,
        denominator2: den2,
        operation,
      });

      if (!validationResult.success) {
        toast({
          title: "Invalid Input",
          description: "Please enter valid numbers between 0-100 for numerators and 1-100 for denominators.",
          variant: "destructive",
        });
        return;
      }

      // Check if denominators are same
      if (den1 !== den2) {
        toast({
          title: "Different Denominators",
          description: "For now, please use fractions with the same denominator.",
          variant: "destructive",
        });
        return;
      }

      // Check for negative results in subtraction
      if (operation === "-" && num1 < num2) {
        toast({
          title: "Negative Result",
          description: "Please ensure the first fraction is larger for subtraction.",
          variant: "destructive",
        });
        return;
      }

      const answer = calculateAnswer(num1, den1, num2, den2, operation);
      
      if (!answer) {
        toast({
          title: "Error",
          description: "Could not calculate answer. Please check your inputs.",
          variant: "destructive",
        });
        return;
      }

      const newQuestion: Question = {
        id: Date.now(),
        numerator1: num1,
        denominator1: den1,
        numerator2: num2,
        denominator2: den2,
        operation,
        correctNumerator: answer.numerator,
        correctDenominator: answer.denominator,
      };

      onAddQuestion(newQuestion);

      // Clear form
      setNumerator1("");
      setDenominator1("");
      setNumerator2("");
      setDenominator2("");

      toast({
        title: "Question Added!",
        description: "Your custom question has been added successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Please enter valid numbers.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6">Create Your Own Question</h2>
        
        <div className="flex flex-wrap items-end gap-4 mb-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="num1">Numerator 1</Label>
            <Input
              id="num1"
              type="number"
              value={numerator1}
              onChange={(e) => setNumerator1(e.target.value)}
              className="w-24"
              placeholder="2"
              min="0"
              max="100"
            />
          </div>

          <div className="text-2xl font-bold mb-2">/</div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="den1">Denominator 1</Label>
            <Input
              id="den1"
              type="number"
              value={denominator1}
              onChange={(e) => setDenominator1(e.target.value)}
              className="w-24"
              placeholder="3"
              min="1"
              max="100"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="operation">Operation</Label>
            <select
              id="operation"
              value={operation}
              onChange={(e) => setOperation(e.target.value as "+" | "-")}
              className="w-20 h-10 rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="num2">Numerator 2</Label>
            <Input
              id="num2"
              type="number"
              value={numerator2}
              onChange={(e) => setNumerator2(e.target.value)}
              className="w-24"
              placeholder="1"
              min="0"
              max="100"
            />
          </div>

          <div className="text-2xl font-bold mb-2">/</div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="den2">Denominator 2</Label>
            <Input
              id="den2"
              type="number"
              value={denominator2}
              onChange={(e) => setDenominator2(e.target.value)}
              className="w-24"
              placeholder="3"
              min="1"
              max="100"
            />
          </div>

          <Button
            onClick={handleAddQuestion}
            disabled={!numerator1 || !denominator1 || !numerator2 || !denominator2}
            className="bg-accent hover:bg-accent/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Note: Both fractions must have the same denominator. For subtraction, the first fraction should be larger.
        </p>
      </Card>

      {customQuestions.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">
            Your Custom Questions ({customQuestions.length})
          </h3>
          <div className="space-y-3">
            {customQuestions.map((q) => (
              <div
                key={q.id}
                className="flex items-center justify-between bg-secondary p-4 rounded-lg"
              >
                <div className="text-lg font-semibold">
                  {q.numerator1}/{q.denominator1} {q.operation} {q.numerator2}/{q.denominator2} = {q.correctNumerator}/{q.correctDenominator}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveQuestion(q.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
