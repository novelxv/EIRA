import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle,
  ArrowLeft,
  Users,
  MessageSquare,
  Eye,
  Brain,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface Scenario {
  id: number
  title: string
  description: string
  category: 'deepfake' | 'manipulation' | 'misinformation' | 'scam'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  learningGoals: string[]
}

interface SimulationStep {
  id: number
  type: 'intro' | 'content' | 'question' | 'result'
  content: string
  media?: {
    type: 'image' | 'video' | 'audio'
    url: string
    caption: string
  }
  question?: {
    text: string
    options: string[]
    correct: number
    explanation: string
  }
}

const MisuseSimulation = () => {
  const [currentPhase, setCurrentPhase] = useState<'selection' | 'simulation' | 'completion'>('selection')
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [simulationProgress, setSimulationProgress] = useState(0)

  const scenarios: Scenario[] = [
    {
      id: 1,
      title: "Deepfake Celebrity Endorsement",
      description: "Pelajari bagaimana deepfake digunakan untuk membuat video palsu selebriti yang mengiklankan produk scam",
      category: 'deepfake',
      difficulty: 'beginner',
      duration: '10 menit',
      learningGoals: [
        'Mengenali tanda-tanda deepfake video',
        'Memahami motif ekonomi di balik deepfake scam',
        'Mempelajari cara verifikasi konten video'
      ]
    },
    {
      id: 2,
      title: "AI-Generated Fake News",
      description: "Simulasi bagaimana AI digunakan untuk membuat berita palsu yang sangat meyakinkan dan menyebarkannya",
      category: 'misinformation',
      difficulty: 'intermediate',
      duration: '15 menit',
      learningGoals: [
        'Memahami cara AI menghasilkan berita palsu',
        'Mengenali pattern bahasa AI-generated content',
        'Mempelajari teknik fact-checking yang efektif'
      ]
    },
    {
      id: 3,
      title: "Social Engineering via AI Chatbot",
      description: "Rasakan bagaimana AI chatbot canggih digunakan untuk mendapatkan informasi pribadi melalui manipulasi psikologis",
      category: 'manipulation',
      difficulty: 'advanced',
      duration: '20 menit',
      learningGoals: [
        'Memahami teknik social engineering modern',
        'Mengenali manipulasi psikologis dalam percakapan AI',
        'Mempelajari cara melindungi informasi pribadi'
      ]
    },
    {
      id: 4,
      title: "AI Voice Cloning Scam",
      description: "Simulasi penipuan menggunakan suara kloning AI untuk menipu keluarga korban",
      category: 'scam',
      difficulty: 'intermediate',
      duration: '12 menit',
      learningGoals: [
        'Memahami teknologi voice cloning',
        'Mengenali tanda-tanda audio manipulation',
        'Mempelajari protokol verifikasi identitas'
      ]
    }
  ]

  const deepfakeSimulationSteps: SimulationStep[] = [
    {
      id: 1,
      type: 'intro',
      content: 'Anda akan melihat video yang mengklaim menunjukkan selebriti terkenal mengiklankan produk investasi "ajaib". Perhatikan dengan seksama dan coba identifikasi keasliannya.'
    },
    {
      id: 2,
      type: 'content',
      content: 'Video menunjukkan "Raffi Ahmad" berbicara tentang investasi cryptocurrency yang memberikan keuntungan 500% dalam sebulan.',
      media: {
        type: 'video',
        url: '/mock-deepfake-video.mp4',
        caption: 'Video "Raffi Ahmad" mengiklankan investasi cryptocurrency (SIMULASI - BUKAN VIDEO ASLI)'
      }
    },
    {
      id: 3,
      type: 'question',
      content: 'Berdasarkan video yang Anda lihat, apa yang membuat Anda curiga?',
      question: {
        text: 'Indikator apa yang paling mencurigakan dari video tersebut?',
        options: [
          'Gerakan bibir tidak sinkron dengan suara',
          'Kualitas video terlalu sempurna',
          'Background terlihat tidak natural',
          'Semua hal di atas mencurigakan'
        ],
        correct: 3,
        explanation: 'Dalam deepfake, biasanya ada beberapa indikator sekaligus: sinkronisasi bibir yang tidak perfect, pencahayaan yang tidak konsisten, dan background yang terlihat artificial.'
      }
    },
    {
      id: 4,
      type: 'content',
      content: 'This video is a deepfake created using AI technology. Let\'s learn how cybercriminals use this technology for fraud.'
    },
    {
      id: 5,
      type: 'question',
      content: 'Mengapa penjahat memilih menggunakan deepfake selebriti?',
      question: {
        text: 'Apa alasan utama penggunaan deepfake selebriti dalam penipuan?',
        options: [
          'Lebih mudah dibuat daripada video asli',
          'Memanfaatkan kepercayaan public terhadap selebriti',
          'Lebih murah daripada menyewa influencer',
          'Teknologinya lebih advanced'
        ],
        correct: 1,
        explanation: 'Selebriti memiliki kredibilitas dan kepercayaan public yang tinggi. Ketika orang melihat selebriti "mengiklankan" sesuatu, mereka cenderung lebih mudah percaya tanpa verifikasi lebih lanjut.'
      }
    },
    {
      id: 6,
      type: 'result',
      content: 'Selamat! Anda telah menyelesaikan simulasi deepfake detection. Ingat: selalu verifikasi konten sebelum percaya, terutama yang melibatkan investasi atau produk finansial.'
    }
  ]

  const startSimulation = (scenario: Scenario) => {
    setSelectedScenario(scenario)
    setCurrentPhase('simulation')
    setCurrentStep(0)
    setUserAnswers([])
    setScore(0)
    setSimulationProgress(0)
  }

  const nextStep = () => {
    const steps = deepfakeSimulationSteps // For now, use deepfake steps for all scenarios
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setSimulationProgress(((currentStep + 1) / steps.length) * 100)
    } else {
      setCurrentPhase('completion')
    }
  }

  const answerQuestion = (answerIndex: number) => {
    const steps = deepfakeSimulationSteps
    const currentStepData = steps[currentStep]
    
    if (currentStepData.question) {
      const isCorrect = answerIndex === currentStepData.question.correct
      setUserAnswers([...userAnswers, answerIndex])
      
      if (isCorrect) {
        setScore(score + 1)
      }
      
      // Show explanation for a moment before proceeding
      setTimeout(() => {
        nextStep()
      }, 3000)
    }
  }

  const resetSimulation = () => {
    setCurrentPhase('selection')
    setSelectedScenario(null)
    setCurrentStep(0)
    setUserAnswers([])
    setScore(0)
    setSimulationProgress(0)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'deepfake': return 'bg-red-100 text-red-700'
      case 'manipulation': return 'bg-orange-100 text-orange-700'
      case 'misinformation': return 'bg-yellow-100 text-yellow-700'
      case 'scam': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700'
      case 'intermediate': return 'bg-yellow-100 text-yellow-700'
      case 'advanced': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (currentPhase === 'selection') {
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Link
              to="/ai-simulator"
              className="inline-flex items-center text-red-600 hover:text-red-700 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke AI Simulator
            </Link>
            
            <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4 mr-2" />
              AI Misuse Simulation
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Simulasi <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Penyalahgunaan AI</span>
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              Pelajari bagaimana AI disalahgunakan untuk penipuan, manipulasi, dan disinformasi. 
              Tingkatkan kemampuan Anda mengenali dan melindungi diri dari ancaman ini.
            </p>
          </motion.div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-900 mb-2">Peringatan Penting</h3>
                <div className="text-red-800 text-sm space-y-1">
                  <p>• All content in this simulation is FAKE and created for educational purposes</p>
                  <p>• Jangan gunakan teknik yang dipelajari untuk tujuan merugikan orang lain</p>
                  <p>• Simulasi ini mengandung contoh realistic yang mungkin disturbing</p>
                  <p>• The main objective is to increase awareness and detection capabilities</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {scenarios.map((scenario) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: scenario.id * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-neutral-900">{scenario.title}</h3>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(scenario.category)}`}>
                        {scenario.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(scenario.difficulty)}`}>
                        {scenario.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-neutral-600 mb-4">{scenario.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-neutral-500 mb-4">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {scenario.duration}
                    </div>
                    <div className="flex items-center">
                      <Brain className="h-4 w-4 mr-1" />
                      {scenario.learningGoals.length} learning goals
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-neutral-900 mb-2">Yang Akan Anda Pelajari:</h4>
                    <ul className="space-y-1">
                      {scenario.learningGoals.map((goal, index) => (
                        <li key={index} className="text-sm text-neutral-600 flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button
                    onClick={() => startSimulation(scenario)}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Play className="h-4 w-4 inline mr-2" />
                    Mulai Simulasi
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">Mengapa Simulasi Ini Penting?</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Perlindungan Komunitas</h3>
                <p className="text-neutral-600 text-sm">Dengan memahami teknik penipuan AI, Anda dapat melindungi diri sendiri dan membantu orang lain</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Media Literacy</h3>
                <p className="text-neutral-600 text-sm">Meningkatkan kemampuan critical thinking dalam mengonsumsi konten digital</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Cyber Security</h3>
                <p className="text-neutral-600 text-sm">Membangun awareness terhadap ancaman keamanan siber berbasis AI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentPhase === 'simulation' && selectedScenario) {
    const steps = deepfakeSimulationSteps
    const currentStepData = steps[currentStep]

    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-neutral-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-neutral-900">{selectedScenario.title}</h2>
              <span className="text-sm text-neutral-600">
                {currentStep + 1} / {steps.length}
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${simulationProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStepData.type === 'intro' && (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Play className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4">Persiapan Simulasi</h3>
                      <p className="text-neutral-600 mb-8">{currentStepData.content}</p>
                      <button
                        onClick={nextStep}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium px-6 py-3 rounded-xl"
                      >
                        Lanjutkan
                      </button>
                    </div>
                  )}

                  {currentStepData.type === 'content' && (
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4">Konten Simulasi</h3>
                      <p className="text-neutral-600 mb-6">{currentStepData.content}</p>
                      
                      {currentStepData.media && (
                        <div className="bg-neutral-100 rounded-lg p-6 mb-6">
                          <div className="aspect-video bg-neutral-200 rounded-lg flex items-center justify-center mb-4">
                            <div className="text-center">
                              <Play className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                              <p className="text-neutral-600 text-sm">Video Simulasi Deepfake</p>
                              <p className="text-neutral-500 text-xs">(Mock content untuk demonstration)</p>
                            </div>
                          </div>
                          <p className="text-sm text-neutral-600">{currentStepData.media.caption}</p>
                        </div>
                      )}
                      
                      <button
                        onClick={nextStep}
                        className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium px-6 py-3 rounded-xl"
                      >
                        Analisis Video
                      </button>
                    </div>
                  )}

                  {currentStepData.type === 'question' && currentStepData.question && (
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4">Pertanyaan Analisis</h3>
                      <p className="text-neutral-600 mb-6">{currentStepData.content}</p>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h4 className="font-semibold text-blue-900 mb-3">{currentStepData.question.text}</h4>
                        <div className="space-y-3">
                          {currentStepData.question.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => answerQuestion(index)}
                              className="w-full text-left p-3 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors duration-200"
                            >
                              <span className="font-medium text-blue-900">{String.fromCharCode(65 + index)}.</span> {option}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {userAnswers.length > currentStep && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-lg ${
                            userAnswers[userAnswers.length - 1] === currentStepData.question.correct
                              ? 'bg-green-50 border border-green-200'
                              : 'bg-red-50 border border-red-200'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            {userAnswers[userAnswers.length - 1] === currentStepData.question.correct ? (
                              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                            )}
                            <div>
                              <p className={`font-semibold mb-1 ${
                                userAnswers[userAnswers.length - 1] === currentStepData.question.correct
                                  ? 'text-green-900'
                                  : 'text-red-900'
                              }`}>
                                {userAnswers[userAnswers.length - 1] === currentStepData.question.correct
                                  ? 'Jawaban Benar!'
                                  : 'Jawaban Kurang Tepat'
                                }
                              </p>
                              <p className="text-sm text-neutral-600">{currentStepData.question.explanation}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {currentStepData.type === 'result' && (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4">Simulasi Selesai</h3>
                      <p className="text-neutral-600 mb-8">{currentStepData.content}</p>
                      
                      <div className="bg-neutral-100 rounded-lg p-6 mb-6">
                        <h4 className="font-semibold text-neutral-900 mb-2">Skor Anda</h4>
                        <p className="text-3xl font-bold text-blue-600 mb-2">{score} / {userAnswers.length}</p>
                        <p className="text-neutral-600 text-sm">
                          {score === userAnswers.length ? 'Perfect! Anda sangat baik dalam mendeteksi AI misuse' :
                           score >= userAnswers.length * 0.7 ? 'Bagus! Anda memiliki awareness yang baik' :
                           'Perlu latihan lebih lanjut untuk meningkatkan kemampuan deteksi'}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={resetSimulation}
                          className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium px-6 py-3 rounded-xl"
                        >
                          Coba Simulasi Lain
                        </button>
                        <button
                          onClick={() => setCurrentPhase('completion')}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium px-6 py-3 rounded-xl"
                        >
                          Lihat Pembelajaran
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={resetSimulation}
              className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-700"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset Simulasi</span>
            </button>
            
            <div className="flex items-center space-x-2 text-neutral-600">
              <Pause className="h-4 w-4" />
              <span className="text-sm">Simulasi Berlangsung</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentPhase === 'completion') {
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-neutral-900 mb-6">
              🎓 Selamat! Anda Telah Menyelesaikan Simulasi
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8">
              Anda kini memiliki pemahaman lebih baik tentang bagaimana AI dapat disalahgunakan 
              dan cara melindungi diri dari ancaman tersebut.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">Poin Penting yang Dipelajari</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-600 text-sm">AI dapat digunakan untuk membuat konten palsu yang sangat meyakinkan</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-600 text-sm">Selalu verifikasi konten yang mencurigakan, terutama yang melibatkan keuangan</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-600 text-sm">Awareness dan critical thinking adalah pertahanan terbaik</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-600 text-sm">Berbagi pengetahuan dengan orang lain dapat membantu melindungi komunitas</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">Langkah Selanjutnya</h2>
              <div className="space-y-3">
                <Link 
                  to="/content-detector"
                  className="block p-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="font-semibold text-blue-900">Content Detector</div>
                  <div className="text-blue-700 text-sm">Praktikkan deteksi konten AI-generated</div>
                </Link>
                <Link 
                  to="/ai101"
                  className="block p-3 rounded-lg border border-green-200 hover:bg-green-50 transition-colors duration-200"
                >
                  <div className="font-semibold text-green-900">AI 101 Learning</div>
                  <div className="text-green-700 text-sm">Pelajari lebih dalam tentang AI</div>
                </Link>
                <Link 
                  to="/prompt-evaluator"
                  className="block p-3 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors duration-200"
                >
                  <div className="font-semibold text-purple-900">Prompt Evaluator</div>
                  <div className="text-purple-700 text-sm">Tingkatkan skill prompting yang aman</div>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetSimulation}
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Coba Simulasi Lain
              </button>
              <Link
                to="/ai-simulator"
                className="border-2 border-neutral-300 text-neutral-700 font-medium px-6 py-3 rounded-xl transition-all duration-300 hover:bg-neutral-50"
              >
                Kembali ke AI Simulator
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default MisuseSimulation
