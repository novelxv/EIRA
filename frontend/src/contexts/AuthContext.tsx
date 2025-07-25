import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../config/firebase'
import { 
  AuthUser, 
  mapFirebaseUser, 
  saveUserToStorage, 
  getUserFromStorage, 
  removeUserFromStorage 
} from '../services/authService'

interface AuthContextType {
  currentUser: AuthUser | null
  loading: boolean
  isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  isLoggedIn: false
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on initial load
    const storedUser = getUserFromStorage()
    if (storedUser) {
      setCurrentUser(storedUser)
    }

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const authUser = mapFirebaseUser(user)
        setCurrentUser(authUser)
        saveUserToStorage(authUser)
      } else {
        setCurrentUser(null)
        removeUserFromStorage()
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value: AuthContextType = {
    currentUser,
    loading,
    isLoggedIn: !!currentUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
