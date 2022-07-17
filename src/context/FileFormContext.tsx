import { createContext, ReactNode, useContext, useState } from 'react'

type FileFormProviderProps = {
  children: ReactNode
}

type Product = {
  id: number
  name: string
}

type FileFormContext = {
  product: Product[]
  setProduct: () => void
}

export const FileFormContext = createContext({});

export const useFileFormContext = () => {
  return useContext(FileFormContext)
}

export const FileFormProvider = ({children}: FileFormProviderProps) => {
  const [product, setProduct] = useState(FileFormContext);
  return (
    <FileFormContext.Provider value={{ product, setProduct }}>
      {children}
    </FileFormContext.Provider>
  )
}
