import React, {useState, useEffect, } from 'react'
import { getMatch, } from '../../utils/textInputUtils'

type props = {
  typed: string,
  target: string,
}

export default function Typing({typed, target}: props) {
  const [untyped, setUntyped] = useState(target)
  const [typedRight, setTypedRight] = useState('')
  const [typedWrong, setTypedWrong] = useState('')

  useEffect(() => {
    updateTypedStates(typed)
  }, [typed, target])

  const updateTypedStates  = (str: string) => {
    let match: string = getMatch(str, target)
    setTypedRight(match)
    let unmatch: string = target.slice(match.length, Math.min(str.length, target.length))
    setTypedWrong(unmatch)
    let rest: string = target.slice(str.length)
    setUntyped(rest)
  }

  return (
    <div>
      <div id="typed">
        <span className={"typed-right code"}>{typedRight}</span>
        <span className={"typed-wrong code"}>{typedWrong}</span>
        <span className={"untyped code"}>{untyped}</span>
      </div>
    </div>
  )
}
