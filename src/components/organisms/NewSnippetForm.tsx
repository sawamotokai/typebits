import React from 'react'
import {Button, InputLabel, FormHelperText, Input, FormControl, Select, MenuItem } from '@material-ui/core'
import '../../styles/page.css'
import { makeStyles } from '@material-ui/core/styles'
import {FirebaseContext, } from '../../contexts/FirebaseContext'
import { useAuthState } from 'react-firebase-hooks/auth'


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    width: '100%' 
  }
}))

 


export default () => {
  const classes = useStyles()
  const {firestore, auth } = React.useContext(FirebaseContext)
  const [snip, setSnip] = React.useState('')
  const [lang, setLang] = React.useState('cpp')
  const [user] = useAuthState(auth)

  const handleLangChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLang(event.target.value as string)
  }

  const handleSnipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSnip(event.target.value)
  }

  const handleSubmit = () => {
    const codesRef = firestore.collection('codes')
    let ret = codesRef.add({
      lang: lang,
      text: snip,
      uid: user?.uid,
    }).then(res => {
      console.log(res)
      alert('New snippet added.')
    }).catch(err => {
      alert('Error happend. Snippet not added.')
    })
      setLang('')
      setSnip('')
  }

  return user ? (
    <form id={'new-snippet-form'}>
      <Input className={classes.input} value={snip} required id="new-snippet-input"  aria-describedby="my-helper-text" onChange={handleSnipChange} />
      <FormHelperText id="my-helper-text">Type whatever you want to use for typing practice</FormHelperText>

      <FormControl required className={classes.formControl}>
        <InputLabel id="lang-label">Language</InputLabel>
        <Select
          labelId="lang-label"
          id="lang-select"
          value={lang}
          onChange={handleLangChange}
          className={classes.selectEmpty}
        >
          <MenuItem value={'cpp'}>C++</MenuItem>
          <MenuItem value={'py'}>Python</MenuItem>
          <MenuItem value={'js'}>JavaScript</MenuItem>
          <MenuItem value={'cs'}>C#</MenuItem>
          <MenuItem value={'c'}>C</MenuItem>
          <MenuItem value={'go'}>Go</MenuItem>
          <MenuItem value={'rs'}>Rust</MenuItem>
          <MenuItem value={'dart'}>Dart</MenuItem>
          <MenuItem value={'other'}>Other</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <Button color='primary' variant='contained' onClick={handleSubmit} >Create</Button>
    </form>
  ) : <></>
}
