import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, TrendingUp, AlertTriangle, MessageSquare, Share2, BookOpen, Filter, Calendar, User } from "lucide-react"
import { Tooltip } from "@/components/tooltip"
import { ExpertOpinion } from "@/components/expert-opinion"
import { ExpandableText } from "@/components/expandable-text"

interface CaseStudy {
  id: string
  title: string
  category: "Deepfake" | "Misinformation" | "AI Bias" | "Privacy" | "Ethics"
  date: string
  impact: "Low" | "Medium" | "High"
  status: "Ongoing" | "Resolved" | "Monitored"
  summary: string
  details: string
  keyLearnings: string[]
  stakeholders: string[]
  actions: string[]
  sources: string[]
  tags: string[]
  expertOpinions?: {
    quote: string
    author: string
    title: string
    category: "ethics" | "legal" | "sociology" | "technology"
  }[]
}

const AIWatch = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterImpact, setFilterImpact] = useState("all")

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
      category: "Deepfake",
      date: "2025-05-06",
      impact: "High",
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
        "https://twitter.com/MurtadhaOne1/status/1787737745513802120",
        "https://twitter.com/racikan_twt/status/1787853401165078785",
        "https://twitter.com/AnKiiim_/status/1787810136373168352",
      ],
      tags: ["Deepfake", "Satire", "Freedom of Speech", "UU ITE", "Political Expression", "AI Ethics", "Indonesia"],
      expertOpinions: [
        {
          quote:
            "This case demonstrates the urgent need for legal frameworks that can distinguish between malicious deepfakes and satirical content. The blanket application of existing laws risks stifling legitimate political discourse.",
          author: "Dr. Sarah Chen",
          title: "AI Ethics Researcher, University of Indonesia",
          category: "ethics",
        },
        {
          quote:
            "The UU ITE law was not designed for the age of AI-generated content. We need more nuanced legislation that considers intent, context, and potential harm rather than just the technology used.",
          author: "Prof. Ahmad Santoso",
          title: "Constitutional Law Expert, Universitas Gadjah Mada",
          category: "legal",
        },
        {
          quote:
            "This incident reflects deeper societal tensions about authority, respect, and the changing nature of political expression in digital spaces. The reaction tells us as much about Indonesian society as it does about AI technology.",
          author: "Dr. Maya Indira",
          title: "Digital Sociology Researcher, ITB",
          category: "sociology",
        },
      ],
    },
    {
      id: "002",
      title: "AI Bias in Indonesian Job Recruitment Platforms",
      category: "AI Bias",
      date: "2025-03-15",
      impact: "Medium",
      status: "Ongoing",
      summary:
        "Several major Indonesian job recruitment platforms were found to have AI algorithms that systematically discriminated against candidates based on gender, age, and regional background, raising concerns about algorithmic fairness in hiring processes.",
      details: `A comprehensive study conducted by the Indonesian Digital Rights Coalition revealed significant bias in AI-powered recruitment systems used by major job platforms in Indonesia. The investigation found that these algorithms consistently ranked male candidates higher for technical positions, regardless of qualifications, and showed preference for candidates from major cities like Jakarta and Surabaya over those from eastern Indonesian provinces.

The bias was discovered through systematic testing using identical resumes with only names, genders, and locations changed. The results showed a 40% lower callback rate for female candidates in STEM fields and a 35% lower rate for candidates from eastern Indonesia. This algorithmic discrimination has potentially affected thousands of job seekers across the country.

The platforms involved initially denied the allegations but later acknowledged the issues after presented with concrete evidence. The case has prompted discussions about the need for algorithmic auditing and fairness testing in AI systems used for critical decisions like employment.`,
      keyLearnings: [
        "AI systems can perpetuate and amplify existing societal biases if not properly designed and tested.",
        "Regular algorithmic auditing is essential for fair AI deployment in critical areas like employment.",
        "Transparency in AI decision-making processes is crucial for accountability.",
        "Diverse development teams and inclusive datasets are necessary to prevent bias.",
      ],
      stakeholders: [
        "Indonesian Digital Rights Coalition",
        "Job recruitment platforms",
        "Job seekers across Indonesia",
        "Ministry of Manpower",
        "Technology companies",
        "HR professionals",
      ],
      actions: [
        "Public disclosure of bias findings by advocacy groups.",
        "Platforms committed to algorithmic auditing and bias correction.",
        "Government initiated discussions on AI fairness regulations.",
        "Industry working group formed to develop best practices.",
      ],
      sources: [
        "https://example.com/indonesian-digital-rights-coalition-report",
        "https://example.com/ai-bias-recruitment-study",
        "https://example.com/ministry-manpower-response",
      ],
      tags: ["AI Bias", "Employment", "Discrimination", "Algorithmic Fairness", "Digital Rights"],
      expertOpinions: [
        {
          quote:
            "This case highlights the critical importance of inclusive AI development. When algorithms are trained on biased historical data without proper correction, they become tools that perpetuate inequality rather than promote fairness.",
          author: "Dr. Rini Wulandari",
          title: "AI Fairness Researcher, Universitas Indonesia",
          category: "technology",
        },
      ],
    },
  ]

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "Deepfake", label: "Deepfake" },
    { id: "Misinformation", label: "Misinformation" },
    { id: "AI Bias", label: "AI Bias" },
    { id: "Privacy", label: "Privacy" },
    { id: "Ethics", label: "Ethics" },
  ]

  const impacts = [
    { id: "all", label: "All Impact" },
    { id: "Low", label: "Low" },
    { id: "Medium", label: "Medium" },
    { id: "High", label: "High" },
  ]

  const filteredCases = cases.filter((c) => {
    const categoryMatch = filterCategory === "all" || c.category === filterCategory
    const impactMatch = filterImpact === "all" || c.impact === filterImpact
    return categoryMatch && impactMatch
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
              <select
                value={filterImpact}
                onChange={(e) => setFilterImpact(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {impacts.map((impact) => (
                  <option key={impact.id} value={impact.id}>
                    {impact.label}
                  </option>
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
                    ? "ring-2 ring-orange-500 shadow-xl"
                    : "hover:shadow-xl hover:-translate-y-1"
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
                      <span>{new Date(selectedCase.date).toLocaleDateString("id-ID")}</span>
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
                    <ExpandableText
                      textElement={renderTextWithTooltips(selectedCase.details)}
                      maxLength={500}
                    />
                  </div>

                  {/* Expert Opinions */}
                  {selectedCase.expertOpinions && selectedCase.expertOpinions.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Expert Opinions</h3>
                      {selectedCase.expertOpinions.map((opinion, index) => (
                        <ExpertOpinion
                          key={index}
                          quote={opinion.quote}
                          author={opinion.author}
                          title={opinion.title}
                          category={opinion.category}
                        />
                      ))}
                    </div>
                  )}

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
