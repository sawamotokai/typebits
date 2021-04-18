import React from 'react'
import '../styles/targetStrings.css'
import {AppContext, } from '../contexts/AppContext'

type props = {
  targets: string[],
}

export default function TargetStrings({targets, } : props) {
  const {targetIdx} = React.useContext(AppContext)

  const getNextTwo: () => string[] = () => {
    let ret: string[] = [];
    for (let i=0; i<2; i++) {
      if (targetIdx + i < targets.length) {
        ret.push(targets[targetIdx + i])
      }
    }
    return ret
  }
  return (
    <div className={`target-container`}>
      {getNextTwo().map((target, id) => <><span key={id} className={"code"}>{target}</span><br></br></>)} 
    </div>
  )
}