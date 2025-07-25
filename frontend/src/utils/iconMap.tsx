import {
  Brain,
  Network,
  MessageSquare,
  Eye,
  Target,
  Layers,
  Smartphone,
  Music,
  FileText,
  Lightbulb,
  BookOpen,
  PlayCircle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Video,
  Home,
  Trophy,
  ChevronRight
} from 'lucide-react'

// Icon mapping untuk convert string ke React component
export const iconMap = {
  Brain,
  Network,
  MessageSquare,
  Eye,
  Target,
  Layers,
  Smartphone,
  Music,
  FileText,
  Lightbulb,
  BookOpen,
  PlayCircle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Video,
  Home,
  Trophy,
  ChevronRight
} as const

export type IconName = keyof typeof iconMap

// Helper function untuk get icon component
export const getIcon = (iconName: IconName, className?: string) => {
  const IconComponent = iconMap[iconName]
  return IconComponent ? <IconComponent className={className} /> : null
}
