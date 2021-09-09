import React from 'react'
import '../../styles/page.css'
import {FirebaseContext, } from '../../contexts/FirebaseContext'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Button } from '@material-ui/core'

export default () => {
  const {firestore, auth } = React.useContext(FirebaseContext)
  const [user] = useAuthState(auth)

  return (
    <div id='sidebar'>
      <div className='profile'></div>
      <p>{user?.displayName}</p>
      <Button color='primary' variant='contained' >Start typing</Button>
    </div>
  )
}
