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
      <h3>{`Hi, ${user.displayName}!`}</h3> 
      <div className="buttons">
        <div className={`game-option`}>
          <p>Create New Snippets</p>
          <Link to='/user/snipps/new'><Button color='primary' variant='contained'>Create</Button></Link>
        </div>
        <div className={`game-option`}>
          <p>Manage my Snippets</p>
          <Link to='/user/snipps/edit'><Button color='primary' variant='outlined'>List</Button></Link>
        </div>
      </div>
      <br></br>
    </div>
  ) : <></>
}