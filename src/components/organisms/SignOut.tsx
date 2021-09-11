import React, { useContext, } from 'react'
import { FirebaseContext, } from '../../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'
import {Button} from '@material-ui/core'
import '../../styles/text.css'
import '../../styles/page.css'
import '../../styles/components.css'
import {makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  button: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
  }
}));

export default function SignOut() {
  const {auth, } = useContext(FirebaseContext)
  const [user] = useAuthState(auth)
  const classes = useStyles()

  return user ? (
    <Button onClick={() => {
      auth.signOut()
      window.location.href = '/'
    }} variant={'outlined'} color={'default'} className={classes.button}>Sign Out</Button>
  ) : <></>
}