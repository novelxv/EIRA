import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  BookOpen, 
  BarChart3, 
  FileText, 
  Eye, 
  ArrowRight,
  Lightbulb,
  Shield,
  Lock,
  Star,
  Brain,
  Rocket,
  Settings,
  LogOut
} from 'lucide-react'
import type { UserProfile, UserPersona } from './PersonalizationFlow'

interface PersonalizedDashboardProps {
  userProfile: UserProfile
  onResetPersonalization: () => void
}

interface FeatureCard {
  icon: JSX.Element
  title: string
  description: string
  href: string
  color: string
  highlights: string[]
  isLocked: boolean
  lockReason?: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  recommendedFor: UserPersona[]
  progress?: number
}

const PersonalizedDashboard = ({ userProfile, onResetPersonalization }: PersonalizedDashboardProps) => {
  const [features, setFeatures] = useState<FeatureCard[]>([])

  useEffect(() => {
    // Define all features with personalization data
    const allFeatures: FeatureCard[] = [
      {
        icon: <BookOpen className="h-8 w-8" />,
        title: "AI Literacy",
        description: "Pelajari konsep AI dengan pendekatan step-by-step yang interaktif. Setiap modul dipecah menjadi video, kartu analogi, dan kuis skenario dunia nyata.",
        href: "/ai101/literacy",
        color: "from-blue-500 to-cyan-500",
        highlights: ["Wizard Learning Flow", "Interactive Analogy Cards", "Real-World Quiz", "Step Completion"],
        isLocked: false,
        difficulty: 'beginner',
        recommendedFor: ['beginner', 'curious', 'professional', 'creator'],
        progress: userProfile.progress.ai101
      },
      {
        icon: <BarChart3 className="h-8 w-8" />,
        title: "AI Platform Comparison",
        description: "Compare ChatGPT, Gemini, Claude, and other AI platforms in terms of capabilities, speed, and limitations",
        href: "/ai101/comparison",
        color: "from-purple-500 to-pink-500",
        highlights: ["Interactive Table", "Benchmarks", "Pros & Cons", "Recommendations"],
        isLocked: userProfile.persona === 'beginner' && userProfile.progress.ai101 < 30,
        lockReason: "Selesaikan dulu 30% AI Literacy untuk membuka modul ini",
        difficulty: 'intermediate',
        recommendedFor: ['curious', 'professional', 'creator']
      },
      {
        icon: <FileText className="h-8 w-8" />,
        title: "AI Ethics & Policy Explainer",
        description: "Simulasi interaktif 'Choose Your Own Adventure' - jadilah pemimpin inovasi yang harus membuat keputusan strategis berdasarkan Strategi AI Nasional Indonesia.",
        href: "/ai101/policy",
        color: "from-green-500 to-teal-500",
        highlights: ["Interactive Simulation", "Real Dilemmas", "Policy-Based", "Leadership Skills"],
        isLocked: userProfile.persona === 'beginner' && userProfile.progress.ai101 < 50,
        lockReason: "Pahami dulu dasar AI sebelum mengeksplorasi etika kepemimpinan",
        difficulty: 'advanced',
        recommendedFor: ['professional', 'creator', 'curious']
      },
      {
        icon: <Eye className="h-8 w-8" />,
        title: "AI Watch",
        description: "Critical analysis of AI usage trends and issues in Indonesia with real case studies and learning",
        href: "/ai101/watch",
        color: "from-orange-500 to-red-500",
        highlights: ["Trend Analysis", "Case Studies", "Critical Thinking", "Real Examples"],
        isLocked: userProfile.persona === 'beginner' && userProfile.progress.ai101 < 70,
        lockReason: "Modul advanced - buka setelah menguasai konsep dasar",
        difficulty: 'advanced',
        recommendedFor: ['professional', 'curious']
      }
    ]

    // Sort features based on persona
    const sortedFeatures = allFeatures.sort((a, b) => {
      const aRecommended = a.recommendedFor.includes(userProfile.persona)
      const bRecommended = b.recommendedFor.includes(userProfile.persona)
      
      if (aRecommended && !bRecommended) return -1
      if (!aRecommended && bRecommended) return 1
      
      // If both or neither recommended, sort by difficulty for beginners
      if (userProfile.persona === 'beginner') {
        const difficultyOrder = { 'beginner': 0, 'intermediate': 1, 'advanced': 2 }
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      }
      
      return 0
    })

    setFeatures(sortedFeatures)
  }, [userProfile])

  const getPersonaIcon = (persona: UserPersona) => {
    switch (persona) {
      case 'beginner': return <Rocket className="h-5 w-5" />
      case 'curious': return <Brain className="h-5 w-5" />
      case 'professional': return <Shield className="h-5 w-5" />
      case 'creator': return <Star className="h-5 w-5" />
    }
  }

  const getPersonaColor = (persona: UserPersona) => {
    switch (persona) {
      case 'beginner': return 'from-green-400 to-emerald-500'
      case 'curious': return 'from-blue-400 to-indigo-500'
      case 'professional': return 'from-purple-400 to-violet-500'
      case 'creator': return 'from-pink-400 to-rose-500'
    }
  }

  const getPersonaTitle = (persona: UserPersona) => {
    switch (persona) {
      case 'beginner': return 'Pemula Pemberani'
      case 'curious': return 'Peneliti Muda'
      case 'professional': return 'Guardian Etika'
      case 'creator': return 'Inovator Kreatif'
    }
  }

  const getWelcomeMessage = (persona: UserPersona) => {
    switch (persona) {
      case 'beginner': 
        return 'Selamat datang! Mari mulai perjalanan AI Anda step by step. Kami sudah menyiapkan jalur pembelajaran yang aman dan menyenangkan.'
      case 'curious': 
        return 'Ready to dive deep? Kami tahu Anda suka mengeksplorasi. Semua tools dan experiment space sudah disiapkan!'
      case 'professional': 
        return 'Welcome, leader! Focus Anda pada ethics dan policy sangat dibutuhkan. Mari explore strategic implications dari AI.'
      case 'creator': 
        return 'Time to create magic! Balance antara innovation dan responsibility akan menjadi superpower Anda.'
    }
  }

  return (
    <div className="min-h-screen pt-8 bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Personalized Header */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`w-16 h-16 bg-gradient-to-br ${getPersonaColor(userProfile.persona)} rounded-full flex items-center justify-center text-white`}
              >
                {getPersonaIcon(userProfile.persona)}
              </motion.div>
              
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900">
                  Selamat datang kembali, {userProfile.name}! 👋
                </h1>
                <p className="text-lg text-neutral-600">
                  {getPersonaTitle(userProfile.persona)} • Dashboard Dipersonalisasi
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onResetPersonalization}
                className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                title="Reset Personalisasi"
              >
                <Settings className="h-5 w-5 text-slate-600" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  localStorage.removeItem('eira_user_profile')
                  localStorage.removeItem('eira_personalization_completed')
                  window.location.reload()
                }}
                className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                title="Logout"
              >
                <LogOut className="h-5 w-5 text-slate-600" />
              </motion.button>
            </div>
          </div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur border border-slate-200 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Lightbulb className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Pesan Khusus untuk Anda</h3>
                <p className="text-neutral-600 leading-relaxed">
                  {getWelcomeMessage(userProfile.persona)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Personalized Features Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Modul yang Dipersonalisasi untuk Anda
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Setiap modul telah disesuaikan dengan learning style dan goals Anda sebagai {getPersonaTitle(userProfile.persona)}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const isRecommended = feature.recommendedFor.includes(userProfile.persona)
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl border transition-all hover:shadow-lg group ${
                    feature.isLocked 
                      ? 'border-slate-200 opacity-75' 
                      : isRecommended 
                        ? 'border-purple-200 shadow-md' 
                        : 'border-slate-200'
                  }`}
                >
                  {/* Recommended Badge */}
                  {isRecommended && !feature.isLocked && (
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full">
                      ⭐ Recommended for You
                    </div>
                  )}

                  {/* Lock Overlay */}
                  {feature.isLocked && (
                    <div className="absolute inset-0 bg-slate-50/90 rounded-2xl flex items-center justify-center z-10">
                      <div className="text-center">
                        <Lock className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                        <p className="text-slate-600 font-medium mb-1">Modul Terkunci</p>
                        <p className="text-sm text-slate-500 max-w-xs">
                          {feature.lockReason}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Progress Bar for unlocked modules */}
                    {!feature.isLocked && feature.progress !== undefined && feature.progress > 0 && (
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-slate-600 mb-2">
                          <span>Progress</span>
                          <span>{feature.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r ${feature.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${feature.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color}`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {/* Difficulty Badge */}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          feature.difficulty === 'beginner' 
                            ? 'bg-green-100 text-green-700'
                            : feature.difficulty === 'intermediate'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        }`}>
                          {feature.difficulty === 'beginner' ? 'Pemula' : 
                           feature.difficulty === 'intermediate' ? 'Menengah' : 'Lanjutan'}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {feature.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {!feature.isLocked ? (
                      <Link
                        to={feature.href}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neutral-900 to-neutral-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all group-hover:gap-3"
                      >
                        {feature.progress && feature.progress > 0 ? 'Lanjutkan' : 'Mulai Belajar'}
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-300 text-slate-500 rounded-xl font-semibold cursor-not-allowed"
                      >
                        <Lock className="h-5 w-5" />
                        Terkunci
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Progress Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-white rounded-2xl border border-slate-200 p-8"
          >
            <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              Progress Overview
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(userProfile.progress).map(([key, value]) => {
                const labels = {
                  ai101: 'AI 101',
                  aiSimulator: 'AI Simulator',
                  contentDetector: 'Content Detector',
                  promptEvaluator: 'Prompt Evaluator'
                }
                
                return (
                  <div key={key} className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-3">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          className="text-slate-200"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - value / 100)}`}
                          className="text-purple-500"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-neutral-900">
                        {value}%
                      </span>
                    </div>
                    <p className="font-medium text-neutral-900">{labels[key as keyof typeof labels]}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default PersonalizedDashboard
