import React from 'react';
import './App.css';
import { FirebaseContextProvider, } from './contexts/FirebaseContext'
import { AppContextProvider, } from './contexts/AppContext'
import RootRoutes from './routes/RootRoutes'
import UserRoutes from './routes/UserRoutes'
import GameRoutes from './routes/GameRoutes'
import SignOut from './components/organisms/SignOut'
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
    // overrides: {
      // MuiButton: {
    //     // Name of the rule
    //     text: {
    //       // Some CSS
    //       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //       borderRadius: 3,
    //       border: 0,
    //       color: 'white',
    //       height: 48,
    //       padding: '0 30px',
    //       boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    //     },
    //   },
    // }
  })

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <FirebaseContextProvider>
          <AppContextProvider>
            <h1>Typebits (beta)</h1>
            <SignOut />
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
