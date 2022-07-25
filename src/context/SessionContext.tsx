import axios from 'axios'
import { ReactNode, createContext, useContext, useReducer } from 'react';
import RegistrationReducer from './RegistrationReducer';
import { CREATE_SESSION } from './types';


type SessionsproviderProps = {
  children: ReactNode
}

type session = {
  email: string;
  password: string;  
};

type SessionsContext = {
  createSession: (sessionData: session) => void
  users: session
}

const SessionsContext = createContext({} as SessionsContext);

export const useSessionsContext = () => {
  return useContext(SessionsContext)
}

export const SessionsProvider = ({children}: SessionsproviderProps) => {
  const initialState = {
    session: []
  }
  const [state, dispatch] = useReducer(RegistrationReducer, initialState)

  const createSession = async (sessionData: session) => {
   try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:3000//users/sign_in',
        data: sessionData
      })
      dispatch({
        type: CREATE_SESSION,
        payload: res.data
      })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <SessionsContext.Provider value={{ 
       createSession,
       users: state.users
      }}>
      {children}
    </SessionsContext.Provider>
  )
}

export default SessionsProvider