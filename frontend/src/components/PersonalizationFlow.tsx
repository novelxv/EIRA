import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  ArrowRight, 
  Brain, 
  Shield,
  Users,
  CheckCircle,
  Star,
  Rocket,
  Lightbulb
} from 'lucide-react'

// Types
type UserPersona = 'beginner' | 'curious' | 'professional' | 'creator'

interface UserProfile {
  name: string
  persona: UserPersona
  completedAt: string
  progress: {
    ai101: number
    aiSimulator: number
    contentDetector: number
    promptEvaluator: number
  }
}

interface Question {
  id: string
  scenario: string
  question: string
  options: {
    text: string
    value: string
    persona: UserPersona[]
  }[]
}

const questions: Question[] = [
  {
    id: 'q1',
    scenario: 'You see a friend using ChatGPT to complete college assignments',
    question: 'Your first reaction is...',
    options: [
      {
        text: 'Wow cool! But is this safe to use?',
        value: 'curious_safe',
        persona: ['beginner']
      },
      {
        text: 'Interesting! How does it work?',
        value: 'want_to_learn',
        persona: ['curious']
      },
      {
        text: 'Hmm, does this violate academic rules?',
        value: 'ethical_concern',
        persona: ['professional']
      },
      {
        text: 'Cool! I want to try it for creative projects too',
        value: 'creative_use',
        persona: ['creator']
      }
    ]
  },
  {
    id: 'q2',
    scenario: 'You see AI artwork that closely resembles a famous artist\'s style',
    question: 'Your opinion about this situation...',
    options: [
      {
        text: 'Wow nice! But does the original artist know about this?',
        value: 'impressed_concerned',
        persona: ['beginner']
      },
      {
        text: 'Curious how AI can mimic styles like that',
        value: 'technical_curiosity',
        persona: ['curious']
      },
      {
        text: 'This is a serious copyright and ethics issue',
        value: 'legal_ethical',
        persona: ['professional']
      },
      {
        text: 'Inspiring! But there should be clear boundaries',
        value: 'creative_boundaries',
        persona: ['creator']
      }
    ]
  },
  {
    id: 'q3',
    scenario: 'A company announces a new AI that is "smarter than humans"',
    question: 'Your feelings about this news...',
    options: [
      {
        text: 'Amazed but also a bit worried',
        value: 'amazed_worried',
        persona: ['beginner']
      },
      {
        text: 'Excited! Want to know its capabilities and limitations',
        value: 'excited_analytical',
        persona: ['curious']
      },
      {
        text: 'Skeptical. Need data and independent evaluation',
        value: 'skeptical_analytical',
        persona: ['professional']
      },
      {
        text: 'Interested in creative collaboration potential',
        value: 'collaborative_creative',
        persona: ['creator']
      }
    ]
  }
]

const personaProfiles = {
  beginner: {
    title: 'Brave Beginner',
    subtitle: 'Wise Explorer',
    description: 'You have great curiosity about AI, but also good awareness about the importance of learning safely. Perfect!',
    icon: <Rocket className="h-8 w-8" />,
    color: 'from-green-400 to-emerald-500',
    traits: ['Open to learning', 'Critical thinking', 'Safety-conscious', 'Willing to ask questions'],
    recommendation: 'EIRA will guide you step-by-step from basic concepts to practical applications!'
  },
  curious: {
    title: 'Young Researcher',
    subtitle: 'Knowledge Hunter',
    description: 'You are the type of person who always wants to know "how" and "why". Your curiosity is a great asset!',
    icon: <Brain className="h-8 w-8" />,
    color: 'from-blue-400 to-indigo-500',
    traits: ['Analytical', 'Likes to experiment', 'Detail-oriented', 'Problem solver'],
    recommendation: 'Perfect for more technical modules and hands-on learning!'
  },
  professional: {
    title: 'Ethics Guardian',
    subtitle: 'Responsible Leader',
    description: 'You have mature perspective on technology impact. Leadership mindset that is much needed!',
    icon: <Shield className="h-8 w-8" />,
    color: 'from-purple-400 to-violet-500',
    traits: ['Systems thinking', 'Ethical', 'Long-term thinking', 'Risk aware'],
    recommendation: 'Focus on policy, ethics, and strategic implications of AI!'
  },
  creator: {
    title: 'Creative Innovator',
    subtitle: 'Creative Collaborator',
    description: 'You see AI as a creative collaboration tool. Balance between innovation and responsibility!',
    icon: <Star className="h-8 w-8" />,
    color: 'from-pink-400 to-rose-500',
    traits: ['Imaginative', 'Collaborative', 'Boundary-aware', 'Innovation-focused'],
    recommendation: 'Explore AI tools, creative workflows, and ethical creation practices!'
  }
}

interface PersonalizationFlowProps {
  onComplete: (profile: UserProfile) => void
  onSkip: () => void
}

const PersonalizationFlow = ({ onComplete, onSkip }: PersonalizationFlowProps) => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'name' | 'pretest' | 'result'>('welcome')
  const [userName, setUserName] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  // Calculate persona based on answers
  const calculatePersona = (): UserPersona => {
    const personaScores: Record<UserPersona, number> = {
      beginner: 0,
      curious: 0,
      professional: 0,
      creator: 0
    }

    answers.forEach((answer, index) => {
      const question = questions[index]
      const selectedOption = question.options.find(opt => opt.value === answer)
      if (selectedOption) {
        selectedOption.persona.forEach(persona => {
          personaScores[persona]++
        })
      }
    })

    // Find persona with highest score
    const topPersona = Object.entries(personaScores).reduce((a, b) => 
      personaScores[a[0] as UserPersona] > personaScores[b[0] as UserPersona] ? a : b
    )[0] as UserPersona

    return topPersona
  }

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      // Move to result
      setTimeout(() => {
        setCurrentStep('result')
      }, 500)
    }
  }

  const handleComplete = () => {
    const persona = calculatePersona()
    const profile: UserProfile = {
      name: userName || 'AI Explorer',
      persona,
      completedAt: new Date().toISOString(),
      progress: {
        ai101: 0,
        aiSimulator: 0,
        contentDetector: 0,
        promptEvaluator: 0
      }
    }

    // Save to localStorage
    localStorage.setItem('eira_user_profile', JSON.stringify(profile))
    localStorage.setItem('eira_personalization_completed', 'true')
    
    onComplete(profile)
  }

  const currentPersona = currentStep === 'result' ? calculatePersona() : 'beginner'
  const personaData = personaProfiles[currentPersona]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Welcome Screen */}
          {currentStep === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-8"
              >
                <Sparkles className="h-10 w-10 text-white" />
              </motion.div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Welcome to <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">EIRA</span>
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Let's personalize your AI learning experience!<br />
                <span className="text-slate-400 text-lg">Just 2 minutes for perfect setup ✨</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep('name')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  <Rocket className="h-5 w-5" />
                  Start Learning Adventure
                  <ArrowRight className="h-5 w-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSkip}
                  className="px-6 py-4 border border-slate-600 text-slate-300 rounded-xl font-medium hover:bg-slate-800 transition-all"
                >
                  Skip for now
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Name Input */}
          {currentStep === 'name' && (
            <motion.div
              key="name"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-8">
                <Users className="h-8 w-8 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">
                Can we get acquainted first? 👋
              </h2>

              <p className="text-slate-300 mb-8">
                We'll customize the experience according to your preferences
              </p>

              <div className="mb-8">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your name or nickname..."
                  className="w-full max-w-sm mx-auto px-6 py-4 bg-slate-800 border border-slate-600 text-white rounded-xl text-center text-lg focus:outline-none focus:border-purple-400 transition-all"
                  autoFocus
                />
              </div>

              <p className="text-xs text-neutral-500">The more detailed, the more personal guidance you'll get</p>

              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep('pretest')}
                  disabled={!userName.trim()}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Continue
                  <ArrowRight className="h-5 w-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep('welcome')}
                  className="px-6 py-3 border border-slate-600 text-slate-300 rounded-xl font-medium hover:bg-slate-800 transition-all"
                >
                  Back
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Pre-test Questions */}
          {currentStep === 'pretest' && (
            <motion.div
              key="pretest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: isAnimating ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isAnimating ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-8">
                    <div className="text-4xl mb-4 text-white">{questions[currentQuestion].scenario}</div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {questions[currentQuestion].question}
                    </h3>
                    <p className="text-slate-400">Choose the answer that best fits you</p>
                  </div>

                  <div className="space-y-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={option.value}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswerSelect(option.value)}
                        className="w-full p-6 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-purple-400 rounded-xl text-left transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white group-hover:text-purple-300 transition-colors">
                            {option.text}
                          </span>
                          <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-purple-400 transition-colors" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {/* Result Screen */}
          {currentStep === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                className={`mx-auto w-24 h-24 bg-gradient-to-br ${personaData.color} rounded-full flex items-center justify-center mb-8`}
              >
                {personaData.icon}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-4xl font-bold text-white mb-2">
                  Hi {userName}! 👋
                </h2>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  You are a "{personaData.title}"
                </h3>
                <p className="text-lg text-slate-300 mb-6">
                  {personaData.subtitle}
                </p>

                <div className="bg-slate-800 border border-slate-600 rounded-xl p-6 mb-6 text-left">
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    {personaData.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2">Your Strengths:</h4>
                    <div className="flex flex-wrap gap-2">
                      {personaData.traits.map((trait, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-purple-300 font-semibold mb-1">EIRA Recommendation:</h4>
                        <p className="text-slate-300 text-sm">
                          {personaData.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleComplete}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 mx-auto hover:shadow-lg transition-all"
                >
                  <CheckCircle className="h-5 w-5" />
                  Enter My Dashboard
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default PersonalizationFlow
export type { UserProfile, UserPersona }
