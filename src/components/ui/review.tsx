import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Question } from '@/app/types'

interface ReviewProps {
  questions: Question[];
  answers: Record<string, string>;
  onBackToCategories: () => void;
}

export function Review({ questions, answers, onBackToCategories }: ReviewProps) {
  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <Card key={question.id}>
          <CardHeader>
            <CardTitle>Questão {index + 1}</CardTitle>
            <div className="text-xs text-muted-foreground">ID: {question.id}</div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="font-medium">
              {documentToReactComponents(question.body)}
            </div>
            <p>Sua resposta: {question.options.find(opt => opt.id === answers[question.id])?.text}</p>
            <p className={answers[question.id] === question.correctOptionId ? "text-[#25B8D9] font-semibold" : "text-[#D93030] font-semibold"}>
              Resposta correta: {question.options.find(opt => opt.id === question.correctOptionId)?.text}
            </p>
            {answers[question.id] !== question.correctOptionId && <p className="italic">{question.explanation}</p>}
          </CardContent>
        </Card>
      ))}
      <Button onClick={onBackToCategories} className="w-full bg-[#25B8D9] hover:bg-[#1D2C40] text-white">
        Voltar para Categorias
      </Button>
    </div>
  )
}