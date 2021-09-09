import React from 'react'
import '../../styles/components.css'
import SignOut from './SignOut';

export default function EditSnippet() {
  return (
    // make navbar
    <nav className="navbar">
      <h1 className='navbar-title'>Typebits</h1>
      <SignOut />
    </nav>
  )
}
