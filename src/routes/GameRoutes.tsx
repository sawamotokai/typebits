import React from 'react'
import {Route, } from 'react-router-dom'
import GamePlayer from '../pages/GamePlayer'

export default () => {
  return [
    <Route key={'game-route'} exact path={'/game/:lang'} render={() => <GamePlayer />} />
  ]
} 