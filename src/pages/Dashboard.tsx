import React, { useContext, } from 'react'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'
import SelectLang from '../components/molecules/LanguageSelector';
import { AppContext, } from '../contexts/AppContext';

import '../styles/text.css'
import '../styles/page.css'
import AuthCheck from '../components/organisms/AuthCheck';

export default () => {
  return (
    <AuthCheck>
      <div id='dashboard-page' >
        <div className="card card-1">
          <h4>Practice Now</h4>
          <SelectLang />
        </div> 
        <div className="card card-2">STATS</div> 
        <div className="card card-3">SHARE</div> 
        <div className="card card-4">LIST</div> 
        <div className="card card-5">CREATE</div> 
      </div>
    </AuthCheck>
  )
}