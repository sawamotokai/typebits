import { Button } from '@material-ui/core'
import React, { useContext } from 'react'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { AppContext } from '../../contexts/AppContext'
import { FirebaseContext, } from '../../contexts/FirebaseContext'
import '../../styles/components.css'
import '../../styles/text.css'
import useUserData from '../../hooks/useUserData'

export default function SignIn() {
  const {firebase, auth, firestore } = useContext(FirebaseContext)
  const {languages, setLanguages} = useContext(AppContext)
  type LanguageType = {
    name: string
  }

  const signInWithGoogle: () => void = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    try {
      await auth.signInWithPopup(provider)
      // TODO: user have subcollection called languages and idk how to make reference to it
      const user = useUserData()
      // const userRef = firestore.collection('users').doc(user?.uid)
      // const langRef = userRef.collection('languages')
      // const snapshot: LanguageType[] = await langRef.get()
      // const langFromDB: string[] = snapshot.map((doc: LanguageType) => doc.name)
    } catch (e) {
      console.error(e)
      return e
    }
  }

  return (
    <div className={'sign-in-btn'}>
      <Button variant={"outlined"} onClick={signInWithGoogle}>
        <img src={'/google.png'} /> Sign in with Google
      </Button> 
    </div>
  )
}
