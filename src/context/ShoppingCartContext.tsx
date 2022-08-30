import { useReducer, createContext, ReactNode, useContext } from 'react'
import ShoppingCartReducer from './ShoppingCartReducer'
import axios from 'axios'
import { ADD_TO_CART, SET_LOADING, REMOVE_FROM_CART } from './types'

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  quantity: number
  amount: number
  marketing_statement: string, 
  product_price: number, 
  product_discount: number, 
  image: string
}

type ShoppingCartContext = {
  removeFromCart: (id: number) => void
  addToCart: (...args: any) => void
  setLoading: () => void
  cartQuantity: number
  items: CartItem[]
  item: CartItem
  loading: boolean
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext)
}

export const ShoppingCartProvider = ({children}: 
  ShoppingCartProviderProps) => {

  const initialState  = {
    Items: [],
    Item: null,
    loading: false
  }
  
  const [state, dispatch] = useReducer(ShoppingCartReducer, initialState)

  const cartQuantity = state.Items.reduce(
    (quantity: number, item: { quantity: number }) => item.quantity + quantity, 0
  )

  function removeFromCart(id: number) {
    try {
      axios.delete(`https://blooming-anchorage-66508.herokuapp.com/cart/${id}/remove`)
      dispatch({
        type: REMOVE_FROM_CART,
        payload: id
      })
    } catch (error) {
      console.error(error)
    }
  }

  const setLoading = () => dispatch({
    type: SET_LOADING,
    payload: undefined
  })

  const addToCart = async (...args: any) => {
    setLoading()
    try {
      const res =  await axios({
        method: 'POST',
        url: `https://blooming-anchorage-66508.herokuapp.com/cart/${args[0]}/add`,
        data: { 
          quantity: args[1],
          image: args[2],
          marketing_statement: args[3],
          product_price: args[4],
          product_discount: args[5]
        }
      })
      dispatch({
        type: ADD_TO_CART,
        payload: res.data
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ShoppingCartContext.Provider 
    value={{ 
      removeFromCart,
      cartQuantity,
      addToCart,
      setLoading,
      loading: state.loading,
      items: state.Items,
      item: state.Item
    }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
