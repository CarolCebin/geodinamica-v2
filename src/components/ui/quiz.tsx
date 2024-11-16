import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Question } from '@/app/types';
import { ExternalLink } from 'lucide-react';

// Importe as bibliotecas do Contentful
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

interface QuizProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
  assets: any[]; // Adicione esta linha para receber os ativos
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
  assets, // Receba os ativos como prop
}: QuizProps) {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Configurações para renderizar o rich text
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return <p>{children}</p>;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const assetId = node.data.target.sys.id;
        const asset = assets.find((a: any) => a.sys.id === assetId);

        if (asset) {
          const { url } = asset.fields.file;
          const description = asset.fields.description || asset.fields.title;

          return (
            <img
              key={assetId}
              src={url}
              alt={description || 'Imagem'}
              className="my-4"
            />
          );
        } else {
          return (
            <p className="my-4 text-red-500">Imagem não encontrada.</p>
          );
        }
      },
      [INLINES.HYPERLINK]: (node: any, children: any) => {
        const url = node.data.uri;
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            {children}
            <ExternalLink className="h-3 w-3" />
          </a>
        );
      },
      // Adicione outros renderizadores de nó conforme necessário
    },
  };

  const renderQuestionBody = (body: any) => {
    return documentToReactComponents(body, options);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle>Questão {currentQuestionIndex + 1} de {totalQuestions}</CardTitle>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}% completo
          </span>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {renderQuestionBody(question.body)}
        </div>
        <RadioGroup
          value={selectedAnswer || ''}
          onValueChange={onAnswer}
          className="space-y-3"
        >
          {question.options.map((option) => (
            <div
              key={option.id}
              className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${selectedAnswer === option.id ? 'bg-muted' : 'hover:bg-muted/50'
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
          onClick={currentQuestionIndex === totalQuestions - 1 ? onFinish : onNext}
          disabled={!selectedAnswer}
        >
          {currentQuestionIndex === totalQuestions - 1 ? 'Finalizar' : 'Próxima'}
        </Button>
      </CardFooter>
    </Card>
  );
}
