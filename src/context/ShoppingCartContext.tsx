import { useState, useReducer, createContext, ReactNode, useContext } from 'react'
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
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  addToCart: (...args: any) => void
  setLoading: () => void
  cartQuantity: number
  cartItems: CartItem[]
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

  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const initialState  = {
    Items: [],
    Item: null,
    loading: false
  }
  const [state, dispatch] = useReducer(ShoppingCartReducer, initialState)

  const openCart = () => setIsOpen(true)

  const closeCart = () => setIsOpen(false)

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  const cartQuantity = state.Items.reduce(
    (quantity: number, item: { quantity: number }) => item.quantity + quantity, 0
  )

  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if(currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if(item.id === id){
            return {...item, quantity: item.quantity + 1}
          }else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if(currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if(item.id === id){
            return {...item, quantity: item.quantity - 1}
          }else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    console.log(id)
    try {
      axios.delete(`http://localhost:3000/cart/${id}/remove`)
      dispatch({
        type: REMOVE_FROM_CART,
        payload: id
      })
    } catch (error) {
      console.error(id)
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
        url: `http://localhost:3000/cart/${args[0]}/add`,
        data: { 
          quantity: getItemQuantity(args[0]),
          image: args[1],
          marketing_statement: args[2],
          product_price: args[3],
          product_discount: args[4]
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
      decreaseCartQuantity, 
      getItemQuantity,
      increaseCartQuantity,
      removeFromCart,
      cartItems,
      cartQuantity,
      openCart,
      closeCart,
      addToCart,
      loading: state.loading,
      items: state.Items,
      item: state.Item
    }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
