import React from 'react'
import { Route, } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'

export default () => {
  return [
      <Route key='dashboard-route' exact path="/user/:id" render={() => <Dashboard /> } />,
  ]
} 