import React, { createContext, useState } from 'react';

type AppContext = {
  targetIdx: number,
  setTargetIdx: (idx: number) => void,
  languages: string[],
  setLanguages: (languages: string[]) => void,
}

const defaultLanguages = ['C++', 'Python', 'JavaScript', 'C#', 'C', 'Go', 'Rust', 'Dart']


export const AppContext = createContext<AppContext>({
  targetIdx: 0,
  setTargetIdx: (nextIdx: number) => {},
  languages: defaultLanguages,
  setLanguages: (languages: string[]) => {},
})

export const AppContextProvider : React.FC = ({children}) => {
  const [targetIdx, setTargetIdx] = useState(0)
  const [languages, setLanguages] = useState<string[]>(defaultLanguages);
  const contextValue = {
    targetIdx,
    setTargetIdx,
    languages,
    setLanguages,
  }
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}
