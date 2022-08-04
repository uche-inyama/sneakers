import axios from 'axios'
import { ReactNode, createContext, useContext, useReducer } from 'react';
import setAuthToken from '../utilities/setAuthToken';
import SessionsReducer from './SessionsReducer';
import { CREATE_SESSION, END_SESSION, GET_PRODUCTS } from './types';


type SessionsproviderProps = {
  children: ReactNode
}

type session = {
  email: string;
  password: string;  
};

type SessionsContext = {
  createSession: (sessionData: session) => void
  endSession: () => void,
  isAuthenticated: any,
  loading: boolean
  token: string,
  session: any
}

const SessionsContext = createContext({} as SessionsContext);

export const useSessionsContext = () => {
  return useContext(SessionsContext)
}

export const SessionsProvider = ({children}: SessionsproviderProps) => {
  const initialState = {
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
      const res = await axios.get('https://blooming-anchorage-66508.herokuapp.com//products')
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      });
    } catch (error) {
      console.error(error)
    }
  }

  const createSession = async (sessionData: session) => {
   try {
      const res = await axios({
        method: 'POST',
        url: 'https://blooming-anchorage-66508.herokuapp.com/users/sign_in',
        data: sessionData
      })
      dispatch({
        type: CREATE_SESSION,
        payload: {
          id: res.data.current_user.id,
          data: res.data,
          notice: 'You have successfully signed in.'
        }
      });
      loadProduct()
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const endSession = async () => {
    try {
        await axios({
        method: 'DELETE',
        url: 'https://blooming-anchorage-66508.herokuapp.com/users/sign_out'
      })
      dispatch({
        type: END_SESSION,
        payload: undefined
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SessionsContext.Provider value={{ 
       createSession,
       endSession,
       isAuthenticated: state.isAuthenticated,
       token: state.token,
       loading: state.loading,
       session: state.session
      }}>
      {children}
    </SessionsContext.Provider>
  )
}

export default SessionsProvider