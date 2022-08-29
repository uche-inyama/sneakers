import { SET_ALERT, CLEAR_ALERT, SET_NOTICE, CLEAR_NOTICE } from './types'

interface action {
  type: string
  payload: any
}

interface state {
  notice: string
  alert: string
}

const NotificationReducer = (state :state, action :action) => {
  const { type, payload } = action;
  switch(type){
    case SET_ALERT:
    case SET_NOTICE:
     return { ...state, payload }
    case CLEAR_ALERT:
    case CLEAR_NOTICE:
      return state
    default:
      return state
  }
}

export default NotificationReducer;