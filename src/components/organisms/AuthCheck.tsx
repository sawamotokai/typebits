import React, { useContext, } from 'react'
import { FirebaseContext, } from '../../contexts/FirebaseContext'
import { useAuthState, } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom';
import { AppContext, } from '../../contexts/AppContext';

type propsType = {
  children: React.ReactElement,
  fallback?: React.ReactElement,
}

export default function AuthCheck(props: propsType) {
  const {auth, } = useContext(FirebaseContext)
  const [user] = useAuthState(auth)
  console.log(user)

  return user ? props.children : props.fallback || <a href={'/hi'} >You must be signed in. </a>
}