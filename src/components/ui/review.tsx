"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Review({ quizQuestions, answers, onBackToCategories }: any) {
  return (
    <div className="space-y-4">
      {quizQuestions.map((question: any, index: number) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>Question {index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-medium">{question.text}</p>
            <p>Your answer: {answers[index]}</p>
            <p className={answers[index] === question.correctAnswer ? "text-green-600" : "text-red-600"}>
              Correct answer: {question.correctAnswer}
            </p>
            {answers[index] !== question.correctAnswer && <p className="italic">{question.explanation}</p>}
          </CardContent>
        </Card>
      ))}
      <Button onClick={onBackToCategories} className="w-full">
        Back to Categories
      </Button>
    </div>
  )
}
