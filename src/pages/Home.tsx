import React, { useContext, } from 'react'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'
import SignIn from '../components/organisms/SignIn'
import {Button} from '@material-ui/core'
import '../styles/text.css'

export default function Home() {
  const {auth, } = useContext(FirebaseContext)
  const [user] = useAuthState(auth)

  return (
    <div>
      <div id="home-about">
        <p> Typebits is a typing practice application, designed specifically for programmers. </p>
        <p> To get started, please sign in with your Google account. </p>
      </div>
      {!user && <SignIn />}
      <br></br>
    </div>
  )
}
