import firebase from 'firebase/app';

export function shuffle(array: any[]) {
  for(let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export type snippet = {
  id: string,
  snip: string
}

export async function loadUserLanguages(user: firebase.User | null | undefined, firestore: firebase.firestore.Firestore): Promise<string[]> {
  let ret: string[] = []
  if (!user) return ret
  const snapshot = await firestore.collection('users').doc(user.uid).collection('languages').get()
  const {docs} = snapshot
  ret = snapshot.docs.map(doc => doc.id)
  return ret
}

export async function updateSnipById(lang: string, id: string, snip: string, user: firebase.User | null | undefined, firestore: firebase.firestore.Firestore) {
  if (!user) return
  const doc = await firestore.collection('shared-codes').doc(id).get()
  if (doc.exists) {
    console.log('found in shared codes')
    // add the doc id to users removed list
    // create a new snip with the snip
    const batch = firestore.batch()
    const userRef = firestore.collection('users').doc(user.uid)
    const removedCodesRef = userRef.collection('removed-codes').doc(id)
    batch.set(removedCodesRef, {})
    const snipRef = userRef.collection('languages').doc(lang).collection('codes').doc()
    batch.set(snipRef, {text: snip})
    await batch.commit()
  } else {
    await firestore.collection('users').doc(user.uid).collection('languages').doc(lang).collection('codes').doc(id).update({text: snip})
  }
}


export async function deleteSnipById(lang: string, id: string, user: firebase.User | null | undefined, firestore: firebase.firestore.Firestore) {
  if (!user || lang === '') return
  const docToDelete = await firestore.collection('shared-codes').doc(id).get()
  if (docToDelete.exists) {
    await firestore.collection('users').doc(user.uid).collection('removed-codes').doc(id).set({})
  } else {
    const docToDelete = await firestore.collection('users').doc(user.uid).collection('languages').doc(lang).collection('codes').doc(id).get()
    if (docToDelete.exists) {
      await docToDelete.ref.delete()
    }
  }
}

export async function loadSnipsFromDB(lang: string, user: firebase.User | null | undefined, firestore: firebase.firestore.Firestore) {
  if (!user || lang === '') return []
  let targets: snippet[] = []
  let snapshot = await firestore.collection('users').doc(user.uid).collection('removed-codes').get()
  let removedCodes: string[] = []
  if (!snapshot.empty) removedCodes = snapshot.docs.map(doc => doc.id)
  snapshot = await firestore.collection('shared-codes').where('lang', '==', lang).get()
  snapshot.docs.forEach((doc: any) => {
    if (removedCodes.some(codeId => codeId === doc.id)) return
    targets.push({snip: doc.data().text, id: doc.id})
  })
  snapshot = await firestore.collection('users').doc(user.uid).collection('languages').doc(lang).collection('codes').get()
  snapshot.docs.forEach((doc: any) => targets.push(({snip: doc.data().text, id: doc.id})))
  return targets
}

export async function loadAllSnipsFromDB(languages: string[], user: firebase.User | null | undefined, firestore: firebase.firestore.Firestore) {
  const promises: Promise<snippet[]>[] = [];
  for (let lang of languages) {
    promises.push(loadSnipsFromDB(lang, user, firestore))
  }
  const ret: snippet[][] = await Promise.all(promises)
  return ret
}