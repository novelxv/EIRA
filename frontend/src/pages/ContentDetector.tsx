import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Upload, 
  FileText, 
  Image, 
  Video,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Zap,
  Download,
  RefreshCw,
  Camera
} from 'lucide-react'

interface DetectionResult {
  type: 'text' | 'image' | 'video'
  ai_probability: number
  confidence: number
  risk_level: 'Safe' | 'Caution' | 'Dangerous'
  detection_details: {
    indicators: string[]
    suspicious_patterns: string[]
    metadata_analysis: string[]
  }
  recommendations: string[]
  similar_cases?: string[]
}

const ContentDetector = () => {
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'video'>('text')
  const [textContent, setTextContent] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const analyzeContent = async () => {
    if (activeTab === 'text' && !textContent.trim()) return
    if ((activeTab === 'image' || activeTab === 'video') && !uploadedFile) return

    setIsAnalyzing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock detection result
    const mockResult: DetectionResult = {
      type: activeTab,
      ai_probability: Math.floor(Math.random() * 100),
      confidence: Math.floor(Math.random() * 30) + 70,
      risk_level: Math.random() > 0.7 ? 'Dangerous' : Math.random() > 0.4 ? 'Caution' : 'Safe',
      detection_details: {
        indicators: [
          "Very consistent and structured writing patterns",
          "No grammatical errors or typos",
          "Vocabulary too formal for casual context",
          "Repetitive sentence structures"
        ],
        suspicious_patterns: [
          "Repetitive use of transition phrases",
          "No personal touch or subjective opinions",
          "Format too perfect for human-generated content"
        ],
        metadata_analysis: [
          "File creation timestamp shows bulk generation",
          "No revision history",
          "Encoding pattern typical for AI tools"
        ]
      },
      recommendations: [
        "Verify with original source if possible",
        "Cross-check information with other trusted sources",
        "Pay attention to context and purpose of content usage",
        "Consult with experts if content relates to sensitive information"
      ],
      similar_cases: [
        "Political disinformation campaigns using AI-generated content",
        "Fake news with LLM-generated articles",
        "Fake product reviews using AI writing tools"
      ]
    }
    
    setResult(mockResult)
    setIsAnalyzing(false)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Safe': return 'text-green-600 bg-green-100'
      case 'Caution': return 'text-yellow-600 bg-yellow-100'
      case 'Dangerous': return 'text-red-600 bg-red-100'
      default: return 'text-neutral-600 bg-neutral-100'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600'
    if (confidence >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen pt-8 bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
            <Shield className="h-4 w-4 mr-2" />
            Content Detector
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Detect</span> AI Content
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Identify whether text, images, or videos are created using AI. Analyze risk levels and get action recommendations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            {/* Content Type Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <div className="flex space-x-1 bg-neutral-100 rounded-lg p-1 mb-6">
                {[
                  { id: 'text', label: 'Text', icon: <FileText className="h-4 w-4" /> },
                  { id: 'image', label: 'Image', icon: <Image className="h-4 w-4" /> },
                  { id: 'video', label: 'Video', icon: <Video className="h-4 w-4" /> }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'text' | 'image' | 'video')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-white text-green-600 shadow-sm'
                        : 'text-neutral-600 hover:text-green-600'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Text Input */}
              {activeTab === 'text' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Enter text to analyze
                  </label>
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Paste the text you want to analyze here. Example: articles, social media captions, emails, or other written content..."
                    className="w-full h-40 p-4 border border-neutral-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-neutral-600">
                      {textContent.length} characters
                    </div>
                    <button
                      onClick={analyzeContent}
                      disabled={!textContent.trim() || isAnalyzing}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          Analyze Text
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* File Upload */}
              {(activeTab === 'image' || activeTab === 'video') && (
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Upload {activeTab === 'image' ? 'image' : 'video'} to analyze
                  </label>
                  
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors"
                  >
                    {uploadedFile ? (
                      <div className="space-y-2">
                        <div className="text-green-600">
                          {activeTab === 'image' ? <Image className="h-12 w-12 mx-auto" /> : <Video className="h-12 w-12 mx-auto" />}
                        </div>
                        <div className="font-medium text-neutral-900">{uploadedFile.name}</div>
                        <div className="text-sm text-neutral-600">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-12 w-12 text-neutral-400 mx-auto" />
                        <div className="text-neutral-600">
                          Click to upload {activeTab === 'image' ? 'image' : 'video'}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {activeTab === 'image' 
                            ? 'Supports JPG, PNG, GIF (max 10MB)'
                            : 'Supports MP4, AVI, MOV (max 50MB)'
                          }
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    accept={activeTab === 'image' ? 'image/*' : 'video/*'}
                    className="hidden"
                  />

                  {uploadedFile && (
                    <div className="flex items-center justify-between mt-4">
                      <button
                        onClick={() => setUploadedFile(null)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove file
                      </button>
                      <button
                        onClick={analyzeContent}
                        disabled={isAnalyzing}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isAnalyzing ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Shield className="h-4 w-4 mr-2" />
                            Analyze {activeTab === 'image' ? 'Image' : 'Video'}
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Results */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Main Result */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Detection Results</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-neutral-900 mb-2">
                        {result.ai_probability}%
                      </div>
                      <div className="text-sm text-neutral-600">AI Probability</div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`text-3xl font-bold mb-2 ${getConfidenceColor(result.confidence)}`}>
                        {result.confidence}%
                      </div>
                      <div className="text-sm text-neutral-600">Confidence Level</div>
                    </div>
                    
                    <div className="text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(result.risk_level)}`}>
                        {result.risk_level}
                      </span>
                      <div className="text-sm text-neutral-600 mt-2">Risk Level</div>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div className={`p-4 rounded-lg ${
                    result.risk_level === 'Safe' ? 'bg-green-50' :
                    result.risk_level === 'Caution' ? 'bg-yellow-50' : 'bg-red-50'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      {result.risk_level === 'Safe' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : result.risk_level === 'Caution' ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className={`font-semibold ${
                        result.risk_level === 'Safe' ? 'text-green-900' :
                        result.risk_level === 'Caution' ? 'text-yellow-900' : 'text-red-900'
                      }`}>
                        Assessment: {result.risk_level}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      result.risk_level === 'Safe' ? 'text-green-700' :
                      result.risk_level === 'Caution' ? 'text-yellow-700' : 'text-red-700'
                    }`}>
                      {result.risk_level === 'Safe' 
                        ? "Content appears natural and is likely human-generated."
                        : result.risk_level === 'Caution'
                        ? "There are indications the content might be AI-generated. Further verification needed."
                        : "Content is very likely AI-generated and potentially used for manipulation."
                      }
                    </p>
                  </div>
                </div>

                {/* Detection Details */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-blue-500" />
                    Analysis Details
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-2">AI Indicators:</h4>
                      <ul className="space-y-1">
                        {result.detection_details.indicators.map((indicator, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="text-neutral-700">{indicator}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-neutral-900 mb-2">Suspicious Patterns:</h4>
                      <ul className="space-y-1">
                        {result.detection_details.suspicious_patterns.map((pattern, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="text-neutral-700">{pattern}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-neutral-900 mb-2">Metadata Analysis:</h4>
                      <ul className="space-y-1">
                        {result.detection_details.metadata_analysis.map((meta, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="text-neutral-700">{meta}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-green-500" />
                    Recommended Actions
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-neutral-700">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Similar Cases */}
                {result.similar_cases && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Similar Cases</h3>
                    <ul className="space-y-2">
                      {result.similar_cases.map((case_, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span className="text-neutral-700">{case_}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Download Report</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
                      <Camera className="h-4 w-4" />
                      <span>Analyze Another</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
            >
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">How Detection Works</h3>
              
              <div className="space-y-4 text-sm text-neutral-600">
                <div>
                  <h4 className="font-medium text-neutral-900 mb-2">Text Analysis:</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• Sentence structure patterns</li>
                    <li>• Writing style consistency</li>
                    <li>• Vocabulary and complexity</li>
                    <li>• Absence of human errors</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-neutral-900 mb-2">Image Analysis:</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• Compression artifacts</li>
                    <li>• Pixel-level inconsistencies</li>
                    <li>• Facial feature analysis</li>
                    <li>• Metadata examination</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-neutral-900 mb-2">Video Analysis:</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• Frame consistency</li>
                    <li>• Temporal artifacts</li>
                    <li>• Audio-visual sync</li>
                    <li>• Motion pattern analysis</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-200">
                <h4 className="font-semibold text-neutral-900 mb-3">Manual Identification Tips:</h4>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Check small details and inconsistencies</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Verify with reverse image search</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Check metadata and source information</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Consider context and timing</span>
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

export default ContentDetector
