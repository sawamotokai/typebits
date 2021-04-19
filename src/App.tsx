import React from 'react';
import './App.css';
import { FirebaseContextProvider, } from './contexts/FirebaseContext'
import { AppContextProvider, } from './contexts/AppContext'
import RootRoutes from './routes/RootRoutes'
import {Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <FirebaseContextProvider>
        <AppContextProvider>
          <Switch>
            {RootRoutes()}
          </Switch>
        </AppContextProvider>
      </FirebaseContextProvider>
    </div>
  )
}

export default App;
