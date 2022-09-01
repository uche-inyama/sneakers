import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext'
import { toggle } from '../toggle'
import Modal from './Modal'
import ProfileModal from './ProfileModal'
import { useSessionsContext } from '../context/SessionContext'


const Navbar = () => {
  const { cartQuantity } = useShoppingCart()
  const { isAuthenticated } = useSessionsContext()
  const handleToggle = () => toggle();
  const token = localStorage.getItem('token')

  useEffect(() => {cartQuantity
  }, [cartQuantity])


  const renderLogo = () => {
    if(token){
      return <Link to="/store" className="logo fw-700 fs-3">Sneakers</Link>
    }else {
      return <Link to="/" className="unauth logo fw-700 fs-3">Sneakers</Link>
    }
  }

  return (
    <header>
      <div className="mobile-nav-wrapper">
     { token && <button className="mobile-nav-toggle" onClick={handleToggle} aria-controls="primary-navigation">
          <span className="sr-only" aria-expanded="false">Menu</span>
        </button>}
        <div>{renderLogo()}</div>
      </div>
      {(token || isAuthenticated) ? (
         <nav className="fs-2 text-Grayish-blue">
         <ul data-visible="false" className="primary-navigation">
           <Link to='/store' className="collections ff-Kumbh ">Collections</Link>
           {/* <li>Men</li>
           <li>Women</li>
           <li>About</li>
           <li>Contact</li> */}
         </ul>
       </nav>
      ) : (<div></div>)}
      <div className="cart_profile">
        <Modal />
        {cartQuantity === 0 ? '' : (
          <div className="bg-Orange cart-total">{cartQuantity}</div>
        )}
        <ProfileModal />
      </div>
  </header>
  )
}

export default Navbar;