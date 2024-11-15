import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Question } from '@/app/types'
import { ExternalLink } from 'lucide-react'

interface QuizProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export function Quiz({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  onPrevious,
  onNext,
  onFinish
}: QuizProps) {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  const renderQuestionBody = (body: any) => {
    if (typeof body === 'string') {
      // Split the text by sections that might contain links
      const parts = body.split(/($$acesso em:[^)]+$$)/)
      
      return parts.map((part, index) => {
        // Check if this part is a link reference
        if (part.startsWith('(acesso em:')) {
          const urlMatch = part.match(/https?:\/\/[^\s)]+/)
          if (urlMatch) {
            const url = urlMatch[0]
            return (
              <span key={index} className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                (acesso em:{' '}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  {url}
                  <ExternalLink className="h-3 w-3" />
                </a>
                )
              </span>
            )
          }
        }
        // Regular text
        return <span key={index}>{part}</span>
      })
    } else if (body && typeof body === 'object' && body.content) {
      return body.content.map((item: any, index: number) => {
        if (item.nodeType === 'paragraph') {
          const text = item.content?.[0]?.value || ''
          // Apply the same link processing to rich text content
          return <p key={index} className="mb-4">{renderQuestionBody(text)}</p>
        }
        return null
      })
    }
    return <p>Error: Unable to display question content.</p>
  }

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
              className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${
                selectedAnswer === option.id ? 'bg-muted' : 'hover:bg-muted/50'
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
  )
}