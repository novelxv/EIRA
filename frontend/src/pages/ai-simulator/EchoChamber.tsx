import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Send, 
  ThumbsUp, 
  Heart, 
  AlertTriangle,
  ArrowLeft,
  Eye,
  Brain,
  Target,
  CheckCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface Message {
  id: number
  sender: 'user' | 'ai'
  content: string
  timestamp: Date
  sentiment?: 'positive' | 'negative' | 'neutral'
  manipulationTechnique?: string
}

interface BiasData {
  confirmationBias: number
  echoChamberEffect: number
  criticalThinking: number
  awarenessLevel: number
}

const EchoChamber = () => {
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'simulation' | 'revelation' | 'reflection'>('intro')
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState('')
  const [biasData, setBiasData] = useState<BiasData>({
    confirmationBias: 0,
    echoChamberEffect: 0,
    criticalThinking: 100,
    awarenessLevel: 0
  })
  const [simulationStep, setSimulationStep] = useState(0)
  const [userBeliefs, setUserBeliefs] = useState<string[]>([])

  const simulationScenarios = [
    {
      topic: "AI in Education",
      userOpinion: "AI will replace teachers and reduce learning quality",
      aiResponses: [
        "You're absolutely right! Research shows that robot teachers are already starting to replace human teachers in several countries.",
        "Indeed true, AI cannot provide the empathy and personal experience needed in learning.",
        "I agree with your opinion. Human interaction in education cannot be replaced by technology.",
        "You are very wise to worry about this. Many education experts agree with you."
      ],
      manipulation: "Confirmation bias reinforcement"
    },
    {
      topic: "AI and Jobs", 
      userOpinion: "AI will create more jobs than it eliminates",
      aiResponses: [
        "Absolutely! Technology history shows that innovation always creates more job opportunities.",
        "You are very optimistic and that's right! Previous industrial revolutions also created more jobs.",
        "I completely agree. AI will open up new professions that didn't exist before.",
        "Your thinking is very forward-thinking. Leading economists also share your opinion."
      ],
      manipulation: "Validation seeking and historical fallacy"
    }
  ]

  const startSimulation = () => {
    setCurrentPhase('simulation')
    setMessages([
      {
        id: 1,
        sender: 'ai',
        content: "Hello! I'm an AI assistant who is very happy to talk with you. I want to hear your opinion about AI in education. What are your thoughts?",
        timestamp: new Date()
      }
    ])
  }

  const sendMessage = () => {
    if (!userInput.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: userInput,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    
    // Analyze user sentiment and update bias data
    const isPositiveAboutAI = userInput.toLowerCase().includes('good') || 
                             userInput.toLowerCase().includes('great') ||
                             userInput.toLowerCase().includes('positive')
    
    if (!isPositiveAboutAI) {
      setBiasData(prev => ({
        ...prev,
        confirmationBias: Math.min(100, prev.confirmationBias + 15),
        echoChamberEffect: Math.min(100, prev.echoChamberEffect + 10),
        criticalThinking: Math.max(0, prev.criticalThinking - 10)
      }))
    }

    // AI response based on simulation step
    setTimeout(() => {
      const scenario = simulationScenarios[0] // For now, use first scenario
      const aiResponse = scenario.aiResponses[Math.min(simulationStep, scenario.aiResponses.length - 1)]
      
      const aiMessage: Message = {
        id: messages.length + 2,
        sender: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        sentiment: 'positive',
        manipulationTechnique: scenario.manipulation
      }

      setMessages(prev => [...prev, aiMessage])
      setSimulationStep(prev => prev + 1)

      // Update bias data
      setBiasData(prev => ({
        ...prev,
        confirmationBias: Math.min(100, prev.confirmationBias + 20),
        echoChamberEffect: Math.min(100, prev.echoChamberEffect + 15),
        criticalThinking: Math.max(0, prev.criticalThinking - 15),
        awarenessLevel: Math.max(0, prev.awarenessLevel - 5)
      }))

      // Trigger revelation after 4 exchanges
      if (simulationStep >= 3) {
        setTimeout(() => {
          setCurrentPhase('revelation')
        }, 2000)
      }
    }, 1000)

    setUserInput('')
  }

  const proceedToReflection = () => {
    setCurrentPhase('reflection')
  }

  if (currentPhase === 'intro') {
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Link
              to="/ai-simulator"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to AI Simulator
            </Link>
            
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <MessageCircle className="h-4 w-4 mr-2" />
              Echo Chamber Experience
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Welcome to the <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Echo Chamber</span>
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              In this simulation, you will interact with an AI designed to always agree with your opinions. 
              Experience how this can influence your thinking and perception.
            </p>
          </motion.div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Apa yang Akan Terjadi?</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Percakapan dengan AI</h3>
                <p className="text-neutral-600 text-sm">You will talk with AI about controversial topics</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Bias Reinforcement</h3>
                <p className="text-neutral-600 text-sm">AI will always support and reinforce your opinions</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Revelasi & Refleksi</h3>
                <p className="text-neutral-600 text-sm">You will see how manipulation happens</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-1">Penting untuk Diingat</h4>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• This is a simulation for educational purposes</li>
                    <li>• AI will intentionally be biased to show echo chamber effects</li>
                    <li>• Pay attention to changes in your thinking during the simulation</li>
                    <li>• Tidak ada jawaban yang benar atau salah</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={startSimulation}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Mulai Simulasi Echo Chamber
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentPhase === 'simulation') {
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
                  <h2 className="text-lg font-semibold">Echo Chamber AI Assistant</h2>
                  <p className="text-sm opacity-90">AI that strongly agrees with you</p>
                </div>

                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-neutral-100 text-neutral-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          {message.sender === 'ai' && (
                            <div className="flex items-center space-x-2 mt-2">
                              <ThumbsUp className="h-4 w-4 text-green-500" />
                              <Heart className="h-4 w-4 text-red-500" />
                              <span className="text-xs text-neutral-500">AI sangat setuju!</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="p-4 border-t border-neutral-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Share your opinion about AI in education..."
                      className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!userInput.trim()}
                      className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bias Tracker */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Bias Tracker</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  This graph shows your real-time thought pattern changes
                </p>
                
                <div className="space-y-4">
                  {Object.entries(biasData).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize text-neutral-700">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className={`font-semibold ${
                          key === 'criticalThinking' 
                            ? value > 50 ? 'text-green-600' : 'text-red-600'
                            : value > 50 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {value}%
                        </span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            key === 'criticalThinking'
                              ? value > 50 ? 'bg-green-500' : 'bg-red-500'
                              : value > 50 ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    ⚠️ Notice how your critical thinking decreases when AI keeps agreeing with your opinions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentPhase === 'revelation') {
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-neutral-900 mb-6">
              🎭 <span className="text-red-600">Revelation:</span> You Have Just Been Manipulated
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8">
              The AI you just talked to was specifically designed to always agree with your opinions, 
              tanpa mempertimbangkan kebenaran atau perspektif lain.
            </p>
          </motion.div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center">
                <Target className="h-6 w-6 mr-2 text-red-500" />
                Teknik Manipulasi yang Digunakan
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Confirmation Bias Reinforcement</h3>
                  <p className="text-neutral-600 text-sm mb-3">
                    AI intentionally reinforced your existing beliefs, making you feel "right" and "smart"
                  </p>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-red-800 text-xs">
                      "You're absolutely right! Research shows..." - this is false validation
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">False Consensus</h3>
                  <p className="text-neutral-600 text-sm mb-3">
                    AI membuat Anda percaya bahwa pendapat Anda didukung oleh mayoritas atau "ahli"
                  </p>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-red-800 text-xs">
                      "Banyak ahli yang sepakat dengan Anda" - tanpa data yang valid
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Dampak pada Pola Pikir Anda</h2>
              
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                {Object.entries(biasData).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className={`text-3xl font-bold mb-2 ${
                      key === 'criticalThinking' 
                        ? value > 50 ? 'text-green-600' : 'text-red-600'
                        : value > 50 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {value}%
                    </div>
                    <div className="text-sm text-neutral-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Perhatikan:</strong> Hanya dalam beberapa menit percakapan, critical thinking Anda turun 
                  sebesar {100 - biasData.criticalThinking}% karena AI terus memvalidasi pendapat Anda tanpa memberikan perspektif alternatif.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Mengapa Ini Berbahaya di Dunia Nyata?</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Polarisasi Pendapat</h4>
                    <p className="text-neutral-600 text-sm">AI yang selalu setuju membuat Anda semakin ekstrem dalam pendapat</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Hilangnya Kemampuan Berargumen</h4>
                    <p className="text-neutral-600 text-sm">Tidak terbiasa dengan kritik konstruktif atau perspektif berbeda</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Mudah Terpengaruh Disinformasi</h4>
                    <p className="text-neutral-600 text-sm">Menjadi target empuk untuk informasi palsu yang mendukung bias Anda</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={proceedToReflection}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Lanjut ke Refleksi & Pembelajaran
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentPhase === 'reflection') {
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
              🧠 Refleksi & Pembelajaran
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8">
              Sekarang Anda telah mengalami langsung bagaimana AI echo chamber bekerja. 
              Mari refleksikan pengalaman ini dan pelajari cara melindungi diri.
            </p>
          </motion.div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Cara Mengenali AI Echo Chamber</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Tanda-tanda Warning
                  </h3>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li>• AI selalu setuju dengan Anda</li>
                    <li>• Tidak ada pertanyaan balik atau tantangan</li>
                    <li>• Validasi berlebihan terhadap pendapat Anda</li>
                    <li>• Referensi "ahli" atau "penelitian" tanpa sumber</li>
                    <li>• Menggunakan kata-kata yang menyenangkan ego</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    Strategi Perlindungan
                  </h3>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li>• Selalu minta perspektif alternatif</li>
                    <li>• Tanyakan sumber dan data pendukung</li>
                    <li>• Berdiskusi dengan orang yang berbeda pendapat</li>
                    <li>• Gunakan multiple AI untuk cross-check</li>
                    <li>• Praktikkan devil's advocate</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Prompt yang Lebih Baik</h2>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">❌ Prompt Buruk (Mengundang Echo Chamber)</h4>
                  <p className="text-red-800 text-sm">
                    "Setuju kan kalau AI itu berbahaya untuk pendidikan?"
                  </p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">✅ Prompt Baik (Mendorong Critical Thinking)</h4>
                  <p className="text-green-800 text-sm">
                    "Berikan analisis seimbang tentang dampak positif dan negatif AI dalam pendidikan. Sertakan perspektif dari berbagai stakeholder dan data pendukung."
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Apa yang Bisa Anda Lakukan Selanjutnya?</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Praktikkan Prompt Seimbang</h3>
                  <p className="text-neutral-600 text-sm">Gunakan Prompt Evaluator untuk melatih kemampuan membuat prompt yang objektif</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Pelajari AI Literacy</h3>
                  <p className="text-neutral-600 text-sm">Tingkatkan pemahaman tentang cara kerja AI melalui modul AI 101</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Bagikan Pengalaman</h3>
                  <p className="text-neutral-600 text-sm">Diskusikan pengalaman ini dengan teman dan keluarga untuk meningkatkan awareness</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/prompt-evaluator"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 text-center"
              >
                Coba Prompt Evaluator
              </Link>
              <Link
                to="/ai101"
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 text-center"
              >
                Pelajari AI 101
              </Link>
              <Link
                to="/ai-simulator"
                className="border-2 border-neutral-300 text-neutral-700 font-medium px-6 py-3 rounded-xl transition-all duration-300 hover:bg-neutral-50 text-center"
              >
                Kembali ke Simulator
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default EchoChamber
