import React, { useEffect, useState, useContext } from 'react'
import {Link, } from 'react-router-dom'
import {Button, } from '@material-ui/core'
import '../styles/text.css'
import '../styles/page.css'

export default () => {
  return (
    <div>
      <div>
        <Link to={'/user/snipps'}>Snippet Settings</Link>
      </div>
      <div className={`game-option`}>
        <p>Improve Typing</p>
        <Button> <Link to='/game/custom/play' style={{ textDecoration: 'none', color: 'black' }}>Start</Link> </Button>
      </div>
    </div>
  )
}