import { useReducer, ReactNode, createContext } from 'react';
import axios from 'axios';
import ProductListReducer from './ProductListReducer'
import { SET_LOADING, GET_PRODUCTS, GET_PRODUCT } from './types';

type ProductListProviderProps = {
  children: ReactNode
}

type Product = {
  id: any
  name: string
  marketing_statement: string
  product_price: number
  product_discount: number
  image: string
}

type ProductListContext = {
  products: Product[]
  product: Product
  loading: boolean
  getProducts: () => void
  getProduct: (id: number) => void
}

export const ProductListContext = createContext({} as ProductListContext)

const ProductListState = ({children}: ProductListProviderProps) => {
  const initialState = {
    products: [],
    product: null,
    loading: false
  }

  const [state, dispatch] = useReducer(ProductListReducer, initialState)

  const getProducts = async () => {
    setLoading();
    const res = await axios.get(`http://localhost:3000/products.json`)
    console.log(res)
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    })
  }

  const getProduct = async (id: any) => {
    setLoading();
    const res = await axios.get(`http://localhost:3000/products/${id}.json`)
    console.log(res)
    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    })
  }

  const setLoading = () => dispatch({
    type: SET_LOADING,
    payload: undefined
  })

  return <ProductListContext.Provider value={{
    products: state.products,
    product: state.product,
    loading: state.loading,
    getProducts,
    getProduct
  }}>
    {children}
  </ProductListContext.Provider>
}

export default ProductListState;