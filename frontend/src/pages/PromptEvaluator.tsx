import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Target, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Lightbulb,
  Zap,
  Eye,
  Brain,
  ArrowRight,
  RefreshCw,
  Copy,
  Download,
  BookOpen,
  ExternalLink,
  Wifi,
  WifiOff,
  AlertCircle
} from 'lucide-react'

interface EvaluationResult {
  overall_score: number
  clarity: number
  specificity: number
  ethics: number
  effectiveness: number
  bias_risk: number
  suggestions: string[]
  strengths: string[]
  weaknesses: string[]
  improved_prompt: string
  success?: boolean
}

interface ApiStatus {
  isConnected: boolean
  isChecking: boolean
  lastChecked: Date | null
}

const PromptEvaluator = () => {
  const [prompt, setPrompt] = useState('')
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [selectedExample, setSelectedExample] = useState<string | null>(null)
  const [showSources, setShowSources] = useState(false)
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    isConnected: false,
    isChecking: false,
    lastChecked: null
  })
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  const API_BASE_URL = 'http://localhost:5000'

  const examplePrompts = [
    {
      title: "Bad Prompt - Too General",
      content: "Write an article",
      category: "bad",
      description: "Example of a prompt that is too general and not specific"
    },
    {
      title: "Bad Prompt - Potentially Biased",
      content: "Explain why men are better suited for technical jobs",
      category: "bad",
      description: "Example of a prompt containing gender bias"
    },
    {
      title: "Good Prompt - Specific and Ethical",
      content: "Write an 800-word article about the benefits of exercise for teenage mental health, with an informative yet friendly tone, include 5 practical tips that can be applied daily",
      category: "good",
      description: "Example of a clear, specific, and constructive prompt"
    },
    {
      title: "Good Prompt - With Context",
      content: "As a digital marketing expert, create a social media strategy for local culinary SMEs with limited budget. Target audience: ages 25-40 in metropolitan areas. Focus on Instagram and TikTok platforms. Include 3-month timeline and realistic KPI metrics.",
      category: "good",
      description: "Example of a prompt with role playing and clear context"
    }
  ]

  const evaluationSources = [
    {
      title: "OpenAI Best Practices for Prompt Engineering",
      url: "https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api",
      description: "Official guidelines from OpenAI on effective prompt design"
    },
    {
      title: "Prompt Engineering Guide by DAIR.AI",
      url: "https://www.promptingguide.ai/",
      description: "Comprehensive guide covering prompt engineering techniques and evaluation"
    },
    {
      title: "Prompt Engineering Guide (Google Cloud)",
      url: "https://cloud.google.com/discover/what-is-prompt-engineering",
      description: "Official Google Cloud explanation of prompt engineering"
    },
  ]

  const evaluationCriteria = {
    clarity: {
      description: "How clear and unambiguous the prompt is",
      factors: ["Language simplicity", "Clear instructions", "Unambiguous terminology"],
      source: "Based on OpenAI Best Practices"
    },
    specificity: {
      description: "Level of detail and specific requirements provided",
      factors: ["Detailed context", "Specific output format", "Clear constraints"],
      source: "DAIR.AI Prompting Guide"
    },
    ethics: {
      description: "Ethical considerations and bias avoidance",
      factors: ["No harmful content", "Bias-free language", "Inclusive approach"],
      source: "Anthropic Constitutional AI & Microsoft Responsible AI"
    },
    effectiveness: {
      description: "Likelihood of achieving desired outcomes",
      factors: ["Goal alignment", "Task-appropriate structure", "Example provision"],
      source: "Google AI Prompt Design Principles"
    }
  }

  // Check API health on component mount
  useEffect(() => {
    checkApiHealth()
  }, [])

  const checkApiHealth = async () => {
    setApiStatus(prev => ({ ...prev, isChecking: true }))
    
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      })
      
      if (response.ok) {
        const data = await response.json()
        setApiStatus({
          isConnected: data.success === true,
          isChecking: false,
          lastChecked: new Date()
        })
      } else {
        throw new Error('API health check failed')
      }
    } catch (error) {
      console.warn('API health check failed:', error)
      setApiStatus({
        isConnected: false,
        isChecking: false,
        lastChecked: new Date()
      })
    }
  }

  const callEvaluationAPI = async (promptText: string): Promise<EvaluationResult> => {
    const response = await fetch(`${API_BASE_URL}/evaluate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: promptText }),
      signal: AbortSignal.timeout(30000) // 30 second timeout
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
      throw new Error(errorData.error || `HTTP ${response.status}`)
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.error || 'Evaluation failed')
    }

    return data
  }

  const generateMockEvaluation = (promptText: string): EvaluationResult => {
    // Enhanced mock generation based on prompt analysis
    const wordCount = promptText.split(' ').length
    const hasSpecificTerms = /\b(specific|detailed|example|format|tone|audience|goal)\b/i.test(promptText)
    const hasBiasTerms = /\b(men|women|better|worse|naturally|always|never)\b/i.test(promptText)
    const hasContext = promptText.includes('as a') || promptText.includes('for')
    
    const clarityScore = Math.min(95, 60 + (hasContext ? 20 : 0) + (wordCount > 10 ? 15 : 0))
    const specificityScore = Math.min(95, 40 + (hasSpecificTerms ? 30 : 0) + (wordCount > 20 ? 20 : 0))
    const ethicsScore = Math.max(20, 90 - (hasBiasTerms ? 60 : 0))
    const effectivenessScore = Math.min(95, 50 + (hasContext ? 25 : 0) + (hasSpecificTerms ? 20 : 0))
    const biasRisk = hasBiasTerms ? Math.min(85, 60 + Math.random() * 25) : Math.max(5, Math.random() * 30)
    
    const overallScore = (clarityScore * 0.25 + specificityScore * 0.30 + ethicsScore * 0.20 + effectivenessScore * 0.25) - (biasRisk * 0.15)

    return {
      overall_score: Math.round(Math.max(15, Math.min(95, overallScore))),
      clarity: Math.round(clarityScore),
      specificity: Math.round(specificityScore),
      ethics: Math.round(ethicsScore),
      effectiveness: Math.round(effectivenessScore),
      bias_risk: Math.round(biasRisk),
      suggestions: [
        "Add more specific context about the target audience",
        "Include desired output format (length, structure, tone)",
        "Provide examples or references to clarify expectations",
        "Consider adding relevant constraints or limitations"
      ],
      strengths: [
        "Clear and easy-to-understand language usage",
        hasContext ? "Good role definition provided" : "Well-identified prompt purpose"
      ],
      weaknesses: [
        !hasSpecificTerms ? "Lacks specificity in requirement details" : "Could be more detailed",
        "No guidance for tone or style"
      ],
      improved_prompt: `Based on your prompt, here's an improved version:

**Original:** "${promptText.slice(0, 100)}${promptText.length > 100 ? '...' : ''}"

**Improved:** As a [role], create a [specific output] about [topic] for [target audience]. Include [specific requirements] and ensure [constraints]. The output should be [format specifications] with [tone/style] approach.

This improved version provides clearer context, specific requirements, and reduces ambiguity.`,
      success: true
    }
  }

  const evaluatePrompt = async () => {
    if (!prompt.trim()) return

    setIsEvaluating(true)
    setError(null)
    setUsingFallback(false)

    try {
      let evaluationResult: EvaluationResult

      // Try API first if it's connected
      if (apiStatus.isConnected) {
        try {
          evaluationResult = await callEvaluationAPI(prompt)
          console.log('✅ Evaluation completed via API')
        } catch (apiError) {
          console.warn('❌ API call failed, falling back to mock:', apiError)
          setUsingFallback(true)
          evaluationResult = generateMockEvaluation(prompt)
          
          // Update API status
          setApiStatus(prev => ({ ...prev, isConnected: false }))
        }
      } else {
        // Use fallback directly if API is known to be down
        console.log('📴 Using fallback evaluation (API unavailable)')
        setUsingFallback(true)
        evaluationResult = generateMockEvaluation(prompt)
        
        // Add small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1500))
      }

      setResult(evaluationResult)
    } catch (error) {
      console.error('Evaluation error:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsEvaluating(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Could add toast notification here
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
            <Target className="h-4 w-4 mr-2" />
            Prompt Evaluator
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Evaluate</span> Your AI Prompts
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            Analyze the effectiveness, ethics, and clarity of your prompts using research-backed evaluation criteria.
          </p>

          {/* API Status Indicator */}
          <div className="mb-6">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
              apiStatus.isConnected 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {apiStatus.isChecking ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Checking connection...
                </>
              ) : apiStatus.isConnected ? (
                <>
                  <Wifi className="h-4 w-4 mr-2" />
                  AI Evaluator Connected
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 mr-2" />
                  Using Offline Mode
                </>
              )}
              {!apiStatus.isChecking && (
                <button
                  onClick={checkApiHealth}
                  className="ml-2 text-xs underline hover:no-underline"
                >
                  Retry
                </button>
              )}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl mx-auto mb-6"
            >
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Evaluation Error</h3>
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Fallback Notification */}
          {usingFallback && !error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto mb-6"
            >
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-1">Offline Mode</h3>
                  <p className="text-yellow-800 text-sm">
                    Using local evaluation. Results may be less accurate than AI-powered analysis.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Methodology Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-4xl mx-auto">
            <div className="flex items-start space-x-3">
              <BookOpen className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-blue-900 mb-2">Research-Based Evaluation</h3>
                <p className="text-blue-800 text-sm mb-3">
                  Our evaluation methodology is based on established research from leading AI organizations including OpenAI and Google Cloud.
                </p>
                <button
                  onClick={() => setShowSources(!showSources)}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <span>View Sources & Methodology</span>
                  <ExternalLink className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sources Modal/Section */}
        {showSources && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Evaluation Methodology & Sources</h2>
              
              {/* Evaluation Criteria */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-neutral-800 mb-4">Evaluation Criteria</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(evaluationCriteria).map(([key, criteria]) => (
                    <div key={key} className="border border-neutral-200 rounded-lg p-4">
                      <h4 className="font-semibold text-neutral-900 capitalize mb-2">{key}</h4>
                      <p className="text-sm text-neutral-600 mb-3">{criteria.description}</p>
                      <div className="mb-3">
                        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Factors:</span>
                        <ul className="list-disc list-inside text-sm text-neutral-600 mt-1">
                          {criteria.factors.map((factor, index) => (
                            <li key={index}>{factor}</li>
                          ))}
                        </ul>
                      </div>
                      {/* <div className="text-xs text-purple-600 font-medium">{criteria.source}</div> */}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sources */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-neutral-800 mb-4">Research Sources</h3>
                <div className="space-y-3">
                  {evaluationSources.map((source, index) => (
                    <div key={index} className="border border-neutral-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-neutral-900 mb-1">{source.title}</h4>
                          <p className="text-sm text-neutral-600 mb-2">{source.description}</p>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-purple-600 hover:text-purple-800 text-sm"
                          >
                            <span>View Source</span>
                            <ExternalLink className="h-4 w-4 ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-center pt-4 border-t border-neutral-200">
                <button
                  onClick={() => setShowSources(false)}
                  className="px-6 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium rounded-lg transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-500" />
                Enter Your Prompt
              </h2>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: As a marketing expert, create a comprehensive social media strategy for a sustainable fashion brand targeting environmentally conscious millennials. Include platform-specific content ideas, posting schedule, and success metrics. Focus on authentic storytelling and community building."
                className="w-full h-40 p-4 border border-neutral-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-neutral-600">
                  {prompt.length} characters • Recommended: 50-500 characters
                </div>
                <button
                  onClick={evaluatePrompt}
                  disabled={!prompt.trim() || isEvaluating}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin inline-flex items-center" />
                      {apiStatus.isConnected ? 'Analyzing with AI...' : 'Analyzing...'}
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2 inline-flex items-center" />
                      Evaluate Prompt
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Results */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Overall Score */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Overall Score</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={result.overall_score >= 80 ? '#10b981' : result.overall_score >= 60 ? '#f59e0b' : '#ef4444'}
                          strokeWidth="2"
                          strokeDasharray={`${result.overall_score}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-xl font-bold ${getScoreColor(result.overall_score)}`}>
                          {result.overall_score}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${getScoreColor(result.overall_score)}`}>
                        {result.overall_score >= 80 ? 'Excellent' : result.overall_score >= 60 ? 'Good' : 'Needs Improvement'}
                      </div>
                      <p className="text-neutral-600">
                        Your prompt scored {result.overall_score}/100
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detailed Scores */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Detailed Analysis</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Clarity', value: result.clarity, icon: <Eye className="h-4 w-4" /> },
                      { label: 'Specificity', value: result.specificity, icon: <Target className="h-4 w-4" /> },
                      { label: 'Ethics', value: result.ethics, icon: <CheckCircle className="h-4 w-4" /> },
                      { label: 'Effectiveness', value: result.effectiveness, icon: <Zap className="h-4 w-4" /> },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={getScoreColor(item.value)}>{item.icon}</div>
                          <span className="font-medium text-neutral-900">{item.label}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-32 bg-neutral-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getScoreBg(item.value)}`}
                              style={{ width: `${item.value}%` }}
                            ></div>
                          </div>
                          <span className={`font-semibold ${getScoreColor(item.value)}`}>
                            {item.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bias Risk */}
                  <div className="mt-6 p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span className="font-semibold text-red-900">Bias Risk: {result.bias_risk}%</span>
                    </div>
                    <p className="text-red-700 text-sm">
                      {result.bias_risk < 30 
                        ? "Low bias risk - your prompt is relatively neutral"
                        : result.bias_risk < 60 
                        ? "Medium bias risk - consider reviewing your prompt"
                        : "High bias risk - prompt needs improvement"
                      }
                    </p>
                  </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {result.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-700 text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                      <XCircle className="h-5 w-5 mr-2 text-red-500" />
                      Areas of Improvements
                    </h3>
                    <ul className="space-y-2">
                      {result.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-700 text-sm">{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                    Suggestions for Improvement
                  </h3>
                  <ul className="space-y-3">
                    {result.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-neutral-700">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improved Prompt */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                    <ArrowRight className="h-5 w-5 mr-2 text-blue-500" />
                    Improved Prompt
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <pre className="whitespace-pre-wrap text-neutral-700 text-sm">
                      {result.improved_prompt}
                    </pre>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => copyToClipboard(result.improved_prompt)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Download Report</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Examples Sidebar - update tips */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
            >
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Contoh Prompt</h3>
              <div className="space-y-3">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setPrompt(example.content)
                      setSelectedExample(example.title)
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedExample === example.title
                        ? 'border-purple-300 bg-purple-50'
                        : 'border-neutral-200 hover:border-purple-200 hover:bg-purple-25'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${
                        example.category === 'good' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className="font-medium text-sm text-neutral-900">
                        {example.title}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600">{example.description}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-200">
                <h4 className="font-semibold text-neutral-900 mb-3">Research-Based Tips:</h4>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Be specific and detailed</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Provide context and examples</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Define output format clearly</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Avoid bias and assumptions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Use role-playing when appropriate</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromptEvaluator
