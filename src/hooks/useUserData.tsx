import React, { useContext, } from 'react'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'

export default function useUserData() {
  const {auth, } = useContext(FirebaseContext)
  const [user] = useAuthState(auth)
  return user
}
