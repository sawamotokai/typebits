import React, { useEffect, useState, useRef } from 'react'
import TextField from '@material-ui/core/TextField'
import { getMatch, } from '../utils/textInputUtils'
import '../styles/text.css';
import * as dataFromFile from '../cpp.json'

type dictionary = {
  words: string[],
}

type props = {
  targets: string[],
}

export default function TextInput() {
  let targets: string[] = dataFromFile.words
  const targetIdx = useRef<number>(0)
  const [typed, setTyped] = useState('')
  const [untyped, setUntyped] = useState(targets[0])
  const [typedRight, setTypedRight] = useState('')
  const [typedWrong, setTypedWrong] = useState('')

  const initTargets: () => void = () => {
    // TODO: 
    targetIdx.current = 0 
  }

  const goToNextTarget: () => void = () => {
      setTyped('')
      setTypedRight('')
      setTypedWrong('')
      targetIdx.current++;
      if (targetIdx.current === targets.length) {
        alert("Complete!")
        initTargets()
        targetIdx.current = 0
      }
      setUntyped(targets[targetIdx.current])
  }

  useEffect(() => {
    if (typed === targets[targetIdx.current]) {
      goToNextTarget()
    }
  }, [typed])

  const updateTypedStates  = (str: string) => {
    setTyped(str)
    let match: string = getMatch(str, targets[targetIdx.current])
    setTypedRight(match)
    let unmatch: string = targets[targetIdx.current].slice(match.length, Math.min(str.length, targets[targetIdx.current].length))
    setTypedWrong(unmatch)
    let rest: string = targets[targetIdx.current].slice(str.length)
    setUntyped(rest)
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
      <div>
        <ul style={{listStyleType: 'none'}}>
          {targets.map((str, id) => <li key={id}>{str}</li> )}
        </ul>
      </div>
      <span className={"typed-right"}>{typedRight}</span>
      <span className={"typed-wrong"}>{typedWrong}</span>
      <span className={"untyped"}>{untyped}</span>
      <br></br>
      <TextField multiline autoFocus value={typed} onChange={handleType} id="outlined-basic" variant="outlined" />
    </div>
  )
}
