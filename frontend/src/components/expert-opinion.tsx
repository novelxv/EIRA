"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Quote, User } from "lucide-react"

interface ExpertOpinionProps {
  quote: string
  author: string
  title: string
  category: "ethics" | "legal" | "sociology" | "technology"
}

export const ExpertOpinion: React.FC<ExpertOpinionProps> = ({ quote, author, title, category }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "ethics":
        return "from-green-500 to-emerald-500"
      case "legal":
        return "from-blue-500 to-indigo-500"
      case "sociology":
        return "from-purple-500 to-violet-500"
      case "technology":
        return "from-orange-500 to-red-500"
      default:
        return "from-neutral-500 to-gray-500"
    }
  }

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "ethics":
        return "AI Ethics Expert"
      case "legal":
        return "Legal Expert"
      case "sociology":
        return "Sociologist"
      case "technology":
        return "Technology Expert"
      default:
        return "Expert"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="my-6 p-6 bg-gradient-to-r from-neutral-50 to-white border-l-4 border-orange-500 rounded-r-lg shadow-sm"
    >
      <div className="flex items-start space-x-4">
        <div className={`p-2 rounded-full bg-gradient-to-r ${getCategoryColor(category)} text-white flex-shrink-0`}>
          <Quote className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <blockquote className="text-neutral-700 italic mb-3 leading-relaxed">"{quote}"</blockquote>
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-neutral-500" />
            <div>
              <p className="font-semibold text-neutral-900 text-sm">{author}</p>
              <p className="text-xs text-neutral-600">{title}</p>
              {/* <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 bg-gradient-to-r ${getCategoryColor(category)} text-white`}
              >
                {getCategoryLabel(category)}
              </span> */}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
