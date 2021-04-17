import React from 'react';
import './App.css';
import Home from './pages/Home';
import { FirebaseContextProvider, } from './contexts/FirebaseContext'

function App() {
  return (
    <div className="App">
      <FirebaseContextProvider>
        <Home></Home>
      </FirebaseContextProvider>
    </div>
  );
}

export default App;
