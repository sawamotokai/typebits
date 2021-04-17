import React, { useEffect, useState, useRef } from 'react'
import TextField from '@material-ui/core/TextField'
import { getMatch, } from '../utils/textInputUtils'
import '../styles/text.css';
import { isExpressionWithTypeArguments } from 'typescript';

type props = {
  target: string[],
}

export default function TextInput({target, }: props) {
  const targetIdx = useRef<number>(0)
  const [typed, setTyped] = useState('')
  const [untyped, setUntyped] = useState(target[0])
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
      if (targetIdx.current === target.length) {
        alert("Complete!")
        initTargets()
        targetIdx.current = 0
      }
      setUntyped(target[targetIdx.current])
  }

  useEffect(() => {
    if (typed === target[targetIdx.current]) {
      goToNextTarget()
    }
  }, [typed])

  const updateTypedStates  = (str: string) => {
    setTyped(str)
    let match: string = getMatch(str, target[targetIdx.current])
    setTypedRight(match)
    let unmatch: string = target[targetIdx.current].slice(match.length, Math.min(str.length, target[targetIdx.current].length))
    setTypedWrong(unmatch)
    let rest: string = target[targetIdx.current].slice(str.length)
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
          {target.map((str, id) => <li key={id}>{str}</li> )}
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