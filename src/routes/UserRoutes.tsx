import React from 'react'
import {Route, } from 'react-router-dom'
import SnippsMenu from '../pages/SnippsMenu'

export default () => {
  return [
      <Route key='dashboard-route' exact path="/user/snipps" render={() => ( <SnippsMenu></SnippsMenu>)} />,
      // <Route key='dashboard-route' exact path="/user/snipps/new" render={() => ( <SnippsMenu></SnippsMenu>)} />,
      // <Route key='dashboard-route' exact path="/user/snipps/edit" render={() => ( <SnippsMenu></SnippsMenu>)} />,
  ]
} 