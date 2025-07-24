import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB77-hax5B9iPEaAXbPjQz4YHOV-y7LG0Q",
  authDomain: "eira-1ada1.firebaseapp.com",
  projectId: "eira-1ada1",
  storageBucket: "eira-1ada1.firebasestorage.app",
  messagingSenderId: "982685106694",
  appId: "1:982685106694:web:780e2599851442b0f9b987",
  measurementId: "G-65TEDXWQX5"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider()

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export default app
