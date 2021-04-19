import React, { useContext, } from 'react'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'
import { Link } from "react-router-dom";
// import {useParams} from "react-router-dom";
import {Button} from '@material-ui/core'
import Error from './Error'
import '../styles/text.css'

export default () => {
  const {auth, } = useContext(FirebaseContext)
  const [user] = useAuthState(auth)

  React.useEffect(() => {
    if (!user) {
      window.location.href = '/'
    }
  }, [])

  const signOut: () => void = () => {
    return auth.currentUser && (
      <Button onClick={() => {
        auth.signOut()
        window.location.href = '/'
      }} variant={'contained'}>Sign Out</Button>
    )
  }
  return user ? (
    <div>
      <h1>Typebits</h1> 
      <div className="buttons">
        <Button variant='outlined'> Use my own snippets (⚠️recommended) </Button>
        <Button variant='outlined'> Use pre-defined snippets </Button>
      </div>
      {signOut()}
      <br></br>
    </div>
  ) : <></>
}