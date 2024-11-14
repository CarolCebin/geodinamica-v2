"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CategorySelection({ categories, startQuiz }: any) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {categories.map((category: any) => (
        <Card key={category.id} className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>{category.name}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => startQuiz(category.id)}>Start Quiz</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
