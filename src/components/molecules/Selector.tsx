import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

type props = {
  options: string[] | undefined[],
  state: string | undefined,
  setState: React.Dispatch<React.SetStateAction<any>>, 
  label: string,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 320,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export default function Selector(props: props) {
  const classes = useStyles();
  const {options, state, setState, label} = props

  return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Language</InputLabel>
        <Select
          native
          value={state}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => setState(e.target.value as string | undefined )}
          label={label}
          inputProps={{
            name: label,
            id: label,
          }}
        >
          <option aria-label="None" value="" />
          {options.map((option: string | undefined) => <option aria-label={option} value={option}>{option}</option>)}
        </Select>
      </FormControl> 
  )
}
