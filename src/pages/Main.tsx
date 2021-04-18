import React from 'react'
import Game from '../components/organisms/Game'
import * as codeData from '../cpp.json'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import '../styles/page.css'

export default function Main() {
  const targets = codeData.targets
  const {firestore, } = React.useContext(FirebaseContext)

  const codesRef = firestore.collection('codes')
  // const query = codesRef.where('lang', '==', 'cpp')
  const query = codesRef;

  const [codes] = useCollectionData(query)
  console.log(codes)

  return (
    <div className={`page`} id={`main-page`} >
      <Game targets={targets} />
    </div>
  )
}
