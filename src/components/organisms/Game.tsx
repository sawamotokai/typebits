import React, { useEffect, useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import '../../styles/text.css'
import { AppContext } from '../../contexts/AppContext'
import Typing from '../molecules/Typing'
import {shuffle} from '../../utils/utils'
import 'react-toastify/dist/ReactToastify.css';
import {makeStyles } from '@material-ui/core/styles'
import { snippet } from '../../utils/utils'

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
  }
}));

type props = {
  targets: snippet[],
}

export default (props :props) => {
  const {targetIdx, setTargetIdx} = useContext(AppContext)
  const [targets, setTargets] = useState<snippet[]>(props.targets)
  const [typed, setTyped] = useState('')
  const classes = useStyles()

  useEffect(() => {
    if (targetIdx === targets.length) {
      initTargets()
    }
  }, [targetIdx])

  useEffect(() => {
    if (typed === targets[targetIdx].snip) {
      goToNextTarget()
    }
  }, [typed])

  const initTargets: () => void = () => {
    // TODO: 
    // shuffle targets arrray
    setTargets(shuffle(targets))
    setTargetIdx(0)
  }

  const goToNextTarget: () => void = () => {
      setTyped('')
      setTargetIdx((targetIdx + 1) % targets.length)
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
      return targets[targetIdx + 1].snip
    }
    return "";
  }
  
  return (
    <div className={`target-container`}>
      {targetIdx < targets.length && <Typing typed={typed} target={targets[targetIdx].snip} />}
      <span className={`code`}>{getNextString()}</span>
      <br/>
      <TextField className={classes.button} multiline autoFocus value={typed} onChange={handleType} id="code-field" variant="outlined" />
    </div>
  )
}
