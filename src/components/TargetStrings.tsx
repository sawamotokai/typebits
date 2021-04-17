import React from 'react'
import '../styles/targetStrings.css'

type props = {
  targets: string[],
}

export default function TargetStrings({targets,} : props) {
  return (
    <div className={`target-container`}>
      {targets.map((target, id) => <><span key={id} className={"code"}>{target}</span><br></br></>)} 
    </div>
  )
}
