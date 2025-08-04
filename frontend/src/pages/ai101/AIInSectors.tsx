import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Store, 
  TrendingUp, 
  Users, 
  MessageSquare,
  BarChart3,
  Smartphone,
  Camera,
  CreditCard,
  Clock,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Target,
  DollarSign,
  Globe,
  BookOpen,
  FileText,
  GraduationCap,
  Palette
} from 'lucide-react'

const AIInSectors = () => {
  const [activeUseCase, setActiveUseCase] = useState<string | null>(null)

  const studentUseCases = [
    {
      id: 'study',
      title: 'Asisten Belajar Pintar',
      icon: <BookOpen className="h-6 w-6" />,
      description: 'AI sebagai tutor personal untuk membantu memahami pelajaran',
      benefits: [
        'Penjelasan konsep yang sulit dengan bahasa sederhana',
        'Latihan soal dengan pembahasan detail',
        'Ringkasan materi pelajaran otomatis',
        'Quiz interaktif untuk persiapan ujian'
      ],
      tools: [
        { name: 'ChatGPT', use: 'Tutor matematika & sains', cost: 'Gratis' },
        { name: 'Photomath', use: 'Solver soal matematika', cost: 'Gratis + Premium $9.99/bulan' },
        { name: 'Quillbot', use: 'Parafrase dan grammar check', cost: 'Gratis + Premium $8.33/bulan' }
      ],
      roi: '40-60% peningkatan pemahaman materi'
    },
    {
      id: 'homework',
      title: 'Bantuan Tugas & Proyek',
      icon: <FileText className="h-6 w-6" />,
      description: 'AI untuk membantu mengerjakan tugas sekolah dengan lebih efisien',
      benefits: [
        'Research assistant untuk tugas essay',
        'Ide kreatif untuk proyek sekolah',
        'Proofreading dan editing tulisan',
        'Membuat outline dan struktur karya tulis'
      ],
      tools: [
        { name: 'Notion AI', use: 'Writing assistant & brainstorming', cost: '$8/bulan untuk siswa' },
        { name: 'Grammarly', use: 'Grammar & style checker', cost: 'Gratis + Premium $12/bulan' },
        { name: 'Perplexity AI', use: 'Research dengan sumber terpercaya', cost: 'Gratis + Pro $20/bulan' }
      ],
      roi: '50% lebih cepat menyelesaikan tugas'
    },
    {
      id: 'language',
      title: 'Belajar Bahasa Asing',
      icon: <Globe className="h-6 w-6" />,
      description: 'AI untuk meningkatkan kemampuan bahasa Inggris dan bahasa asing lainnya',
      benefits: [
        'Conversation practice dengan AI',
        'Koreksi pronunciation real-time',
        'Vocabulary building yang adaptive',
        'Writing practice dengan feedback'
      ],
      tools: [
        { name: 'Duolingo', use: 'Belajar bahasa dengan AI tutor', cost: 'Gratis + Plus $6.99/bulan' },
        { name: 'HelloTalk AI', use: 'Chat practice dengan native speaker', cost: 'Gratis + VIP $6.99/bulan' },
        { name: 'ELSA Speak', use: 'AI pronunciation coach', cost: 'Premium $8.33/bulan' }
      ],
      roi: '3x lebih cepat improvement bahasa'
    },
    {
      id: 'creativity',
      title: 'Kreativitas & Seni Digital',
      icon: <Palette className="h-6 w-6" />,
      description: 'AI untuk mengeksplorasi kreativitas dalam seni, desain, dan konten digital',
      benefits: [
        'Generate ide kreatif untuk project seni',
        'Editing foto dan video otomatis',
        'Membuat poster dan desain grafis',
        'Komposisi musik dan sound effect'
      ],
      tools: [
        { name: 'Canva AI', use: 'Design poster & presentasi', cost: 'Gratis + Pro $12.99/bulan' },
        { name: 'Midjourney', use: 'AI art generation', cost: '$10/bulan' },
        { name: 'Runway ML', use: 'Video editing dengan AI', cost: '$12/bulan' }
      ],
      roi: 'Unlimited creative possibilities'
    },
    {
      id: 'career',
      title: 'Persiapan Karir & Kuliah',
      icon: <Target className="h-6 w-6" />,
      description: 'AI untuk membantu planning masa depan dan persiapan kuliah',
      benefits: [
        'Career guidance berdasarkan minat & bakat',
        'Mock interview dengan AI',
        'Review CV dan personal statement',
        'Rekomendasi jurusan dan universitas'
      ],
      tools: [
        { name: 'LinkedIn Learning', use: 'Skill development courses', cost: '$29.99/bulan' },
        { name: 'InterviewBuddy AI', use: 'Practice interview', cost: '$19/bulan' },
        { name: 'Zety Resume Builder', use: 'AI-powered CV maker', cost: '$5.95/bulan' }
      ],
      roi: '80% lebih siap untuk masa depan'
    },
    {
      id: 'productivity',
      title: 'Manajemen Waktu & Produktivitas',
      icon: <Clock className="h-6 w-6" />,
      description: 'AI untuk mengatur jadwal belajar dan meningkatkan produktivitas',
      benefits: [
        'Smart scheduling untuk belajar',
        'Reminder tugas dan deadline otomatis',
        'Time tracking untuk aktivitas belajar',
        'Focus mode dengan background noise'
      ],
      tools: [
        { name: 'Notion', use: 'All-in-one workspace', cost: 'Gratis untuk siswa' },
        { name: 'Forest App', use: 'Focus timer dengan gamification', cost: '$3.99 sekali bayar' },
        { name: 'Motion', use: 'AI calendar assistant', cost: '$19/bulan' }
      ],
      roi: '60% peningkatan produktivitas belajar'
    }
  ]

  const implementationSteps = [
    {
      step: 1,
      title: 'Kenali Kebutuhan Belajar',
      description: 'Identifikasi mata pelajaran dan skill yang ingin ditingkatkan',
      duration: '1 minggu',
      activities: [
        'Evaluasi nilai dan performa akademik saat ini',
        'Tentukan mata pelajaran yang paling challenging',
        'Set goals yang realistis dan terukur',
        'Diskusi dengan guru dan orang tua'
      ]
    },
    {
      step: 2,
      title: 'Mulai dengan Tools Gratis',
      description: 'Eksperimen dengan AI tools yang tersedia gratis',
      duration: '2-3 minggu',
      activities: [
        'Download dan coba aplikasi gratis',
        'Belajar basic prompt engineering',
        'Praktek dengan tugas sekolah real',
        'Evaluasi mana yang paling membantu'
      ]
    },
    {
      step: 3,
      title: 'Integrasikan ke Rutine Belajar',
      description: 'Jadikan AI sebagai bagian dari kebiasaan belajar harian',
      duration: '1-2 bulan',
      activities: [
        'Buat jadwal penggunaan AI tools',
        'Kombinasikan dengan metode belajar tradisional',
        'Track progress dan improvement',
        'Share pengalaman dengan teman'
      ]
    }
  ]

  return (
    <div className="min-h-screen pt-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <GraduationCap className="h-4 w-4 mr-2" />
            AI in Sectors
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            AI untuk <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Pelajar SMA</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Panduan lengkap menggunakan AI untuk meningkatkan prestasi akademik, 
            kreativitas, dan persiapan masa depan sebagai pelajar SMA modern.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            {label: 'Siswa SMA di Indonesia', value: '4.8 Juta', icon: <Users className="h-5 w-5" /> },
            { label: 'Menggunakan Smartphone', value: '95%', icon: <Smartphone className="h-5 w-5" /> },
            { label: 'Akses Internet Harian', value: '8+ Jam', icon: <Globe className="h-5 w-5" /> },
            { label: 'Potensi Peningkatan Nilai', value: '25%+', icon: <TrendingUp className="h-5 w-5" /> }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                <div className="text-blue-600">{stat.icon}</div>
              </div>
              <div className="text-2xl font-bold text-neutral-900 mb-2">{stat.value}</div>
              <div className="text-neutral-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
            6 Cara AI Membantu Pelajar SMA
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentUseCases.map((useCase, index) => (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-100 rounded-lg p-3">
                      <div className="text-blue-600">{useCase.icon}</div>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900">{useCase.title}</h3>
                  </div>
                  
                  <p className="text-neutral-600 mb-4">{useCase.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {useCase.benefits.slice(0, 2).map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-neutral-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-3 mb-4">
                    <div className="text-green-800 font-medium text-sm">Expected Impact:</div>
                    <div className="text-green-700 text-sm">{useCase.roi}</div>
                  </div>
                  
                  <button
                    onClick={() => setActiveUseCase(activeUseCase === useCase.id ? null : useCase.id)}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Lihat Detail</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Detailed View */}
                {activeUseCase === useCase.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-neutral-200 p-6 bg-neutral-50"
                  >
                    <h4 className="font-semibold text-neutral-900 mb-3">Semua Benefit:</h4>
                    <div className="space-y-2 mb-4">
                      {useCase.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-neutral-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h4 className="font-semibold text-neutral-900 mb-3">Rekomendasi Tools:</h4>
                    <div className="space-y-3">
                      {useCase.tools.map((tool, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-3 border border-neutral-200">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-neutral-900">{tool.name}</span>
                            <span className="text-blue-600 text-sm font-medium">{tool.cost}</span>
                          </div>
                          <span className="text-neutral-600 text-sm">{tool.use}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Implementation Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
            Roadmap Belajar dengan AI
          </h2>
          
          <div className="space-y-8">
            {implementationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-neutral-900">{step.title}</h3>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-neutral-600 mb-4">{step.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {step.activities.map((activity, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          <span className="text-neutral-700 text-sm">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tips & Best Practices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-16"
        >
          <div className="text-center mb-8">
            <Lightbulb className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Tips Sukses Belajar dengan AI
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Smart Study Habits',
                tips: [
                  'Gunakan AI sebagai supplement, bukan pengganti belajar',
                  'Selalu verify informasi dari AI dengan sumber terpercaya',
                  'Praktek active learning, jangan hanya copy-paste',
                  'Set time limit untuk penggunaan AI tools'
                ]
              },
              {
                title: 'Academic Integrity',
                tips: [
                  'Pahami aturan sekolah tentang penggunaan AI',
                  'Gunakan AI untuk brainstorming, bukan mencontek',
                  'Selalu cite sources dan acknowledge AI assistance',
                  'Develop critical thinking, jangan tergantung total'
                ]
              },
              {
                title: 'Budget-Friendly Approach',
                tips: [
                  'Mulai dengan tools gratis sebelum upgrade premium',
                  'Manfaatkan student discount yang tersedia',
                  'Share subscription dengan teman (jika diperbolehkan)',
                  'Fokus pada tools yang multi-purpose'
                ]
              },
              {
                title: 'Future-Ready Skills',
                tips: [
                  'Pelajari basic prompt engineering',
                  'Develop AI literacy dan digital citizenship',
                  'Stay updated dengan perkembangan AI terbaru',
                  'Build portfolio digital untuk kuliah/karir'
                ]
              }
            ].map((section, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-4">{section.title}</h3>
                <div className="space-y-2">
                  {section.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700 text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-500 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-4">
            Siap Jadi Pelajar SMA yang Future-Ready?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Mulai gunakan AI untuk boost prestasi akademik dan persiapan masa depan. 
            Jadi generasi yang tidak hanya menggunakan AI, tapi memahami dan menguasainya!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center justify-center">
              <Target className="h-5 w-5 mr-2" />
              Mulai Belajar Sekarang
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-medium px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Join Study Group
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AIInSectors
