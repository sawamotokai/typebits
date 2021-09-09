import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { AppContext } from '../../contexts/AppContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export default function LanguageSelector() {
  const classes = useStyles();
  const [lang, setLang] = React.useState('');
  const { languages, setLanguages } = React.useContext(AppContext);

  return (
    <div>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Language</InputLabel>
        <Select
          native
          value={lang}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => setLang(e.target.value as string)}
          label="Language"
          inputProps={{
            name: 'Language',
            id: 'language',
          }}
        >
          <option aria-label="None" value="" />
          {languages.map(lang => <option aria-label={lang} value={lang} />)}
        </Select>
      </FormControl> 
    </div>
  )
}
