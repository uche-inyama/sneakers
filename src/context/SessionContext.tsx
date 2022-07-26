import axios from 'axios'
import { ReactNode, createContext, useContext, useReducer } from 'react';
import SessionsReducer from './SessionsReducer';
import { CREATE_SESSION, END_SESSION } from './types';


type SessionsproviderProps = {
  children: ReactNode
}

type session = {
  email: string;
  password: string;  
};

type SessionsContext = {
  createSession: (sessionData: session) => void
  endSession: () => void
  session: any
}

const SessionsContext = createContext({} as SessionsContext);

export const useSessionsContext = () => {
  return useContext(SessionsContext)
}

export const SessionsProvider = ({children}: SessionsproviderProps) => {
  const initialState = {
    session: null
  }
  const [state, dispatch] = useReducer(SessionsReducer, initialState)

  const createSession = async (sessionData: session) => {
   try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:3000/users/sign_in',
        data: sessionData
      })
      // console.log(res.data)
      localStorage.setItem('session_id', `${res.data.id}`);
      dispatch({
        type: CREATE_SESSION,
        payload: {
          id: res.data.id,
          notice: 'You have successfully signed in.'
        } 
      })
    } catch (error) {
      console.error(error)
    }
  }

  const endSession = async () => {
    try {
      const res = await axios({
        method: 'DELETE',
        url: 'http://localhost:3000/users/sign_out'
      })

      dispatch({
        type: END_SESSION,
        payload: {
          session: 'delete'
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SessionsContext.Provider value={{ 
       createSession,
       endSession,
       session: state.session
      }}>
      {children}
    </SessionsContext.Provider>
  )
}

export default SessionsProvider