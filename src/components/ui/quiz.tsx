import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Question } from '@/app/types'

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
  const [showFinishConfirmation, setShowFinishConfirmation] = useState(false)

  const handleNext = () => {
    if (currentQuestionIndex === totalQuestions - 1) {
      setShowFinishConfirmation(true)
    } else {
      onNext()
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Questão {currentQuestionIndex + 1}</CardTitle>
        <div className="text-xs text-muted-foreground">ID: {question.id}</div>
        <Progress value={((currentQuestionIndex + 1) / totalQuestions) * 100} className="w-full bg-[#1D2C40]" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-lg font-light">
          {documentToReactComponents(question.body)}
        </div>
        <RadioGroup onValueChange={onAnswer} value={selectedAnswer} className="space-y-2">
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2 border border-gray-300 rounded-md p-2">
              <RadioGroupItem value={option.id} id={`option-${option.id}`} />
              <Label htmlFor={`option-${option.id}`}>{option.text}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={onPrevious} disabled={currentQuestionIndex === 0} className="bg-[#F2A649] hover:bg-[#1D2C40] text-white">
          <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
        </Button>
        <Button onClick={handleNext} disabled={!selectedAnswer} className="bg-[#25B8D9] hover:bg-[#1D2C40] text-white">
          {currentQuestionIndex === totalQuestions - 1 ? 'Finalizar' : 'Próxima'} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>

      <Dialog open={showFinishConfirmation} onOpenChange={setShowFinishConfirmation}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Finalizar o Quiz</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja finalizar o quiz? Você não poderá voltar para revisar suas respostas.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowFinishConfirmation(false)}>Cancelar</Button>
            <Button onClick={onFinish}>Finalizar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}