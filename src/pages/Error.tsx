import React from 'react'

type props = {
  status: number,
  message: string,
}

export default function Error({status, message}: props) {
  return (
    <div>
      <h1>Error: {status}</h1> 
      <h2>{message}</h2>
    </div>
  )
}
