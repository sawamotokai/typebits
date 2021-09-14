import React, { useContext, useState } from 'react'
import {TextField, Button, } from '@material-ui/core'
import Selector from '../molecules/Selector'
import { AppContext } from '../../contexts/AppContext';
import {FirebaseContext } from '../../contexts/FirebaseContext';
import useUserData from '../../hooks/useUserData';
import Loader from '../atoms/Loader';

export default function CreateSnippet() {
  const [lang, setLang] = useState('');
  const {languages} = useContext(AppContext)
  const [sending, setSending] = useState(false);
  const {firestore} = useContext(FirebaseContext)
  const [newSnip, setNewSnip] = useState('')
  const user = useUserData()

  const handleSave = () => {
    if (!user || lang === '') return
    setSending(true);
    firestore.collection('users').doc(user.uid).collection('languages').doc(lang).collection('codes').add({
      text: newSnip,
    }).then(() => {
      setSending(false);
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSnip(event.target.value)
  };

  return (
    sending ? <Loader show={true} /> :
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <p style={{fontSize: '2.0rem', marginTop: '3rem'}}>New Snippet</p>
        <Selector state={lang} setState={setLang} options={languages} label={'Language'} />
        <div className={'start-menu'}>
          <form style={{border: 'none', marginBottom: '2rem', marginTop: '-1rem' }} noValidate autoComplete="off">
            <TextField style={{width: '20rem'}} id="new-snip" onChange={handleChange} />
            <div>
              <Button disabled={sending} style={{margin: '1rem 0.1rem', boxShadow: 'none'}} onClick={handleSave} variant="contained" color="primary">Create</Button>
            </div>
          </form>
        </div>
      </div>
  )
}
