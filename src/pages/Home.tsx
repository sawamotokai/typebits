import React, { useContext, } from 'react'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import {Button} from '@material-ui/core'
import '../styles/text.css'
import Dashboard from './Dashboard'
import useUserData from '../hooks/useUserData'

export default function Home() {
  const user = useUserData()
  return (
    <main>
      { user ? <Dashboard /> : <SignInButton /> }
    </main>
  )
}

function SignInButton() {
  const {firebase, auth, firestore} = React.useContext(FirebaseContext)

  const signInWithGoogle: () => void = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    try {
      const result = await auth.signInWithPopup(provider)
      const user = result.user
      if (user && result.additionalUserInfo?.isNewUser) {
        const ref = firestore.collection('users').doc(user.uid)
        ref.set({email: user.email, displayName: user.displayName})
      }
    } catch (e) {
      console.error(e)
      return e
    }
  }

  return (
    <div className={'sign-in-btn'}>
      <Button variant={"outlined"} onClick={signInWithGoogle}>
        <img src={'/google.png'} /> Sign in with Google
      </Button> 
    </div>
  )

}
