import React, { createContext, useState } from 'react';


export const AppContext = createContext({
  targetIdx: 0,
  setTargetIdx: (nextIdx: number) => {}
})

export const AppContextProvider : React.FC = ({children}) => {
  const [targetIdx, setTargetIdx] = useState(0)
  const contextValue = {
    targetIdx: targetIdx,
    setTargetIdx: (nextIdx: number) => {
      setTargetIdx(nextIdx)
    },
  }
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}