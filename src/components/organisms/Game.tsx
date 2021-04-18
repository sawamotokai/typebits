import React, { useEffect, useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import '../../styles/text.css'
import { AppContext } from '../../contexts/AppContext'
import Typing from '../molecules/Typing'

type props = {
  targets: string[],
}

export default ({targets, } :props) => {
  const {targetIdx, setTargetIdx} = useContext(AppContext)
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (targetIdx === targets.length) {
      alert("Complete!")
      initTargets()
    }
  }, [targetIdx])

  useEffect(() => {
    if (typed === targets[targetIdx]) {
      goToNextTarget()
    }
  }, [typed])

  const initTargets: () => void = () => {
    // TODO: 
    setTargetIdx(0)
  }

  const goToNextTarget: () => void = () => {
      setTyped('')
      setTargetIdx(targetIdx + 1)
  }

  const handleType = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let str = ev.target.value
    let charCode = str.charCodeAt(ev.target.value.length-1)
    if (charCode === 10) {
      goToNextTarget()
      return
    }
    setTyped(str)
  }

  const getNextString: () => string = () => {
    if (targetIdx + 1 < targets.length) {
      return targets[targetIdx + 1]
    }
    return "";
  }
  
  return (
    <div className={`target-container`}>
      {targetIdx < targets.length && <Typing typed={typed} target={targets[targetIdx]} />}
      <span className={`code`}>{getNextString()}</span>
      <br/>
      <TextField multiline autoFocus value={typed} onChange={handleType} id="outlined-basic" variant="outlined" />
    </div>
  )
}
