import React from 'react'
import {Route, } from 'react-router-dom'
import SnippsMenu from '../pages/SnippsMenu'
import NewSnippet from '../pages/NewSnippet'
import EditSnippet from '../pages/EditSnippet'

export default () => {
  return [
      <Route key='dashboard-route' exact path="/user/snipps" render={() => ( <SnippsMenu></SnippsMenu>)} />,
      <Route key='dashboard-route' exact path="/user/snipps/new" render={() => ( <NewSnippet></NewSnippet>)} />,
      <Route key='dashboard-route' exact path="/user/snipps/edit" render={() => ( <EditSnippet></EditSnippet>)} />,
  ]
} 