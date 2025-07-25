import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, LogIn, User, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { signOutUser } from '../services/authService'

interface HeaderProps {
  onLoginClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { currentUser, isLoggedIn } = useAuth()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await signOutUser()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    {
        name: 'Home',
        href: '/'
    },
    {
      name: 'AI 101',
      href: '/ai101',
      dropdown: [
        { name: 'AI Literacy', href: '/ai101/literacy' },
        { name: 'Platform Comparison', href: '/ai101/comparison' },
        { name: 'AI Ethical & Policy Simulator', href: '/ai101/policy' },
        { name: 'AI Watch', href: '/ai101/watch' },
      ]
    },
    { name: 'Prompt Evaluator', href: '/prompt-evaluator' }
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20' 
          : 'bg-white/90 backdrop-blur-sm shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="EIRA Logo" 
                className="h-8 w-8 object-contain group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="absolute -inset-1 bg-primary-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <span className="text-2xl font-bold gradient-text">EIRA</span>
              <p className={`text-xs -mt-1 transition-colors duration-300 ${
                isScrolled ? 'text-neutral-600' : 'text-neutral-700'
              }`}>Ethical AI Reflection & Awareness</p>
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    (item.href === '/' ? location.pathname === '/' : location.pathname.startsWith(item.href))
                      ? 'text-primary-600'
                      : isScrolled 
                        ? 'text-neutral-700 hover:text-primary-600'
                        : 'text-neutral-800 hover:text-primary-600'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.dropdown && <ChevronDown className="h-4 w-4" />}
                </Link>
                
                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-white rounded-xl shadow-lg border border-neutral-200 py-2 min-w-48">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-4 py-2 text-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={onLoginClick}
                  className="px-4 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg font-medium hover:from-primary-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </button>
              </>
            ) : (
              <>
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors duration-300">
                    <User className="h-4 w-4" />
                    <span>{currentUser?.displayName || currentUser?.email || 'Account'}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {/* User Dropdown */}
                  <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-white rounded-xl shadow-lg border border-neutral-200 py-2 min-w-48">
                      <button className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200">
                        Profile
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200">
                        Settings
                      </button>
                      <hr className="my-1 border-neutral-200" />
                      <button 
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-neutral-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled
                ? 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                : 'text-neutral-800 hover:text-primary-600 hover:bg-primary-50'
            }`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-neutral-200 mt-4 pt-4 pb-6"
            >
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      className={`block px-3 py-2 text-base font-medium transition-colors duration-300 ${
                        (item.href === '/' ? location.pathname === '/' : location.pathname.startsWith(item.href))
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-3 py-2 text-sm text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile Actions */}
                <div className="pt-4 border-t border-neutral-200 space-y-3">
                  {!isLoggedIn ? (
                    <>
                      <button
                        onClick={() => {
                          onLoginClick()
                          setIsOpen(false)
                        }}
                        className="block w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg font-medium text-center flex items-center justify-center space-x-2"
                      >
                        <LogIn className="h-5 w-5" />
                        <span>Login</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="space-y-1">
                        <button className="flex items-center space-x-2 w-full px-4 py-2 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200">
                          <User className="h-5 w-5" />
                          <span>Profile</span>
                        </button>
                        <button className="flex items-center space-x-2 w-full px-4 py-2 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200">
                          <span>Settings</span>
                        </button>
                        <button 
                          onClick={() => {
                            handleLogout()
                            setIsOpen(false)
                          }}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-neutral-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <LogOut className="h-5 w-5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header
