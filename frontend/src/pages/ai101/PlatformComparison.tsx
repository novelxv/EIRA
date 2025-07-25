import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Star, 
  Clock, 
  DollarSign, 
  Shield, 
  Zap,
  CheckCircle,
  XCircle,
  ArrowRight,
  Filter
} from 'lucide-react'

interface Platform {
  name: string
  logo: string
  rating: number
  speed: number
  price: 'Free' | 'Freemium' | 'Paid'
  strengths: string[]
  weaknesses: string[]
  bestFor: string[]
  capabilities: {
    textGeneration: number
    codeGeneration: number
    imageAnalysis: number
    dataAnalysis: number
    multimodal: number
  }
}

const PlatformComparison = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Claude 4', 'GPT-4.5/o3'])
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const platforms: Platform[] = [
    {
      name: 'Claude 4',
      logo: '💻',
      rating: 4.7,
      speed: 4,
      price: 'Paid',
      strengths: ['Coding & Software Engineering', 'SWE-bench: 72.7%', 'AIME 2025: 90%', 'Large context window (64k output)'],
      weaknesses: ['Premium pricing ($15-75/1M tokens)', 'Less multimodal than competitors', 'Not specialized for real-time'],
      bestFor: ['Software Development', 'Code Review', 'Complex Programming', 'Technical Writing'],
      capabilities: {
        textGeneration: 90,
        codeGeneration: 95,
        imageAnalysis: 75,
        dataAnalysis: 85,
        multimodal: 70
      }
    },
    {
      name: 'Grok 3',
      logo: '🧠',
      rating: 4.6,
      speed: 5,
      price: 'Paid',
      strengths: ['Mathematical Reasoning (93.3% AIME)', 'Real-time processing', '1M token context', 'LiveCodeBench: 79.4%'],
      weaknesses: ['Premium pricing ($3-15/1M tokens)', 'Limited to X platform ecosystem', 'Newer platform'],
      bestFor: ['Mathematical Problems', 'Real-time Analysis', 'Complex Reasoning', 'Large Context Tasks'],
      capabilities: {
        textGeneration: 85,
        codeGeneration: 85,
        imageAnalysis: 80,
        dataAnalysis: 95,
        multimodal: 75
      }
    },
    {
      name: 'Gemini 2.5 Pro',
      logo: '🔷',
      rating: 4.5,
      speed: 5,
      price: 'Freemium',
      strengths: ['Video Understanding (84.8% VideoMME)', 'Top WebDev Arena ranking', '1M token context', 'Deep Think mode'],
      weaknesses: ['Enterprise pricing for advanced features', 'Complex pricing tiers', 'Google ecosystem dependency'],
      bestFor: ['Video Analysis', 'Web Development', 'Long Document Processing', 'Multimodal Tasks'],
      capabilities: {
        textGeneration: 85,
        codeGeneration: 90,
        imageAnalysis: 90,
        dataAnalysis: 85,
        multimodal: 95
      }
    },
    {
      name: 'DeepSeek R1',
      logo: '🐳',
      rating: 4.4,
      speed: 4,
      price: 'Free',
      strengths: ['Cost-effective reasoning', 'AIME: 87.5%, MATH-500: 97.3%', 'Free access', 'Strong mathematical capabilities'],
      weaknesses: ['Limited multimodal capabilities', 'Smaller context window', 'Less general-purpose optimization'],
      bestFor: ['Budget-conscious projects', 'Mathematical reasoning', 'Academic research', 'Cost optimization'],
      capabilities: {
        textGeneration: 80,
        codeGeneration: 75,
        imageAnalysis: 60,
        dataAnalysis: 90,
        multimodal: 50
      }
    },
    {
      name: 'Llama 4',
      logo: '🦙',
      rating: 4.3,
      speed: 4,
      price: 'Free',
      strengths: ['Open-source', 'Native multimodal fusion', '1M token context', 'Competitive with GPT-4o'],
      weaknesses: ['Requires technical setup', 'Hardware requirements', 'Community support dependency'],
      bestFor: ['Open-source projects', 'Custom implementations', 'Research', 'Self-hosted solutions'],
      capabilities: {
        textGeneration: 85,
        codeGeneration: 80,
        imageAnalysis: 85,
        dataAnalysis: 80,
        multimodal: 90
      }
    },
    {
      name: 'GPT-4.5/o3',
      logo: '✍️',
      rating: 4.6,
      speed: 4,
      price: 'Paid',
      strengths: ['General-purpose conversational AI', 'Enhanced reasoning', 'Robust multimodal', 'Well-established ecosystem'],
      weaknesses: ['Premium pricing', 'Token limitations', 'Context window constraints', 'API rate limits'],
      bestFor: ['General conversation', 'Creative writing', 'Business applications', 'Customer service'],
      capabilities: {
        textGeneration: 95,
        codeGeneration: 80,
        imageAnalysis: 85,
        dataAnalysis: 80,
        multimodal: 85
      }
    }
  ]

  const categories = [
    { id: 'all', label: 'All Platforms' },
    { id: 'free', label: 'Free' },
    { id: 'freemium', label: 'Freemium' },
    { id: 'paid', label: 'Paid' }
  ]

  const filteredPlatforms = platforms.filter(platform => {
    if (filterCategory === 'all') return true
    if (filterCategory === 'free') return platform.price === 'Free'
    if (filterCategory === 'freemium') return platform.price === 'Freemium'
    if (filterCategory === 'paid') return platform.price === 'Paid'
    return true
  })

  const togglePlatformSelection = (platformName: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformName)) {
        return prev.filter(name => name !== platformName)
      } else {
        return [...prev, platformName]
      }
    })
  }

  const selectedPlatformData = platforms.filter(p => selectedPlatforms.includes(p.name))

  const getPriceColor = (price: string) => {
    switch (price) {
      case 'Free': return 'text-green-600 bg-green-100'
      case 'Freemium': return 'text-blue-600 bg-blue-100'
      case 'Paid': return 'text-red-600 bg-red-100'
      default: return 'text-neutral-600 bg-neutral-100'
    }
  }

  return (
    <div className="min-h-screen pt-8 bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
            <BarChart3 className="h-4 w-4 mr-2" />
            AI Platform Comparison
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Compare</span> AI Platforms
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Find the right AI platform for your needs with comprehensive comparison
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <Filter className="h-5 w-5 text-neutral-600" />
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setFilterCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filterCategory === category.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Platform Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 ${
                selectedPlatforms.includes(platform.name)
                  ? 'ring-2 ring-purple-500 shadow-xl'
                  : 'hover:shadow-xl hover:-translate-y-1'
              }`}
              onClick={() => togglePlatformSelection(platform.name)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{platform.logo}</span>
                  <div>
                    <h3 className="font-bold text-neutral-900">{platform.name}</h3>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(platform.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-neutral-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-neutral-600 ml-1">{platform.rating}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriceColor(platform.price)}`}>
                  {platform.price}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-4 text-sm text-neutral-600">
                  <div className="flex items-center space-x-1">
                    <Zap className="h-4 w-4" />
                    <span>Speed: {platform.speed}/5</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-green-700">✓ Strengths:</span>
                  <ul className="mt-1 text-neutral-600">
                    {platform.strengths.slice(0, 2).map((strength, i) => (
                      <li key={i}>• {strength}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">
                    {selectedPlatforms.includes(platform.name) ? 'Selected' : 'Click to select'}
                  </span>
                  {selectedPlatforms.includes(platform.name) && (
                    <CheckCircle className="h-5 w-5 text-purple-500" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        {selectedPlatformData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden mb-12"
          >
            <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <h2 className="text-2xl font-bold">Detailed Comparison</h2>
              <p className="opacity-90">Selected platforms: {selectedPlatformData.map(p => p.name).join(', ')}</p>
            </div>

            {/* Capabilities Comparison */}
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Platform Capabilities</h3>
              <div className="space-y-4">
                {Object.keys(selectedPlatformData[0]?.capabilities || {}).map(capability => (
                  <div key={capability} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium capitalize">{capability.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </div>
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${selectedPlatformData.length}, 1fr)` }}>
                      {selectedPlatformData.map(platform => (
                        <div key={platform.name} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{platform.name}</span>
                            <span>{platform.capabilities[capability as keyof typeof platform.capabilities]}%</span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${platform.capabilities[capability as keyof typeof platform.capabilities]}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Comparison */}
            <div className="p-6 border-t border-neutral-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 pr-4 font-semibold text-neutral-900">Aspect</th>
                      {selectedPlatformData.map(platform => (
                        <th key={platform.name} className="text-left py-3 px-4 font-semibold text-neutral-900">
                          {platform.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    <tr>
                      <td className="py-3 pr-4 font-medium text-neutral-700">Rating</td>
                      {selectedPlatformData.map(platform => (
                        <td key={platform.name} className="py-3 px-4">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(platform.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-neutral-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-neutral-600">{platform.rating}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-neutral-700">Price</td>
                      {selectedPlatformData.map(platform => (
                        <td key={platform.name} className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriceColor(platform.price)}`}>
                            {platform.price}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-neutral-700">Strengths</td>
                      {selectedPlatformData.map(platform => (
                        <td key={platform.name} className="py-3 px-4">
                          <ul className="text-sm text-neutral-600 space-y-1">
                            {platform.strengths.map((strength, i) => (
                              <li key={i} className="flex items-start space-x-1">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-neutral-700">Weaknesses</td>
                      {selectedPlatformData.map(platform => (
                        <td key={platform.name} className="py-3 px-4">
                          <ul className="text-sm text-neutral-600 space-y-1">
                            {platform.weaknesses.map((weakness, i) => (
                              <li key={i} className="flex items-start space-x-1">
                                <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                <span>{weakness}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-neutral-700">Best for</td>
                      {selectedPlatformData.map(platform => (
                        <td key={platform.name} className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {platform.bestFor.map((use, i) => (
                              <span key={i} className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full">
                                {use}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Need Recommendations?</h2>
          <p className="mb-6 opacity-90">
            Use the Prompt Evaluator to test which platform best suits your needs
          </p>
          <a
            href="/prompt-evaluator"
            className="bg-white text-purple-600 hover:text-purple-700 font-medium px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center"
          >
            Try Prompt Evaluator
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default PlatformComparison
