"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function Quiz({ question, questionIndex, totalQuestions, handleAnswer }: any) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Question {questionIndex + 1}</CardTitle>
        <Progress value={((questionIndex + 1) / totalQuestions) * 100} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium">{question.text}</p>
        {question.image && (
          <Image
            src={question.image}
            alt="Question illustration"
            width={300}
            height={200}
            className="mx-auto rounded-lg"
          />
        )}
        <RadioGroup onValueChange={handleAnswer} className="space-y-2">
          {question.options.map((option: any, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
