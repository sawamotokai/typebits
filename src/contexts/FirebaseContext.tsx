import firebase from 'firebase';
import 'firebase/auth'
import React, { createContext, } from 'react';

firebase.initializeApp({
  apiKey: "AIzaSyDK2M3jCj4TC-xqznrGOY2lNw49R1k5GDU",
  authDomain: "typebits-f9a77.firebaseapp.com",
  projectId: "typebits-f9a77",
  storageBucket: "typebits-f9a77.appspot.com",
  messagingSenderId: "694756133676",
  appId: "1:694756133676:web:c0e7af188c99d3c8affa89",
  measurementId: "G-RBM05YEDCZ"
});

const auth = firebase.auth()
const firestore = firebase.firestore()
const perf = firebase.performance()
const analytics = firebase.analytics()

firestore.enablePersistence({synchronizeTabs: true})

const contextValue = {
  firebase: firebase,
  auth: auth,
  firestore: firestore,
}

export const FirebaseContext = createContext(contextValue)
export const FirebaseContextProvider : React.FC = ({children}) => {
  return <FirebaseContext.Provider value={contextValue}>{children}</FirebaseContext.Provider>
}