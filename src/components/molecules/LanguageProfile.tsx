import React from 'react'
import {FirebaseContext, } from '../../contexts/FirebaseContext'
import { useAuthState } from 'react-firebase-hooks/auth'

import '../../styles/page.css'

export default () => {
  const {firestore, auth } = React.useContext(FirebaseContext)
  const [user]  = useAuthState(auth)

  React.useEffect(() => {
    firestore.collection('codes').where('uid', '==', user?.uid).get().then(snapshot => {
      // if (snapshot) 
    })
  }, [])

  return (
    <div>

    </div>
  )
}
