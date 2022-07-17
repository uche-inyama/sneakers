import { useEffect, useContext } from 'react'
import { Card } from 'react-bootstrap'
import { formatCurrency } from '../utilities/formatCurrency'
import { Link } from 'react-router-dom'
import { ProductListContext } from '../context/ProductListState'

type StoreItemProps = {
  id: number,
  name: string,
  marketing_statement: string
  product_price: number
  product_discount: number
  samples: any
}

const StoreItem = ({ id, name, marketing_statement, product_price, samples, product_discount }: StoreItemProps) => {

  return (
    <Card>
      <Card.Img
        variant="top"
        height="200px"
        src={samples[0]['image_url']}
        style={{objectFit: 'cover'}}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between
        align-items-baseline mb-4">
          <span className="fs-4">{name}</span>
          <span className="fs-4 text-muted">{formatCurrency(product_price)}</span>
        </Card.Title>
      </Card.Body>
      <Link to={`/${id}/detail`} className="w-100">Buy</Link>
    </Card>
  )
}

export default StoreItem;