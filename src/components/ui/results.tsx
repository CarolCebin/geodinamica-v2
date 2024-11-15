import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ResultsProps {
  correctAnswers: number;
  totalQuestions: number;
  onReviewQuiz: () => void;
}

export function Results({ correctAnswers, totalQuestions, onReviewQuiz }: ResultsProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Resultados do Quiz</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-lg font-medium">
            Você acertou {correctAnswers} de {totalQuestions} questões!
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onReviewQuiz} className="w-full bg-[#25B8D9] hover:bg-[#1D2C40] text-white">
          Revisar Quiz
        </Button>
      </CardFooter>
    </Card>
  )
}