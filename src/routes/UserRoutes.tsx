import React from 'react'
import { Route, } from 'react-router-dom'
import SnippsMenu from '../pages/SnippsMenu'
import NewSnippet from '../pages/NewSnippet'
import EditSnippet from '../pages/EditSnippet'
import Dashboard from '../pages/Dashboard'

export default () => {
  return [
      <Route key='dashboard-route' exact path="/user/:id" render={() => <Dashboard /> } />,
  ]
} 