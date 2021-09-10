import React, { useContext, useState } from 'react'
import { useParams } from 'react-router'
import firebase from "firebase/app"

import Game from '../components/organisms/Game'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import useUserData from '../hooks/useUserData'
import '../styles/page.css'
import AuthCheck from '../components/organisms/AuthCheck'
import Loader from '../components/atoms/Loader'

type paramsType = {
  lang: string
}

async function loadSnipsFromDB(lang: string, user: firebase.User | null | undefined, firestore: firebase.firestore.Firestore) {
  if (!user) return []
  let targets: string[] = []
  let snapshot = await firestore.collection('shared-codes').where('lang', '==', lang).get()
  snapshot.docs.forEach((doc: any) => targets.push(doc.data().text))
  snapshot = await firestore.collection('users').where('uid', '==', user?.uid).limit(1).get()
  if (snapshot.docs.length) {
    const userRef = snapshot.docs[0].ref
    const langSnapshot = await userRef.collection('languages').where('name', '==', lang).limit(1).get()
    if (langSnapshot.docs.length) {
      const codesRef = langSnapshot.docs[0].ref.collection('codes')
      const codesSnapshot = await codesRef.get()
      codesSnapshot.docs.forEach((doc: any) => targets.push(doc.data().text))
    }
  }
  return targets
}

export default function GamePlayer() {
  const { lang } = useParams<paramsType>();
  const user = useUserData()
  const {firestore} = useContext(FirebaseContext)
  const [loading, setLoading] = useState(true)
  const [targets, setTarget] = useState<string[]>([])
  loadSnipsFromDB(lang, user, firestore).then((ret) => {
    setTarget(ret)
    setLoading(false)
  })

  return (
    <AuthCheck>
      <main className={`page`} id={`main-page`} >
        {(loading || targets.length === 0 ) ? <Loader show={loading} /> : <Game targets={targets} />}
      </main>
    </AuthCheck>
  )
}