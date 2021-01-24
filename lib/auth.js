import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from './firebase'

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
  const signInWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        setUser(response.user)
        return response.user
      })
  }

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false)
      })
  }

  // Watch the firebase auth state and update it accordingly
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return {
    user,
    signInWithGithub,
    signOut,
  }
}
