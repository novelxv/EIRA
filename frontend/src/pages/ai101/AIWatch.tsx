import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Eye, 
  TrendingUp, 
  AlertTriangle, 
  MessageSquare, 
  Clock,
  ThumbsUp,
  ThumbsDown,
  Share2,
  BookOpen,
  Filter,
  Calendar,
  User
} from 'lucide-react'

interface CaseStudy {
  id: string
  title: string
  category: 'Deepfake' | 'Misinformation' | 'AI Bias' | 'Privacy' | 'Ethics'
  date: string
  impact: 'Low' | 'Medium' | 'High'
  status: 'Ongoing' | 'Resolved' | 'Monitored'
  summary: string
  details: string
  keyLearnings: string[]
  stakeholders: string[]
  actions: string[]
  sources: string[]
  tags: string[]
}

const AIWatch = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterImpact, setFilterImpact] = useState('all')

  const cases: CaseStudy[] = [
    {
      id: '001',
      title: 'Viral Deepfake Video of Prabowo-Jokowi on Social Media',
      category: 'Deepfake',
      date: '2024-01-15',
      impact: 'High',
      status: 'Resolved',
      summary: 'A deepfake video showing a fake conversation between Prabowo and Jokowi went viral on social media, causing public confusion ahead of the election.',
      details: `In January 2024, a deepfake video showing President Jokowi and Prabowo Subianto in a conversation that never happened spread widely on social media. The video was created using sophisticated AI technology and was very convincing.

The video first appeared on TikTok and quickly spread to other platforms like Instagram, Twitter, and WhatsApp. Within 48 hours, the video had been viewed more than 2 million times and shared thousands of times.

The video content showed conversations that could influence public opinion regarding economic policies. The National Police Cyber Crime team along with social media platforms moved quickly to remove the content.`,
      keyLearnings: [
        'Importance of digital literacy in recognizing deepfakes',
        'Need for more sophisticated automatic detection systems on social media platforms',
        'Collaboration between government and digital platforms is crucial',
        'Public education about content verification must be strengthened'
      ],
      stakeholders: ['Ministry of Communication and Informatics', 'Social Media Platforms', 'Police Cyber Crime', 'Public'],
      actions: [
        'Content removal within 24 hours by platforms',
        'Investigation of video source by Cyber Crime',
        'Anti-deepfake education campaign by Ministry of Communication',
        'Detection algorithm updates on social media platforms'
      ],
      sources: [
        'Ministry of Communication Press Release',
        'Platform Transparency Report',
        'Media Coverage Analysis'
      ],
      tags: ['Deepfake', 'Politics', 'Social Media', 'Misinformation']
    },
    {
      id: '002',
      title: 'Gibran AI Meme Generator: Between Humor and Manipulation',
      category: 'Ethics',
      date: '2023-11-20',
      impact: 'Medium',
      status: 'Monitored',
      summary: 'Munculnya aplikasi AI yang dapat menghasilkan meme dengan wajah Gibran Rakabuming menimbulkan perdebatan tentang batas etika dalam penggunaan AI untuk konten humor.',
      details: `Aplikasi bernama "GibranMeme AI" menjadi viral di kalangan anak muda Indonesia. Aplikasi ini menggunakan teknologi face-swapping untuk membuat meme dengan wajah Gibran Rakabuming Raka dalam berbagai situasi lucu.

Meskipun sebagian besar konten bersifat humor tidak berbahaya, beberapa meme yang dihasilkan mulai masuk ke ranah yang berpotensi merusak reputasi. Aplikasi ini menimbulkan pertanyaan tentang consent dan etika penggunaan wajah public figure.

Tim hukum Gibran meminta platform untuk mengevaluasi aplikasi tersebut, sementara developer berargumen bahwa ini adalah bentuk ekspresi kreatif yang legal.`,
      keyLearnings: [
        'Perlunya consent dari public figure untuk penggunaan AI',
        'Batas tipis antara parodi legal dan defamasi',
        'Pentingnya guidelines etika untuk AI content creation',
        'Perlu balance antara kebebasan berekspresi dan perlindungan individu'
      ],
      stakeholders: ['Developer Aplikasi', 'Public Figure', 'Platform Store', 'Pengguna'],
      actions: [
        'Review konten guidelines oleh app store',
        'Dialog dengan stakeholder terkait',
        'Implementasi content moderation yang lebih ketat',
        'Edukasi tentang ethical AI usage'
      ],
      sources: [
        'Developer Statement',
        'Legal Team Response',
        'User Feedback Analysis'
      ],
      tags: ['Face Swap', 'Meme', 'Etika', 'Public Figure', 'Humor']
    },
    {
      id: '003',
      title: 'Mahasiswa ITB Ketahuan Gunakan AI untuk Ujian: Studi Kasus Academic Integrity',
      category: 'Etika',
      date: '2023-09-10',
      impact: 'Tinggi',
      status: 'Resolved',
      summary: 'Kasus mahasiswa ITB yang menggunakan ChatGPT untuk mengerjakan ujian take-home memicu diskusi tentang academic integrity di era AI.',
      details: `Seorang mahasiswa Teknik Informatika ITB ketahuan menggunakan ChatGPT untuk mengerjakan ujian take-home pada mata kuliah Algoritma dan Struktur Data. Dosen mencurigai adanya penggunaan AI karena style penulisan yang berbeda dan solusi yang terlalu sempurna.

Setelah investigasi, mahasiswa tersebut mengaku menggunakan ChatGPT untuk sebagian besar jawaban. Kasus ini menjadi precedent penting dalam penanganan academic misconduct yang melibatkan AI.

ITB kemudian membentuk task force untuk merumuskan kebijakan penggunaan AI dalam akademik, termasuk kapan AI boleh digunakan sebagai alat bantu dan kapan dianggap sebagai kecurangan.`,
      keyLearnings: [
        'Perlu kebijakan jelas tentang penggunaan AI dalam akademik',
        'Pentingnya detection tools untuk mengidentifikasi AI-generated content',
        'Edukasi academic integrity harus diupdate untuk era AI',
        'Balance antara pemanfaatan teknologi dan pembelajaran autentik'
      ],
      stakeholders: ['ITB', 'Mahasiswa', 'Dosen', 'Institusi Pendidikan Lain'],
      actions: [
        'Pembentukan AI Ethics Committee di ITB',
        'Pengembangan detection software untuk AI-generated content',
        'Workshop academic integrity untuk mahasiswa dan dosen',
        'Revisi syllabus untuk mengakomodasi era AI'
      ],
      sources: [
        'ITB Official Statement',
        'Student Disciplinary Report',
        'Academic Ethics Research'
      ],
      tags: ['Academic Integrity', 'ChatGPT', 'Universitas', 'Mahasiswa', 'Ujian']
    },
    {
      id: '004',
      title: 'Bias AI dalam Sistem Rekrutmen Startup Indonesia',
      category: 'Bias AI',
      date: '2023-07-25',
      impact: 'Sedang',
      status: 'Ongoing',
      summary: 'Investigasi terhadap sistem AI recruitment di beberapa startup Indonesia menunjukkan adanya bias gender dan background pendidikan.',
      details: `Studi yang dilakukan oleh Himpunan Mahasiswa Informatika UI menemukan bahwa sistem AI recruitment yang digunakan oleh beberapa startup teknologi di Indonesia menunjukkan bias yang signifikan.

Analisis terhadap 1000 aplikasi lamaran kerja menunjukkan bahwa AI cenderung memberikan skor lebih tinggi kepada kandidat laki-laki dan lulusan universitas tertentu, meskipun kualifikasi dan pengalaman setara.

Bias ini kemungkinan berasal dari data training yang tidak representatif, dimana historis hiring di industri tech Indonesia didominasi oleh profil tertentu.`,
      keyLearnings: [
        'Pentingnya audit bias dalam AI system',
        'Data training harus representatif dan diverse',
        'Perlu oversight manusia dalam AI decision making',
        'Transparansi algoritma recruitment diperlukan'
      ],
      stakeholders: ['Startup Tech', 'Job Seekers', 'HR Professionals', 'Researcher'],
      actions: [
        'Audit bias oleh third party',
        'Diversifikasi training data',
        'Implementasi fairness metrics',
        'Training untuk HR tentang AI bias'
      ],
      sources: [
        'Academic Research Paper',
        'Industry Survey Report',
        'Startup Response Statements'
      ],
      tags: ['Bias AI', 'Recruitment', 'Gender Bias', 'Startup', 'HR Tech']
    }
  ]

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'Deepfake', label: 'Deepfake' },
    { id: 'Misinformation', label: 'Misinformation' },
    { id: 'AI Bias', label: 'AI Bias' },
    { id: 'Privacy', label: 'Privacy' },
    { id: 'Ethics', label: 'Ethics' }
  ]

  const impacts = [
    { id: 'all', label: 'All Impact' },
    { id: 'Low', label: 'Low' },
    { id: 'Medium', label: 'Medium' },
    { id: 'High', label: 'High' }
  ]

  const filteredCases = cases.filter(c => {
    const categoryMatch = filterCategory === 'all' || c.category === filterCategory
    const impactMatch = filterImpact === 'all' || c.impact === filterImpact
    return categoryMatch && impactMatch
  })

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Low': return 'text-green-700 bg-green-100'
      case 'Medium': return 'text-yellow-700 bg-yellow-100'
      case 'High': return 'text-red-700 bg-red-100'
      default: return 'text-neutral-700 bg-neutral-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'text-green-700 bg-green-100'
      case 'Ongoing': return 'text-blue-700 bg-blue-100'
      case 'Monitored': return 'text-yellow-700 bg-yellow-100'
      default: return 'text-neutral-700 bg-neutral-100'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Deepfake': return 'text-red-700 bg-red-100'
      case 'Misinformation': return 'text-orange-700 bg-orange-100'
      case 'AI Bias': return 'text-purple-700 bg-purple-100'
      case 'Privacy': return 'text-blue-700 bg-blue-100'
      case 'Ethics': return 'text-green-700 bg-green-100'
      default: return 'text-neutral-700 bg-neutral-100'
    }
  }

  return (
    <div className="min-h-screen pt-8 bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6">
            <Eye className="h-4 w-4 mr-2" />
            AI Watch
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Monitor</span> Indonesian AI Trends
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Critical analysis of AI usage issues and trends in Indonesia with real case studies for collective learning
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <Filter className="h-5 w-5 text-neutral-600" />
            <div className="flex flex-wrap gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
              <select
                value={filterImpact}
                onChange={(e) => setFilterImpact(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {impacts.map(impact => (
                  <option key={impact.id} value={impact.id}>{impact.label}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Case List */}
          <div className="lg:col-span-1 space-y-4">
            {filteredCases.map((case_, index) => (
              <motion.div
                key={case_.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 ${
                  selectedCase?.id === case_.id
                    ? 'ring-2 ring-orange-500 shadow-xl'
                    : 'hover:shadow-xl hover:-translate-y-1'
                }`}
                onClick={() => setSelectedCase(case_)}
              >
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(case_.category)}`}>
                      {case_.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(case_.impact)}`}>
                      {case_.impact}
                    </span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2">
                    {case_.title}
                  </h3>
                  <p className="text-sm text-neutral-600 line-clamp-3">
                    {case_.summary}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(case_.date).toLocaleDateString('id-ID')}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full ${getStatusColor(case_.status)}`}>
                    {case_.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Case Detail */}
          <div className="lg:col-span-2">
            {selectedCase ? (
              <motion.div
                key={selectedCase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                          Case #{selectedCase.id}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                          {selectedCase.category}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{selectedCase.title}</h2>
                      <p className="opacity-90">{selectedCase.summary}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(selectedCase.date).toLocaleDateString('id-ID')}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                      Impact: {selectedCase.impact}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                      {selectedCase.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Details */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-orange-500" />
                      Case Details
                    </h3>
                    <div className="prose max-w-none text-neutral-700">
                      {selectedCase.details.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {/* Key Learnings */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                      Key Learnings
                    </h3>
                    <ul className="space-y-2">
                      {selectedCase.keyLearnings.map((learning, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-700">{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stakeholders */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-blue-500" />
                      Stakeholders Involved
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCase.stakeholders.map((stakeholder, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {stakeholder}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Taken */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                      Actions Taken
                    </h3>
                    <ul className="space-y-2">
                      {selectedCase.actions.map((action, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-700">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCase.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-4 pt-6 border-t border-neutral-200">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span>Share Case Study</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      <span>Discussion</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Eye className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Select Case Study for Detailed Analysis
                </h3>
                <p className="text-neutral-600">
                  Click on one of the cases on the left to see in-depth analysis and learnings
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Contribute */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-white text-center"
        >
          <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-90" />
          <h2 className="text-2xl font-bold mb-4">Have an Interesting AI Case?</h2>
          <p className="mb-6 opacity-90">
            Help the community learn by sharing case studies or AI trends you've discovered
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 hover:text-orange-700 font-medium px-6 py-3 rounded-xl transition-colors">
              Submit Case Study
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-medium px-6 py-3 rounded-xl transition-colors">
              Join Discussion
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AIWatch
