import { Button, Card } from 'react-bootstrap'
import { formatCurrency } from '../utilities/formatCurrency'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { Link } from 'react-router-dom'

type StoreItemProps = {
  id: number,
  name: string,
  price: number,
  imgUrl: string
}

const StoreItem = ({ id, name, price, imgUrl }:
  StoreItemProps) => {
    const { increaseCartQuantity, getItemQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    const quantity = getItemQuantity(id)
  return (
    <Card>
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{objectFit: 'cover'}}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between
        align-items-baseline mb-4">
          <span className="fs-4">{name}</span>
          <span className="fs-4 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
      </Card.Body>
      {quantity === 0 ? (<Link to={`/${name}/detail`} className="w-100">Add to cart</Link >) : (
        <div className="d-flex align-items-center flex-column"
          style={{ gap: ".5rem" }}
        >
          <div className="d-flex align-items-center
          justify-content-center"
          style={{ gap: '.5rem' }}
          >
            <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              <div>
                <span className="fs-3">{quantity}</span> 
                in cart
              </div>
            <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
          </div>
          <div>
            <Button onClick={() => removeFromCart(id)} variant="danger" size="sm">Remove</Button>
          </div>
        </div>
      )}
    </Card>
  )
}

export default StoreItem;