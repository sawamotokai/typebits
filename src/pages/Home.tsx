import React, { useContext, } from 'react'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'
import {Button} from '@material-ui/core'
import '../styles/text.css'
import Dashboard from './Dashboard'

export default function Home() {
  const {auth, } = useContext(FirebaseContext)
  const [user] = useAuthState(auth)

  return (
    <main>
      { user ? <Dashboard /> : <SignInButton /> }
    </main>
  )
}

function SignInButton() {
  const {firebase, auth, } = React.useContext(FirebaseContext)

  const signInWithGoogle: () => void = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    try {
      await auth.signInWithPopup(provider)
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
