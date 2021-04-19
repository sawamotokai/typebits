import React, { useContext, } from 'react'
import { FirebaseContext, } from '../../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'
import {Button} from '@material-ui/core'
// import Error from './Error'
import '../../styles/text.css'
import '../../styles/page.css'


export default () => {
  const {auth, } = useContext(FirebaseContext)
  const [user] = useAuthState(auth)

  return user ? (
    <Button onClick={() => {
      auth.signOut()
      window.location.href = '/'
    }} variant={'outlined'}>Sign Out</Button>
  ) : <></>
}