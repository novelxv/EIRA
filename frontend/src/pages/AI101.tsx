import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Components
import PersonalizationFlow from '../components/PersonalizationFlow'
import PersonalizedDashboard from '../components/PersonalizedDashboard'
import type { UserProfile } from '../components/PersonalizationFlow'

// Subpages
import AILiteracy from './ai101/AILiteracy'
import AILiteracyWizard from './ai101/AILiteracyWizard'
import PlatformComparison from './ai101/PlatformComparison'
import PolicyExplainer from './ai101/PolicyExplainer'
import AIEthicsSimulator from './ai101/AIEthicsSimulator'
import AIWatch from './ai101/AIWatch'
import AIInSectors from './ai101/AIInSectors'

const AI101 = () => {
  const location = useLocation()
  const isMainPage = location.pathname === '/ai101'
  
  // Personalization state
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [showPersonalization, setShowPersonalization] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing personalization on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('eira_user_profile')
    const personalizationCompleted = localStorage.getItem('eira_personalization_completed')
    
    if (savedProfile && personalizationCompleted === 'true') {
      try {
        const profile = JSON.parse(savedProfile)
        setUserProfile(profile)
      } catch (error) {
        console.error('Error parsing user profile:', error)
        localStorage.removeItem('eira_user_profile')
        localStorage.removeItem('eira_personalization_completed')
      }
    }
    
    setIsLoading(false)
  }, [])

  const handlePersonalizationComplete = (profile: UserProfile) => {
    setUserProfile(profile)
    setShowPersonalization(false)
  }

  const handleSkipPersonalization = () => {
    setShowPersonalization(false)
    // Set a default profile for non-personalized experience
    const defaultProfile: UserProfile = {
      name: 'AI Explorer',
      persona: 'curious',
      completedAt: new Date().toISOString(),
      progress: {
        ai101: 0,
        aiSimulator: 0,
        contentDetector: 0,
        promptEvaluator: 0
      }
    }
    setUserProfile(defaultProfile)
  }

  const handleResetPersonalization = () => {
    setShowPersonalization(true)
    setUserProfile(null)
    localStorage.removeItem('eira_user_profile')
    localStorage.removeItem('eira_personalization_completed')
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  // Show personalization flow if needed
  if (!userProfile || showPersonalization) {
    return (
      <PersonalizationFlow
        onComplete={handlePersonalizationComplete}
        onSkip={handleSkipPersonalization}
      />
    )
  }

  // Handle sub-routes
  if (!isMainPage) {
    return (
      <Routes>
        <Route path="/literacy" element={<AILiteracyWizard />} />
        <Route path="/literacy-classic" element={<AILiteracy />} />
        <Route path="/comparison" element={<PlatformComparison />} />
        <Route path="/policy" element={<AIEthicsSimulator />} />
        <Route path="/policy-classic" element={<PolicyExplainer />} />
        <Route path="/watch" element={<AIWatch />} />
        <Route path="/sectors" element={<AIInSectors />} />
      </Routes>
    )
  }

  // Show personalized dashboard
  return (
    <PersonalizedDashboard
      userProfile={userProfile}
      onResetPersonalization={handleResetPersonalization}
    />
  )
}

export default AI101
