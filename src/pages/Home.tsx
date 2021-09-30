import React, { useContext, } from 'react'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import {Button} from '@material-ui/core'
import '../styles/text.css'
import '../styles/page.css'
import Dashboard from './Dashboard'
import useUserData from '../hooks/useUserData'

export default function Home() {
  const user = useUserData()
  return (
    <main>
      { user ? <Dashboard /> : <About /> }
    </main>
  )
}


const About: React.FC = () => {
  return (
    <main id="about-page" >
      <div className="flex-container-column" id="about">
        <h1 className="header">What is Typebits?</h1>
        <div className="grey-bg-par centered-text">
          <p>Typebits is a typing game to improve your typing speed.</p>
          <p>Typebits allows you to practice typing with code snippets.</p>
          <p>You can create, edit and delete your own snippets from the dashboard.</p>
        </div>
      </div>
    </main>
  )
}