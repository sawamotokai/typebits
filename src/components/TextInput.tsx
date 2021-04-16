import React, { useEffect, useState, useRef } from 'react'
import TextField from '@material-ui/core/TextField'
import { getMatch, } from '../utils/textInputUtils'
import '../styles/text.css';

type props = {
  target: string[],
}

export default function TextInput({target, }: props) {
  const targetIdx = useRef<number>(0)
  const [typed, setTyped] = useState('')
  const [untyped, setUntyped] = useState(target[0])
  const [typedRight, setTypedRight] = useState('')
  const [typedWrong, setTypedWrong] = useState('')

  const handleType = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let charCode = ev.target.value.charCodeAt(ev.target.value.length-1)
    if (charCode === 10) {
      setTyped('')
      setTypedRight('')
      setTypedWrong('')
      targetIdx.current++;
      setUntyped(target[targetIdx.current])
      return
    }
    setTyped(ev.target.value)
    let match: string = getMatch(ev.target.value, target[targetIdx.current])
    setTypedRight(match)
    let unmatch: string = target[targetIdx.current].slice(match.length, Math.min(ev.target.value.length, target[targetIdx.current].length))
    setTypedWrong(unmatch)
    let rest: string = target[targetIdx.current].slice(ev.target.value.length)
    setUntyped(rest)
  }
  
  return (
    <div>
      <div>
        <ul style={{listStyleType: 'none'}}>
          {target.map(str => <li>{str}</li> )}
        </ul>
      </div>
      <span className={"typed-right"}>{typedRight}</span>
      <span className={"typed-wrong"}>{typedWrong}</span>
      <span  className={"untyped"}>{untyped}</span>
      <br></br>
      <TextField multiline autoFocus value={typed} onChange={handleType} id="outlined-basic" variant="outlined" />
    </div>
  )
}
