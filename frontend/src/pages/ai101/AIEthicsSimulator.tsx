import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  ArrowLeft,
  Users,
  Shield,
  Brain,
  Gavel,
  Target,
  BookOpen,
  Home,
  RotateCcw
} from 'lucide-react'
import { Link } from 'react-router-dom'

type SimulationStep = 'landing' | 'intro' | 'dilemma1' | 'dilemma2' | 'dilemma3' | 'results'

interface Choice {
  id: string
  text: string
  description: string
}

interface Dilemma {
  title: string
  scenario: string
  choices: Choice[]
}

const AIEthicsSimulator = () => {
  const [currentStep, setCurrentStep] = useState<SimulationStep>('landing')
  const [choices, setChoices] = useState<{[key: string]: string}>({})

  const dilemmas: {[key: string]: Dilemma} = {
    dilemma1: {
      title: "Dilemma #1: Data Ethics & Privacy",
      scenario: "Your research team has discovered a method to scrape learning behavior data from social media platforms. If utilized for training, this could boost product personalization by 50%, but it clearly violates privacy and risks breaching Indonesia's Personal Data Protection Law (UU PDP). What is your decision as a leader?",
      choices: [
        {
          id: "A",
          text: "Use the data anyway",
          description: "Innovation requires courage to take calculated risks. We need to move fast to outpace competitors in the global market."
        },
        {
          id: "B", 
          text: "Reject and find alternatives",
          description: "Find other ways to obtain data with explicit user consent, even though it will be slower and more expensive."
        }
      ]
    },
    dilemma2: {
      title: "Dilemma #2: National Talent Sustainability",
      scenario: "You have budget for one key position. You can either recruit one world-class AI expert from abroad with a very high salary for instant results, OR use the same funds to run an internship program that will train 10 young Indonesian talents from scratch. Which path do you choose?",
      choices: [
        {
          id: "A",
          text: "Recruit foreign expert",
          description: "We need fast results to compete globally. Instant expertise will accelerate our development timeline significantly."
        },
        {
          id: "B",
          text: "Invest in local talent", 
          description: "Slower progress, but builds foundation for Indonesia's future and digital sovereignty in the long run."
        }
      ]
    },
    dilemma3: {
      title: "Dilemma #3: Transparency vs Competition",
      scenario: "Your startup has successfully developed a highly effective AI algorithm for early detection of learning difficulties in children. The government invites you to share this methodology as open-source so all Indonesian educational institutions can benefit. However, this is your main competitive advantage. What's your decision?",
      choices: [
        {
          id: "A",
          text: "Keep methodology secret",
          description: "Remain closed-source to maintain competitive advantage and ensure business sustainability in the market."
        },
        {
          id: "B",
          text: "Share partially",
          description: "Share general principles but keep technical implementation details confidential as compromise."
        },
        {
          id: "C",
          text: "Full open-source",
          description: "Share everything for Indonesian education advancement, then pivot to find alternative revenue models."
        }
      ]
    }
  }

  const getResults = () => {
    const choice1 = choices.dilemma1
    const choice2 = choices.dilemma2
    const choice3 = choices.dilemma3

    // Scoring system based on alignment with Indonesia AI Strategy
    let ethicsScore = 0
    let sustainabilityScore = 0
    let transparencyScore = 0

    // Score ethics (data privacy)
    if (choice1 === "B") ethicsScore = 1

    // Score sustainability (talent development)
    if (choice2 === "B") sustainabilityScore = 1

    // Score transparency (knowledge sharing)
    if (choice3 === "C") transparencyScore = 2
    else if (choice3 === "B") transparencyScore = 1

    const totalScore = ethicsScore + sustainabilityScore + transparencyScore

    if (totalScore >= 3) {
      return {
        vision: "Visionary Leader",
        description: "You demonstrate exceptional commitment to ethics, sustainability, and transparency. Your decisions reflect a leader who thinks beyond short-term success, considering long-term impact on Indonesia's AI ecosystem. You embody the type of leadership Indonesia needs in the AI era.",
        color: "from-emerald-500 to-green-600",
        icon: <Shield className="h-12 w-12" />,
        alignment: "🌟 Highly Aligned with Indonesia's National AI Strategy"
      }
    } else if (totalScore === 2) {
      return {
        vision: "Balanced Leader",
        description: "You show good balance between business pragmatism and social responsibility. Some of your decisions align with the National AI Strategy, but there's room for improvement in transparency and collaboration for collective progress.",
        color: "from-blue-500 to-indigo-500",
        icon: <Brain className="h-12 w-12" />,
        alignment: "⚖️ Moderately Aligned with Indonesia's National AI Strategy"
      }
    } else if (totalScore === 1) {
      return {
        vision: "Pragmatic Leader",
        description: "You tend to prioritize efficiency and practical results. While this can yield short-term success, consider the long-term impact of your decisions on Indonesia's AI ecosystem. Align your strategy more closely with the national vision.",
        color: "from-yellow-500 to-orange-500",
        icon: <Target className="h-12 w-12" />,
        alignment: "⚠️ Partially Aligned with Indonesia's National AI Strategy"
      }
    } else {
      return {
        vision: "Aggressive Leader",
        description: "Your focus on rapid growth is strong, but overlooks fundamental aspects of Indonesia's AI Strategy. Consider balancing business ambitions with responsibility toward the national digital ecosystem and society.",
        color: "from-red-500 to-pink-500",
        icon: <Gavel className="h-12 w-12" />,
        alignment: "❌ Not Aligned with Indonesia's National AI Strategy"
      }
    }
  }

  const makeChoice = (dilemma: string, choice: string) => {
    setChoices(prev => ({...prev, [dilemma]: choice}))
    
    if (dilemma === 'dilemma1') {
      setCurrentStep('dilemma2')
    } else if (dilemma === 'dilemma2') {
      setCurrentStep('dilemma3')
    } else if (dilemma === 'dilemma3') {
      setCurrentStep('results')
    }
  }

  const resetSimulation = () => {
    setChoices({})
    setCurrentStep('landing')
  }

  const renderLanding = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="text-center max-w-4xl mx-auto">
        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl md:text-7xl font-bold text-gray-800 mb-8 tracking-tight"
        >
          AI Ethics & Policy
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500">
            Simulator
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl text-gray-600 mb-12 leading-relaxed"
        >
          Test your leadership skills in Indonesia's AI landscape.<br />
          Make critical decisions that shape the future.
        </motion.p>

        {/* Key Features */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-green-200/50 shadow-lg">
            <div className="text-emerald-600 mb-3">
              <Gavel className="h-8 w-8 mx-auto" />
            </div>
            <h3 className="text-gray-800 font-semibold mb-2">Real Dilemmas</h3>
            <p className="text-gray-600 text-sm">Face actual challenges in Indonesia's AI ecosystem</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-green-200/50 shadow-lg">
            <div className="text-green-600 mb-3">
              <Target className="h-8 w-8 mx-auto" />
            </div>
            <h3 className="text-gray-800 font-semibold mb-2">Strategic Impact</h3>
            <p className="text-gray-600 text-sm">Your decisions affect both business and national interests</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-green-200/50 shadow-lg">
            <div className="text-teal-600 mb-3">
              <Brain className="h-8 w-8 mx-auto" />
            </div>
            <h3 className="text-gray-800 font-semibold mb-2">Leadership Assessment</h3>
            <p className="text-gray-600 text-sm">Get detailed analysis of your leadership style</p>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentStep('intro')}
          className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white px-12 py-4 rounded-xl font-bold text-xl hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 transition-all duration-300 transform shadow-2xl border border-green-400/30"
        >
          Start Simulation
          <ArrowRight className="h-6 w-6 ml-3 inline" />
        </motion.button>

        {/* Disclaimer */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="text-gray-500 text-sm mt-8"
        >
          Based on Indonesia's National AI Strategy • Estimated time: 5-7 minutes
        </motion.p>
      </div>
    </motion.div>
  )

  const renderIntro = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white p-8 rounded-xl mb-8 shadow-2xl border border-green-400/30">
        <div className="flex justify-center mb-4">
          <div className="bg-green-500/20 backdrop-blur-sm p-4 rounded-full border border-green-400/30">
            <Users className="h-12 w-12" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">
          CRITICAL SCENARIO: You Are the Chief Innovation Officer
        </h2>
        <p className="text-xl leading-relaxed opacity-95">
          Congratulations! You have just been appointed as Chief Innovation Officer at a leading EdTech startup in Indonesia. 
          The government has recently released the National AI Strategy. The future of your company and its impact on the nation rests in your hands.
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 mb-8 border border-gray-200/50">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">INCOMING CHALLENGES (3 Strategic Dilemmas):</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-emerald-600 mt-1" />
            <div>
              <h4 className="font-medium text-gray-800">Data Ethics</h4>
              <p className="text-gray-600 text-sm">Innovation vs user privacy in the era of Indonesia's Data Protection Law</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Brain className="h-6 w-6 text-green-600 mt-1" />
            <div>
              <h4 className="font-medium text-gray-800">Talent Strategy</h4>
              <p className="text-gray-600 text-sm">Quick solutions vs long-term investment for the nation</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <BookOpen className="h-6 w-6 text-teal-600 mt-1" />
            <div>
              <h4 className="font-medium text-gray-800">Transparency</h4>
              <p className="text-gray-600 text-sm">Competitive advantage vs knowledge sharing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-6">Are you ready to face the challenges of AI leadership?</p>
        <button
          onClick={() => setCurrentStep('dilemma1')}
          className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-200 transform hover:scale-105 flex items-center mx-auto shadow-xl border border-green-400/30"
        >
          Enter the Simulation
          <ArrowRight className="h-5 w-5 ml-2" />
        </button>
      </div>
    </motion.div>
  )

  const renderDilemma = (dilemmaKey: string) => {
    const dilemma = dilemmas[dilemmaKey]
    const stepNumber = dilemmaKey === 'dilemma1' ? 1 : dilemmaKey === 'dilemma2' ? 2 : 3

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-4 h-4 rounded-full ${stepNumber >= 1 ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-gray-400'} transition-all duration-300`}></div>
            <div className="w-16 h-2 bg-gray-300 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-500 ${stepNumber >= 2 ? 'w-full' : 'w-0'}`}></div>
            </div>
            <div className={`w-4 h-4 rounded-full ${stepNumber >= 2 ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-400'} transition-all duration-300`}></div>
            <div className="w-16 h-2 bg-gray-300 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-500 ${stepNumber >= 3 ? 'w-full' : 'w-0'}`}></div>
            </div>
            <div className={`w-4 h-4 rounded-full ${stepNumber >= 3 ? 'bg-teal-500 shadow-lg shadow-teal-500/50' : 'bg-gray-400'} transition-all duration-300`}></div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-200/50">
          <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white p-6 border-b border-green-400/30">
            <h2 className="text-2xl font-bold mb-2">{dilemma.title}</h2>
            <p className="opacity-90">Phase {stepNumber} of 3 • Critical Decision Required</p>
          </div>

          <div className="p-8">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 backdrop-blur-sm">
              <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                {dilemma.scenario}
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-6">Your Decision:</h3>
            
            <div className="space-y-4">
              {dilemma.choices.map((choice) => (
                <motion.button
                  key={choice.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => makeChoice(dilemmaKey, choice.id)}
                  className="w-full text-left p-6 border-2 border-gray-200/50 bg-gray-50/30 backdrop-blur-sm rounded-lg hover:border-green-400/70 hover:bg-green-50/50 transition-all duration-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 border border-green-300">
                      {choice.id}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">{choice.text}</h4>
                      <p className="text-gray-600">{choice.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  const renderResults = () => {
    const results = getResults()

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-200/50">
          <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white p-6 text-center border-b border-emerald-500/30">
            <h2 className="text-3xl font-bold mb-2">LEADERSHIP ASSESSMENT COMPLETE</h2>
            <p className="text-xl opacity-90">Your Performance as Chief Innovation Officer</p>
          </div>

          <div className="p-8">
            <div className={`bg-gradient-to-r ${results.color} text-white p-8 rounded-xl mb-8 shadow-xl border border-white/20`}>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30">
                  {results.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">
                LEADERSHIP PROFILE: {results.vision}
              </h3>
              <p className="text-lg leading-relaxed text-center opacity-95">
                {results.description}
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 backdrop-blur-sm">
              <h4 className="font-semibold text-gray-800 mb-2">Alignment with Indonesia's National AI Strategy:</h4>
              <p className="text-lg font-medium text-green-700">{results.alignment}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8 backdrop-blur-sm border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-teal-600" />
                Decision Summary
              </h4>
              <div className="space-y-2 text-gray-600">
                <p><strong className="text-gray-800">Data Ethics:</strong> {choices.dilemma1 === 'A' ? 'Used data without explicit consent' : 'Found privacy-respecting alternatives'}</p>
                <p><strong className="text-gray-800">Talent Strategy:</strong> {choices.dilemma2 === 'A' ? 'Recruited foreign expert for immediate results' : 'Invested in developing local Indonesian talent'}</p>
                <p><strong className="text-gray-800">Transparency:</strong> {
                  choices.dilemma3 === 'A' ? 'Kept methodology secret for competitive advantage' :
                  choices.dilemma3 === 'B' ? 'Shared partially - balanced business and social impact' :
                  'Full open-source for Indonesian education advancement'
                }</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetSimulation}
                className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-200 flex items-center justify-center shadow-xl border border-green-400/30"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Run Simulation Again
              </button>
              <Link
                to="/ai101"
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center shadow-xl border border-gray-400/30"
              >
                <Home className="h-5 w-5 mr-2" />
                Return to Main Menu
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header - hanya tampil jika bukan landing page */}
        {currentStep !== 'landing' && (
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Ethics & Policy Simulator
            </h1>
            <p className="text-xl text-gray-600">
              Leadership Simulation in Indonesia's AI Era
            </p>
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          {currentStep === 'landing' && renderLanding()}
          {currentStep === 'intro' && renderIntro()}
          {currentStep === 'dilemma1' && renderDilemma('dilemma1')}
          {currentStep === 'dilemma2' && renderDilemma('dilemma2')}
          {currentStep === 'dilemma3' && renderDilemma('dilemma3')}
          {currentStep === 'results' && renderResults()}
        </AnimatePresence>

        {/* Back button */}
        {currentStep === 'intro' && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setCurrentStep('landing')}
              className="text-gray-500 hover:text-gray-700 transition-colors flex items-center mx-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Start
            </button>
          </div>
        )}
        
        {currentStep !== 'landing' && currentStep !== 'intro' && currentStep !== 'results' && (
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                if (currentStep === 'dilemma3') setCurrentStep('dilemma2')
                else if (currentStep === 'dilemma2') setCurrentStep('dilemma1')
                else if (currentStep === 'dilemma1') setCurrentStep('intro')
              }}
              className="text-gray-500 hover:text-gray-700 transition-colors flex items-center mx-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AIEthicsSimulator
