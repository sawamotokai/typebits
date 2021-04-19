import React from 'react'
import Game from '../components/organisms/Game'
// import * as codeData from '../cpp.json'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import { useCollectionDataOnce, } from 'react-firebase-hooks/firestore'
import { useAuthState, } from 'react-firebase-hooks/auth'
import '../styles/page.css'
import SignOut from '../components/organisms/SignOut'

type code = {
  text: string,
  lang: string,
}

type props = {
  useCustomCode: boolean
}
// const targets = codeData.targets

export default function Main({useCustomCode}: props) {
  const {firestore, auth, } = React.useContext(FirebaseContext)
  const [user] = useAuthState(auth)
  const user_id = user?.uid
  /**
   * Load data from firebase
   */
  let targets: string[] = []
  const codesRef = firestore.collection('codes')
  let query;
  if (useCustomCode) {
    query = codesRef.where('uid', '==', user_id)
  } else {
    query = codesRef.where('lang', '==', 'cpp')
  }
  const [snapshot, loading, error] = useCollectionDataOnce<code>(query)

  if (snapshot) {
    targets = snapshot.map(data => data.text)
  }

  return (
    <div className={`page`} id={`main-page`} >
      <h1>Typebits</h1>
      {!loading && <Game targets={targets} />}
      <SignOut></SignOut>
    </div>
  )
}
