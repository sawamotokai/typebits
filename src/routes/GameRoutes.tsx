import React from 'react'
import {Route, } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import GamePlayer from '../pages/GamePlayer'
import CustomGameMenu from '../pages/CustomGameMenu'

export default () => {
  return [
      <Route key='game-route' exact path="/game" render={() => ( <Dashboard /> )} />,
      <Route key='game-route-user' exact path="/game/custom" render={() => ( <CustomGameMenu></CustomGameMenu>)} />,

      <Route key='game-route-user' exact path="/game/custom/play" render={() => ( <GamePlayer useCustomCode={true} /> )} />,
      <Route key='game-route-preset' exact path="/game/play" render={() => ( <GamePlayer useCustomCode={false} /> )} />,
  ]
} 