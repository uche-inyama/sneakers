import { createContext, ReactNode, useContext, useReducer } from 'react'
import RegistrationReducer from './RegistrationReducer'
import { CREATE_USER } from './types'
import axios from 'axios'

type RegistrationFormProviderProps = {
  children: ReactNode
}

type user = {
  email: string;
  username: string,
  password: string;
  password_confirmation: string;
};

type RegistrationFormContext = {
  createUser: (userData: user) => void
  users: user[]
}

const RegistrationFormContext = createContext({} as RegistrationFormContext);

export const useRegistrationFormContext = () => {
  return useContext(RegistrationFormContext)
}

export const RegistrationFormProvider = ({children}: RegistrationFormProviderProps) => {
  const initialState = {
    users: []
  }
  const [state, dispatch] = useReducer(RegistrationReducer, initialState)
  const createUser = async (userData: user) => {
    console.log(userData)
   try {
      const res = await axios({
        method: 'POST',
        url: 'https://sneaker-api-new.onrender.com/users.json',
        data: userData
      })
      dispatch({
        type: CREATE_USER,
        payload:{
          data: res.data, 
          notice: 'You have successfully created an account.'
        } 
      })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <RegistrationFormContext.Provider value={{ 
       createUser,
       users: state.users
      }}>
      {children}
    </RegistrationFormContext.Provider>
  )
}
