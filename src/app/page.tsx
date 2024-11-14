"use client"

import { useState, useEffect } from "react";
import HeaderComponent from "@/components/ui/header"
import FooterComponent from "@/components/ui/footer"
import CategorySelectionComponent from "@/components/ui/categorySelection"
import QuizComponent from "@/components/ui/quiz"
import ResultsComponent from "@/components/ui/results"
import ReviewComponent from "@/components/ui/review"
import { questions } from "@/data/mockData"

const Header = HeaderComponent
const Footer = FooterComponent
const CategorySelection = CategorySelectionComponent
const Quiz = QuizComponent
const Results = ResultsComponent
const Review = ReviewComponent

export default function GeodynamicsPlatform() {
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [stage, setStage] = useState("category");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [answers, setAnswers] = useState<any>({})
  const [quizQuestions, setQuizQuestions] = useState<any>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}&content_type=categories`
        )
        const data = await response.json()
        const items = data.items
  
        function extractDescription(richText: any): string {
          let description = ""
  
          if (richText && richText.content) {
            richText.content.forEach((node: any) => {
              if (node.nodeType === "paragraph" && node.content) {
                node.content.forEach((childNode: any) => {
                  if (childNode.nodeType === "text") {
                    description += childNode.value
                  }
                })
              }
            })
          }
  
          return description
        }
  
        const categories = items.map((item: any) => {
          return {
            id: item.sys.id, // Usando o item.sys.id como ID
            name: item.fields.categoryName,
            description: extractDescription(item.fields.categoryDescription),
          }
        })
  
        setCategories(categories)
      } catch (error) {
        console.error("Erro ao buscar categorias:", error)
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchCategories()
  }, [])

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
