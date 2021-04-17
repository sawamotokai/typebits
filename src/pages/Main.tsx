import React from 'react'
import TextInput from '../components/TextInput'
import TargetStrings from '../components/TargetStrings'
import * as codeData from '../cpp.json'

export default function Main() {
  const targets = codeData.targets
  return (
    <div>
      <TargetStrings targets={targets}></TargetStrings>
      <TextInput/>
    </div>
  )
}
