import { CREATE_SESSION } from './types'

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

const ShoppingCartReducer = (state :state, action :action) => {
  switch(action.type){
    case CREATE_SESSION: 
      return action.payload
    default:
      return state
  }
}

export default ShoppingCartReducer;
