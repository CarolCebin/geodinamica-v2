"use client"

import { useState } from "react"
import HeaderComponent from "@/components/ui/header"
import FooterComponent from "@/components/ui/footer"
import CategorySelectionComponent from "@/components/ui/categorySelection"
import QuizComponent from "@/components/ui/quiz"
import ResultsComponent from "@/components/ui/results"
import ReviewComponent from "@/components/ui/review"
import { categories, questions } from "@/data/mockData"

const Header = HeaderComponent
const Footer = FooterComponent
const CategorySelection = CategorySelectionComponent
const Quiz = QuizComponent
const Results = ResultsComponent
const Review = ReviewComponent

export default function GeodynamicsPlatform() {
  const [stage, setStage] = useState<any>("category")
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [answers, setAnswers] = useState<any>({})
  const [quizQuestions, setQuizQuestions] = useState<any>([])

  const startQuiz = (categoryId: any) => {
    const categoryQuestions = questions.filter((q) => q.category === categoryId)
    const randomQuestions = categoryQuestions.sort(() => 0.5 - Math.random()).slice(0, 10)
    setQuizQuestions(randomQuestions)
    setSelectedCategory(categoryId)
    setStage("quiz")
    setCurrentQuestionIndex(0)
    setAnswers({})
  }

  const handleAnswer = (answer: any) => {
    setAnswers({ ...answers, [currentQuestionIndex]: answer })
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setStage("results")
    }
  }

  const calculateResults = () => {
    let correct = 0
    quizQuestions.forEach((q: any, index: number) => {
      if (answers[index] === q.correctAnswer) correct++
    })
    return { correct, incorrect: quizQuestions.length - correct }
  }

  const renderContent = () => {
    switch (stage) {
      case "category":
        return <CategorySelection categories={categories} startQuiz={startQuiz} />
      case "quiz":
        const question = quizQuestions[currentQuestionIndex]
        return (
          <Quiz
            question={question}
            questionIndex={currentQuestionIndex}
            totalQuestions={quizQuestions.length}
            handleAnswer={handleAnswer}
          />
        )
      case "results":
        const resultsData = calculateResults()
        return (
          <Results
            results={resultsData}
            totalQuestions={quizQuestions.length}
            onReview={() => setStage("review")}
          />
        )
      case "review":
        return (
          <Review
            quizQuestions={quizQuestions}
            answers={answers}
            onBackToCategories={() => setStage("category")}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to Geodynamics</h1>
        {renderContent()}
      </main>
      <Footer />
    </div>
  )
}
