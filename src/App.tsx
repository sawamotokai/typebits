import React from 'react';
import './App.css';
import Home from './pages/Home';
import { FirebaseContextProvider, } from './contexts/FirebaseContext'
import { AppContextProvider, } from './contexts/AppContext'

function App() {
  return (
    <div className="App">
      <FirebaseContextProvider>
        <AppContextProvider>
          <Home></Home>
        </AppContextProvider>
      </FirebaseContextProvider>
    </div>
  );
}

export default App;
