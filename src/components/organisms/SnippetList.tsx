import React, { useContext, useEffect, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Selector from '../molecules/Selector';
import useUserData from '../../hooks/useUserData';
import { AppContext } from '../../contexts/AppContext';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import { deleteSnipById, loadSnipsFromDB, snippet, updateSnipById } from '../../utils/utils';
import '../../styles/page.css';
import { List, Paper, Button, TextField } from '@material-ui/core';
import Loader from '../atoms/Loader';

export default function SnippetList() {
  const [lang, setLang] = useState('');
  const [toEdit, setToEdit] = useState<snippet>({id: '', snip: ''});
  const [snippets, setSnippets] = useState<snippet[]>([])
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const {languages} = useContext(AppContext)
  const {firestore} = useContext(FirebaseContext)
  const user = useUserData()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = (event.target as HTMLInputElement).value;
    const snip: snippet | undefined = snippets.find(s => s.id === id);
    if (snip) {
      setToEdit(snip);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  }

  const handleDelete = () => {
    setDeleting(true);
  }

  useEffect(() => {
    if (editing || deleting) return
    loadSnipsFromDB(lang, user, firestore).then((snips: snippet[]) => {
      setSnippets(snips);
    }) 
  }, [lang, editing, deleting])

  return (
    !(editing || deleting) ? 
    <>
      <p style={{fontSize: '2rem', position: 'absolute', top: '5rem'}}>Snippet List</p>
      <FormControl component="fieldset">
        <Selector state={lang} setState={setLang} options={languages} label={'Language'} />
        {snippets.length !== 0 && 
          <Paper elevation={0} style={{maxHeight: 140, overflow: 'scroll', padding: '1rem', borderRadius: '2%', }}>
            <List>
              <RadioGroup aria-label="to-edit" name="to-edit" value={toEdit.id} onChange={handleChange}>
                {snippets.map((snippet: snippet, idx: number) => {
                  return <FormControlLabel value={snippet.id} control={<Radio />} label={snippet.snip} />
                })}
              </RadioGroup>
            </List>
          </Paper>
        }
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <Button disabled={toEdit.id === ''} onClick={handleEdit} variant="contained" color="primary" style={{width: '40%', marginTop: '1rem', boxShadow: 'none'}}>
            Edit
          </Button>
          <Button disabled={toEdit.id === ''} onClick={handleDelete} variant="contained" color="secondary" style={{width: '40%', marginTop: '1rem', boxShadow: 'none'}}>
            Delete
          </Button>
        </div>
      </FormControl>
    </> : editing ? <EditSnippet setEditing={setEditing} snippet={toEdit} lang={lang} /> : <ConfirmDeletion lang={lang} snippet={toEdit} setDeleting={setDeleting} />
  );
}


function EditSnippet({setEditing, snippet, lang}:  {setEditing: (editing: boolean) => void, snippet: snippet, lang: string}) {
  const [finalSnippet, setFinalSnippet] = useState(snippet);
  const [sending, setSending] = useState(false)
  const {firestore} = useContext(FirebaseContext);
  const user = useUserData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFinalSnippet({...finalSnippet, snip: e.target.value});
  }

  const handleSave = () => {
    setSending(true);
    updateSnipById(lang, snippet.id, finalSnippet.snip, user, firestore).catch(err => {
      console.log(err);
    }).finally(() => {
      setSending(false);
      setEditing(false)
    })
  }

  return  (
    sending ? <Loader show={true} /> :
    <form noValidate autoComplete="off">
        <TextField style={{width: '20rem'}} id="editing-snip" defaultValue={`${snippet.snip}`} onChange={handleChange} />
        <div>
          <Button disabled={sending} style={{margin: '1rem 0.1rem'}} onClick={handleSave} variant="contained" color="primary">Save</Button>
          <Button disabled={sending} style={{margin: '1rem 0.1rem'}} onClick={() => setEditing(false)} variant="outlined">Back</Button>
        </div>
    </form>
  )
}

function ConfirmDeletion({setDeleting, snippet, lang}: {setDeleting: (deleting: boolean) => void, snippet: snippet, lang: string} ) {
  const [sending, setSending] = useState(false)
  const {firestore} = useContext(FirebaseContext);
  const user = useUserData();

  const handleDelete = () => {
    setSending(true);
    deleteSnipById(lang, snippet.id, user, firestore).catch(err => {
      console.error(err)
    }).finally(() => {
      setSending(false);
      setDeleting(false)
    })
  }

  
  return (
    sending ? <Loader show={true} /> :
      <>
        <p style={{fontSize: '2rem', textAlign: 'center' }}>Do you want to delete <br/> <code>{snippet.snip}</code>?</p>
        <div>
          <Button disabled={sending} style={{margin: '1rem 0.1rem'}} onClick={() => setDeleting(false)} variant="contained" color="primary">Back</Button>
          <Button disabled={sending} style={{margin: '1rem 0.1rem'}} onClick={handleDelete} color='secondary' variant="contained">Delete</Button>
        </div>
      </>
  )
}