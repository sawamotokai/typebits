import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Home from '../pages/Home'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'

export default () => {
  const {auth, } = React.useContext(FirebaseContext)
  const [user] = useAuthState(auth)
  return [
      <Route key='home-route' exact path="/" render={() => <Home />}/>,
      // <Route key='home-route' exact path="/dammy"> {user ? <Redirect to={`/game`}/> : <Home />} </Route>,
  ]
} 