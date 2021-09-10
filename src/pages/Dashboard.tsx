import React, { useContext, useEffect, } from 'react'
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import AuthCheck from '../components/organisms/AuthCheck';
import useUserData from '../hooks/useUserData';
import Selector from '../components/molecules/Selector';
import { AppContext, } from '../contexts/AppContext';
import { FirebaseContext, } from '../contexts/FirebaseContext'

import '../styles/text.css'
import '../styles/page.css'
import '../styles/components.css'


export default function Dashbaord() {
  const {firestore, } = useContext(FirebaseContext)
  const [lang, setLang] = React.useState('');
  const {languages, setLanguages} = useContext(AppContext)
  const user = useUserData()

  function loadUserLanguages() {
    firestore.collection('users').where('uid', '==', user?.uid).limit(1).get().then(snapshot => {
      const {docs} = snapshot
      if (!docs.length) {
        return
      }
      docs[0].ref.collection('languages').get().then(snapshot => {
        const customLanguages = snapshot.docs.map(doc => doc.data().name)
        const tmpLanguages = Array.from(new Set(customLanguages.concat(languages)))
        setLanguages(tmpLanguages)
      })
    }).catch(err => console.error(err))
  }

  useEffect(loadUserLanguages, [])

  return (
    <AuthCheck>
      <div id='dashboard-page' >
        <div className="card card-1">
          <h4>Practice Now</h4>
          <div className={'start-menu'}>
            <Selector state={lang} setState={setLang} options={languages} label={'Language'} />
            <Link to={`/game/${lang}`} className={lang || 'disabled-link'}><Button variant={'contained'}>Start</Button></Link>
          </div>
        </div> 
        <div className="card card-2">STATS</div> 
        <div className="card card-3">SHARE</div> 
        <div className="card card-4">LIST</div> 
        <div className="card card-5">CREATE</div> 
      </div>
    </AuthCheck>
  )
}