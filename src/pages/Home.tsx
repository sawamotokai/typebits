import React, { createContext, useContext, } from 'react'
import TextInput from '../components/TextInput'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'
import SignIn from '../components/SignIn'
import {Button} from '@material-ui/core'

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
      <h1>HOME</h1> 
      {user ? <TextInput targets={['vector<int> a(n);', 'for (int i=0; i<n; i++)', 'cin >> a[i]']}></TextInput> : <SignIn />}
      <br></br>
      {signOut()}
    </div>
  )
}
