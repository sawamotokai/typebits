import React, { useContext, useEffect, useState, } from 'react'
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

import AuthCheck from '../components/organisms/AuthCheck';
import useUserData from '../hooks/useUserData';
import Selector from '../components/molecules/Selector';
import SnippetList from '../components/molecules/SnippetList';
import { AppContext, } from '../contexts/AppContext';
import { FirebaseContext, } from '../contexts/FirebaseContext'

import '../styles/text.css'
import '../styles/page.css'
import '../styles/components.css'
import { loadUserLanguages } from '../utils/utils';
import CreateSnippet from '../components/organisms/CreateSnippet';
import Stats from '../components/organisms/Stats';


export default function Dashbaord() {
  const {firestore, } = useContext(FirebaseContext)
  const [lang, setLang] = useState('');
  const {languages, setLanguages} = useContext(AppContext)
  const user = useUserData()



  useEffect(() => {
    loadUserLanguages(user, firestore).then((customLanguages: string[]) => {
      const tmpLanguages = Array.from(new Set(customLanguages.concat(languages)))
      setLanguages(tmpLanguages)
    })
  }, [])

  return (
    <AuthCheck>
      <div id='dashboard-page' >
        <div className="card card-1">
          <p style={{fontSize: '2.5rem', position: 'absolute', top: '5rem'}}>Practice Typing</p>
          <div className={'start-menu'}>
            <Selector state={lang} setState={setLang} options={languages} label={'Language'} />
            <Link to={`/game/${lang}`} className={lang || 'disabled-link'}><Button variant={'contained'}>Start</Button></Link>
          </div>
        </div> 
        <div className="card card-2">
          <Stats /> 
        </div> 
        <div className="card card-3">SHARE</div> 
        <div className="card card-4">
          <SnippetList/>
        </div> 
        <div className="card card-5">
          <CreateSnippet />
        </div> 
      </div>
    </AuthCheck>
  )
}