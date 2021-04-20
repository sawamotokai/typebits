import React, { useContext, } from 'react'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'
import { Link } from "react-router-dom";
import {Button} from '@material-ui/core'
// import Error from './Error'
import '../styles/text.css'
import '../styles/page.css'
import SignOut from '../components/organisms/SignOut';

export default () => {
  const {auth, } = useContext(FirebaseContext)
  const [user] = useAuthState(auth)

  React.useEffect(() => {
    if (!user) {
      window.location.href = '/'
    }
  }, [])

  return user ? (
    <div id='dashboard-page' className='page'>
      <h1>Typebits</h1> 
      <div className="buttons">
        <div className={`game-option`}>
          <p>Better user experience</p>
          <Button> <Link to={`/game/custom`} style={{ textDecoration: 'none', color: 'black'}}> Use my own snippets (️recommended) </Link> </Button>
        </div>
        <div className={`game-option`}>
          <p>Quick start</p>
          <Button> <Link to='/game/play' style={{ textDecoration: 'none', color: 'black' }}> Use pre-defined snippets </Link> </Button>
        </div>
      </div>
      <SignOut></SignOut>
      <br></br>
    </div>
  ) : <></>
}