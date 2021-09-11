import React, { useContext, useState } from 'react'
import { useParams } from 'react-router'
import firebase from "firebase/app"

import Game from '../components/organisms/Game'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import useUserData from '../hooks/useUserData'
import '../styles/page.css'
import AuthCheck from '../components/organisms/AuthCheck'
import Loader from '../components/atoms/Loader'
import {loadSnipsFromDB, snippet} from '../utils/utils'

type paramsType = {
  lang: string
}

export default function GamePlayer() {
  const { lang } = useParams<paramsType>();
  const user = useUserData()
  const {firestore} = useContext(FirebaseContext)
  const [loading, setLoading] = useState(true)
  const [targets, setTargets] = useState<snippet[]>([])
  loadSnipsFromDB(lang, user, firestore).then((ret: snippet[]) => {
    setTargets(ret)
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