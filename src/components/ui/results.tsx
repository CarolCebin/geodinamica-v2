"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

export default function Results({ results, totalQuestions, onReview }: any) {
  const data = [
    { name: "Correct", value: results.correct },
    { name: "Incorrect", value: results.incorrect },
  ]
  const COLORS = ["#4CAF50", "#F44336"]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Quiz Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center">
          <p className="text-lg font-medium">
            You got {results.correct} out of {totalQuestions} questions correct!
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onReview} className="w-full">
          Review Quiz
        </Button>
      </CardFooter>
    </Card>
  )
}
