import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  BarChart3, 
  FileText, 
  Eye, 
  ArrowRight,
  Lightbulb,
  Users,
  Shield
} from 'lucide-react'

// Subpages
import AILiteracy from './ai101/AILiteracy'
import PlatformComparison from './ai101/PlatformComparison'
import PolicyExplainer from './ai101/PolicyExplainer'
import AIWatch from './ai101/AIWatch'

const AI101 = () => {
  const location = useLocation()
  const isMainPage = location.pathname === '/ai101'

  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "AI Literacy",
      description: "Learn AI basics, LLM, prompt engineering, and other important concepts in easy-to-understand language",
      href: "/ai101/literacy",
      color: "from-blue-500 to-cyan-500",
      highlights: ["AI Basics", "Machine Learning", "Prompt Engineering", "Interactive Quiz"]
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "AI Platform Comparison",
      description: "Compare ChatGPT, Gemini, Claude, and other AI platforms in terms of capabilities, speed, and limitations",
      href: "/ai101/comparison",
      color: "from-purple-500 to-pink-500",
      highlights: ["Interactive Table", "Benchmarks", "Pros & Cons", "Recommendations"]
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "AI Policy Explainer",
      description: "Understand the latest AI regulations and policies in Indonesia with easy-to-digest visual explanations",
      href: "/ai101/policy",
      color: "from-green-500 to-teal-500",
      highlights: ["Data Protection Law", "Deepfake Regulations", "Digital Campaigns", "Compliance"]
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "AI Watch",
      description: "Critical analysis of AI usage trends and issues in Indonesia with real case studies and learning",
      href: "/ai101/watch",
      color: "from-orange-500 to-red-500",
      highlights: ["Trend Analysis", "Case Studies", "Critical Thinking", "Real Examples"]
    }
  ]

  if (!isMainPage) {
    return (
      <Routes>
        <Route path="/literacy" element={<AILiteracy />} />
        <Route path="/comparison" element={<PlatformComparison />} />
        <Route path="/policy" element={<PolicyExplainer />} />
        <Route path="/watch" element={<AIWatch />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              AI Understanding Foundation
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6"
            >
              AI <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">101</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-neutral-600 mb-12 max-w-3xl mx-auto"
            >
              Start your journey to understand Artificial Intelligence from the basics. 
              Learn concepts, compare platforms, understand regulations, and analyze AI trends in an interactive and easy-to-understand way.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-neutral-600"
            >
              <div className="flex items-center">
                <Users className="h-4 w-4 text-blue-500 mr-2" />
                For Beginners
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-green-500 mr-2" />
                Ethical & Responsible
              </div>
              <div className="flex items-center">
                <Lightbulb className="h-4 w-4 text-yellow-500 mr-2" />
                Interactive & Visual
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
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
                  <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-neutral-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {feature.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-24 bg-gradient-to-br from-neutral-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Structured</span> Learning Path
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Follow a learning path specifically designed to build solid and ethical AI understanding
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Start with AI Literacy", desc: "Understand basic AI and machine learning concepts" },
              { step: "02", title: "Compare Platforms", desc: "Learn the strengths and weaknesses of each AI platform" },
              { step: "03", title: "Study Regulations", desc: "Understand policies and ethics of AI usage" },
              { step: "04", title: "Analyze Trends", desc: "Develop critical thinking skills about AI" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                  <div className="text-3xl font-bold text-blue-500 mb-3">{item.step}</div>
                  <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-neutral-600 text-sm">{item.desc}</p>
                </div>
                
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
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
              Ready to Start Learning AI?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Start from basics and build strong AI understanding with an ethical and responsible approach
            </p>
            
            <Link 
              to="/ai101/literacy" 
              className="bg-white text-blue-600 hover:text-blue-700 font-medium px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              Start with AI Literacy
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AI101
