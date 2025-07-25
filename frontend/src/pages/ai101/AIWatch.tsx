import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, TrendingUp, AlertTriangle, MessageSquare, Share2, BookOpen, Filter, Calendar, User } from "lucide-react"
import { Tooltip } from "@/components/tooltip"
import { ExpandableText } from "@/components/expandable-text"

interface CaseStudy {
  id: string
  title: string
  categories: string[]
  date: string
  status: "Ongoing" | "Resolved" | "Monitored"
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
  const [filterCategory, setFilterCategory] = useState("all")
//   const [filterImpact, setFilterImpact] = useState("all")

  // Term definitions for tooltips
  const termDefinitions: Record<string, string> = {
    "UU ITE":
      "Undang-Undang Informasi dan Transaksi Elektronik - Indonesia's Electronic Information and Transactions Law that regulates online activities and digital crimes.",
    "Bareskrim Polri":
      "Badan Reserse Kriminal Kepolisian Negara Republik Indonesia - Indonesia's National Police Criminal Investigation Agency.",
    "AI-generated":
      "Content created by artificial intelligence systems, including text, images, videos, or audio that is produced without direct human creation.",
    "Synthetic media":
      "Media content that has been artificially generated or manipulated using AI technologies, including deepfakes, voice synthesis, and generated images.",
    "Kemendikbudristek":
      "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi - Indonesia's Ministry of Education, Culture, Research, and Technology.",
    "ChatGPT":
      "An AI-powered conversational tool developed by OpenAI that can generate human-like text responses and assist with various writing tasks.",
    "AI literacy":
      "The ability to understand, use, and critically evaluate artificial intelligence technologies and their implications in various contexts.",
    "Academic integrity":
      "The commitment to honest and ethical conduct in academic work, including proper attribution of sources and original thinking.",
    "GANN":
      "Generative Adversarial Neural Network - a type of AI architecture where two neural networks compete against each other to create realistic synthetic content.",
    "Deepfake":
      "AI-generated media that replaces a person's likeness with someone else's, often used to create fake videos or images that appear authentic.",
    "WhatsApp":
      "A popular messaging application widely used in Indonesia for personal and business communication.",
    "TikTok":
      "A social media platform for sharing short videos, very popular among Indonesian youth and content creators.",
    "Face detection":
      "AI technology that can identify and locate human faces in images or videos, often used as a component in deepfake creation.",
    "Digital literacy":
      "The ability to find, evaluate, utilize, share, and create content using information technologies and the internet."
  }

  const renderTextWithTooltips = (text: string) => {
    let result = text

    Object.entries(termDefinitions).forEach(([term, definition]) => {
      const regex = new RegExp(`\\b${term}\\b`, "gi")
      result = result.replace(regex, `<tooltip term="${term}" definition="${definition}">$&</tooltip>`)
    })

    // Split by tooltip tags and render accordingly
    const parts = result.split(/(<tooltip[^>]*>.*?<\/tooltip>)/g)

    return parts.map((part, index) => {
      const tooltipMatch = part.match(/<tooltip term="([^"]*)" definition="([^"]*)">([^<]*)<\/tooltip>/)
      if (tooltipMatch) {
        const [, term, definition, content] = tooltipMatch
        return (
          <Tooltip key={index} content={definition} term={term}>
            {content}
          </Tooltip>
        )
      }
      return part
    })
  }

  const cases: CaseStudy[] = [
    {
      id: "001",
      title: "ITB Student Arrested for AI-Generated Meme of Jokowi and Prabowo Kissing",
      categories: ["Deepfake", "Ethics"],
      date: "2025-05-06",
      status: "Resolved",
      summary:
        "A female student from Institut Teknologi Bandung (ITB) was arrested after posting a deepfake meme showing President Jokowi and Defense Minister Prabowo kissing. The case raised serious debates around freedom of expression, political satire, and the ethical use of AI-generated media in Indonesia.",
      details: `In March 2025, an ITB student known as SSS uploaded an AI-generated deepfake meme to her X (formerly Twitter) account, @reiyanyami, portraying Jokowi and Prabowo kissing. Meant as political satire referencing the so-called "twin suns" alliance, the meme triggered public outrage and legal action. On May 6, 2025, she was arrested by Bareskrim Polri under Indonesia's UU ITE for allegedly spreading immoral and manipulated content.

Although her intent was satirical, the deepfake's realism caused confusion and offense, leading to accusations of harassment by pro-government groups. This case is an example about ethical concerns about deepfakes, including harm to individuals, erosion of democratic discourse, and misuse by authoritarian regimes.

SSS's arrest illustrates the blurred lines between satire and defamation in Indonesia's sociopolitical context, where respect for authority is deeply rooted. It also highlights the lack of clear regulation for synthetic media and the challenges platforms face in moderating such content. The controversy has sparked calls for reforming UU ITE, increasing media literacy, and introducing ethical AI governance frameworks to preserve democratic freedoms while preventing harm.

The case also demonstrates how AI-generated content can quickly escalate from personal expression to national controversy. The student's use of readily available deepfake technology to create political commentary reflects the democratization of AI tools, but also the potential for unintended consequences when such tools intersect with sensitive political and cultural contexts.

Furthermore, the incident highlights the need for clearer guidelines on what constitutes acceptable use of AI-generated content in political discourse. The arrest has prompted discussions among legal experts about whether existing laws are adequate to address the nuances of AI-generated content, particularly when used for satirical or artistic purposes.`,
      keyLearnings: [
        "Deepfakes used as satire can still cause reputational and societal harm.",
        "Legal frameworks like UU ITE are ill-equipped to handle nuanced cases involving AI-generated content and political critique.",
        "The cultural context (e.g., respect for authority in Indonesia) deeply influences the public and legal response to deepfakes.",
        "Platforms like X have a moral responsibility to moderate, label, or contextualize synthetic media to prevent misinterpretation.",
        "Investing in media literacy is essential for building resilience against the manipulation potential of deepfakes.",
      ],
      stakeholders: [
        "SSS (student, content creator)",
        "President Joko Widodo",
        "Minister Prabowo Subianto",
        "Bareskrim Polri",
        "Projo and Jokowi Mania (Joman)",
        "Institut Teknologi Bandung (ITB)",
        "X (formerly Twitter)",
        "Amnesty International Indonesia",
        "General Indonesian public",
      ],
      actions: [
        "SSS arrested under UU ITE for spreading offensive content.",
        "Public backlash both in support of and against SSS.",
        "Condemnation by free speech advocates and Amnesty Indonesia.",
        "Online discussions on ethics of AI satire and need for regulation.",
        "Petitions and statements from ITB student groups demanding her release.",
      ],
      sources: [
        "https://www.orfonline.org/expert-speak/debating-the-ethics-of-deepfakes",
        "https://www.bbc.com/indonesia/articles/czel388wydlo",
      ],
      tags: ["Deepfake", "Satire", "Freedom of Speech", "UU ITE", "Political Expression", "AI Ethics", "Indonesia"],
    },
    {
        id: "002",
        title: "Widespread Use of AI by Students for Assignments",
        categories: ["Education", "Ethics"],
        date: "2024-05-31",
        status: "Ongoing",
        summary:
            "A survey by Tirto and Jakpat found that over 86% of Indonesian high school and university students admitted to using AI tools—like ChatGPT—to complete school assignments. This rapid adoption raises ethical issues, academic integrity concerns, and highlights the need for AI literacy among students and educators.",
        details: `Between May 21–27, 2024, a survey across 1,501 students aged 15–21 from 34 provinces revealed that 86.21% used AI at least once per month for homework or essays. While many used AI for summarizing, idea generation, or draft writing, some also relied entirely on AI—up to 100% of task completion. Students reported low academic consequences: plagiarized AI content was often merely asked to be revised rather than sanctioned. This normalization of AI use in education—without guidance or clear academic policy—creates a blurred line between learning and outsourcing intellectual effort.`,
        keyLearnings: [
            "AI adoption in education is widespread, yet academic policies are mostly absent or unclear.",
            "Excessive reliance on AI may undermine students' critical thinking and learning skills.",
            "Students often misuse AI without understanding ethical guidelines or attribution norms.",
            "Educators and institutions lack frameworks to responsibly integrate AI in curricula."
        ],
        stakeholders: [
            "Students across Indonesia (high school and university)",
            "Teachers and academic institutions",
            "Jakpat & Tirto (survey organizations)",
            "Ministry of Education, Culture, Research & Technology (Kemendikbudristek)",
            "Parents and broader educational community"
        ],
        actions: [
            "Survey published raising awareness on student AI usage trends.",
            "University and school faculty discussions on establishing AI usage guidelines.",
            "Ministry of Education begins drafting elective AI curriculum for 2025–26 academic year.",
        ],
        sources: [
            "https://tirto.id/penggunaan-ai-di-dunia-pendidikan-makin-marak-dan-merata-gZax",
            "https://govinsider.asia/intl-en/article/how-indonesia-is-tackling-the-challenges-of-ai-learning-in-the-classroom"
        ],
        tags: ["AI in Education", "Academic Integrity", "Student Ethics", "Digital Literacy", "Indonesia"]
    },
    {
        id: "003",
        title: "Deepfake Scam Impersonating President Prabowo Subianto",
        categories: ["Deepfake", "Scam"],
        date: "2025-02-07",
        status: "Resolved",
        summary:
            "Scammers created deepfake videos impersonating President Prabowo Subianto and Minister Sri Mulyani, asking citizens via WhatsApp to pay administrative fees for alleged financial aid. The fraudulent videos circulated widely across social media and resulted in arrests by the Bareskrim Cyber Crime division.",
        details: `Beginning in late 2024 and early 2025, Bareskrim Polri uncovered a deepfake scam operation that exploited AI‑generated videos portraying President Prabowo Subianto and Minister Sri Mulyani. Victims across multiple provinces received messages via WhatsApp or TikTok urging them to pay Rp 250,000–500,000 as ‘processing fees’ to qualify for non‑existent government aid. By February–March 2025, the police had arrested two suspects, AMA (29) and JS (25), and traced the fraud back to at least 100 victims. Forensic analysis confirmed the videos were 100% fake, using face detection and Generative Adversarial Neural Network (GANN) techniques. The operation reportedly amassed over Rp 30 million in illicit gains.`,
        keyLearnings: [
            "Deepfake technology can be weaponized for large‑scale financial scams.",
            "Highly realistic AI videos do not guarantee authenticity; digital literacy is critical.",
            "Even face recognition and smartphone videos can be manipulated convincingly.",
            "Improved platform moderation and public awareness campaigns are essential to protect less digital‑savvy users."
        ],
        stakeholders: [
            "General Indonesian public",
            "President Prabowo Subianto (impersonated)",
            "Minister Sri Mulyani (impersonated)",
            "Victims across multiple provinces",
            "Bareskrim Polri – Cyber Crime Unit",
            "TikTok, Instagram, WhatsApp platforms",
            "Fact-check organizations and media outlets"
        ],
        actions: [
            "Police arrested two suspects and recovered partial funds.",
            "Platforms removed some deepfake content and issued warnings.",
            "Government agencies (Kominfo, Bareskrim) published alerts.",
            "Media fact-check teams debunked fraudulent videos."
        ],
        sources: [
            "https://news.detik.com/berita/d-7884867/babak-baru-perkara-deepfake-catut-prabowo",
            "https://news.detik.com/berita/d-7767817/bareskrim-lakukan-analisis-forensik-deepfake-catut-prabowo-100-palsu",
            "https://news.detik.com/berita/d-7746358/penipu-modus-deepfake-catut-prabowo-raup-untung-rp-30-juta-dalam-4-bulan"
        ],
        tags: ["Deepfake Scam", "Financial Fraud", "AI Forensics", "Indonesia", "Digital Literacy"]
    }
  ]

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "Deepfake", label: "Deepfake" },
    { id: "Misinformation", label: "Misinformation" },
    { id: "AI Bias", label: "AI Bias" },
    { id: "Privacy", label: "Privacy" },
    { id: "Ethics", label: "Ethics" },
    { id: "Education", label: "Education" },
    { id: "Scam", label: "Scam" },
  ]

  const impacts = [
    { id: "all", label: "All Impact" },
    { id: "Low", label: "Low" },
    { id: "Medium", label: "Medium" },
    { id: "High", label: "High" },
  ]

  const filteredCases = cases.filter((c) => {
    const categoryMatch = filterCategory === "all" || c.categories.includes(filterCategory)
    // const impactMatch = filterImpact === "all" || c.impact === filterImpact
    return categoryMatch
  })

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Low":
        return "text-green-700 bg-green-100"
      case "Medium":
        return "text-yellow-700 bg-yellow-100"
      case "High":
        return "text-red-700 bg-red-100"
      default:
        return "text-neutral-700 bg-neutral-100"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "text-green-700 bg-green-100"
      case "Ongoing":
        return "text-blue-700 bg-blue-100"
      case "Monitored":
        return "text-yellow-700 bg-yellow-100"
      default:
        return "text-neutral-700 bg-neutral-100"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Deepfake":
        return "text-red-700 bg-red-100"
      case "Misinformation":
        return "text-orange-700 bg-orange-100"
      case "AI Bias":
        return "text-purple-700 bg-purple-100"
      case "Privacy":
        return "text-blue-700 bg-blue-100"
      case "Ethics":
        return "text-green-700 bg-green-100"
      case "Education":
        return "text-indigo-700 bg-indigo-100"
      case "Scam":
        return "text-pink-700 bg-pink-100"
      default:
        return "text-neutral-700 bg-neutral-100"
    }
  }

  return (
    <div className="min-h-screen pt-8 bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6">
            <Eye className="h-4 w-4 mr-2" />
            AI Watch
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Monitor</span>{" "}
            Indonesian AI Trends
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Critical analysis of AI usage issues and trends in Indonesia with real case studies for collective learning
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <Filter className="h-5 w-5 text-neutral-600" />
            <div className="flex flex-wrap gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {/* <select
                value={filterImpact}
                onChange={(e) => setFilterImpact(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {impacts.map((impact) => (
                  <option key={impact.id} value={impact.id}>
                    {impact.label}
                  </option>
                ))}
              </select> */}
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
                    ? "ring-2 ring-orange-500 shadow-xl"
                    : "hover:shadow-xl hover:-translate-y-1"
                }`}
                onClick={() => setSelectedCase(case_)}
              >
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2 flex-wrap gap-1">
                    {case_.categories.map((category, catIndex) => (
                      <span key={catIndex} className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                        {category}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2">{case_.title}</h3>
                  <p className="text-sm text-neutral-600 line-clamp-3">{case_.summary}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(case_.date).toLocaleDateString("id-ID")}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full ${getStatusColor(case_.status)}`}>{case_.status}</span>
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
                      <div className="flex items-center space-x-2 mb-3 flex-wrap gap-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                          Case #{selectedCase.id}
                        </span>
                        {selectedCase.categories.map((category, catIndex) => (
                          <span key={catIndex} className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                            {category}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{selectedCase.title}</h2>
                      <p className="opacity-90">{selectedCase.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(selectedCase.date).toLocaleDateString("id-ID")}</span>
                    </div>
                    {/* <span className={`px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                      Impact: {selectedCase.impact}
                    </span> */}
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
                    <ExpandableText
                      textElement={renderTextWithTooltips(selectedCase.details)}
                      maxLength={500}
                    />
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
                          <span className="text-neutral-700">{renderTextWithTooltips(learning)}</span>
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
                          <span className="text-neutral-700">{renderTextWithTooltips(action)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCase.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sources */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Sources</h3>
                    <ul className="space-y-2 list-disc list-inside text-blue-600">
                      {selectedCase.sources.map((source, index) => {
                        // Extract domain and optional label from the URL
                        const url = new URL(source)
                        let label = url.hostname.replace("www.", "")

                        // Optional: Custom labels for known sources
                        if (url.hostname.includes("orfonline")) label = "Observer Research Foundation"
                        if (url.hostname.includes("kompas")) label = "Kompas"
                        if (url.hostname.includes("twitter.com")) {
                          const handle = url.pathname.split("/")[1]
                          label = `Twitter – @${handle}`
                        }

                        return (
                          <li key={index}>
                            <a href={source} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {label}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
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
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Select Case Study for Detailed Analysis</h3>
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
