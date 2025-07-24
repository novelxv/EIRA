import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Brain, 
  Search, 
  Shield, 
  PlayCircle, 
  BookOpen, 
  Target, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star,
  Zap
} from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "AI 101",
      description: "Learn AI basics with simple, interactive content",
      color: "from-blue-500 to-cyan-500",
      href: "/ai101"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Prompt Evaluator",
      description: "Analyze the effectiveness and ethics of your AI prompts",
      color: "from-purple-500 to-pink-500",
      href: "/prompt-evaluator"
    }
  ]

  const stats = [
    { number: "∞", label: "Learning", icon: <Brain className="h-5 w-5" /> },
    { number: "100%", label: "Free", icon: <CheckCircle className="h-5 w-5" /> },
    { number: "24/7", label: "Available", icon: <Star className="h-5 w-5" /> }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20 pb-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5MTQ3ZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
              >
                <Brain className="h-4 w-4 mr-2" />
                Ethical AI Reflection & Awareness
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
                Growing 
                <span className="gradient-text block">With AI</span>
                Not Against AI
              </h1>
              
              <p className="text-xl text-neutral-600 mb-8 max-w-2xl">
                EIRA is a reflective AI space that helps people understand, 
                evaluate, and use AI technology wisely and ethically.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/ai101" className="btn-primary inline-flex items-center justify-center">
                  Start Learning AI
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/prompt-evaluator" className="btn-secondary inline-flex items-center justify-center">
                  Try Prompt Evaluator
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-neutral-600">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  100% Free
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Beginner Friendly
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Interactive Learning
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur opacity-20"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 bg-primary-100 rounded-xl flex items-center justify-center">
                        <Brain className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">AI Assistant</h3>
                        <p className="text-sm text-neutral-500">Typing...</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-primary-50 rounded-2xl p-4">
                      <p className="text-neutral-700">
                        "Hello! I'm ready to help you understand AI ethically and responsibly. 
                        What would you like to learn today?"
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <div className="flex-1 bg-neutral-100 rounded-2xl p-4">
                        <p className="text-neutral-600 text-sm">Type your message...</p>
                      </div>
                      <button className="bg-primary-500 text-white p-3 rounded-xl">
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-24 max-w-4xl">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mb-4">
                    <div className="text-primary-600">{stat.icon}</div>
                  </div>
                  <div className="text-3xl font-bold text-neutral-900 mb-2">{stat.number}</div>
                  <div className="text-neutral-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Explore <span className="gradient-text">EIRA</span> Features
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Two main features that help you understand and use AI wisely
            </p>
          </motion.div>

          <div className="flex justify-center">
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
              {features.slice(0, 2).map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link to={feature.href} className="block">
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                      
                      <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {feature.title}
                      </h3>
                      
                      <p className="text-neutral-600 leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      
                      <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Taglines Section */}
      <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-secondary-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-12">
              <Brain className="h-16 w-16 text-primary-400 mx-auto mb-6" />
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                EIRA Mission
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary-500/20 to-primary-600/30 border border-primary-400/30 rounded-2xl p-8 backdrop-blur-sm"
              >
                <div className="text-2xl lg:text-3xl font-bold text-primary-300 mb-4 italic">
                  "A reflective AI space to help society grow with, not against, AI."
                </div>
                <p className="text-neutral-300">
                  A reflective space to help society grow together with AI
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-secondary-500/20 to-secondary-600/30 border border-secondary-400/30 rounded-2xl p-8 backdrop-blur-sm"
              >
                <div className="text-2xl lg:text-3xl font-bold text-secondary-300 mb-4 italic">
                  "Know AI. Question AI. Use AI wisely."
                </div>
                <p className="text-neutral-300">
                  Know, question, and use AI wisely
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-500 to-secondary-500 relative overflow-hidden">
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
              Ready to Start Your AI Journey?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join a community committed to using AI ethically and responsibly
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/ai101" 
                className="bg-white text-primary-600 hover:text-primary-700 font-medium px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                Start with AI 101
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/prompt-evaluator" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center justify-center"
              >
                Evaluate My Prompts
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
