import { useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom';
import StoreItem from '../components/StoreItem'
import { ProductListContext } from '../context/ProductListState'
import { useSessionsContext } from '../context/SessionContext'


const Store = () => {
  const Context = useContext(ProductListContext);
  const { isAuthenticated } = useSessionsContext()
  const { getProducts, loading, products } = Context;
  const location: any = useLocation();

  useEffect(() => {
    getProducts()
  }, [])

  if (loading) return <div className="loading ff-Kumbh">loading...</div>

  const notification = () => (
     <div key={location.state.type} className={`login alert alert-${location.state.type}`}>
    <i className='fas fa-info-circle' />{location.state.msg}
  </div>
  )
  const alert: any = document.querySelector('.login')

  setTimeout(() => {
    alert.style.display = 'none'
  }, 10000);

   
  return (
    <>
      {isAuthenticated && <div>{notification()}</div>}
      <div className="ff-Kumbh main-container">
        {products.map(item =>
          <div key={item.id}><StoreItem samples={undefined} {...item} /></div>
        )}
      </div>
    </>
  )
}

export default Store