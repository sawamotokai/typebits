import React, { useEffect, useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import { getMatch, } from '../utils/textInputUtils'
import '../styles/text.css';
import * as dataFromFile from '../cpp.json'
import { AppContext } from '../contexts/AppContext'

export default () => {
  let targets: string[] = dataFromFile.targets
  const {targetIdx, setTargetIdx} = useContext(AppContext)
  const [typed, setTyped] = useState('')
  const [untyped, setUntyped] = useState(targets[0])
  const [typedRight, setTypedRight] = useState('')
  const [typedWrong, setTypedWrong] = useState('')

  useEffect(() => {
    if (targetIdx === targets.length) {
      alert("Complete!")
      initTargets()
    } else {
      setUntyped(targets[targetIdx])
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
      setTypedRight('')
      setTypedWrong('')
      setTargetIdx(targetIdx + 1)
  }

  const updateTypedStates  = (str: string) => {
    let match: string = getMatch(str, targets[targetIdx])
    setTypedRight(match)
    let unmatch: string = targets[targetIdx].slice(match.length, Math.min(str.length, targets[targetIdx].length))
    setTypedWrong(unmatch)
    let rest: string = targets[targetIdx].slice(str.length)
    setUntyped(rest)
    setTyped(str)
  }

  const handleType = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let charCode = ev.target.value.charCodeAt(ev.target.value.length-1)
    if (charCode === 10) {
      goToNextTarget()
      return
    }
    updateTypedStates(ev.target.value)
  }
  
  return (
    <div>
      <div id="typed">
        <span className={"typed-right code"}>{typedRight}</span>
        <span className={"typed-wrong code"}>{typedWrong}</span>
        <span className={"untyped code"}>{untyped}</span>
      </div>
      <br></br>
      <TextField multiline autoFocus value={typed} onChange={handleType} id="outlined-basic" variant="outlined" />
    </div>
  )
}
