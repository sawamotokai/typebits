import React from 'react'
import {Route, } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Main from '../pages/Main'

export default () => {
  return [
      <Route key='game-route' exact path="/game" render={() => ( <Dashboard /> )} />,
      <Route key='game-route-user' exact path="/game/custom" render={() => ( <Main useCustomCode={true} /> )} />,
      <Route key='game-route-preset' exact path="/game/preset" render={() => ( <Main useCustomCode={false} /> )} />,
  ]
} 