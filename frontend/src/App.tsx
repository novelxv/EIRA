import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AI101 from './pages/AI101'
import PromptEvaluator from './pages/PromptEvaluator'
import ContentDetector from './pages/ContentDetector'
import AISimulator from './pages/AISimulator'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
        <Header />
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
      </div>
    </Router>
  )
}

export default App
