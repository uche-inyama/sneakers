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

  console.log(products)

  useEffect(() => {
    getProducts()
  }, [])

  if (loading) return <div className="loading ff-Kumbh">loading...</div>

  const notification = () => (
     <div key={location.state.type} className={`ff-Kumbh login-notification alert alert-${location.state.type}`}>
      <i className='fas fa-info-circle' />{location.state.msg}
    </div>
  )

  setTimeout(() => {
    const alert: any = document.querySelector('.login-notification');
    const on: any = document.querySelector('.on');
    alert.style.display = 'none';
    on.classList.add("off");
  }, 10000);

  return (
    <>
      {isAuthenticated && notification()}
      <div className="on product-list">
        {products.map(item =>
          <div key={item.id}><StoreItem samples={undefined} {...item} /></div>
        )}
      </div>
    </>
  )
}

export default Store