import React from 'react';
import './App.css';
import { FirebaseContextProvider, } from './contexts/FirebaseContext'
import { AppContextProvider, } from './contexts/AppContext'
import RootRoutes from './routes/RootRoutes'
import UserRoutes from './routes/UserRoutes'
import GameRoutes from './routes/GameRoutes'
import SignOut from './components/organisms/SignOut'
import NavBar from './components/organisms/NavBar'
import {Switch } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


function App() {
  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Montserrat',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif'
      ].join(','),
    },
  })

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <FirebaseContextProvider>
          <AppContextProvider>
            <NavBar></NavBar>
            <Switch>
              {RootRoutes()}
              {UserRoutes()}
              {GameRoutes()}
            </Switch>
          </AppContextProvider>
        </FirebaseContextProvider>
      </ThemeProvider>
    </div>
  )
}

export default App;
