import React, { useContext, } from 'react'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'
import SignIn from '../components/organisms/SignIn'
import {Button} from '@material-ui/core'
import '../styles/text.css'

export default function Home() {
  const {auth, } = useContext(FirebaseContext)
  // const [user] = useAuthState(auth)

  const signOut: () => void = () => {
    return auth.currentUser && (
      <Button onClick={() => auth.signOut()}>Sign Out</Button>
    )
  }

  return (
    <div>
      <h1>Typebits (beta)</h1> 
      <div id="home-about">
        <p> Typebits is a typing practice application, designed specifically for programmers. </p>
        <p> To get started, please sign in with your Google account. </p>
      </div>
      <SignIn />
      <br></br>
    </div>
  )
}
