import React from 'react'
import {Button, InputLabel, FormHelperText, Input, FormControl, Select, MenuItem } from '@material-ui/core'
import '../../styles/page.css'
import { makeStyles } from '@material-ui/core/styles'

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
  const [snip, setSnip] = React.useState('')
  const [lang, setLang] = React.useState('cpp')

  const handleLangChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLang(event.target.value as string)
  }

  const handleSnipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSnip(event.target.value)
  }

  return (
    <form id={'new-snippet-form'}>
      <Input className={classes.input} required id="new-snippet-input"  aria-describedby="my-helper-text" onChange={handleSnipChange} />
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
      <Button color='primary' variant='contained' >Create</Button>
    </form>
  )
}
