"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ExpandableTextProps {
  text?: string
  textElement?: React.ReactNode
  maxLength?: number
  className?: string
}

export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  textElement,
  maxLength = 500,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // If textElement (JSX) is passed, skip truncation and render as-is
  if (textElement) {
    return (
      <div className={className}>
        <AnimatePresence mode="wait">
          <div className="relative">
  <motion.div
    key={isExpanded ? "expanded" : "collapsed"}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className={`prose max-w-none text-neutral-700 ${!isExpanded ? "max-h-[16rem] overflow-hidden" : ""}`}
  >
    <div>{textElement}</div>
  </motion.div>
</div>

        </AnimatePresence>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center space-x-2 mt-4 px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg transition-colors text-sm font-medium"
        >
          <span>{isExpanded ? "Read Less" : "Read More"}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>
    )
  }

  // Fallback for plain text only
  const safeText = text ?? ""
  const shouldTruncate = safeText.length > maxLength
  const displayText = shouldTruncate && !isExpanded ? safeText.substring(0, maxLength) + "..." : safeText

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={isExpanded ? "expanded" : "collapsed"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="prose max-w-none text-neutral-700"
        >
          {displayText.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </motion.div>
      </AnimatePresence>

      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center space-x-2 mt-4 px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg transition-colors text-sm font-medium"
        >
          <span>{isExpanded ? "Read Less" : "Read More"}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      )}
    </div>
  )
}
