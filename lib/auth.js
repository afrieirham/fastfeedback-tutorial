import React, { useState, useEffect, useContext, createContext } from 'react'
import Cookies from 'js-cookie'

import firebase from './firebase'
import { createUser } from './db'
import { useRouter } from 'next/router'

/*
 *
 * This file creates an authProvider that can be used throughout the app
 * just by importing the useAuth hook.
 *
 */

// Create authContext
const authContext = createContext()

// Return the Auth provider with all the reuseable firebase auth function
export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// This will be imported in files that need auth stuff
// Create useAuth hook that return the authContext
export const useAuth = () => {
  return useContext(authContext)
}

// React hook to give reuseable firebase auth function
function useAuthProvider() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser)

      const { token, ...userWithoutToken } = user

      // Create user in firestore
      createUser(userWithoutToken)

      // Set user in state
      setUser(user)
      Cookies.set('fast-feedback-auth', true, { expires: 1 })
      router.push('/dashboard')
      return user
    } else {
      Cookies.remove('fast-feedback-auth')
      setUser(false)
      router.push('/')
      return false
    }
  }

  const signInWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response.user))
  }

  const signInWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => handleUser(response.user))
  }

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false))
  }

  // Watch the firebase auth state and update it accordingly
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => handleUser(user))

    return () => unsubscribe()
  }, [])

  return {
    user,
    signInWithGithub,
    signInWithGoogle,
    signOut,
  }
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token: user.za,
  }
}
