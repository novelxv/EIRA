import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  ArrowLeft,
  Lightbulb,
  HelpCircle,
  Video,
  PlayCircle,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Trophy,
  Brain,
  FileText,
  Home
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAILiteracyModules } from '../../hooks/useAILiteracyModules'
import type { LearningModule } from '../../hooks/useAILiteracyModules'

type WizardStep = 'selection' | 'video' | 'flashcards' | 'quiz' | 'completion'

const AILiteracyWizard = () => {
  // Load modules from JSON
  const { modules, loading, error } = useAILiteracyModules()
  
  // ALL HOOKS MUST BE DEFINED FIRST - Rules of Hooks
  // Wizard state
  const [currentStep, setCurrentStep] = useState<WizardStep>('selection')
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null)
  const [moduleProgress, setModuleProgress] = useState<{[key: number]: boolean}>({})
  
  // Learning state
  const [currentCard, setCurrentCard] = useState(0)
  const [cardProgress, setCardProgress] = useState<boolean[]>([])
  
  // Quiz state
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState<number[]>([])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI Literacy modules...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="text-red-500 mb-4">
            <HelpCircle className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Content</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const startModule = (module: LearningModule) => {
    setSelectedModule(module)
    setCurrentStep('video') // Mulai dengan video
    setCurrentCard(0)
    setCardProgress(new Array(module.conceptCards.length).fill(false))
  }

  // Navigation functions
  const goToFlashcards = () => {
    setCurrentStep('flashcards')
    setCurrentCard(0)
  }

  const goToQuiz = () => {
    setCurrentStep('quiz')
    setCurrentQuiz(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const completeCard = (cardIndex: number) => {
    const newProgress = [...cardProgress]
    newProgress[cardIndex] = true
    setCardProgress(newProgress)
  }

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    setUserAnswers([...userAnswers, answerIndex])
    
    if (answerIndex === selectedModule!.quiz[currentQuiz].correct) {
      setQuizScore(prev => prev + 1)
    }
  }

  const completeModule = () => {
    if (selectedModule) {
      setModuleProgress({
        ...moduleProgress,
        [selectedModule.id]: true
      })
    }
    setCurrentStep('completion')
  }

  const resetWizard = () => {
    setCurrentStep('selection')
    setSelectedModule(null)
    setCurrentCard(0)
    setCardProgress([])
    setCurrentQuiz(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setQuizScore(0)
    setUserAnswers([])
  }

  const getCompletedModules = () => {
    return Object.keys(moduleProgress).filter(id => moduleProgress[parseInt(id)]).length
  }

  // Module Selection Step
  if (currentStep === 'selection') {
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='1'%3E%3Cpolygon fill='%23000' points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4 mr-2" />
              AI Literacy Journey
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Start Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Literacy</span> Journey
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Choose a learning module you want to explore. Each module is designed to provide deep understanding through a step-by-step approach.
            </p>
            
            {/* Progress Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto mb-8">
              <h3 className="font-semibold text-neutral-900 mb-3">Learning Progress</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-600">Completed Modules</span>
                <span className="text-sm font-medium text-blue-600">{getCompletedModules()}/{modules.length}</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(getCompletedModules() / modules.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          {/* Module Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 group border border-white/50"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white relative">
                  {moduleProgress[module.id] && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="h-6 w-6 text-green-300" />
                    </div>
                  )}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      {module.icon}
                    </div>
                    <h3 className="text-xl font-bold">{module.title}</h3>
                  </div>
                  <p className="opacity-90 text-sm">{module.description}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-sm text-neutral-600">
                      <Video className="h-4 w-4 mr-2 text-blue-500" />
                      <span>Interactive learning video</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-600">
                      <BookOpen className="h-4 w-4 mr-2 text-green-500" />
                      <span>{module.conceptCards.length} concept analogy cards</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-600">
                      <HelpCircle className="h-4 w-4 mr-2 text-purple-500" />
                      <span>{module.quiz.length} real-world scenario quiz</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-600">
                      <CheckCircle className="h-4 w-4 mr-2 text-orange-500" />
                      <span>~{(module.conceptCards.length * 2) + (module.quiz.length * 1.5)} minutes</span>
                    </div>
                  </div>

                  <button
                    onClick={() => startModule(module)}
                    className={`w-full font-medium py-3 px-6 rounded-lg transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center space-x-2 ${
                      moduleProgress[module.id]
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    }`}
                  >
                    {moduleProgress[module.id] ? (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        <span>Retake Module</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle className="h-5 w-5" />
                        <span>Start Learning</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-12 text-center">
            <Link
              to="/ai101"
              className="inline-flex items-center text-neutral-600 hover:text-blue-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to AI 101
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Video Step (Halaman 1: Tonton)
  if (currentStep === 'video' && selectedModule) {
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.01]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-neutral-900">
                📺 Watch & Understand
              </h1>
              <button
                onClick={() => setCurrentStep('selection')}
                className="text-neutral-500 hover:text-neutral-700 flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </button>
            </div>
            
            <div className="text-lg text-neutral-600 mb-4">
              <strong>{selectedModule.title}</strong>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center text-blue-600">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">1</div>
                <span className="font-semibold">Watch</span>
              </div>
              <div className="flex-1 h-1 bg-neutral-200 rounded"></div>
              <div className="flex items-center text-neutral-400">
                <div className="w-8 h-8 bg-neutral-200 text-neutral-400 rounded-full flex items-center justify-center text-sm font-bold mr-2">2</div>
                <span>Understand</span>
              </div>
              <div className="flex-1 h-1 bg-neutral-200 rounded"></div>
              <div className="flex items-center text-neutral-400">
                <div className="w-8 h-8 bg-neutral-200 text-neutral-400 rounded-full flex items-center justify-center text-sm font-bold mr-2">3</div>
                <span>Test</span>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.08)] overflow-hidden mb-8 border border-white/50">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
              <h2 className="text-xl font-bold flex items-center">
                <Video className="h-5 w-5 mr-2" />
                Learning Video
              </h2>
            </div>
            <div className="p-8">
              <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PlayCircle className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-600 text-lg font-medium">Learning video will be available soon</p>
                  <p className="text-sm text-neutral-500 mt-2">Meanwhile, let's continue to interactive flashcards</p>
                </div>
              </div>
              
              {/* Module Description */}
              <div className="mt-8 text-center">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  What will you learn?
                </h3>
                <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                  {selectedModule.description}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep('selection')}
              className="flex items-center px-6 py-3 text-neutral-600 hover:text-neutral-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Choose Another Module
            </button>
            
            <button
              onClick={goToFlashcards}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Continue to Flashcards
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Flashcards Step (Halaman 2: Pahami)  
  if (currentStep === 'flashcards' && selectedModule) {
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-purple-50 via-white to-pink-50 relative">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.01]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Crect x='38' y='38' width='4' height='4'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-neutral-900">
                🧠 Understand with Analogies
              </h1>
              <button
                onClick={() => setCurrentStep('video')}
                className="text-neutral-500 hover:text-neutral-700 flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Video
              </button>
            </div>
            
            <div className="text-lg text-neutral-600 mb-4">
              <strong>{selectedModule.title}</strong>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center text-green-600">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-2">✓</div>
                <span className="font-medium">Watch</span>
              </div>
              <div className="flex-1 h-1 bg-green-200 rounded"></div>
              <div className="flex items-center text-purple-600">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">2</div>
                <span className="font-semibold">Understand</span>
              </div>
              <div className="flex-1 h-1 bg-neutral-200 rounded"></div>
              <div className="flex items-center text-neutral-400">
                <div className="w-8 h-8 bg-neutral-200 text-neutral-400 rounded-full flex items-center justify-center text-sm font-bold mr-2">3</div>
                <span>Test</span>
              </div>
            </div>

            {/* Card Progress */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-neutral-600">
                Card {currentCard + 1} of {selectedModule.conceptCards.length}
              </div>
            </div>
            
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentCard + 1) / selectedModule.conceptCards.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Concept Card */}
          <div className="bg-gradient-to-b from-white to-gray-50 rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.12)] transition-all duration-300">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
              <h2 className="text-xl font-bold flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                Interactive Learning Card
              </h2>
            </div>
            
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center"
                >
                  {/* Icon */}
                  <div className={`w-24 h-24 bg-gradient-to-r ${selectedModule.conceptCards[currentCard].color} rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg`}>
                    {selectedModule.conceptCards[currentCard].icon}
                  </div>

                  {/* Key Sentence */}
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 leading-relaxed whitespace-pre-line">
                    {selectedModule.conceptCards[currentCard].keySentence}
                  </h3>

                  {/* Analogy */}
                  <div className="relative bg-blue-50 border-2 border-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 p-[1px] rounded-lg mb-8">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-900 mb-3 flex items-center justify-center">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Simple Analogy
                      </h4>
                      <p className="text-gray-600 text-lg leading-relaxed font-normal">
                        {selectedModule.conceptCards[currentCard].analogy}
                      </p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setCurrentCard(Math.max(0, currentCard - 1))}
                      disabled={currentCard === 0}
                      className="flex items-center space-x-2 px-4 py-2 text-neutral-600 hover:text-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </button>

                    {currentCard < selectedModule.conceptCards.length - 1 ? (
                      <button
                        onClick={() => {
                          completeCard(currentCard)
                          setCurrentCard(currentCard + 1)
                        }}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                      >
                        <span>Continue to Next Card</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          completeCard(currentCard)
                          goToQuiz()
                        }}
                        className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                      >
                        <span>Continue to Comprehension Quiz</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Quiz Step
  if (currentStep === 'quiz' && selectedModule) {
    const currentQuestion = selectedModule.quiz[currentQuiz]
    
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-green-50 via-white to-blue-50 relative">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.01]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M40 0l4 20 20-4-4 20 20 4-20 4 4 20-20-4-4 20-4-20-20 4 4-20-20-4 20-4-4-20 20 4z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-neutral-900">
                ❓ Test Understanding
              </h1>
              <button
                onClick={() => setCurrentStep('flashcards')}
                className="text-neutral-500 hover:text-neutral-700 flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Flashcards
              </button>
            </div>
            
            <div className="text-lg text-neutral-600 mb-4">
              <strong>{selectedModule.title}</strong>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center text-green-600">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-2">✓</div>
                <span className="font-medium">Watch</span>
              </div>
              <div className="flex-1 h-1 bg-green-200 rounded"></div>
              <div className="flex items-center text-green-600">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-2">✓</div>
                <span className="font-medium">Understand</span>
              </div>
              <div className="flex-1 h-1 bg-green-200 rounded"></div>
              <div className="flex items-center text-blue-600">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">3</div>
                <span className="font-semibold">Test</span>
              </div>
            </div>

            {/* Quiz Progress */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-neutral-600">
                Question {currentQuiz + 1} of {selectedModule.quiz.length}
              </div>
            </div>
            
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuiz + 1) / selectedModule.quiz.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Quiz Content */}
          <div className="bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden border border-white/50">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 text-white">
              <h2 className="text-xl font-bold flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                Comprehension Quiz: Real-World Scenarios
              </h2>
            </div>
            
            <div className="p-8">
              {/* Scenario */}
              {currentQuestion.scenario && (
                <div className="relative bg-blue-50 border-2 border-transparent bg-gradient-to-r from-blue-200 via-green-200 to-blue-200 p-[1px] rounded-lg mb-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-900 mb-3">📱 Scenario:</h3>
                    <p className="text-blue-800 leading-relaxed">{currentQuestion.scenario}</p>
                  </div>
                </div>
              )}

              {/* Question */}
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                {currentQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={showExplanation}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedAnswer === index
                        ? index === currentQuestion.correct
                          ? 'bg-green-50 border-green-300 text-green-800'
                          : 'bg-red-50 border-red-300 text-red-800'
                        : showExplanation
                          ? index === currentQuestion.correct
                            ? 'bg-green-50 border-green-300 text-green-800'
                            : 'bg-neutral-50 border-neutral-200 text-neutral-600'
                          : 'bg-white border-neutral-200 hover:border-green-300 hover:bg-green-50'
                    } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          selectedAnswer === index
                            ? index === currentQuestion.correct
                              ? 'bg-green-200 text-green-800'
                              : 'bg-red-200 text-red-800'
                            : showExplanation && index === currentQuestion.correct
                              ? 'bg-green-200 text-green-800'
                              : 'bg-neutral-200 text-neutral-600'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>
                      {showExplanation && index === currentQuestion.correct && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 mb-6"
                >
                  <h4 className="font-semibold text-neutral-900 mb-3 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                    Explanation:
                  </h4>
                  <p className="text-neutral-700 leading-relaxed">{currentQuestion.explanation}</p>
                </motion.div>
              )}

              {/* Navigation */}
              {showExplanation && (
                <div className="flex justify-between items-center">
                  <div className="text-sm text-neutral-600">
                    Score: {quizScore}/{currentQuiz + 1}
                  </div>
                  
                  {currentQuiz < selectedModule.quiz.length - 1 ? (
                    <button
                      onClick={() => {
                        setCurrentQuiz(currentQuiz + 1)
                        setSelectedAnswer(null)
                        setShowExplanation(false)
                      }}
                      className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                    >
                      <span>Next Question</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={completeModule}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                    >
                      <Trophy className="h-4 w-4" />
                      <span>Complete Module</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Completion Step
  if (currentStep === 'completion' && selectedModule) {
    const finalScore = quizScore
    const totalQuestions = selectedModule.quiz.length
    const scorePercentage = (finalScore / totalQuestions) * 100
    
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-green-50 via-purple-50 to-blue-50 relative">
        {/* Celebration background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cstar cx='60' cy='60' r='20' fill='%23FFD700'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="h-12 w-12 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-neutral-900 mb-6">
              🎉 Congratulations! Module Completed
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8">
              You have successfully completed the "{selectedModule.title}" module!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Score Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">Learning Results</h2>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{finalScore}/{totalQuestions}</div>
                <div className="text-neutral-600 mb-4">Comprehension Quiz Score</div>
                <div className="w-full bg-neutral-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${scorePercentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-neutral-600 mb-4">
                  {scorePercentage >= 80 ? '🌟 Excellent! Very good understanding' :
                   scorePercentage >= 60 ? '👍 Good Job! Quite good understanding' :
                   '💪 Keep Learning! Let\'s improve understanding'}
                </div>
                
                {/* Detail breakdown */}
                <div className="text-xs text-neutral-500 space-y-1">
                  <div>Correct Answers: {finalScore} of {totalQuestions} questions</div>
                  <div>Accuracy Rate: {Math.round(scorePercentage)}%</div>
                </div>
              </div>
            </div>

            {/* Achievement Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">What You Have Learned</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-600 text-sm">Understanding basic concepts through interactive analogy cards</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-600 text-sm">Applying understanding in real-world scenarios</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-600 text-sm">Gaining structured learning experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">Next Steps</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                to="/ai101/comparison"
                className="block p-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors duration-200 text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <div className="font-semibold text-blue-900 mb-1">Platform Comparison</div>
                <div className="text-blue-700 text-sm">Compare various AI platforms</div>
              </Link>
              
              <Link 
                to="/prompt-evaluator"
                className="block p-4 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors duration-200 text-center"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div className="font-semibold text-purple-900 mb-1">Prompt Evaluator</div>
                <div className="text-purple-700 text-sm">Practice prompting skills</div>
              </Link>
              
              <Link 
                to="/content-detector"
                className="block p-4 rounded-lg border border-green-200 hover:bg-green-50 transition-colors duration-200 text-center"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <HelpCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="font-semibold text-green-900 mb-1">Content Detector</div>
                <div className="text-green-700 text-sm">Detect AI-generated content</div>
              </Link>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetWizard}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Home className="h-5 w-5" />
              <span>Choose Another Module</span>
            </button>
            
            <Link
              to="/ai101"
              className="bg-white border border-neutral-200 text-neutral-700 font-medium px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-md flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to AI 101</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default AILiteracyWizard
