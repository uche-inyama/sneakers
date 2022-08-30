import { ADD_TO_CART, REMOVE_FROM_CART, SET_LOADING, CLEAR_NOTICE } from './types'

type action = {
  type: string
  payload: any
}

type state = {
  Items: any
  Item: any
  loading: boolean
  msg: string
  type: string
}

const ShoppingCartReducer = (state :state, action :action) => {
  switch(action.type){
    case SET_LOADING:
      return { ...state, loading: true }
    case ADD_TO_CART:
      return {
        ...state,
        Items: [...state.Items, action.payload],
        loading: false,
        msg: 'Item(s) have been added successfully to the cart.',
        type: 'notice'
      }
    case REMOVE_FROM_CART:
      const filtered_items = state.Items.filter((item: { id: any }) => item.id !== action.payload)
      return {
        ...state,
        Items: filtered_items,
        msg: "Item(s) have been removed successfully from the cart.",
        type: 'notice'
      }
    case CLEAR_NOTICE:
      return {
        ...state,
        msg: '',
        type: ''
      }
    default:
      return state
  }
}

export default ShoppingCartReducer;