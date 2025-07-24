import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
  Users
} from 'lucide-react'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const AILiteracy = () => {
  const [activeModule, setActiveModule] = useState(0)
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  const modules = [
    {
      title: "Apa itu Artificial Intelligence?",
      icon: <Brain className="h-6 w-6" />,
      content: {
        video: "https://example.com/ai-basics.mp4",
        text: `Artificial Intelligence (AI) is technology that enables machines to perform tasks that typically require human intelligence. AI includes learning, reasoning, problem-solving, perception, and language understanding.

**Jenis-jenis AI:**
- **Narrow AI (Weak AI)**: AI designed for specific tasks (like ChatGPT, Siri)
- **General AI (Strong AI)**: AI with human-equivalent capabilities (doesn't exist yet)
- **Super AI**: AI that exceeds human capabilities (still theoretical concept)

**Examples of AI in daily life:**
- Netflix and YouTube recommendations
- Google Translate
- Virtual Assistant (Siri, Alexa)
- Filter spam email
- Navigasi GPS`,
        quiz: [
          {
            id: 1,
            question: "What is the main difference between Narrow AI and General AI?",
            options: [
              "Narrow AI is smarter than General AI",
              "Narrow AI for specific tasks, General AI for all tasks",
              "Narrow AI gratis, General AI berbayar",
              "Tidak ada perbedaan"
            ],
            correct: 1,
            explanation: "Narrow AI is designed for specific tasks like translating languages or recognizing faces, while General AI has human-like thinking and learning capabilities for various tasks."
          }
        ]
      }
    },
    {
      title: "Machine Learning & Deep Learning",
      icon: <Lightbulb className="h-6 w-6" />,
      content: {
        video: "https://example.com/ml-basics.mp4",
        text: `Machine Learning (ML) is a subset of AI that enables computers to learn without being explicitly programmed. Deep Learning is a subset of ML that uses layered neural networks.

**Jenis Machine Learning:**
- **Supervised Learning**: Belajar dari data berlabel (contoh: klasifikasi email spam)
- **Unsupervised Learning**: Mencari pola dari data tanpa label (contoh: segmentasi pelanggan)
- **Reinforcement Learning**: Belajar melalui trial and error (contoh: game AI)

**Neural Network & Deep Learning:**
Neural networks are inspired by how the human brain works. Deep learning uses many layers to process complex information like images, sound, and text.`,
        quiz: [
          {
            id: 2,
            question: "Apa yang membedakan Deep Learning dari Machine Learning tradisional?",
            options: [
              "Deep Learning menggunakan lebih banyak data",
              "Deep Learning menggunakan neural network berlapis",
              "Deep Learning lebih cepat",
              "Deep Learning lebih murah"
            ],
            correct: 1,
            explanation: "Deep Learning menggunakan neural network dengan banyak layer (lapisan) untuk memproses informasi kompleks, sedangkan machine learning tradisional menggunakan algoritma yang lebih sederhana."
          }
        ]
      }
    },
    {
      title: "Large Language Models (LLM)",
      icon: <FileText className="h-6 w-6" />,
      content: {
        video: "https://example.com/llm-basics.mp4",
        text: `Large Language Models (LLM) are types of AI trained on large text data to understand and generate human language. Examples: GPT, BERT, LLaMA.

**How LLMs Work:**
1. **Training**: Dilatih pada miliaran teks dari internet
2. **Prediction**: Memprediksi kata/token berikutnya berdasarkan konteks
3. **Generation**: Produces coherent and relevant text

**Kemampuan LLM:**
- Menjawab pertanyaan
- Menulis artikel dan kode
- Menerjemahkan bahasa
- Meringkas teks
- Creative writing

**LLM Limitations:**
- Can generate false information (hallucination)
- Tidak memiliki akses real-time
- Bias dari data training
- Tidak benar-benar "memahami" seperti manusia`,
        quiz: [
          {
            id: 3,
            question: "Apa yang dimaksud dengan 'hallucination' dalam konteks LLM?",
            options: [
              "LLM yang bermimpi",
              "LLM generates information that appears correct but is actually wrong",
              "LLM yang bisa melihat gambar",
              "LLM that works at night"
            ],
            correct: 1,
            explanation: "Hallucination is when LLMs generate information that appears convincing and logical, but is actually wrong or inaccurate. This happens because LLMs predict based on patterns, not true understanding."
          }
        ]
      }
    },
    {
      title: "Prompt Engineering",
      icon: <Users className="h-6 w-6" />,
      content: {
        video: "https://example.com/prompt-engineering.mp4",
        text: `Prompt Engineering is the art and science of designing effective instructions (prompts) for AI to produce desired outputs.

**Prinsip Prompt yang Baik:**
1. **Jelas dan Spesifik**: Hindari ambiguitas
2. **Sufficient Context**: Provide necessary information
3. **Format yang Konsisten**: Gunakan struktur yang teratur
4. **Examples (Few-shot)**: Provide examples if needed

**Teknik Prompt Engineering:**
- **Zero-shot**: Tanpa contoh
- **Few-shot**: Dengan beberapa contoh
- **Chain of Thought**: Minta AI untuk berpikir step-by-step
- **Role Playing**: Minta AI berperan sebagai expert

**Contoh Prompt Buruk vs Baik:**
❌ "Buatkan artikel"
✅ "Create a 500-word article about the benefits of exercise for mental health, targeting teenagers, use a casual tone and include 3 practical tips."`,
        quiz: [
          {
            id: 4,
            question: "Teknik prompt mana yang meminta AI untuk menjelaskan langkah-langkah pemikirannya?",
            options: [
              "Zero-shot prompting",
              "Few-shot prompting", 
              "Chain of Thought prompting",
              "Role Playing prompting"
            ],
            correct: 2,
            explanation: "Chain of Thought prompting asks AI to explain its thinking process step by step, which often produces more accurate and verifiable answers."
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
            Literasi AI
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Memahami <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dasar-dasar AI</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Learn fundamental AI concepts in an interactive and easy-to-understand way
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Module Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-semibold text-neutral-900 mb-4">Modul Pembelajaran</h3>
              <nav className="space-y-2">
                {modules.map((module, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveModule(index)
                      resetQuiz()
                    }}
                    className={`w-full text-left flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      activeModule === index
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <div className={`${activeModule === index ? 'text-blue-600' : 'text-neutral-400'}`}>
                      {module.icon}
                    </div>
                    <span className="text-sm font-medium">{module.title}</span>
                  </button>
                ))}
              </nav>
              
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="text-sm text-neutral-600 mb-2">Progress</div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
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
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Module Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  {modules[activeModule].icon}
                  <h2 className="text-2xl font-bold">{modules[activeModule].title}</h2>
                </div>
              </div>

              {/* Content Tabs */}
              <div className="p-6">
                <div className="flex space-x-4 mb-6 border-b border-neutral-200">
                  <button className="flex items-center space-x-2 pb-3 border-b-2 border-blue-500 text-blue-600">
                    <Video className="h-4 w-4" />
                    <span>Video & Materi</span>
                  </button>
                  <button className="flex items-center space-x-2 pb-3 text-neutral-600">
                    <HelpCircle className="h-4 w-4" />
                    <span>Quiz</span>
                  </button>
                </div>

                {/* Video Placeholder */}
                <div className="bg-neutral-100 rounded-lg p-8 mb-6 text-center">
                  <PlayCircle className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-600">Video pembelajaran akan tersedia segera</p>
                </div>

                {/* Text Content */}
                <div className="prose max-w-none mb-8">
                  <div className="whitespace-pre-line text-neutral-700 leading-relaxed">
                    {modules[activeModule].content.text}
                  </div>
                </div>

                {/* Quiz Section */}
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
                    Quiz Pemahaman
                  </h3>
                  
                  {modules[activeModule].content.quiz[currentQuiz] && (
                    <div>
                      <div className="mb-4">
                        <p className="font-medium text-neutral-900 mb-4">
                          {modules[activeModule].content.quiz[currentQuiz].question}
                        </p>
                        
                        <div className="space-y-2">
                          {modules[activeModule].content.quiz[currentQuiz].options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuizAnswer(index)}
                              disabled={showExplanation}
                              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                selectedAnswer === index
                                  ? index === modules[activeModule].content.quiz[currentQuiz].correct
                                    ? 'bg-green-50 border-green-200 text-green-800'
                                    : 'bg-red-50 border-red-200 text-red-800'
                                  : 'bg-white border-neutral-200 hover:border-blue-300 hover:bg-blue-50'
                              } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{option}</span>
                                {showExplanation && index === modules[activeModule].content.quiz[currentQuiz].correct && (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
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
                          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4"
                        >
                          <h4 className="font-medium text-blue-900 mb-2">Penjelasan:</h4>
                          <p className="text-blue-800">
                            {modules[activeModule].content.quiz[currentQuiz].explanation}
                          </p>
                        </motion.div>
                      )}

                      {showExplanation && (
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-neutral-600">
                            Score: {quizScore}/{currentQuiz + 1}
                          </div>
                          {currentQuiz < modules[activeModule].content.quiz.length - 1 ? (
                            <button
                              onClick={nextQuiz}
                              className="btn-primary"
                            >
                              Pertanyaan Berikutnya
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                          ) : (
                            <div className="text-sm text-green-600 font-medium">
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
