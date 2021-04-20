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
      <h1>{`Hi, ${user.displayName}!`}</h1> 
      <div className="buttons">
        <div className={`game-option`}>
          <p>New Snippets</p>
          <Button onClick={() => {}}>New</Button>
        </div>
        <div className={`game-option`}>
          <p>Edit Snippets</p>
          <Button onClick={() => {}}>Edit</Button>
        </div>
      </div>
      <SignOut></SignOut>
      <br></br>
    </div>
  ) : <></>
}