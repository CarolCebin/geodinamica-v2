import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Question } from '@/app/types'

interface ReviewProps {
  questions: Question[];
  answers: Record<string, string>;
  onBackToCategories: () => void;
}

export function Review({ questions, answers, onBackToCategories }: ReviewProps) {
  const renderQuestionBody = (body: string | { content: Array<{ nodeType: string; content?: Array<{ value: string }> }> }) => {
    if (typeof body === 'string') {
      return <p>{body}</p>
    } else if (body && typeof body === 'object' && Array.isArray(body.content)) {
      return body.content.map((item, index) => {
        if (item.nodeType === 'paragraph' && item.content && item.content[0]) {
          return <p key={index}>{item.content[0].value}</p>
        }
        return null
      })
    }
    return <p>Unable to display question content.</p>
  }

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <Card key={question.id}>
          <CardHeader>
            <CardTitle>Questão {index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="font-medium">
              {renderQuestionBody(question.body)}
            </div>
            <p>Sua resposta: {question.options.find(opt => opt.id === answers[question.id])?.text || 'Não respondida'}</p>
            <p className={answers[question.id] === question.correctOptionId ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
              Resposta correta: {question.options.find(opt => opt.id === question.correctOptionId)?.text}
            </p>
            {answers[question.id] !== question.correctOptionId && (
              <div className="mt-2 p-2 bg-yellow-100 rounded">
                <p className="font-semibold">Explicação:</p>
                <p>{question.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      <Button onClick={onBackToCategories} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
        Voltar para Categorias
      </Button>
    </div>
  )
}