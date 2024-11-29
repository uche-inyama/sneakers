import { CREATE_SESSION, END_SESSION, CLEAR_ALERT, CLEAR_NOTICE, CREATE_SESSION_FAILED } from './types'

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
      localStorage.setItem('isFalse', 'true')
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      }
    case CREATE_SESSION_FAILED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: false,
        loading: true
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
    case CLEAR_NOTICE:
      return {...state, notice: '' }
    case CLEAR_ALERT:
      return { ...state, alert: '' }
    default:
      return state
  }
}

export default SessionsReducer;
