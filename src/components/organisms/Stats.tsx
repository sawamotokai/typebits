import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../contexts/AppContext';
import {FirebaseContext } from '../../contexts/FirebaseContext';
import useUserData from '../../hooks/useUserData';
import { Doughnut } from 'react-chartjs-2';
import { loadAllSnipsFromDB, snippet } from '../../utils/utils';
import randomColor from 'randomcolor'

export default function Stats() {
  const {languages} = useContext(AppContext)
  console.log(languages)
  const {firestore} = useContext(FirebaseContext)
  const [data, setData] =  useState({
    labels: languages,
    datasets: [{
      label: 'Amount of Snippets',
      data: [0],
      backgroundColor: randomColor({count: languages.length, format: 'rgb'}),
      hoverOffset: 4
    }]
  });
  const user = useUserData()

  useEffect(() => {
    loadAllSnipsFromDB(languages, user, firestore).then((snippetArrays: snippet[][]) => {
      const counts = snippetArrays.map((snippets: snippet[]) => snippets.length)
      setData({
        labels: languages,
        datasets: [{
          ...data.datasets[0],
          data: counts,
        }]
      })
    })
  }, [])

  return (
    <div className="stats" style={{width: '48%'}}>
      <Doughnut data={data} width={10} height={10} />
    </div>
  )
}
