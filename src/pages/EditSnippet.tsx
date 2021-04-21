import React, { useContext, } from 'react'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'
import { Link } from "react-router-dom";
import {Button} from '@material-ui/core'
// import Error from './Error'
import '../styles/text.css'
import '../styles/page.css'
import NewSnippetForm from '../components/organisms/NewSnippetForm'

export default () => {
  const {auth, } = useContext(FirebaseContext)
  const [user] = useAuthState(auth)

  React.useEffect(() => {
    if (!user) {
      window.location.href = '/'
    }
  }, [])

  return user ? (
    <div id='new-snip' className='page'>
      <h1>{`Hi, ${user.displayName}!`}</h1> 
      <NewSnippetForm></NewSnippetForm>
      <br></br>
    </div>
  ) : <></>
}