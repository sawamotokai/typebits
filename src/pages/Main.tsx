import React from 'react'
import Game from '../components/organisms/Game'
// import * as codeData from '../cpp.json'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import {useCollectionDataOnce, } from 'react-firebase-hooks/firestore'
import {useAuthState, } from 'react-firebase-hooks/auth'
import '../styles/page.css'

type code = {
  text: string,
  lang: string,
}
// const targets = codeData.targets

export default function Main() {
  const {firestore, auth, } = React.useContext(FirebaseContext)
  const [user] = useAuthState(auth)
  const user_id = user?.uid
  /**
   * Load data from firebase
   */
  let targets: string[] = []
  const codesRef = firestore.collection('codes')
  const query = codesRef.where('uid', '==', user_id)
  const [snapshot, loading, error] = useCollectionDataOnce<code>(query)

  if (snapshot) {
    targets = snapshot.map(data => data.text)
  }

  return (
    <div className={`page`} id={`main-page`} >
      {!loading && <Game targets={targets} />}
    </div>
  )
}
