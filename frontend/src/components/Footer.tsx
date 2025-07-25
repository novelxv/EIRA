import React from 'react'
import { Heart, Github, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and tagline */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo2.png" 
                alt="EIRA Logo" 
                className="h-8 w-8 object-contain" 
              />
              <div>
                <span className="text-2xl font-bold text-white">EIRA</span>
                <p className="text-sm text-neutral-400 -mt-1">Ethical AI Reflection & Awareness</p>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <p className="text-neutral-300 italic">"A reflective AI space to help society grow with, not against, AI."</p>
              <p className="text-neutral-300 italic">"Know AI. Question AI. Use AI wisely."</p>
            </div>
            <p className="text-neutral-400 text-sm">
              Designed specifically for non-technical users, EIRA combines AI literacy features, 
              technology exploration, and social reflection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Main Features</h3>
            <ul className="space-y-3">
              <li>
                <a href="/ai101" className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center space-x-2">
                  <span>AI 101</span>
                </a>
                <ul className="ml-4 mt-2 space-y-1">
                  <li><a href="/ai101/literacy" className="text-neutral-500 hover:text-primary-400 transition-colors text-sm">AI Literacy</a></li>
                  <li><a href="/ai101/comparison" className="text-neutral-500 hover:text-primary-400 transition-colors text-sm">Platform Comparison</a></li>
                  <li><a href="/ai101/policy" className="text-neutral-500 hover:text-primary-400 transition-colors text-sm">AI Ethical & Policy Simulator</a></li>
                  <li><a href="/ai101/watch" className="text-neutral-500 hover:text-primary-400 transition-colors text-sm">AI Watch</a></li>
                </ul>
              </li>
              <li>
                <a href="/prompt-evaluator" className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center space-x-2">
                  <span>Prompt Evaluator</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <a 
                href="mailto:fastresp2304@gmail.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center space-x-2 text-neutral-400 hover:text-primary-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>fastresp2304@gmail.com</span>
              </a>
              <a 
                href="https://github.com/novelxv/EIRA" target="_blank" rel="noopener noreferrer"
                className="flex items-center space-x-2 text-neutral-400 hover:text-primary-400 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © 2025 EIRA by FUA Team. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-neutral-400 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>for a better AI future</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
