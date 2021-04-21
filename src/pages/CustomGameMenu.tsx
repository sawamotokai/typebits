import React, { useEffect, useState, useContext } from 'react'
import {Link, } from 'react-router-dom'
import {Button, } from '@material-ui/core'
import '../styles/text.css'
import '../styles/page.css'

export default () => {
  return (
    <div>
      <div className="sideways-container">
        <div>
          <p>Improve Typing 🚀</p>
          <Link to={'/game/custom/play'}><Button color='primary' variant='contained'>Start</Button></Link>
        </div>
        <div>
          <p>Create, Manage, Share your Snippets and more 🔧</p>
          <Link to={'/user/snipps'}><Button color='default' variant='contained'>Snippet Settings</Button></Link>
        </div>
      </div>
    </div>
  )
}