import React from 'react'
import {Route} from 'react-router-dom'
import Home from '../pages/Home'
import useUserData from '../hooks/useUserData'

export default () => {
  const user = useUserData()
  return [
      <Route key='home-route' exact path="/" render={() => <Home />}/>,
      // <Route key='home-route' exact path="/dammy"> {user ? <Redirect to={`/game`}/> : <Home />} </Route>,
  ]
} 