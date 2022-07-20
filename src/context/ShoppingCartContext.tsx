import { useState, useReducer, createContext, ReactNode, useContext } from 'react'
import ShoppingCart from '../components/shoppingCart'
import ShoppingCartReducer from './ShoppingCartReducer'
import axios from 'axios'
import { ADD_TO_CART, SET_LOADING } from './types'


type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  image: string
  quantity: number
  amount: number
}

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  addToCart: (id: number, image: string) => void
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
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity, 0
  )

  const setLoading = () => dispatch({
    type: SET_LOADING,
    payload: undefined
  })

  const addToCart = async (id: number, image: string) => {
    setLoading()
    try {
      const res =  await axios({
        method: 'POST',
        url: `http://localhost:3000/cart/${id}/add`,
        data: { 
          quantity: getItemQuantity(id),
          image: image 
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
      <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
  )
}
