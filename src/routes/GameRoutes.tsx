import React from 'react'
import {Route, } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import GamePlayer from '../pages/GamePlayer'
import CustomGameMenu from '../pages/CustomGameMenu'

export default () => {
  return [
    <Route key={'game-route'} exact path={'/game/:lang'} render={() => <GamePlayer />} />
  ]
} 