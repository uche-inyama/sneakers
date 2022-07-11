import { Card } from 'react-bootstrap'
import { formatCurrency } from '../utilities/formatCurrency'
import { Link } from 'react-router-dom'

type StoreItemProps = {
  id: number,
  name: string,
  description: string,
  discount_index: number,
  original_value: number,
  imgUrl: string
}

const StoreItem = ({ name, original_value, imgUrl }: StoreItemProps) => {
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
          <span className="fs-4 text-muted">{formatCurrency(original_value)}</span>
        </Card.Title>
      </Card.Body>
      <Link to={`/${name}/detail`} className="w-100">Buy</Link>
    </Card>
  )
}

export default StoreItem;