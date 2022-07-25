import { CREATE_USER } from './types'

const RegistrationReducer = (state: any, action: any) => {
  switch(action.types){
    case CREATE_USER:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state
  }
}

export default RegistrationReducer;