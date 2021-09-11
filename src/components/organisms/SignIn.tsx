import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { FirebaseContext, } from '../../contexts/FirebaseContext'
import '../../styles/components.css'
import '../../styles/text.css'

export default function SignIn() {
  const {firebase, auth, firestore } = useContext(FirebaseContext)

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
