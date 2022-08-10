import { useEffect, useContext } from 'react'
import StoreItem from '../components/StoreItem'
import { ProductListContext } from '../context/ProductListState'


const Store = () => {
  const Context = useContext(ProductListContext);
  const { getProducts, loading, products } = Context;

  useEffect(() => {
    getProducts()
  }, [])

  if (loading) return <div className="loading ff-Kumbh">loading...</div>

  return (
    <>
      <div className="ff-Kumbh main-container">
        {products.map(item =>
           <div key={item.id}><StoreItem samples={undefined} {...item} /></div>
        )}
      </div>
    </>
  )
}

export default Store