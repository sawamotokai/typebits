import React, { useContext, } from 'react'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'
import { Link } from "react-router-dom";
import {Button} from '@material-ui/core'
// import Error from './Error'
import '../styles/text.css'
import '../styles/page.css'

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
      <div className="buttons">
        <div className={`game-option`}>
          <p>Better user experience</p>
          <Link to={`/game/custom`} ><Button> Use my own snippets (️recommended) </Button></Link> 
        </div>
        <div className={`game-option`}>
          <p>Quick start</p>
          <Link to='/game/play' ><Button> Use pre-defined snippets </Button></Link> 
        </div>
      </div>
      <br></br>
    </div>
  ) : <></>
}