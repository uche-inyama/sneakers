import axios from 'axios'
import { ReactNode, createContext, useState, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom'
import setAuthToken from '../utilities/setAuthToken';
import SessionsReducer from './SessionsReducer';
import { CREATE_SESSION, END_SESSION, GET_PRODUCTS, CREATE_SESSION_FAILED } from './types';


type SessionsproviderProps = {
  children: ReactNode
}

type session = {
  email: string;
  password: string;  
};

type current_user = {
  id: number,
  username: string
}

type SessionsContext = {
  createSession: (sessionData: session) => void
  endSession: () => void,
  isAuthenticated: boolean,
  currentUser: current_user,
  loading: boolean,
  token: string,
  session: any
}

const SessionsContext = createContext({} as SessionsContext);

export const useSessionsContext = () => {
  return useContext(SessionsContext)
}

export const SessionsProvider = ({children}: SessionsproviderProps) => {
  // const [currentUser, setCurrentUser] = useState({} as current_user)
  const navigate = useNavigate()
  const initialState = {
    alert: '',
    notice: '',
    session: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    error: null,
    loading: true
  }
  const [state, dispatch] = useReducer(SessionsReducer, initialState)

  const loadProduct = async () => {
    if(localStorage.token){
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('http://localhost:3000/products')
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      });
    } catch (error) {
      console.error(error)
    }
  }

  const createSession = async (sessionData: session) => {
    console.log(sessionData)
   try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:3000/users/sign_in.json',
        data: sessionData  
      })
      console.log(res.data)

      dispatch({
        type: CREATE_SESSION,
        payload: {
          currentUser: res.data.current_user,
          data: res.data,
          notice: 'You have successfully signed in.'
        }
      });
      navigate('/store', { replace: true, state: { msg: "You have signed in successfully", type: 'notice' } })
    } catch (error) {
      dispatch({
        type: CREATE_SESSION_FAILED,
        payload: {
          notice: 'Enter a correct username or password'
        }
      })
      console.error(error)
    }
  }

  const endSession = async () => {
    console.log('endSession')
    try {
        await axios({
        method: 'DELETE',
        url: 'http://localhost:3000/users/sign_out.json'
      })
      dispatch({
        type: END_SESSION,
        payload: undefined
      })
      navigate('/', { replace: true, state: { msg: "You have signed out successfully", type: 'notice', status: true } })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SessionsContext.Provider value={{ 
       createSession,
       endSession,
       isAuthenticated: state.isAuthenticated,
       currentUser: state.currentUser,
       token: state.token,
       loading: state.loading,
       session: state.session
      }}>
      {children}
    </SessionsContext.Provider>
  )
}

export default SessionsProvider