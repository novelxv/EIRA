import { useState, useEffect } from 'react'
import { getIcon, IconName } from '../utils/iconMap'
import modulesData from '../data/ai-literacy-modules.json'

// Interface untuk data dari JSON
export interface JsonQuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  scenario?: string
}

export interface JsonConceptCard {
  id: number
  keySentence: string
  analogy: string
  iconName: IconName
  colorScheme: string
}

export interface JsonLearningModule {
  id: number
  title: string
  iconName: IconName
  description: string
  videoUrl: string
  conceptCards: JsonConceptCard[]
  quiz: JsonQuizQuestion[]
}

// Interface untuk komponen (dengan React components)
export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  scenario?: string
}

export interface ConceptCard {
  id: number
  keySentence: string
  analogy: string
  icon: React.ReactNode
  color: string
}

export interface LearningModule {
  id: number
  title: string
  icon: React.ReactNode
  description: string
  videoUrl: string
  conceptCards: ConceptCard[]
  quiz: QuizQuestion[]
}

// Helper function untuk convert JSON data ke component-ready data
const transformModule = (jsonModule: JsonLearningModule): LearningModule => {
  return {
    ...jsonModule,
    icon: getIcon(jsonModule.iconName, "h-6 w-6"),
    conceptCards: jsonModule.conceptCards.map(card => ({
      ...card,
      icon: getIcon(card.iconName, "h-12 w-12"),
      color: card.colorScheme
    })),
    quiz: jsonModule.quiz // Quiz tidak perlu transform
  }
}

// Custom hook untuk load dan transform data
export const useAILiteracyModules = () => {
  const [modules, setModules] = useState<LearningModule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Transform JSON data ke format yang dibutuhkan komponen
      const jsonData = modulesData as { modules: JsonLearningModule[] }
      const transformedModules = jsonData.modules.map(transformModule)
      setModules(transformedModules)
      setLoading(false)
    } catch (err) {
      setError('Failed to load modules data')
      setLoading(false)
    }
  }, [])

  return { modules, loading, error }
}
