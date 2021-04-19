import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import { FirebaseContext, } from '../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'

export default () => {
  const {auth, } = React.useContext(FirebaseContext)
  const [user] = useAuthState(auth)
  return [
      <Route key='home-route' exact path="/"> {auth.currentUser && user ? <Redirect to={`/user/${user.uid}`}/> : <Home />} </Route>,
      <Route key='dashboard-route' exact path="/user/:uid" render={() => ( <Dashboard></Dashboard>)} />
  ]
} 