import { Button } from '@material-ui/core'
import React from 'react'
import { FirebaseContext, } from '../../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'

export default function SignIn() {
  const {firebase, auth, } = React.useContext(FirebaseContext)

  const signInWithGoogle: () => void = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }


  return (
    <div>
      <Button onClick={signInWithGoogle}>Sign in with Google</Button> 
    </div>
  )
}
