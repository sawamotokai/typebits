import React, { useContext, } from 'react'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'
// import {useParams} from "react-router-dom";
import {Button} from '@material-ui/core'
import Error from './Error'
import '../styles/text.css'

export default function Dashboard() {
  const {auth, } = useContext(FirebaseContext)
  const [user] = useAuthState(auth)

  if (!user) {
    setTimeout(() => {
      window.location.href = '/'
    }, 1000)
    return <Error status={500} message={"You are not logged in."}></Error>
  }

  const signOut: () => void = () => {
    return auth.currentUser && (
      <Button onClick={() => {
        auth.signOut()
        window.location.href='/'
      }}> Sign Out </Button>
    )
  }
  return (
    <div>
      <h1>Typebits</h1> 
      <div className="buttons">
        <Button variant='outlined'> Use my own snippets (⚠️recommended) </Button>
        <Button variant='outlined'> Use pre-defined snippets </Button>
      </div>
      {signOut()}
      <br></br>
    </div>
  )
}
