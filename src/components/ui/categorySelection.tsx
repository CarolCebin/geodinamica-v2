import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Category } from '@/app/types'

interface CategorySelectionProps {
  categories: Category[];
  onStartQuiz: (categoryId: string) => void;
}

export function CategorySelection({ categories, onStartQuiz }: CategorySelectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  if (categories.length === 0) {
    return <p className="text-center">Carregando categorias...</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Card key={category.id} className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>{category.name}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => setSelectedCategory(category)} 
                  className="w-full bg-[#25B8D9] hover:bg-[#1D2C40] text-white"
                >
                  Iniciar Quiz
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Iniciar Quiz: {selectedCategory?.name}</DialogTitle>
                  <DialogDescription>
                    Você está pronto para começar o quiz sobre {selectedCategory?.name}?
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setSelectedCategory(null)}>Cancelar</Button>
                  <Button onClick={() => onStartQuiz(selectedCategory!.id)}>Começar</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}