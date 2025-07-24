import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  PlayCircle, 
  MessageCircle, 
  AlertTriangle, 
  ArrowRight,
  Users,
  Shield,
  Brain,
  Zap
} from 'lucide-react'

// Subpages
import EchoChamber from './ai-simulator/EchoChamber'
import MisuseSimulation from './ai-simulator/MisuseSimulation'

const AISimulator = () => {
  const location = useLocation()
  const isMainPage = location.pathname === '/ai-simulator'

  const simulations = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "AI Echo Chamber Experience",
      description: "Experience the dangers of AI that always agrees with you. Interactive simulation to understand filter bubbles and confirmation bias in AI.",
      href: "/ai-simulator/echo-chamber",
      color: "from-blue-500 to-purple-500",
      difficulty: "Beginner",
      duration: "10-15 minutes",
      warnings: ["Psychological effects", "Confirmation bias exposure"],
      learningGoals: [
        "Understand echo chamber concepts in AI",
        "Recognize signs of confirmation bias",
        "Learn to identify balanced perspectives",
        "Develop critical attitude towards AI responses"
      ]
    },
    {
      icon: <AlertTriangle className="h-8 w-8" />,
      title: "AI Misuse Simulation",
      description: "Learn about fraud and manipulation methods using AI through safe simulations. Includes deepfakes, voice cloning, and social engineering.",
      href: "/ai-simulator/misuse",
      color: "from-red-500 to-orange-500",
      difficulty: "Intermediate",
      duration: "15-20 minutes",
      warnings: ["Mature content", "Realistic deception scenarios"],
      learningGoals: [
        "Recognize deepfake and voice cloning techniques",
        "Understand AI-powered social engineering",
        "Learn detection and prevention methods",
        "Develop awareness against AI manipulation"
      ]
    }
  ]

  if (!isMainPage) {
    return (
      <Routes>
        <Route path="/echo-chamber" element={<EchoChamber />} />
        <Route path="/misuse" element={<MisuseSimulation />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-orange-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlZjQ0NDQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6"
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              AI Simulator - Interactive Learning
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6"
            >
              AI <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Simulator</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto"
            >
              Experience the negative impacts of AI through safe simulations. 
              Learn to recognize and avoid AI manipulation in real life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-2xl mx-auto mb-8"
            >
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <h3 className="font-semibold text-yellow-900 mb-2">Important Warning</h3>
                  <p className="text-yellow-800 text-sm">
                    These simulations are designed for educational purposes. Some content may display realistic manipulation techniques. 
                    Recommended for users 16+ and should be accompanied by reflection after the simulation.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-neutral-600"
            >
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-green-500 mr-2" />
                Safe Environment
              </div>
              <div className="flex items-center">
                <Brain className="h-4 w-4 text-blue-500 mr-2" />
                Reflective Learning
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-purple-500 mr-2" />
                Guided Experience
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simulations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Choose Your <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Simulation</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Each simulation is designed to provide deep understanding of specific aspects of AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {simulations.map((simulation, index) => (
              <motion.div
                key={simulation.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-white border border-neutral-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${simulation.color} p-6 text-white`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        {simulation.icon}
                      </div>
                      <h3 className="text-xl font-bold">{simulation.title}</h3>
                    </div>
                    <p className="opacity-90">{simulation.description}</p>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-6 text-sm">
                      <div className="flex items-center space-x-1">
                        <Zap className="h-4 w-4 text-blue-500" />
                        <span className="text-neutral-600">Level: {simulation.difficulty}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <PlayCircle className="h-4 w-4 text-green-500" />
                        <span className="text-neutral-600">Durasi: {simulation.duration}</span>
                      </div>
                    </div>

                    {/* Warnings */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-neutral-900 mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                        Perhatian
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {simulation.warnings.map((warning, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full"
                          >
                            {warning}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Learning Goals */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-neutral-900 mb-3">What You'll Learn:</h4>
                      <ul className="space-y-2">
                        {simulation.learningGoals.map((goal, i) => (
                          <li key={i} className="flex items-start space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-neutral-700">{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <Link
                      to={simulation.href}
                      className={`w-full bg-gradient-to-r ${simulation.color} text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center space-x-2`}
                    >
                      <PlayCircle className="h-5 w-5" />
                      <span>Mulai Simulasi</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              Simulation Usage Guide
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Persiapan Mental",
                description: "Understand that this simulation shows manipulation techniques that may feel uncomfortable. Prepare to think critically.",
                icon: <Brain className="h-6 w-6" />
              },
              {
                step: "02", 
                title: "Participate Actively",
                description: "Participate fully in the simulation. Experience how manipulation works and note your emotional reactions.",
                icon: <Users className="h-6 w-6" />
              },
              {
                step: "03",
                title: "Refleksi & Diskusi",
                description: "After the simulation, take time to reflect on the experience. Discuss with others if possible.",
                icon: <MessageCircle className="h-6 w-6" />
              }
            ].map((guide, index) => (
              <motion.div
                key={guide.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                    {guide.step}
                  </div>
                  <div className="text-red-600">
                    {guide.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{guide.title}</h3>
                <p className="text-neutral-600 text-sm">{guide.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6"
          >
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-2">Keamanan dan Dukungan</h3>
                <p className="text-red-800 text-sm mb-3">
                  If you feel uncomfortable during the simulation, don't hesitate to stop it. 
                  The main objective is learning, not causing distress.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                    Hotline Dukungan: 1500-123
                  </span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                    Email: support@eira.id
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Siap untuk Pengalaman yang Membuka Mata?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Mulai perjalanan untuk memahami sisi gelap AI dan belajar melindungi diri dari manipulasi
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/ai-simulator/echo-chamber"
                className="bg-white text-red-600 hover:text-red-700 font-medium px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Coba Echo Chamber
              </Link>
              <Link
                to="/ai-simulator/misuse"
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-medium px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center justify-center"
              >
                <AlertTriangle className="mr-2 h-5 w-5" />
                Simulasi Salah Guna
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AISimulator
