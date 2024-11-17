// components/ui/quiz.tsx

import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Question, Asset } from '@/app/types';
import { renderRichText } from '@/lib/utils'; // Ajuste o caminho conforme necessário

interface QuizProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
  assets: Asset[];
}

export function Quiz({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  onPrevious,
  onNext,
  onFinish,
  assets,
}: QuizProps) {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle>
            Questão {currentQuestionIndex + 1} de {totalQuestions}
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}% completo
          </span>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className="prose prose-slate dark:prose-invert max-w-none"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {renderRichText(question.body, assets)}
        </div>
        <RadioGroup
          value={selectedAnswer || ''}
          onValueChange={onAnswer}
          className="space-y-3"
        >
          {question.options.map((option) => (
            <div
              key={option.id}
              className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${selectedAnswer === option.id
                  ? 'bg-muted'
                  : 'hover:bg-muted/50'
                }`}
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <Label
                htmlFor={option.id}
                className="flex-grow cursor-pointer text-base"
              >
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0}
        >
          Anterior
        </Button>
        <Button
          onClick={
            currentQuestionIndex === totalQuestions - 1 ? onFinish : onNext
          }
          disabled={!selectedAnswer}
        >
          {currentQuestionIndex === totalQuestions - 1
            ? 'Finalizar'
            : 'Próxima'}
        </Button>
      </CardFooter>
    </Card>
  );
}
