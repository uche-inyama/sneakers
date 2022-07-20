import { ADD_TO_CART, SET_LOADING } from './types'

type action = {
  type: string
  payload: any
}

type state = {
  Items: any
  Item: any
  loading: boolean
}

const ShoppingCartReducer = (state :state, action :action) => {
  switch(action.type){
    case SET_LOADING:
      return { ...state, loading: true }
    case ADD_TO_CART:
      return {
        ...state,
        Items: [...state.Items, action.payload],
        loading: false
      }
    default:
      return state
  }
}

export default ShoppingCartReducer;