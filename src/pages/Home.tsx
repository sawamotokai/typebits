import React from 'react'
import TextInput from '../components/TextInput'

export default function Home() {
  return (
    <div>
      <h1>HOME</h1> 
      <TextInput target={['vector<int> a(n);', 'for (int i=0; i<n; i++)', 'cin >> a[i]']}></TextInput>
    </div>
  )
}
