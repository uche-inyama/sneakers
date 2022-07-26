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
    console.log(action.payload)
    return {
      ...state,
      session: action.payload
    }
    case END_SESSION:
      return {
        ...state,
        session: action.payload
      }
    default:
      return state
  }
}

export default SessionsReducer;
