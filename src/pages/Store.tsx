import { useEffect, useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import storeItems from '../data/items.json'
import StoreItem from '../components/StoreItem'
import { ProductListContext } from '../context/ProductListState'


const Store = () => {
  const Context = useContext(ProductListContext);
  const { getProducts, loading, products } = Context;

  useEffect(() => {
    getProducts()
  }, [])

  if (loading) return <div>loading...</div>

  return (
    <>
      <div className="ff-Kumbh main-container">
        {products.map(item =>
           <div key={item.id}><StoreItem { ...item } /></div>
        )}
      </div>
    </>
  )
}

export default Store