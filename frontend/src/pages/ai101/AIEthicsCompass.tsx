import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Compass, 
  Brain, 
  MessageSquare,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Users,
  Scale,
  Heart,
  Shield,
  Eye,
  Sparkles,
  Send,
  Loader,
  CheckCircle,
  FileText,
  ExternalLink,
  RotateCcw
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface EthicalDilemma {
  userInput: string
  aiResponse: string
  timestamp: Date
}

const AIEthicsCompass = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'input' | 'processing' | 'compass' | 'reflection'>('intro')
  const [userInput, setUserInput] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [dilemmaHistory, setDilemmaHistory] = useState<EthicalDilemma[]>([])

  // Simulated AI response (in real implementation, this would call Gemini API)
  const generateEthicalQuestions = async (input: string): Promise<string> => {
    // This is where you'd implement the actual Gemini API call
    // For now, we'll simulate with a realistic response
    
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Meta-prompt logic simulation based on input analysis
    let response = ""
    
    if (input.toLowerCase().includes('ai art') || input.toLowerCase().includes('ilustrator') || input.toLowerCase().includes('gaya')) {
      response = `Pertanyaan yang sangat penting untuk direfleksikan. Untuk membantu Anda menavigasi dilema ini, coba renungkan beberapa aspek berikut:

🎨 **Dampak pada Kreator Asli:**
• Bagaimana potensi dampaknya terhadap karier dan pendapatan artist original jika gaya mereka bisa direplikasi dengan mudah?
• Apakah ini dapat mengurangi nilai unik dari karya manual yang membutuhkan waktu bertahun-tahun untuk dikuasai?

✨ **Originalitas vs. Inspirasi:**
• Di mana batas antara 'terinspirasi' dengan 'meniru secara berlebihan'?
• Apakah karya Anda masih memiliki elemen keunikan yang kuat dan identitas personal?

🤝 **Transparansi & Atribusi:**
• Apakah Anda berencana untuk secara terbuka menyebutkan bahwa karya ini dibuat dengan AI?
• Bagaimana cara memberikan kredit yang fair kepada artist yang menjadi inspirasi?

⚖️ **Keadilan (Fairness):**
• Apakah adil menghasilkan karya dalam hitungan menit dengan meniru gaya yang dibangun seseorang selama bertahun-tahun?
• Bagaimana ini mempengaruhi ekosistem kreator secara keseluruhan?

💬 **Persetujuan (Consent):**
• Apakah artist tersebut pernah memberikan pernyataan mengenai penggunaan karyanya untuk AI training?
• Bagaimana perasaan Anda jika karya Anda digunakan tanpa sepengetahuan untuk melatih AI?

Refleksi ini bukan untuk memberikan jawaban benar/salah, tapi untuk membantu Anda membuat keputusan yang selaras dengan nilai-nilai personal dan dampak yang ingin Anda ciptakan.`
    } else if (input.toLowerCase().includes('deepfake') || input.toLowerCase().includes('voice') || input.toLowerCase().includes('suara')) {
      response = `Dilema yang sangat relevan di era AI. Mari kita eksplorasi berbagai sudut pandang untuk membantu Anda menemukan clarity:

🔍 **Tujuan & Intensi:**
• Apa tujuan utama Anda menggunakan teknologi ini?
• Apakah ada cara alternatif untuk mencapai tujuan yang sama tanpa deepfake/voice cloning?

👥 **Dampak pada Individu:**
• Bagaimana perasaan orang yang suara/wajahnya akan digunakan jika mereka mengetahuinya?
• Apakah ada potensi kerugian psikologis, finansial, atau reputasi bagi mereka?

🎭 **Autentisitas vs. Deception:**
• Apakah audience akan tahu bahwa ini adalah hasil AI?
• Di mana batas antara 'creative tool' dengan 'misleading content'?

⚖️ **Konteks Penggunaan:**
• Apakah ini untuk hiburan, edukasi, komersial, atau tujuan lain?
• Bagaimana konteks ini mempengaruhi tingkat etikalitas penggunaan?

🛡️ **Consent & Legal:**
• Apakah Anda memiliki izin eksplisit dari orang tersebut?
• Bagaimana regulasi di Indonesia mengatur penggunaan teknologi ini?

🌍 **Dampak Sosial Jangka Panjang:**
• Jika semua orang melakukan hal yang sama, bagaimana dampaknya terhadap kepercayaan publik?
• Apakah ini berkontribusi pada "information pollution" atau justru innovation yang positif?

Pertimbangkan juga: bagaimana Anda akan menjelaskan keputusan ini kepada orang yang Anda hormati?`
    } else if (input.toLowerCase().includes('data') || input.toLowerCase().includes('privacy') || input.toLowerCase().includes('privasi')) {
      response = `Isu privasi data adalah inti dari etika AI modern. Mari kita jelajahi dimensi-dimensi penting:

🔐 **Informed Consent:**
• Apakah orang-orang yang datanya Anda gunakan benar-benar memahami untuk apa data mereka digunakan?
• Seberapa eksplisit dan mudah dipahami consent yang diberikan?

📊 **Minimalisasi Data:**
• Apakah Anda benar-benar membutuhkan semua data yang dikumpulkan?
• Bisakah tujuan yang sama dicapai dengan data yang lebih sedikit atau menos sensitive?

🎯 **Purpose Limitation:**
• Apakah penggunaan data sesuai dengan tujuan awal yang dikomunikasikan?
• Bagaimana jika ada opportunity untuk menggunakan data untuk tujuan lain yang "lebih baik"?

⚡ **Power Dynamics:**
• Apakah ada ketidakseimbangan power antara Anda dan pemilik data?
• Seberapa mudah bagi mereka untuk menolak atau menarik consent?

🔄 **Data Lifecycle:**
• Berapa lama data akan disimpan?
• Bagaimana proses penghapusan data ketika tidak lagi dibutuhkan?

🌐 **Cross-border Considerations:**
• Jika data melintasi negara, bagaimana perbedaan regulasi mempengaruhi etikalitas?

🤔 **The Golden Rule Test:**
• Bagaimana perasaan Anda jika data pribadi Anda digunakan dengan cara yang sama?
• Apakah Anda comfortable jika keluarga/teman tahu tentang praktik data Anda?

Ingat: privacy bukan hanya tentang compliance, tapi tentang menghormati human dignity dan autonomy.`
    } else {
      // General ethical AI dilemma
      response = `Terima kasih telah membagikan dilema Anda. Setiap situasi etika AI memiliki kompleksitas unik. Mari kita eksplorasi framework untuk membantu refleksi:

🎯 **Stakeholder Impact Analysis:**
• Siapa saja yang akan terpengaruh langsung dan tidak langsung oleh keputusan Anda?
• Bagaimana dampak positif dan negatif pada masing-masing stakeholder?

⚖️ **Nilai-nilai yang Bertentangan:**
• Nilai-nilai apa yang sedang "berkompetisi" dalam situasi ini?
• Apakah ada cara untuk honor multiple values secara bersamaan?

🔮 **Long-term vs. Short-term:**
• Bagaimana keputusan ini akan terlihat dalam 1 tahun, 5 tahun ke depan?
• Apakah ada trade-off antara benefit jangka pendek dengan risk jangka panjang?

🌍 **Precedent & Scale:**
• Jika semua orang dalam posisi Anda membuat keputusan yang sama, apa yang terjadi?
• Apakah Anda comfortable jika keputusan ini menjadi "new normal"?

💡 **Alternative Solutions:**
• Apakah ada cara lain untuk mencapai tujuan yang sama dengan risk yang lebih kecil?
• Bagaimana jika kita flip the problem - apa yang TIDAK boleh dilakukan?

🤝 **Transparency Test:**
• Seberapa comfortable Anda menjelaskan keputusan ini secara publik?
• Apakah ada aspek yang Anda sembunyikan karena merasa tidak nyaman?

❤️ **Empathy Check:**
• Jika Anda berada di posisi orang yang paling terdampak, bagaimana perasaan Anda?
• Apakah ada cara untuk melibatkan mereka dalam decision-making process?

Ethical decision making bukan tentang finding perfect answer, tapi about making thoughtful choices yang selaras dengan nilai-nilai Anda.`
    }
    
    setIsLoading(false)
    return response
  }

  const handleSubmit = async () => {
    if (!userInput.trim()) return
    
    setCurrentStep('processing')
    
    try {
      const response = await generateEthicalQuestions(userInput)
      setAiResponse(response)
      
      // Save to history
      const newDilemma: EthicalDilemma = {
        userInput: userInput,
        aiResponse: response,
        timestamp: new Date()
      }
      setDilemmaHistory(prev => [newDilemma, ...prev])
      
      setCurrentStep('compass')
    } catch (error) {
      console.error('Error generating response:', error)
      // Handle error appropriately
    }
  }

  const resetCompass = () => {
    setCurrentStep('intro')
    setUserInput('')
    setAiResponse('')
  }

  const startNewReflection = () => {
    setCurrentStep('input')
    setUserInput('')
    setAiResponse('')
  }

  // Intro Step
  if (currentStep === 'intro') {
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Compass className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              AI Ethics <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Compass</span>
            </h1>
            
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Does not give "allowed" or "not allowed" answers. But asks the right questions to help you find wisdom in every AI ethics dilemma.
            </p>
          </motion.div>

          {/* Philosophy Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                <Brain className="h-6 w-6 mr-3" />
                AI Ethics Compass
              </h2>
              <p className="opacity-90">Wisdom through self-discovery, not through instruction</p>
            </div>
            
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">1. Share Your Dilemma</h3>
                  <p className="text-neutral-600 text-sm">Describe the AI ethics situation you're facing</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">2. AI Analyzes</h3>
                  <p className="text-neutral-600 text-sm">System generates relevant Socratic questions</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">3. Deep Reflection</h3>
                  <p className="text-neutral-600 text-sm">Find clarity through guided self-reflection</p>
                </div>
              </div>

              {/* Key Principles */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-neutral-900 mb-4 flex items-center">
                  <Heart className="h-5 w-5 text-purple-600 mr-2" />
                  Ethics Compass Principles
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">Non-judgmental: Doesn't judge, only facilitates</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Users className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">Contextual: Every dilemma is unique and personal</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Scale className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">Empowering: Empowers critical thinking</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Eye className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">Holistic: Views from various perspectives</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setCurrentStep('input')}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
                >
                  <Compass className="h-5 w-5" />
                  <span>Start Ethics Navigation</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Example Dilemmas */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Example Dilemmas You Can Explore:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-purple-800">"I want to use AI to create videos with a style similar to a famous creator. Is this ethical?"</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <p className="text-indigo-800">"My company wants to use customer data for AI training. What's the ethical way?"</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800">"I was asked to create a deepfake for an educational campaign. Are there ethical issues?"</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-purple-800">"Our AI chatbot sometimes gives wrong advice. How responsible are we?"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Input Step
  if (currentStep === 'input') {
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => setCurrentStep('intro')}
              className="flex items-center space-x-2 text-neutral-600 hover:text-purple-600 transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Share Your Dilemma</h1>
              <p className="text-neutral-600">Describe the AI ethics situation you're facing freely and in detail</p>
            </div>
          </div>

          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white">
              <h2 className="text-xl font-bold">Reflection Space</h2>
              <p className="opacity-90 text-sm">No judgment here. Just space for honest exploration.</p>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Describe the ethical dilemma or concern you're facing regarding AI use:
                </label>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Contoh: 'Saya ingin menggunakan AI untuk membuat konten dengan gaya yang sangat mirip dengan creator favorit saya. Di satu sisi ini efisien, tapi di sisi lain saya merasa tidak fair terhadap creator tersebut. Saya bingung apakah ini etis atau tidak...'"
                  className="w-full h-48 p-4 border border-neutral-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-neutral-500">The more detailed, the more personalized guidance you'll receive</p>
                  <p className="text-xs text-neutral-500">{userInput.length} characters</p>
                </div>
              </div>

              {/* Guidelines */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-purple-900 mb-2">Tips for Effective Reflection:</h4>
                <ul className="text-purple-800 text-sm space-y-1 list-disc list-inside">
                  <li>Explain your situation's context specifically</li>
                  <li>Mention parties that might be affected</li>
                  <li>Express the doubts or internal conflicts you feel</li>
                  <li>No need to censor - this is a safe space for honest reflection</li>
                </ul>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!userInput.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium py-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Start Ethics Exploration</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Processing Step
  if (currentStep === 'processing') {
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader className="h-12 w-12 text-white" />
            </motion.div>
          </div>
          
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Analyzing Your Dilemma...</h2>
          <p className="text-neutral-600 max-w-md mx-auto">
            AI is processing the context and generating relevant Socratic questions to help your reflection.
          </p>
          
          <div className="flex justify-center space-x-1 mt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-2 h-2 bg-purple-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  // Compass Results Step
  if (currentStep === 'compass') {
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Compass className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Your Ethics Compass</h1>
            <p className="text-neutral-600">Questions to guide deep reflection</p>
          </motion.div>

          {/* Original Dilemma */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="font-semibold text-neutral-900 mb-3 flex items-center">
              <MessageSquare className="h-5 w-5 text-purple-600 mr-2" />
              The Dilemma You Shared:
            </h3>
            <div className="bg-neutral-50 rounded-lg p-4">
              <p className="text-neutral-700 italic">"{userInput}"</p>
            </div>
          </div>

          {/* AI Response */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white">
              <h2 className="text-xl font-bold flex items-center">
                <Brain className="h-6 w-6 mr-3" />
                Questions for Reflection
              </h2>
              <p className="opacity-90 text-sm">Not answers, but pathways to wisdom</p>
            </div>
            
            <div className="p-8">
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-neutral-700 leading-relaxed">
                  {aiResponse}
                </div>
              </div>
            </div>
          </div>

          {/* Reflection Prompt */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200 p-6 mb-8">
            <h3 className="font-semibold text-purple-900 mb-3 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              Next Steps:
            </h3>
            <div className="text-purple-800 space-y-2 text-sm">
              <p>• Take time to honestly reflect on each question</p>
              <p>• Discuss with mentors, friends, or colleagues you trust</p>
              <p>• Consider writing your answers as a form of self-dialogue</p>
              <p>• Remember: there are no perfect answers, only thoughtful decisions</p>
            </div>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={startNewReflection}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Explore Another Dilemma</span>
            </button>
            
            <button
              onClick={() => setCurrentStep('reflection')}
              className="bg-white border border-purple-200 text-purple-700 font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:bg-purple-50 flex items-center justify-center space-x-2"
            >
              <FileText className="h-5 w-5" />
              <span>Save Reflection</span>
            </button>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <Link
              to="/ai101"
              className="inline-flex items-center space-x-2 text-neutral-600 hover:text-purple-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to AI 101</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Reflection History Step
  if (currentStep === 'reflection') {
    return (
      <div className="min-h-screen pt-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Your Ethics Journal</h1>
            <p className="text-neutral-600">Collection of reflections for ethical thinking growth</p>
          </motion.div>

          {/* Current Session */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-neutral-900">Latest Reflection Session</h3>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Dilemma:</label>
                <p className="text-neutral-600 text-sm bg-neutral-50 rounded p-3">{userInput}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Reflection Questions:</label>
                <div className="text-neutral-600 text-sm bg-neutral-50 rounded p-3 max-h-48 overflow-y-auto">
                  <div className="whitespace-pre-line">{aiResponse}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Reflection Tools */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="font-semibold text-neutral-900 mb-4">Tools for Further Reflection</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link 
                to="/prompt-evaluator"
                className="block p-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors duration-200 text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="font-semibold text-blue-900 mb-1">Prompt Evaluator</div>
                <div className="text-blue-700 text-sm">Evaluate ethical prompting</div>
              </Link>
              
              <Link 
                to="/ai-simulator"
                className="block p-4 rounded-lg border border-green-200 hover:bg-green-50 transition-colors duration-200 text-center"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="font-semibold text-green-900 mb-1">AI Simulator</div>
                <div className="text-green-700 text-sm">Simulate ethical scenarios</div>
              </Link>
              
              <a 
                href="https://www.partnershiponai.org"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors duration-200 text-center"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ExternalLink className="h-6 w-6 text-purple-600" />
                </div>
                <div className="font-semibold text-purple-900 mb-1">AI Ethics Resources</div>
                <div className="text-purple-700 text-sm">Global AI ethics guidelines</div>
              </a>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetCompass}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="h-5 w-5" />
              <span>Start New Exploration</span>
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

export default AIEthicsCompass
