import { ADD_TO_CART, REMOVE_FROM_CART, SET_LOADING } from './types'

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
    case REMOVE_FROM_CART:
      const filtered_items = state.Items.filter((item: { id: any }) => item.id !== action.payload)
      return {
        ...state,
        Items: filtered_items
      }
    default:
      return state
  }
}

export default ShoppingCartReducer;