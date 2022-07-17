import { useEffect, useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import storeItems from '../data/items.json'
import StoreItem from '../components/StoreItem'
import { ProductListContext } from '../context/ProductListState'


const Store = () => {
  const Context = useContext(ProductListContext);
  const { getProducts, loading, products } = Context;
  console.log(products)

  useEffect(() => {
    getProducts()
  }, [])

  if (loading) return <div>loading...</div>

  return (
    <>
      <Row md={2} xs={1} lg={3} className="g-3">
        {products.map(item =>
           <Col key={item.id}><StoreItem { ...item } /></Col>
        )}
      </Row>
    </>
  )
}

export default Store