import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'
import Home from './pages/Home'
import AI101 from './pages/AI101'
import PromptEvaluator from './pages/PromptEvaluator'
import ContentDetector from './pages/ContentDetector'
import AISimulator from './pages/AISimulator'

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
          <Header 
            onLoginClick={() => setIsLoginModalOpen(true)}
          />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai101/*" element={<AI101 />} />
              <Route path="/prompt-evaluator" element={<PromptEvaluator />} />
              <Route path="/content-detector" element={<ContentDetector />} />
              <Route path="/ai-simulator/*" element={<AISimulator />} />
            </Routes>
          </main>
          <Footer />
          
          {/* Login Modal */}
          <LoginModal 
            isOpen={isLoginModalOpen} 
            onClose={() => setIsLoginModalOpen(false)}
            onLoginSuccess={() => setIsLoginModalOpen(false)}
          />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
