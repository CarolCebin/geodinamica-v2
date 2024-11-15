import { Category, Question } from './types'

interface ContentfulResponse {
  items: any[];
  includes?: {
    Entry: any[];
  };
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    console.log('Fetching categories...')
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(
      'https://cdn.contentful.com/spaces/o2kemh1ir3sz/environments/master/entries?access_token=DFAi_mmqjK_EDdH82ttAv_xe_z-VOWJAqHEyNy7L96w&content_type=categories',
      { signal: controller.signal }
    )
    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: ContentfulResponse = await response.json()
    console.log('Raw categories data:', JSON.stringify(data, null, 2))
    
    if (!data.items || !Array.isArray(data.items)) {
      console.error('Unexpected data structure:', data)
      return []
    }
    
    const categories = data.items.map((item: any) => ({
      id: item.sys.id,
      name: item.fields.categoryName,
      description: item.fields.categoryDescription?.content?.[0]?.content?.[0]?.value || 'No description available'
    }))
    console.log('Processed categories:', categories)
    return categories
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching categories:', error.message)
    } else {
      console.error('Unknown error fetching categories')
    }
    throw error
  }
}

export async function fetchQuestions(categoryId: string): Promise<Question[]> {
  try {
    console.log(`Fetching questions for category ${categoryId}...`)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(
      `https://cdn.contentful.com/spaces/o2kemh1ir3sz/environments/master/entries?access_token=DFAi_mmqjK_EDdH82ttAv_xe_z-VOWJAqHEyNy7L96w&content_type=questions&fields.question_category.sys.id=${categoryId}&include=2`,
      { signal: controller.signal }
    )
    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: ContentfulResponse = await response.json()
    console.log('Raw questions data:', JSON.stringify(data, null, 2))

    if (!data.items || !Array.isArray(data.items)) {
      console.error('Unexpected data structure:', data)
      return []
    }

    const questions = data.items.map((item: any) => {
      const options = item.fields.question_options.map((optionLink: any) => {
        const optionEntry = data.includes?.Entry.find((entry: any) => entry.sys.id === optionLink.sys.id)
        return {
          id: optionEntry.sys.id,
          text: optionEntry.fields.option?.content?.[0]?.content?.[0]?.value || 'No option text available'
        }
      })
      return {
        id: item.sys.id,
        text: item.fields.question,
        body: item.fields.question_body,
        options: options,
        correctOptionId: item.fields.correct_option.sys.id,
        explanation: item.fields.explanationAnswer?.content?.[0]?.content?.[0]?.value || 'No explanation available'
      }
    })
    console.log('Processed questions:', questions)
    return questions
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching questions:', error.message)
    } else {
      console.error('Unknown error fetching questions')
    }
    throw error
  }
}