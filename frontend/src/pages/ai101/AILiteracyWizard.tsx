import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  BookOpen, 
  PlayCircle, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Lightbulb,
  HelpCircle,
  Video,
  FileText,
  Home,
  Trophy,
  ChevronRight,
  Smartphone,
  Music,
  Camera,
  TrendingUp,
  Globe
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  scenario?: string
}

interface ConceptCard {
  id: number
  keySentence: string
  analogy: string
  icon: React.ReactNode
  color: string
}

interface LearningModule {
  id: number
  title: string
  icon: React.ReactNode
  description: string
  videoUrl: string
  conceptCards: ConceptCard[]
  quiz: QuizQuestion[]
}

type WizardStep = 'selection' | 'learning' | 'quiz' | 'completion'

const AILiteracyWizard = () => {
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

  const modules: LearningModule[] = [
    {
      id: 1,
      title: "Apa itu Artificial Intelligence?",
      icon: <Brain className="h-6 w-6" />,
      description: "Memahami konsep dasar AI dan penerapannya dalam kehidupan sehari-hari",
      videoUrl: "https://example.com/ai-basics.mp4",
      conceptCards: [
        {
          id: 1,
          keySentence: "Artificial Intelligence adalah teknologi yang membuat mesin bisa berpikir seperti manusia.",
          analogy: "Seperti memberi 'otak' pada robot sehingga dia bisa memutuskan sendiri tanpa diperintah terus-menerus.",
          icon: <Brain className="h-12 w-12" />,
          color: "from-blue-500 to-cyan-500"
        },
        {
          id: 2,
          keySentence: "Narrow AI dirancang untuk tugas spesifik, General AI untuk semua tugas.",
          analogy: "Narrow AI seperti pisau khusus untuk memotong sayur, General AI seperti pisau Swiss Army yang bisa untuk apa saja.",
          icon: <Smartphone className="h-12 w-12" />,
          color: "from-purple-500 to-pink-500"
        },
        {
          id: 3,
          keySentence: "AI sudah ada di sekitar kita dalam bentuk rekomendasi dan asisten virtual.",
          analogy: "Seperti pelayan restoran yang sudah hafal selera kita dan langsung menyarankan menu favorit.",
          icon: <Music className="h-12 w-12" />,
          color: "from-green-500 to-teal-500"
        }
      ],
      quiz: [
        {
          id: 1,
          question: "Saat Anda buka Netflix dan film yang muncul selalu sesuai selera Anda, teknologi di baliknya adalah:",
          scenario: "Bayangkan Anda baru saja selesai menonton film aksi di Netflix. Besoknya, halaman utama Netflix penuh dengan rekomendasi film aksi dan thriller yang menarik.",
          options: [
            "Karyawan Netflix yang memilih film untuk saya",
            "AI yang belajar dari riwayat tontonan saya",
            "Sistem random yang kebetulan cocok",
            "Teman saya yang berbagi akun"
          ],
          correct: 1,
          explanation: "Netflix menggunakan AI machine learning yang menganalisis pola tontonan Anda, rating yang Anda berikan, dan data pengguna serupa untuk memberikan rekomendasi yang personal."
        },
        {
          id: 2,
          question: "Manakah yang termasuk contoh Narrow AI dalam kehidupan sehari-hari?",
          scenario: "Anda sedang menggunakan smartphone dan berinteraksi dengan berbagai aplikasi yang menggunakan teknologi AI.",
          options: [
            "Siri yang bisa menjawab semua pertanyaan dan melakukan semua tugas manusia",
            "Google Translate yang hanya bisa menerjemahkan bahasa",
            "Robot yang bisa berpikir seperti manusia dalam segala hal",
            "AI yang bisa menggantikan semua pekerjaan manusia"
          ],
          correct: 1,
          explanation: "Google Translate adalah contoh Narrow AI karena dirancang khusus untuk satu tugas: menerjemahkan bahasa. Berbeda dengan General AI yang bisa melakukan berbagai tugas seperti manusia."
        },
        {
          id: 3,
          question: "Ketika Anda bertanya pada Siri 'Bagaimana cuaca hari ini?', apa yang sebenarnya terjadi di balik layar?",
          scenario: "Anda sedang bersiap keluar rumah dan bertanya pada Siri tentang cuaca. Dalam hitungan detik, Siri memberikan informasi cuaca yang akurat.",
          options: [
            "Siri melihat keluar jendela untuk mengecek cuaca",
            "Siri menggunakan AI untuk memahami pertanyaan Anda, lalu mengambil data cuaca dari internet",
            "Siri menelepon kantor meteorologi",
            "Siri menebak berdasarkan hari kemarin"
          ],
          correct: 1,
          explanation: "Siri menggunakan Natural Language Processing (NLP) untuk memahami pertanyaan Anda, kemudian mengakses database cuaca online untuk memberikan informasi yang akurat dan real-time."
        }
      ]
    },
    {
      id: 2,
      title: "Machine Learning & Deep Learning",
      icon: <Lightbulb className="h-6 w-6" />,
      description: "Memahami cara mesin belajar dari data dan membuat prediksi",
      videoUrl: "https://example.com/ml-basics.mp4",
      conceptCards: [
        {
          id: 1,
          keySentence: "Machine Learning adalah AI yang belajar dari contoh-contoh.",
          analogy: "Seperti mengajari anak kecil bedanya kucing dan anjing dengan menunjukkan ribuan foto.",
          icon: <Camera className="h-12 w-12" />,
          color: "from-orange-500 to-red-500"
        },
        {
          id: 2,
          keySentence: "Supervised Learning belajar dari data berlabel, Unsupervised Learning mencari pola sendiri.",
          analogy: "Supervised seperti belajar dengan kunci jawaban, Unsupervised seperti mencari pola dalam puzzle tanpa contoh.",
          icon: <TrendingUp className="h-12 w-12" />,
          color: "from-blue-500 to-purple-500"
        },
        {
          id: 3,
          keySentence: "Deep Learning menggunakan neural network berlapis untuk memahami hal kompleks.",
          analogy: "Seperti sistem pencernaan yang memproses makanan berlapis: mulut → lambung → usus, setiap lapisan punya tugas khusus.",
          icon: <Globe className="h-12 w-12" />,
          color: "from-green-500 to-blue-500"
        }
      ],
      quiz: [
        {
          id: 1,
          question: "Apa yang membedakan Deep Learning dari Machine Learning tradisional?",
          options: [
            "Deep Learning menggunakan lebih banyak data",
            "Deep Learning menggunakan neural network berlapis",
            "Deep Learning lebih cepat",
            "Deep Learning lebih murah"
          ],
          correct: 1,
          explanation: "Deep Learning menggunakan neural network dengan banyak layer (lapisan) untuk memproses informasi kompleks, sedangkan machine learning tradisional menggunakan algoritma yang lebih sederhana."
        },
        {
          id: 2,
          question: "Anda ingin membuat sistem yang bisa mengelompokkan pelanggan berdasarkan pola belanja mereka tanpa diberi tahu kategori sebelumnya. Jenis machine learning apa yang tepat?",
          scenario: "Sebagai pemilik toko online, Anda memiliki data transaksi ribuan pelanggan dan ingin memahami segmen pelanggan untuk strategi marketing yang lebih efektif.",
          options: [
            "Supervised Learning",
            "Unsupervised Learning", 
            "Reinforcement Learning",
            "Transfer Learning"
          ],
          correct: 1,
          explanation: "Unsupervised Learning cocok untuk mencari pola tersembunyi dalam data tanpa label yang sudah ada. Algoritma clustering akan mengelompokkan pelanggan berdasarkan kesamaan pola belanja mereka."
        },
        {
          id: 3,
          question: "Mengapa AI game seperti AlphaGo bisa mengalahkan juara dunia Go?",
          scenario: "AlphaGo berhasil mengalahkan Lee Sedol, juara dunia Go, dalam pertandingan yang mengejutkan dunia. Game Go memiliki lebih banyak kemungkinan langkah daripada catur.",
          options: [
            "AlphaGo menggunakan Supervised Learning dengan data pertandingan manusia",
            "AlphaGo menggunakan Reinforcement Learning dengan bermain jutaan game melawan dirinya sendiri",
            "AlphaGo sudah diprogram dengan semua strategi yang mungkin",
            "AlphaGo menggunakan internet untuk mencari strategi terbaik"
          ],
          correct: 1,
          explanation: "AlphaGo menggunakan Reinforcement Learning, bermain jutaan game melawan dirinya sendiri untuk belajar strategi optimal melalui trial and error. Ini memungkinkannya menemukan strategi yang bahkan tidak terpikirkan oleh manusia."
        }
      ]
    },
    {
      id: 3,
      title: "Large Language Models (LLM)",
      icon: <FileText className="h-6 w-6" />,
      description: "Memahami AI bahasa seperti ChatGPT dan cara kerjanya",
      videoUrl: "https://example.com/llm-basics.mp4",
      conceptCards: [
        {
          id: 1,
          keySentence: "LLM adalah AI yang dilatih dengan miliaran teks untuk memahami dan menghasilkan bahasa manusia.",
          analogy: "Seperti siswa yang membaca seluruh perpustakaan dan bisa menjawab pertanyaan apapun berdasarkan yang pernah dibaca.",
          icon: <BookOpen className="h-12 w-12" />,
          color: "from-indigo-500 to-purple-500"
        },
        {
          id: 2,
          keySentence: "LLM bekerja dengan memprediksi kata selanjutnya berdasarkan konteks yang diberikan.",
          analogy: "Seperti melengkapi kalimat dalam permainan tebak kata, tapi dengan kemampuan yang sangat canggih.",
          icon: <Brain className="h-12 w-12" />,
          color: "from-pink-500 to-rose-500"
        },
        {
          id: 3,
          keySentence: "Hallucination terjadi ketika LLM membuat informasi yang terdengar benar tapi sebenarnya salah.",
          analogy: "Seperti storyteller yang sangat persuasif tapi kadang mencampur fakta dengan fiksi tanpa sadar.",
          icon: <HelpCircle className="h-12 w-12" />,
          color: "from-yellow-500 to-orange-500"
        }
      ],
      quiz: [
        {
          id: 1,
          question: "Apa yang dimaksud dengan 'hallucination' dalam konteks LLM?",
          options: [
            "LLM yang bermimpi",
            "LLM menghasilkan informasi yang terdengar benar tapi sebenarnya salah",
            "LLM yang bisa melihat gambar",
            "LLM yang bekerja di malam hari"
          ],
          correct: 1,
          explanation: "Hallucination adalah ketika LLM menghasilkan informasi yang terdengar meyakinkan dan logis, tapi sebenarnya salah atau tidak akurat. Ini terjadi karena LLM memprediksi berdasarkan pola, bukan pemahaman yang sebenarnya."
        },
        {
          id: 2,
          question: "Anda bertanya pada ChatGPT: 'Siapa presiden Indonesia tahun 2024?' dan mendapat jawaban yang salah. Mengapa ini bisa terjadi?",
          scenario: "Anda sedang mengerjakan tugas sejarah dan mengandalkan ChatGPT untuk informasi faktual tentang kepemimpinan Indonesia.",
          options: [
            "ChatGPT sengaja berbohong",
            "ChatGPT tidak memiliki akses ke informasi terbaru atau terjadi hallucination",
            "ChatGPT hanya tahu tentang negara lain",
            "ChatGPT sedang rusak"
          ],
          correct: 1,
          explanation: "LLM seperti ChatGPT memiliki 'knowledge cutoff' - batas waktu data training mereka. Mereka juga bisa mengalami hallucination, menghasilkan informasi yang terdengar benar tapi salah. Selalu verifikasi informasi faktual dari sumber terpercaya."
        },
        {
          id: 3,
          question: "Ketika Anda meminta ChatGPT menulis kode Python, bagaimana sebenarnya prosesnya?",
          scenario: "Anda meminta ChatGPT: 'Buatkan kode Python untuk menghitung rata-rata dari list angka' dan mendapat kode yang benar dan berfungsi.",
          options: [
            "ChatGPT menjalankan kode di server untuk memastikan benar",
            "ChatGPT memprediksi token/kata berikutnya berdasarkan pola kode dalam data training",
            "ChatGPT terhubung ke GitHub untuk mencari kode yang sama",
            "ChatGPT memiliki compiler Python built-in"
          ],
          correct: 1,
          explanation: "LLM bekerja dengan memprediksi token (kata/karakter) berikutnya berdasarkan pola yang dipelajari dari data training. Ketika menghasilkan kode, LLM memprediksi syntax dan struktur yang paling mungkin berdasarkan konteks permintaan Anda."
        },
        {
          id: 4,
          question: "Mengapa penting untuk memberikan konteks yang jelas saat berinteraksi dengan LLM?",
          scenario: "Anda bertanya 'Bagaimana cara menggoreng?' tanpa konteks. LLM bisa menjawab tentang menggoreng ikan, ayam, atau bahkan tentang teknik memasak secara umum.",
          options: [
            "Supaya LLM tidak bingung dan memberikan jawaban yang relevan",
            "Supaya LLM bekerja lebih cepat",
            "Supaya menghemat token/biaya",
            "Supaya LLM tidak crash"
          ],
          correct: 0,
          explanation: "LLM bergantung pada konteks untuk memberikan respons yang tepat. Tanpa konteks yang jelas, LLM mungkin memberikan jawaban yang terlalu umum atau tidak sesuai dengan kebutuhan spesifik Anda. Konteks yang baik = hasil yang lebih relevan."
        }
      ]
    },
    {
      id: 4,
      title: "Prompt Engineering",
      icon: <FileText className="h-6 w-6" />,
      description: "Belajar cara berkomunikasi efektif dengan AI untuk mendapatkan hasil terbaik",
      videoUrl: "https://example.com/prompt-engineering.mp4",
      conceptCards: [
        {
          id: 1,
          keySentence: "Prompt yang baik adalah kunci untuk mendapatkan output AI yang berkualitas.",
          analogy: "Seperti memberikan instruksi pada asisten - semakin jelas dan spesifik instruksi Anda, semakin baik hasil yang diperoleh.",
          icon: <FileText className="h-12 w-12" />,
          color: "from-emerald-500 to-green-500"
        },
        {
          id: 2,
          keySentence: "Konteks dan contoh dalam prompt membantu AI memahami ekspektasi Anda dengan lebih baik.",
          analogy: "Seperti menjelaskan tugas pada karyawan baru - memberikan contoh hasil yang diinginkan membuat mereka lebih paham.",
          icon: <Lightbulb className="h-12 w-12" />,
          color: "from-amber-500 to-yellow-500"
        },
        {
          id: 3,
          keySentence: "Iterasi dan perbaikan prompt adalah bagian normal dari proses prompting yang efektif.",
          analogy: "Seperti memasak - mencoba, mencicipi, dan menyesuaikan bumbu sampai mendapat rasa yang pas.",
          icon: <Brain className="h-12 w-12" />,
          color: "from-violet-500 to-purple-500"
        }
      ],
      quiz: [
        {
          id: 1,
          question: "Mana prompt yang lebih efektif untuk membuat email profesional?",
          scenario: "Anda perlu menulis email untuk meminta meeting dengan klien penting dan ingin menggunakan AI untuk membantu.",
          options: [
            "Buatkan email",
            "Buatkan email profesional untuk meminta meeting dengan klien, tone formal, maksimal 150 kata, sertakan agenda yang jelas",
            "Tolong buatkan email yang bagus",
            "Email untuk klien"
          ],
          correct: 1,
          explanation: "Prompt yang efektif harus spesifik, mencakup konteks (meeting dengan klien), tone yang diinginkan (formal), batasan (150 kata), dan requirement khusus (agenda yang jelas). Ini membantu AI menghasilkan output yang sesuai ekspektasi."
        },
        {
          id: 2,
          question: "Apa yang dimaksud dengan 'Chain of Thought' prompting?",
          scenario: "Anda meminta AI menyelesaikan soal matematika kompleks dan ingin AI menunjukkan cara berpikirnya.",
          options: [
            "Meminta AI berpikir secara random",
            "Meminta AI menjelaskan langkah-langkah pemikirannya secara bertahap",
            "Meminta AI menggunakan internet",
            "Meminta AI bekerja lebih cepat"
          ],
          correct: 1,
          explanation: "Chain of Thought prompting meminta AI untuk 'menunjukkan pekerjaan rumahnya' - menjelaskan proses berpikir step-by-step. Ini often menghasilkan jawaban yang lebih akurat dan memungkinkan Anda memahami reasoning AI."
        },
        {
          id: 3,
          question: "Mengapa penting untuk memberikan contoh (few-shot) dalam prompt?",
          scenario: "Anda ingin AI menganalisis sentimen dari review produk dengan format output yang konsisten.",
          options: [
            "Supaya AI tidak bosan",
            "Supaya AI memahami format dan style output yang diinginkan",
            "Supaya AI bekerja lebih cepat",
            "Supaya menghemat token"
          ],
          correct: 1,
          explanation: "Few-shot prompting (memberikan contoh) membantu AI memahami pola dan format output yang Anda inginkan. Ini seperti memberikan template - AI akan mengikuti struktur dan style yang Anda tunjukkan dalam contoh."
        }
      ]
    }
  ]

  const startModule = (module: LearningModule) => {
    setSelectedModule(module)
    setCurrentStep('learning')
    setCurrentCard(0)
    setCardProgress(new Array(module.conceptCards.length).fill(false))
  }

  const completeCard = (cardIndex: number) => {
    const newProgress = [...cardProgress]
    newProgress[cardIndex] = true
    setCardProgress(newProgress)
  }

  const proceedToQuiz = () => {
    setCurrentStep('quiz')
    setCurrentQuiz(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setQuizScore(0)
    setUserAnswers([])
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
      <div className="min-h-screen pt-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              Mulai Perjalanan <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Literasi AI</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Pilih modul pembelajaran yang ingin Anda pelajari. Setiap modul dirancang untuk memberikan pemahaman mendalam melalui pendekatan step-by-step.
            </p>
            
            {/* Progress Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto mb-8">
              <h3 className="font-semibold text-neutral-900 mb-3">Progress Pembelajaran</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-600">Modul Selesai</span>
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
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
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
                      <span>Video pembelajaran interaktif</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-600">
                      <BookOpen className="h-4 w-4 mr-2 text-green-500" />
                      <span>{module.conceptCards.length} kartu konsep analogi</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-600">
                      <HelpCircle className="h-4 w-4 mr-2 text-purple-500" />
                      <span>{module.quiz.length} kuis skenario dunia nyata</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-600">
                      <CheckCircle className="h-4 w-4 mr-2 text-orange-500" />
                      <span>~{(module.conceptCards.length * 2) + (module.quiz.length * 1.5)} menit</span>
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
                        <span>Ulang Modul</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle className="h-5 w-5" />
                        <span>Mulai Belajar</span>
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
              Kembali ke AI 101
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Learning Step (Video + Concept Cards)
  if (currentStep === 'learning' && selectedModule) {
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={resetWizard}
                  className="p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5 text-neutral-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-neutral-900">{selectedModule.title}</h1>
                  <p className="text-neutral-600">Langkah 1: Pelajari Konsep</p>
                </div>
              </div>
              <div className="text-sm text-neutral-600">
                Kartu {currentCard + 1} dari {selectedModule.conceptCards.length}
              </div>
            </div>
            
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentCard + 1) / selectedModule.conceptCards.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Video Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
              <h2 className="text-xl font-bold flex items-center">
                <Video className="h-5 w-5 mr-2" />
                Video Pembelajaran
              </h2>
            </div>
            <div className="p-6">
              <div className="bg-neutral-100 rounded-lg p-8 text-center">
                <PlayCircle className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600">Video pembelajaran akan tersedia segera</p>
                <p className="text-sm text-neutral-500 mt-2">Sementara ini, mari fokus pada kartu konsep di bawah</p>
              </div>
            </div>
          </div>

          {/* Concept Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
              <h2 className="text-xl font-bold flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                Kartu Analogi Interaktif
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
                  <div className={`w-24 h-24 bg-gradient-to-r ${selectedModule.conceptCards[currentCard].color} rounded-full flex items-center justify-center mx-auto mb-6 text-white`}>
                    {selectedModule.conceptCards[currentCard].icon}
                  </div>

                  {/* Key Sentence */}
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6 leading-relaxed">
                    {selectedModule.conceptCards[currentCard].keySentence}
                  </h3>

                  {/* Analogy */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center justify-center">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Analogi Sederhana
                    </h4>
                    <p className="text-blue-800 text-lg leading-relaxed">
                      {selectedModule.conceptCards[currentCard].analogy}
                    </p>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setCurrentCard(Math.max(0, currentCard - 1))}
                      disabled={currentCard === 0}
                      className="flex items-center space-x-2 px-4 py-2 text-neutral-600 hover:text-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Sebelumnya</span>
                    </button>

                    {currentCard < selectedModule.conceptCards.length - 1 ? (
                      <button
                        onClick={() => {
                          completeCard(currentCard)
                          setCurrentCard(currentCard + 1)
                        }}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                      >
                        <span>Lanjut ke Kartu Berikutnya</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          completeCard(currentCard)
                          proceedToQuiz()
                        }}
                        className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                      >
                        <span>Lanjut ke Kuis Pemahaman</span>
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
      <div className="min-h-screen pt-8 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setCurrentStep('learning')}
                  className="p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5 text-neutral-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-neutral-900">{selectedModule.title}</h1>
                  <p className="text-neutral-600">Langkah 2: Kuis Skenario Dunia Nyata</p>
                </div>
              </div>
              <div className="text-sm text-neutral-600">
                Pertanyaan {currentQuiz + 1} dari {selectedModule.quiz.length}
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
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 text-white">
              <h2 className="text-xl font-bold flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                Kuis Pemahaman: Skenario Dunia Nyata
              </h2>
            </div>
            
            <div className="p-8">
              {/* Scenario */}
              {currentQuestion.scenario && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-3">📱 Skenario:</h3>
                  <p className="text-blue-800 leading-relaxed">{currentQuestion.scenario}</p>
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
                    Penjelasan:
                  </h4>
                  <p className="text-neutral-700 leading-relaxed">{currentQuestion.explanation}</p>
                </motion.div>
              )}

              {/* Navigation */}
              {showExplanation && (
                <div className="flex justify-between items-center">
                  <div className="text-sm text-neutral-600">
                    Skor: {quizScore}/{currentQuiz + 1}
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
                      <span>Pertanyaan Berikutnya</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={completeModule}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                    >
                      <Trophy className="h-4 w-4" />
                      <span>Selesaikan Modul</span>
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
      <div className="min-h-screen pt-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="h-12 w-12 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-neutral-900 mb-6">
              🎉 Selamat! Modul Selesai
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8">
              Anda telah berhasil menyelesaikan modul "{selectedModule.title}" dengan baik!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Score Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">Hasil Pembelajaran</h2>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{finalScore}/{totalQuestions}</div>
                <div className="text-neutral-600 mb-4">Skor Kuis Pemahaman</div>
                <div className="w-full bg-neutral-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${scorePercentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-neutral-600 mb-4">
                  {scorePercentage >= 80 ? '🌟 Excellent! Pemahaman yang sangat baik' :
                   scorePercentage >= 60 ? '👍 Good Job! Pemahaman yang cukup baik' :
                   '💪 Keep Learning! Mari perbaiki pemahaman'}
                </div>
                
                {/* Detail breakdown */}
                <div className="text-xs text-neutral-500 space-y-1">
                  <div>Jawaban Benar: {finalScore} dari {totalQuestions} pertanyaan</div>
                  <div>Tingkat Akurasi: {Math.round(scorePercentage)}%</div>
                </div>
              </div>
            </div>

            {/* Achievement Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">Yang Telah Anda Pelajari</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-600 text-sm">Memahami konsep dasar melalui kartu analogi interaktif</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-600 text-sm">Menerapkan pemahaman dalam skenario dunia nyata</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-600 text-sm">Mendapatkan pengalaman pembelajaran yang terstruktur</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">Langkah Selanjutnya</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                to="/ai101/comparison"
                className="block p-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors duration-200 text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <div className="font-semibold text-blue-900 mb-1">Platform Comparison</div>
                <div className="text-blue-700 text-sm">Bandingkan berbagai platform AI</div>
              </Link>
              
              <Link 
                to="/prompt-evaluator"
                className="block p-4 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors duration-200 text-center"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div className="font-semibold text-purple-900 mb-1">Prompt Evaluator</div>
                <div className="text-purple-700 text-sm">Praktikkan skill prompting</div>
              </Link>
              
              <Link 
                to="/content-detector"
                className="block p-4 rounded-lg border border-green-200 hover:bg-green-50 transition-colors duration-200 text-center"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <HelpCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="font-semibold text-green-900 mb-1">Content Detector</div>
                <div className="text-green-700 text-sm">Deteksi konten AI-generated</div>
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
              <span>Pilih Modul Lain</span>
            </button>
            
            <Link
              to="/ai101"
              className="bg-white border border-neutral-200 text-neutral-700 font-medium px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-md flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Kembali ke AI 101</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default AILiteracyWizard
