import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react'
import { 
  signInWithEmail, 
  signUpWithEmail, 
  signInWithGoogle, 
  resetPassword 
} from '../services/authService'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess?: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (mode === 'login') {
        const user = await signInWithEmail(formData.email, formData.password)
        setSuccess(`Welcome back, ${user.displayName || user.email}!`)
        setTimeout(() => {
          onLoginSuccess?.()
          onClose()
        }, 1500)
      } else if (mode === 'register') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match')
        }
        const user = await signUpWithEmail(formData.email, formData.password, formData.name)
        setSuccess(`Welcome, ${user.displayName || user.email}! Account created successfully.`)
        setTimeout(() => {
          onLoginSuccess?.()
          onClose()
        }, 1500)
      } else if (mode === 'forgot') {
        await resetPassword(formData.email)
        setSuccess('Password reset email sent!')
        setTimeout(() => {
          switchMode('login')
        }, 2000)
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')
    
    try {
      const user = await signInWithGoogle()
      setSuccess(`Welcome back, ${user.displayName || user.email}!`)
      setTimeout(() => {
        onLoginSuccess?.()
        onClose()
      }, 1500)
    } catch (error: any) {
      // Handle specific Firebase error codes
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled')
      } else if (error.code === 'auth/popup-blocked') {
        setError('Popup was blocked by browser. Please allow popups and try again.')
      } else if (error.code === 'auth/cancelled-popup-request') {
        setError('Another sign-in popup is already open')
      } else {
        setError(error.message || 'Failed to sign in with Google')
      }
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    setShowPassword(false)
    setError('')
    setSuccess('')
  }

  const switchMode = (newMode: 'login' | 'register' | 'forgot') => {
    setMode(newMode)
    resetForm()
    setLoading(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md mx-auto p-4 sm:p-6 lg:p-8 max-h-[95vh] overflow-y-auto scrollbar-hide"
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* Internet Explorer 10+ */
            }}
          >
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none; /* Safari and Chrome */
              }
            `}</style>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors z-10"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 pr-8">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
                {mode === 'login' && 'Welcome Back'}
                {mode === 'register' && 'Create Account'}
                {mode === 'forgot' && 'Reset Password'}
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                {mode === 'login' && 'Sign in to your EIRA account'}
                {mode === 'register' && 'Join EIRA to get started'}
                {mode === 'forgot' && 'Enter your email to reset password'}
              </p>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-red-700 leading-relaxed">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs sm:text-sm text-green-700">{success}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name field (only for register) */}
              {mode === 'register' && (
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-neutral-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Enter your full name"
                      required={mode === 'register'}
                    />
                  </div>
                </div>
              )}

              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-neutral-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password field (not for forgot password) */}
              {mode !== 'forgot' && (
                <div>
                  <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-neutral-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Enter your password"
                      required={mode === 'login' || mode === 'register'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Confirm Password field (only for register) */}
              {mode === 'register' && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-neutral-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Confirm your password"
                      required={mode === 'register'}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white text-sm sm:text-base font-semibold rounded-lg focus:ring-4 focus:ring-primary-200 transition-all duration-300 shadow-lg hover:shadow-xl ${
                  loading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:from-primary-700 hover:to-purple-700'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </div>
                ) : (
                  <>
                    {mode === 'login' && 'Sign In'}
                    {mode === 'register' && 'Create Account'}
                    {mode === 'forgot' && 'Send Reset Link'}
                  </>
                )}
              </button>
            </form>

            {/* Google Sign In (only for login and register) */}
            {mode !== 'forgot' && (
              <>
                <div className="my-4 sm:my-6 relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-300" />
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm">
                    <span className="px-3 sm:px-4 bg-white text-neutral-500">Or continue with</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className={`w-full py-2.5 sm:py-3 px-4 border border-neutral-300 text-neutral-700 text-sm sm:text-base font-semibold rounded-lg focus:ring-4 focus:ring-neutral-200 transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 ${
                    loading 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-neutral-50 hover:border-neutral-400'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin"></div>
                      <span className="hidden sm:inline">Signing in with Google...</span>
                      <span className="sm:hidden">Signing in...</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span className="hidden sm:inline">Sign in with Google</span>
                      <span className="sm:hidden">Google</span>
                    </>
                  )}
                </button>
              </>
            )}

            {/* Footer Links */}
            <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm">
              {mode === 'login' && (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-primary-600 hover:text-primary-500 font-medium block w-full sm:inline"
                  >
                    Forgot password?
                  </button>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:space-x-1">
                    <span className="text-neutral-600">Don't have an account?</span>
                    <button
                      type="button"
                      onClick={() => switchMode('register')}
                      className="text-primary-600 hover:text-primary-500 font-medium mt-1 sm:mt-0"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              )}

              {mode === 'register' && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:space-x-1">
                  <span className="text-neutral-600">Already have an account?</span>
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="text-primary-600 hover:text-primary-500 font-medium mt-1 sm:mt-0"
                  >
                    Sign in
                  </button>
                </div>
              )}

              {mode === 'forgot' && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:space-x-1">
                  <span className="text-neutral-600">Remember your password?</span>
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="text-primary-600 hover:text-primary-500 font-medium mt-1 sm:mt-0"
                  >
                    Back to sign in
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoginModal
