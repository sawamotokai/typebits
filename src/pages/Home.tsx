import React, { createContext, useContext, } from 'react'
import TextInput from '../components/TextInput'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'
import SignIn from '../components/SignIn'
import {Button} from '@material-ui/core'
import Main from './Main'
import '../styles/text.css'

export default function Home() {
  const {auth, } = useContext(FirebaseContext)
  const [user] = useAuthState(auth)
  const signOut: () => void = () => {
    console.log(user)
    return auth.currentUser && (
      <Button onClick={() => auth.signOut()}>Sign Out</Button>
    )
  }

  return (
    <div>
      <h1>Typebits</h1> 
      {user ? <Main/> : <SignIn />}
      <br></br>
      {signOut()}
    </div>
  )
}
