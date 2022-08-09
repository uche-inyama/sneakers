import { useEffect } from 'react'
import { formatCurrency } from '../utilities/formatCurrency'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useSessionsContext } from '../context/SessionContext'

type StoreItemProps = {
  id: number,
  name: string,
  marketing_statement: string
  product_price: number
  product_discount: number
  samples: any
}

const StoreItem = ({ id, name, product_price, samples }: StoreItemProps) => {
  const { isAuthenticated } = useSessionsContext()
  console.log(localStorage.getItem('token'))
  const navigate = useNavigate()

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/')
    }
  },[isAuthenticated])

  return (
    <div className="storeItem">
      <img src={samples[0]['image_url']} alt="product-item"/>
      <div className="purchase_details">
        <span className="product-name fs-4">{name}</span>
        <span className="product-price fs-4 text-muted">{formatCurrency(product_price)}</span>
      </div>
      <Link to={`/product/${id}/detail`} className="buy w-100">Buy</Link>
    </div>
  )
}
export default StoreItem;