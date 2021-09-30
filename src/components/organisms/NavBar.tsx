import React from 'react'
import '../../styles/components.css'
import SignOut from './SignOut';
import SignIn from './SignIn';
import useUserData from '../../hooks/useUserData';


export default function Navbar() {
  const user = useUserData()
  return (
    <nav id="navbar">
      <img id="navbar-title" src={'/header.png'} />
      {user ? 
        <div id="navbar-profile">
          <SignOut />
          <div id="navbar-icon-wrapper">
            <img id="navbar-icon" src={`https://avatars.dicebear.com/api/bottts/${user.email}.svg`} />
          </div>
        </div>
      : <SignIn />
      }
    </nav>
  )
}
