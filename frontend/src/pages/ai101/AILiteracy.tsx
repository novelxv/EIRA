import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  BookOpen, 
  PlayCircle, 
  CheckCircle, 
  ArrowRight, 
  Lightbulb,
  HelpCircle,
  Video,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight,
  Move,
  Smartphone,
  Music,
  TrendingUp,
  Camera,
  Globe
} from 'lucide-react'

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

interface DragDropItem {
  id: number
  text: string
  category: 'supervised' | 'unsupervised' | 'reinforcement'
}

interface Module {
  title: string
  icon: React.ReactNode
  conceptCards?: ConceptCard[]
  dragDropData?: DragDropItem[]
  content: {
    video: string
    quiz: QuizQuestion[]
  }
}

const AILiteracy = () => {
  const [activeModule, setActiveModule] = useState(0)
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [currentCard, setCurrentCard] = useState(0)
  const [dragItems, setDragItems] = useState<DragDropItem[]>([])
  const [droppedItems, setDroppedItems] = useState<{[key: string]: DragDropItem[]}>({
    supervised: [],
    unsupervised: [],
    reinforcement: []
  })

  const modules: Module[] = [
    {
      title: "Apa itu Artificial Intelligence?",
      icon: <Brain className="h-6 w-6" />,
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
      content: {
        video: "https://example.com/ai-basics.mp4",
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
          }
        ]
      }
    },
    {
      title: "Machine Learning & Deep Learning",
      icon: <Lightbulb className="h-6 w-6" />,
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
      dragDropData: [
        { id: 1, text: "Memprediksi harga rumah berdasarkan data lokasi dan ukuran", category: 'supervised' },
        { id: 2, text: "Mengelompokkan pelanggan berdasarkan pola belanja", category: 'unsupervised' },
        { id: 3, text: "AI game yang belajar menang dari trial and error", category: 'reinforcement' },
        { id: 4, text: "Mendeteksi email spam berdasarkan contoh spam sebelumnya", category: 'supervised' },
        { id: 5, text: "Mencari segmen pasar tersembunyi dari data penjualan", category: 'unsupervised' },
        { id: 6, text: "Robot yang belajar berjalan dengan mencoba berulang kali", category: 'reinforcement' }
      ],
      content: {
        video: "https://example.com/ml-basics.mp4",
        quiz: [
          {
            id: 2,
            question: "Saat Anda buka TikTok dan video yang muncul selalu sesuai selera Anda, teknologi di baliknya yang paling mungkin adalah:",
            scenario: "Anda scroll TikTok dan heran kenapa video yang muncul selalu tentang makanan enak, padahal Anda baru mulai tertarik masak 2 minggu lalu.",
            options: [
              "Supervised Learning - belajar dari video yang Anda like",
              "Unsupervised Learning - mencari pola dari semua pengguna", 
              "Reinforcement Learning - trial error untuk engagement terbaik",
              "Semua jenis ML bekerja sama"
            ],
            correct: 3,
            explanation: "TikTok menggunakan kombinasi ketiga jenis ML: Supervised (dari likes/shares), Unsupervised (pola tersembunyi), dan Reinforcement (mengoptimalkan waktu tonton untuk engagement maksimal)."
          }
        ]
      }
    },
    {
      title: "Large Language Models (LLM)",
      icon: <FileText className="h-6 w-6" />,
      conceptCards: [
        {
          id: 1,
          keySentence: "LLM adalah AI yang dilatih dengan miliaran teks untuk memahami dan menghasilkan bahasa manusia.",
          analogy: "Seperti seseorang yang membaca seluruh perpustakaan dan bisa menjawab pertanyaan apa pun berdasarkan bacaannya.",
          icon: <BookOpen className="h-12 w-12" />,
          color: "from-indigo-500 to-purple-500"
        },
        {
          id: 2,
          keySentence: "LLM bekerja dengan memprediksi kata/token berikutnya berdasarkan konteks.",
          analogy: "Seperti autocomplete di keyboard, tapi jauh lebih pintar dan bisa melengkapi kalimat panjang yang masuk akal.",
          icon: <FileText className="h-12 w-12" />,
          color: "from-pink-500 to-rose-500"
        },
        {
          id: 3,
          keySentence: "Hallucination adalah ketika LLM menghasilkan informasi yang terdengar benar tapi salah.",
          analogy: "Seperti teman yang percaya diri menceritakan fakta, padahal dia cuma nebak-nebak doang.",
          icon: <HelpCircle className="h-12 w-12" />,
          color: "from-yellow-500 to-orange-500"
        }
      ],
      content: {
        video: "https://example.com/llm-basics.mp4",
        quiz: [
          {
            id: 3,
            question: "Anda diminta chatbot AI untuk menulis essay tentang sejarah Indonesia. Chatbot menulis dengan yakin bahwa 'Soekarno lahir di Yogyakarta tahun 1903'. Ini contoh dari:",
            scenario: "Anda sedang mengerjakan tugas sejarah dan meminta bantuan ChatGPT. Jawabannya sangat detail dan meyakinkan, tapi ada beberapa fakta yang terasa aneh.",
            options: [
              "LLM yang tidak tahu pasti, tapi tetap jawab dengan percaya diri (hallucination)",
              "LLM yang sengaja berbohong",
              "Data training yang salah",
              "LLM yang sedang error"
            ],
            correct: 0,
            explanation: "Ini adalah 'hallucination' - LLM menghasilkan informasi yang terdengar meyakinkan tapi salah. Soekarno lahir di Surabaya tahun 1901, bukan Yogyakarta 1903. LLM memprediksi berdasarkan pola, bukan 'tahu' fakta."
          }
        ]
      }
    },
    {
      title: "Prompt Engineering",
      icon: <Users className="h-6 w-6" />,
      conceptCards: [
        {
          id: 1,
          keySentence: "Prompt Engineering adalah seni merancang instruksi yang tepat agar AI menghasilkan output yang diinginkan.",
          analogy: "Seperti menjadi sutradara yang harus memberi instruksi jelas pada aktor agar akting sesuai ekspektasi.",
          icon: <Users className="h-12 w-12" />,
          color: "from-teal-500 to-cyan-500"
        },
        {
          id: 2,
          keySentence: "Chain of Thought meminta AI menjelaskan langkah-langkah pemikirannya.",
          analogy: "Seperti meminta teman menjelaskan cara dia menyelesaikan soal matematika langkah demi langkah.",
          icon: <ArrowRight className="h-12 w-12" />,
          color: "from-violet-500 to-purple-500"
        },
        {
          id: 3,
          keySentence: "Few-shot prompting memberikan contoh sebelum meminta AI melakukan tugas.",
          analogy: "Seperti menunjukkan 2-3 contoh cara memasak telur dadar sebelum minta teman coba sendiri.",
          icon: <Lightbulb className="h-12 w-12" />,
          color: "from-amber-500 to-orange-500"
        }
      ],
      content: {
        video: "https://example.com/prompt-engineering.mp4",
        quiz: [
          {
            id: 4,
            question: "Anda ingin AI membantu menulis email komplain yang sopan tapi tegas kepada layanan pelanggan. Prompt mana yang paling efektif?",
            scenario: "Paket online shop Anda sudah terlambat 1 minggu tanpa kabar. Anda kesal tapi ingin tetap sopan dalam komplain.",
            options: [
              "'Buatkan email komplain'",
              "'Tulis email komplain yang sopan tapi tegas untuk paket terlambat 1 minggu, tone profesional, maksimal 150 kata'",
              "'Saya marah sama toko online'",
              "'Email untuk customer service'"
            ],
            correct: 1,
            explanation: "Prompt yang efektif harus spesifik: konteks jelas (paket terlambat), tone yang diinginkan (sopan tapi tegas), target (customer service), dan batasan (150 kata). Ini memberikan AI semua informasi yang dibutuhkan untuk output yang tepat."
          }
        ]
      }
    }
  ]

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    
    if (answerIndex === modules[activeModule].content.quiz[currentQuiz].correct) {
      setQuizScore(prev => prev + 1)
    }
  }

  const nextQuiz = () => {
    if (currentQuiz < modules[activeModule].content.quiz.length - 1) {
      setCurrentQuiz(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuiz(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setQuizScore(0)
  }

  const nextCard = () => {
    if (modules[activeModule].conceptCards && currentCard < modules[activeModule].conceptCards.length - 1) {
      setCurrentCard(prev => prev + 1)
    }
  }

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(prev => prev - 1)
    }
  }

  const initializeDragDrop = () => {
    if (modules[activeModule].dragDropData) {
      setDragItems([...modules[activeModule].dragDropData] as DragDropItem[])
      setDroppedItems({
        supervised: [],
        unsupervised: [],
        reinforcement: []
      })
    }
  }

  const handleDragStart = (e: React.DragEvent, item: DragDropItem) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item))
  }

  const handleDrop = (e: React.DragEvent, category: string) => {
    e.preventDefault()
    const item = JSON.parse(e.dataTransfer.getData('text/plain'))
    
    // Remove from dragItems
    setDragItems(prev => prev.filter(i => i.id !== item.id))
    
    // Add to dropped items
    setDroppedItems(prev => ({
      ...prev,
      [category]: [...prev[category], item]
    }))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const resetDragDrop = () => {
    initializeDragDrop()
  }

  // Initialize drag drop when module changes
  useEffect(() => {
    if (modules[activeModule].dragDropData) {
      initializeDragDrop()
    }
    setCurrentCard(0)
  }, [activeModule])

  // Interactive Card Component
  const ConceptCardSlider = ({ cards }: { cards: ConceptCard[] }) => (
    <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 mb-4 lg:mb-6">
      <div className="flex items-center justify-between mb-3 lg:mb-4">
        <h3 className="text-base lg:text-lg font-semibold text-neutral-900">Kartu Analogi Interaktif</h3>
        <div className="text-xs lg:text-sm text-neutral-600">
          {currentCard + 1} dari {cards.length}
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={`bg-gradient-to-br ${cards[currentCard].color} rounded-xl p-4 lg:p-6 text-white min-h-[240px] lg:min-h-[280px] flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-center mb-3 lg:mb-4">
                <div className="text-white/80 [&>svg]:w-8 [&>svg]:h-8 lg:[&>svg]:w-12 lg:[&>svg]:h-12">
                  {cards[currentCard].icon}
                </div>
              </div>
              
              <h4 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4 text-center leading-tight">
                {cards[currentCard].keySentence}
              </h4>
              
              <div className="bg-white/10 rounded-lg p-3 lg:p-4 backdrop-blur-sm">
                <p className="text-xs lg:text-sm font-medium mb-2">💡 Analogi:</p>
                <p className="text-white/90 text-sm lg:text-base leading-relaxed">
                  {cards[currentCard].analogy}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex items-center justify-between mt-3 lg:mt-4">
        <button
          onClick={prevCard}
          disabled={currentCard === 0}
          className="flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-200 transition-colors text-sm lg:text-base"
        >
          <ChevronLeft className="h-3 w-3 lg:h-4 lg:w-4" />
          <span className="hidden sm:inline">Sebelumnya</span>
          <span className="sm:hidden">Prev</span>
        </button>
        
        <div className="flex space-x-1 lg:space-x-2">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full transition-colors ${
                index === currentCard ? 'bg-blue-500' : 'bg-neutral-300'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextCard}
          disabled={currentCard === cards.length - 1}
          className="flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors text-sm lg:text-base"
        >
          <span className="hidden sm:inline">Selanjutnya</span>
          <span className="sm:hidden">Next</span>
          <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
        </button>
      </div>
    </div>
  )

  // Drag and Drop Component
  const DragDropLearning = () => (
    <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 mb-4 lg:mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 gap-3 sm:gap-0">
        <h3 className="text-base lg:text-lg font-semibold text-neutral-900 flex items-center">
          <Move className="h-4 w-4 lg:h-5 lg:w-5 mr-2 text-blue-500" />
          Seret & Lepas: Jenis Machine Learning
        </h3>
        <button
          onClick={resetDragDrop}
          className="px-3 py-1 text-sm bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors self-start sm:self-auto"
        >
          Reset
        </button>
      </div>

      {/* Drop Zones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-4 lg:mb-6">
        {[
          { key: 'supervised', title: 'Supervised Learning', desc: 'Belajar dari data berlabel', color: 'bg-blue-50 border-blue-200' },
          { key: 'unsupervised', title: 'Unsupervised Learning', desc: 'Mencari pola tersembunyi', color: 'bg-green-50 border-green-200' },
          { key: 'reinforcement', title: 'Reinforcement Learning', desc: 'Belajar dari trial & error', color: 'bg-purple-50 border-purple-200' }
        ].map(zone => (
          <div
            key={zone.key}
            onDrop={(e) => handleDrop(e, zone.key)}
            onDragOver={handleDragOver}
            className={`${zone.color} border-2 border-dashed rounded-lg p-3 lg:p-4 min-h-[100px] lg:min-h-[120px] transition-colors hover:opacity-80`}
          >
            <h4 className="font-medium text-neutral-900 mb-2 text-sm lg:text-base">{zone.title}</h4>
            <p className="text-xs lg:text-sm text-neutral-600 mb-2 lg:mb-3">{zone.desc}</p>
            <div className="space-y-1 lg:space-y-2">
              {droppedItems[zone.key].map(item => (
                <div key={item.id} className="bg-white rounded p-2 text-xs lg:text-xs shadow-sm leading-tight">
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Draggable Items */}
      <div className="border-t pt-3 lg:pt-4">
        <p className="text-xs lg:text-sm text-neutral-600 mb-2 lg:mb-3">Seret contoh-contoh ini ke kategori yang tepat:</p>
        <div className="flex flex-wrap gap-2">
          {dragItems.map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg cursor-move text-xs lg:text-sm border transition-colors leading-tight"
            >
              {item.text}
            </div>
          ))}
        </div>
        {dragItems.length === 0 && (
          <div className="text-green-600 font-medium text-xs lg:text-sm">
            ✅ Semua contoh sudah dikategorikan! Periksa apakah penempatan Anda sudah benar.
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pt-4 lg:pt-8 bg-gradient-to-br from-blue-50 to-white">
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 lg:mb-12"
        >
          <div className="inline-flex items-center px-3 lg:px-4 py-1.5 lg:py-2 bg-blue-100 text-blue-700 rounded-full text-xs lg:text-sm font-medium mb-4 lg:mb-6">
            <BookOpen className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
            Literasi AI
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-neutral-900 mb-4 lg:mb-6">
            Memahami <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dasar-dasar AI</span>
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto px-4">
            Learn fundamental AI concepts in an interactive and easy-to-understand way
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Module Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 order-2 lg:order-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-3 lg:p-6 lg:sticky lg:top-24">
              <h3 className="font-semibold text-neutral-900 mb-3 lg:mb-4 text-sm lg:text-base">Modul Pembelajaran</h3>
              <nav className="space-y-1 lg:space-y-2">
                {modules.map((module, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveModule(index)
                      resetQuiz()
                    }}
                    className={`w-full text-left flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg transition-colors ${
                      activeModule === index
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <div className={`flex-shrink-0 ${activeModule === index ? 'text-blue-600' : 'text-neutral-400'}`}>
                      {module.icon}
                    </div>
                    <span className="text-xs lg:text-sm font-medium leading-tight">{module.title}</span>
                  </button>
                ))}
              </nav>
              
              <div className="mt-3 lg:mt-6 pt-3 lg:pt-6 border-t border-neutral-200">
                <div className="text-xs lg:text-sm text-neutral-600 mb-2">Progress</div>
                <div className="w-full bg-neutral-200 rounded-full h-1.5 lg:h-2">
                  <div 
                    className="bg-blue-500 h-1.5 lg:h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((activeModule + 1) / modules.length) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  {activeModule + 1} dari {modules.length} modul
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 order-1 lg:order-2"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Module Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 lg:p-6 text-white">
                <div className="flex items-center space-x-2 lg:space-x-3 mb-1 lg:mb-3">
                  <div className="flex-shrink-0">
                    {modules[activeModule].icon}
                  </div>
                  <h2 className="text-base lg:text-2xl font-bold leading-tight">{modules[activeModule].title}</h2>
                </div>
              </div>

              {/* Content Tabs */}
              <div className="p-3 lg:p-6">
                <div className="flex space-x-1 lg:space-x-4 mb-4 lg:mb-6 border-b border-neutral-200 overflow-x-auto hide-scrollbar">
                  <button className="flex items-center space-x-1 lg:space-x-2 pb-2 lg:pb-3 border-b-2 border-blue-500 text-blue-600 whitespace-nowrap flex-shrink-0">
                    <Video className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span className="text-xs lg:text-base">Video & Materi</span>
                  </button>
                  <button className="flex items-center space-x-1 lg:space-x-2 pb-2 lg:pb-3 text-neutral-600 whitespace-nowrap flex-shrink-0">
                    <HelpCircle className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span className="text-xs lg:text-base">Quiz</span>
                  </button>
                </div>

                {/* Video Placeholder */}
                <div className="bg-neutral-100 rounded-lg p-4 lg:p-8 mb-4 lg:mb-6 text-center">
                  <PlayCircle className="h-12 w-12 lg:h-16 lg:w-16 text-neutral-400 mx-auto mb-2 lg:mb-4" />
                  <p className="text-neutral-600 text-sm lg:text-base">Video pembelajaran akan tersedia segera</p>
                </div>

                {/* Concept Cards */}
                {modules[activeModule].conceptCards && (
                  <ConceptCardSlider cards={modules[activeModule].conceptCards} />
                )}

                {/* Drag and Drop Learning */}
                {modules[activeModule].dragDropData && (
                  <DragDropLearning />
                )}

                {/* Quiz Section */}
                <div className="bg-neutral-50 rounded-lg p-4 lg:p-6">
                  <h3 className="text-base lg:text-lg font-semibold text-neutral-900 mb-3 lg:mb-4 flex items-center">
                    <HelpCircle className="h-4 w-4 lg:h-5 lg:w-5 mr-2 text-blue-500" />
                    Kuis Skenario Dunia Nyata
                  </h3>
                  
                  {modules[activeModule].content.quiz[currentQuiz] && (
                    <div>
                      {/* Scenario Box */}
                      {modules[activeModule].content.quiz[currentQuiz].scenario && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 lg:p-4 mb-3 lg:mb-4">
                          <h4 className="font-medium text-blue-900 mb-2 text-sm lg:text-base">🎭 Skenario:</h4>
                          <p className="text-blue-800 text-xs lg:text-sm leading-relaxed">
                            {modules[activeModule].content.quiz[currentQuiz].scenario}
                          </p>
                        </div>
                      )}
                      
                      <div className="mb-3 lg:mb-4">
                        <p className="font-medium text-neutral-900 mb-3 lg:mb-4 text-sm lg:text-base leading-relaxed">
                          {modules[activeModule].content.quiz[currentQuiz].question}
                        </p>
                        
                        <div className="space-y-2">
                          {modules[activeModule].content.quiz[currentQuiz].options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuizAnswer(index)}
                              disabled={showExplanation}
                              className={`w-full text-left p-2.5 lg:p-3 rounded-lg border transition-colors text-sm lg:text-base ${
                                selectedAnswer === index
                                  ? index === modules[activeModule].content.quiz[currentQuiz].correct
                                    ? 'bg-green-50 border-green-200 text-green-800'
                                    : 'bg-red-50 border-red-200 text-red-800'
                                  : 'bg-white border-neutral-200 hover:border-blue-300 hover:bg-blue-50'
                              } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="leading-relaxed">{option}</span>
                                {showExplanation && index === modules[activeModule].content.quiz[currentQuiz].correct && (
                                  <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-600 flex-shrink-0 ml-2" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {showExplanation && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-blue-50 border border-blue-200 rounded-lg p-3 lg:p-4 mb-3 lg:mb-4"
                        >
                          <h4 className="font-medium text-blue-900 mb-2 text-sm lg:text-base">💡 Penjelasan:</h4>
                          <p className="text-blue-800 text-xs lg:text-sm leading-relaxed">
                            {modules[activeModule].content.quiz[currentQuiz].explanation}
                          </p>
                        </motion.div>
                      )}

                      {showExplanation && (
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div className="text-xs lg:text-sm text-neutral-600">
                            Score: {quizScore}/{currentQuiz + 1}
                          </div>
                          {currentQuiz < modules[activeModule].content.quiz.length - 1 ? (
                            <button
                              onClick={nextQuiz}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 lg:px-4 py-2 rounded-lg font-medium transition-colors flex items-center text-sm lg:text-base"
                            >
                              Pertanyaan Berikutnya
                              <ArrowRight className="ml-2 h-3 w-3 lg:h-4 lg:w-4" />
                            </button>
                          ) : (
                            <div className="text-xs lg:text-sm text-green-600 font-medium">
                              ✅ Modul selesai!
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AILiteracy
