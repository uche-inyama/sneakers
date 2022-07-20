import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import CartItem from './Modal'
import storeItems from '../data/items.json'


type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, items } = useShoppingCart()
  console.log(items)
  return (
    <div>
        {/* {items.map(item => (
        <CartItem key={item.id} {...item} />
      ))} */}
      {/* <div className="ms-auto fw-bold fs-5"> */}
        {/* Total {formatCurrency(items.reduce((total, cartItem) => {
          const item = storeItems.find(storeItem => 
            storeItem.id === cartItem.id)
            return total + (item?.price || 0) * cartItem.quantity
        }, 0))} */}
      {/* </div> */}
    </div>
  )
}

export default ShoppingCart;