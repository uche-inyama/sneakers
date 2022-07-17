import { GET_PRODUCTS, SET_LOADING, GET_PRODUCT } from './types'

type action = {
  type: string
  payload: any
}

type state = {
  products: any
  product: any
  loading: boolean
}

const ProductListReducer = (state :state, action :action) => {
  switch(action.type){
    case SET_LOADING:
      return { ...state, loading: true }
    case GET_PRODUCTS:
      console.log('getting products...')
      return {
        ...state,
        products: action.payload,
        loading: false
      }
    case GET_PRODUCT:
      console.log('getting product...')
      return {
        ...state,
        product: action.payload,
        loading: false
      }
    default:
      return state
  }
}

export default ProductListReducer;