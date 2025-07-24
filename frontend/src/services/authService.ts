import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  User,
  updateProfile
} from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

// Convert Firebase User to our AuthUser interface
export const mapFirebaseUser = (user: User): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL
})

// Email and Password Authentication
export const signUpWithEmail = async (email: string, password: string, name?: string): Promise<AuthUser> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    // Update display name if provided
    if (name && userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name
      })
    }
    
    return mapFirebaseUser(userCredential.user)
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create account')
  }
}

export const signInWithEmail = async (email: string, password: string): Promise<AuthUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return mapFirebaseUser(userCredential.user)
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign in')
  }
}

// Google Authentication
export const signInWithGoogle = async (): Promise<AuthUser> => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return mapFirebaseUser(result.user)
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign in with Google')
  }
}

// Password Reset
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error: any) {
    throw new Error(error.message || 'Failed to send password reset email')
  }
}

// Sign Out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign out')
  }
}

// Local Storage Helpers
const AUTH_STORAGE_KEY = 'eira_auth_user'

export const saveUserToStorage = (user: AuthUser): void => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
}

export const getUserFromStorage = (): AuthUser | null => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export const removeUserFromStorage = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}
