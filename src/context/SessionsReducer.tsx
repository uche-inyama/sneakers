import { CREATE_SESSION, END_SESSION } from './types'

type action = {
  type: string
  payload: any
}

type session = {
  email: string,
  password: string
}

type state = {
  session: session
}

const SessionsReducer = (state :state, action :action) => {
  switch(action.type){
    case CREATE_SESSION: 
      localStorage.setItem('token', action.payload.data.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      }
    case END_SESSION:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default SessionsReducer;
