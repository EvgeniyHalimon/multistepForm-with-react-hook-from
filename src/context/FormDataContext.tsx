import  { useState, useContext, FC, createContext, ReactNode } from 'react'

interface IFormData{
  data: any,
  setValues: any
}

const DataContext = createContext<IFormData>({
  data: null,
  setValues: (value: any) => {value}
})

interface IFormDataContext{
  children: ReactNode
}

export const DataProvider: FC<IFormDataContext> = ({children}) => {
  const [data, setData] = useState({});

  const setValues = (values: any) => {
    setData(prevData => ({
      ...prevData,
      ...values
    }))
  }

  return <DataContext.Provider value={{data, setValues}}>
    {children}
  </DataContext.Provider>
}

export const useData = () => useContext(DataContext)