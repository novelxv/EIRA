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
  Globe
} from 'lucide-react'

const AIInSectors = () => {
  const [activeUseCase, setActiveUseCase] = useState<string | null>(null)

  const umkmUseCases = [
    {
      id: 'marketing',
      title: 'Marketing Digital Otomatis',
      icon: <MessageSquare className="h-6 w-6" />,
      description: 'Otomatisasi konten media sosial dan customer engagement',
      benefits: [
        'Buat konten Instagram/TikTok otomatis',
        'Chatbot untuk WhatsApp Business',
        'Email marketing personal',
        'Analisis performa posting'
      ],
      tools: [
        { name: 'ChatGPT', use: 'Membuat caption menarik', cost: 'Gratis' },
        { name: 'Canva AI', use: 'Design poster otomatis', cost: '$12/bulan' },
        { name: 'Meta Business', use: 'Automated ads', cost: 'Gratis + ad spend' }
      ],
      roi: '150-300% peningkatan engagement'
    },
    {
      id: 'inventory',
      title: 'Manajemen Stok Pintar',
      icon: <BarChart3 className="h-6 w-6" />,
      description: 'Prediksi demand dan optimasi stok dengan AI',
      benefits: [
        'Prediksi penjualan harian/mingguan',
        'Alert stok menipis otomatis',
        'Rekomendasi pembelian optimal',
        'Analisis produk terlaris'
      ],
      tools: [
        { name: 'Google Sheets + AI', use: 'Formula prediksi sederhana', cost: 'Gratis' },
        { name: 'Zoho Inventory', use: 'AI forecasting', cost: '$39/bulan' },
        { name: 'TradeGecko', use: 'Demand planning', cost: '$99/bulan' }
      ],
      roi: '20-30% pengurangan waste stok'
    },
    {
      id: 'customer',
      title: 'Customer Service 24/7',
      icon: <Users className="h-6 w-6" />,
      description: 'Chatbot pintar yang memahami pelanggan Indonesia',
      benefits: [
        'Respon instan ke customer',
        'Jawab FAQ secara otomatis',
        'Proses order sederhana',
        'Eskalasi ke manusia jika perlu'
      ],
      tools: [
        { name: 'WhatsApp Business API', use: 'Chatbot WhatsApp', cost: 'Dari $0.005/pesan' },
        { name: 'Botika', use: 'Local Indonesian bot', cost: '$15/bulan' },
        { name: 'Tawk.to', use: 'Website chat', cost: 'Gratis' }
      ],
      roi: '50% pengurangan waktu handling customer'
    },
    {
      id: 'finance',
      title: 'Keuangan & Akuntansi',
      icon: <DollarSign className="h-6 w-6" />,
      description: 'Otomatisasi pencatatan dan analisis keuangan',
      benefits: [
        'Auto-kategorisasi transaksi',
        'Laporan keuangan instan',
        'Prediksi cash flow',
        'Tax calculation otomatis'
      ],
      tools: [
        { name: 'Jurnal by Mekari', use: 'AI bookkeeping', cost: '$8/bulan' },
        { name: 'Accurate', use: 'Smart accounting', cost: '$20/bulan' },
        { name: 'Wave Accounting', use: 'AI categorization', cost: 'Gratis' }
      ],
      roi: '80% lebih cepat dalam pembukuan'
    },
    {
      id: 'production',
      title: 'Optimasi Produksi',
      icon: <TrendingUp className="h-6 w-6" />,
      description: 'Efisiensi produksi dengan computer vision dan IoT',
      benefits: [
        'Quality control otomatis',
        'Monitoring proses real-time',
        'Predictive maintenance',
        'Waste reduction'
      ],
      tools: [
        { name: 'Google Vision AI', use: 'Quality inspection', cost: '$1.50/1000 images' },
        { name: 'AWS IoT', use: 'Production monitoring', cost: 'Pay as use' },
        { name: 'Custom solution', use: 'Tailored system', cost: '$500-2000' }
      ],
      roi: '15-25% efisiensi produksi'
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Optimization',
      icon: <Globe className="h-6 w-6" />,
      description: 'Optimasi toko online dengan AI recommendations',
      benefits: [
        'Product recommendations',
        'Dynamic pricing',
        'Personalized shopping',
        'Fraud detection'
      ],
      tools: [
        { name: 'Shopify AI', use: 'Smart recommendations', cost: '$29/bulan' },
        { name: 'Tokopedia Ads', use: 'AI-powered ads', cost: 'Pay per click' },
        { name: 'Google Analytics', use: 'Behavior analysis', cost: 'Gratis' }
      ],
      roi: '25-40% peningkatan conversion rate'
    }
  ]

  const implementationSteps = [
    {
      step: 1,
      title: 'Assessment & Planning',
      description: 'Identifikasi kebutuhan dan prioritas bisnis',
      duration: '1-2 minggu',
      activities: [
        'Audit proses bisnis saat ini',
        'Identifikasi pain points utama',
        'Set budget dan timeline',
        'Training basic AI literacy'
      ]
    },
    {
      step: 2,
      title: 'Pilot Implementation',
      description: 'Mulai dengan 1-2 use case prioritas',
      duration: '2-4 minggu',
      activities: [
        'Setup tools dan platform',
        'Training team terkait',
        'Test dengan data real',
        'Monitoring performa awal'
      ]
    },
    {
      step: 3,
      title: 'Scale & Optimize',
      description: 'Perluas ke area lain dan optimasi',
      duration: '1-3 bulan',
      activities: [
        'Expand ke use case lain',
        'Integrasi antar sistem',
        'Advanced analytics',
        'ROI measurement'
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
            <Store className="h-4 w-4 mr-2" />
            AI in Sectors
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            AI untuk <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">UMKM Indonesia</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Panduan lengkap implementasi AI untuk Usaha Mikro, Kecil, dan Menengah. 
            Mulai dari yang sederhana, terjangkau, dan sesuai konteks Indonesia.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: 'UMKM di Indonesia', value: '65 Juta+', icon: <Store className="h-5 w-5" /> },
            { label: 'Kontribusi GDP', value: '60.5%', icon: <TrendingUp className="h-5 w-5" /> },
            { label: 'Penyerapan Tenaga Kerja', value: '97%', icon: <Users className="h-5 w-5" /> },
            { label: 'Potensi ROI dengan AI', value: '200%+', icon: <Target className="h-5 w-5" /> }
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
            6 Area Implementasi AI untuk UMKM
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {umkmUseCases.map((useCase, index) => (
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
                    <div className="text-green-800 font-medium text-sm">Expected ROI:</div>
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
            Roadmap Implementasi AI
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
              Tips Sukses Implementasi AI untuk UMKM
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Mulai dari yang Sederhana',
                tips: [
                  'Pilih 1 area dengan ROI paling tinggi terlebih dahulu',
                  'Gunakan tools gratis atau murah di awal',
                  'Focus pada proses yang sudah berjalan baik',
                  'Ukur hasil secara konsisten'
                ]
              },
              {
                title: 'Persiapan Tim & Mindset',
                tips: [
                  'Training basic AI literacy untuk tim',
                  'Set ekspektasi yang realistis',
                  'Siapkan data yang bersih dan terstruktur',
                  'Budget untuk learning curve 2-3 bulan'
                ]
              },
              {
                title: 'Pilih Tools yang Tepat',
                tips: [
                  'Prioritaskan tools dengan support Bahasa Indonesia',
                  'Pastikan ada customer support lokal',
                  'Pilih yang mudah integrasi dengan sistem existing',
                  'Consider mobile-first solutions'
                ]
              },
              {
                title: 'Monitoring & Scaling',
                tips: [
                  'Track KPI yang jelas dan measurable',
                  'Regular review bulanan progress',
                  'Scale gradually ke area lain',
                  'Build internal AI capability'
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
            Siap Mulai Transformasi Digital UMKM Anda?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Mulai dengan assessment gratis kebutuhan AI untuk bisnis Anda. 
            Dapatkan rekomendasi tools dan roadmap implementasi yang sesuai.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center justify-center">
              <Target className="h-5 w-5 mr-2" />
              Mulai Assessment
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-medium px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Konsultasi Gratis
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AIInSectors
