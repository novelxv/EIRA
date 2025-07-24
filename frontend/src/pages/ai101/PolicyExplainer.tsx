import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Scale, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  ExternalLink,
  Download,
  Calendar,
  Users,
  Building
} from 'lucide-react'

interface PolicyDocument {
  title: string
  description: string
  type: 'Law' | 'Regulation' | 'Guideline'
  date: string
  status: 'Active' | 'Draft' | 'Revised'
  keyPoints: string[]
  implications: string[]
  relevantFor: string[]
  downloadUrl?: string
}

const PolicyExplainer = () => {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyDocument | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const policies: PolicyDocument[] = [
    {
      title: "Law No. 27 of 2022 on Personal Data Protection (PDP Law)",
      description: "Law regulating personal data protection in the digital era",
      type: "Law",
      date: "2022-10-17",
      status: "Active",
      keyPoints: [
        "Definition of personal data and specific personal data",
        "Rights of personal data subjects",
        "Obligations of data controllers and processors",
        "Administrative and criminal sanctions",
        "Establishment of personal data protection agency"
      ],
      implications: [
        "AI platforms must obtain consent before processing personal data",
        "Users have the right to know how their data is used",
        "AI companies must implement adequate data security systems",
        "Data transfer abroad must meet certain requirements"
      ],
      relevantFor: ["AI Developers", "AI Platform Users", "Technology Companies"]
    },
    {
      title: "Ministry of Communication Regulation on Deepfake Content Handling",
      description: "Special regulation to address the spread of deepfake content and AI manipulation",
      type: "Regulation",
      date: "2023-08-15",
      status: "Active",
      keyPoints: [
        "Definition and characteristics of deepfake content",
        "Platform obligations to detect and handle deepfakes",
        "Deepfake content reporting mechanisms",
        "Sanctions for spreading harmful deepfake content",
        "Cooperation with law enforcement agencies"
      ],
      implications: [
        "Social media platforms must implement deepfake detection systems",
        "Users can report suspicious deepfake content",
        "Deepfake content creators may face legal sanctions",
        "Digital literacy needed to recognize manipulative content"
      ],
      relevantFor: ["Content Creators", "Social Media Platforms", "General Public"]
    },
    {
      title: "Digital Campaign Ethics Guidelines",
      description: "Guidelines for using AI in political campaigns and public communication",
      type: "Guideline",
      date: "2023-12-01",
      status: "Active",
      keyPoints: [
        "Transparency in using AI for campaigns",
        "Prohibition of information manipulation using AI",
        "Obligation to include disclaimers for AI content",
        "Fact verification standards for campaign content",
        "Voter privacy protection in digital targeting"
      ],
      implications: [
        "Campaign teams must disclose AI usage",
        "AI-generated content must be clearly labeled",
        "Micro-targeting based on personal data is limited",
        "Digital platforms are responsible for political ad verification"
      ],
      relevantFor: ["Campaign Teams", "Digital Platforms", "Media", "Voters"]
    },
    {
      title: "Draft AI Regulation for Education Sector",
      description: "Draft regulation for AI use in the national education system",
      type: "Regulation",
      date: "2024-03-20",
      status: "Draft",
      keyPoints: [
        "Standar keamanan AI dalam pembelajaran online",
        "Perlindungan data siswa dan guru",
        "Kriteria AI yang diizinkan dalam ujian dan penilaian",
        "Pelatihan guru dalam penggunaan AI",
        "Evaluasi dampak AI terhadap kualitas pendidikan"
      ],
      implications: [
        "Sekolah harus mengevaluasi tools AI yang digunakan",
        "Siswa dan guru mendapat perlindungan data yang lebih baik",
        "Standardisasi penggunaan AI dalam evaluasi akademik",
        "Peningkatan kapasitas digital educator"
      ],
      relevantFor: ["Institusi Pendidikan", "Guru", "Siswa", "Orang Tua"]
    }
  ]

  const categories = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'UU', label: 'Undang-Undang' },
    { id: 'Peraturan', label: 'Peraturan' },
    { id: 'Pedoman', label: 'Pedoman' }
  ]

  const filteredPolicies = policies.filter(policy => 
    activeCategory === 'all' || policy.type === activeCategory
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Berlaku': return 'text-green-700 bg-green-100'
      case 'Draft': return 'text-yellow-700 bg-yellow-100'
      case 'Direvisi': return 'text-blue-700 bg-blue-100'
      default: return 'text-neutral-700 bg-neutral-100'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'UU': return <Scale className="h-5 w-5" />
      case 'Peraturan': return <Shield className="h-5 w-5" />
      case 'Pedoman': return <FileText className="h-5 w-5" />
      default: return <FileText className="h-5 w-5" />
    }
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
            <Scale className="h-4 w-4 mr-2" />
            AI Policy Explainer
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Regulasi AI</span> di Indonesia
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Pahami peraturan dan kebijakan AI terbaru dengan penjelasan yang mudah dipahami
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-neutral-700 hover:bg-green-50 border border-neutral-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Policy List */}
          <div className="lg:col-span-1 space-y-4">
            {filteredPolicies.map((policy, index) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 ${
                  selectedPolicy?.title === policy.title
                    ? 'ring-2 ring-green-500 shadow-xl'
                    : 'hover:shadow-xl hover:-translate-y-1'
                }`}
                onClick={() => setSelectedPolicy(policy)}
              >
                <div className="flex items-start space-x-3 mb-4">
                  <div className="text-green-600">
                    {getTypeIcon(policy.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2">
                      {policy.title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                        {policy.status}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {new Date(policy.date).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 line-clamp-3">
                      {policy.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Policy Detail */}
          <div className="lg:col-span-2">
            {selectedPolicy ? (
              <motion.div
                key={selectedPolicy.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        {getTypeIcon(selectedPolicy.type)}
                        <span className="text-sm opacity-90">{selectedPolicy.type}</span>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{selectedPolicy.title}</h2>
                      <p className="opacity-90">{selectedPolicy.description}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                        {selectedPolicy.status}
                      </span>
                      <div className="flex items-center space-x-1 mt-2 text-sm opacity-90">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(selectedPolicy.date).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Key Points */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      Poin-Poin Penting
                    </h3>
                    <ul className="space-y-2">
                      {selectedPolicy.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Implications */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                      Implikasi untuk Pengguna AI
                    </h3>
                    <ul className="space-y-2">
                      {selectedPolicy.implications.map((implication, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-700">{implication}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Relevant For */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-500" />
                      Relevan Untuk
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPolicy.relevantFor.map((audience, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {audience}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-4 pt-6 border-t border-neutral-200">
                    {selectedPolicy.downloadUrl && (
                      <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        <Download className="h-4 w-4" />
                        <span>Download Dokumen</span>
                      </button>
                    )}
                    <button className="flex items-center space-x-2 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                      <span>Lihat Sumber Resmi</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <FileText className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Pilih Regulasi untuk Melihat Detail
                </h3>
                <p className="text-neutral-600">
                  Klik salah satu regulasi di sebelah kiri untuk melihat penjelasan lengkap
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-8 text-white"
        >
          <div className="text-center">
            <Building className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-4">Butuh Konsultasi Hukum?</h2>
            <p className="mb-6 opacity-90">
              Untuk interpretasi hukum yang lebih spesifik, konsultasikan dengan ahli hukum teknologi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 hover:text-green-700 font-medium px-6 py-3 rounded-xl transition-colors">
                Direktori Konsultan Hukum IT
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-medium px-6 py-3 rounded-xl transition-colors">
                FAQ Regulasi AI
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PolicyExplainer
