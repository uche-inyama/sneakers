import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext'
import { toggle } from '../toggle'
import Modal from './Modal'
import ProfileModal from './ProfileModal'
import { useSessionsContext } from '../context/SessionContext'


const Navbar = () => {
  const { cartQuantity } = useShoppingCart()
  const { session } = useSessionsContext()
  const handleToggle = () => toggle();
  const id_session = localStorage.getItem('session_id');

  useEffect(() => {
    cartQuantity
  }, [cartQuantity])

  return (
    <header>
      <div className="mobile-nav-wrapper">
        <button className="mobile-nav-toggle" onClick={handleToggle} aria-controls="primary-navigation">
          <span className="sr-only" aria-expanded="false">Menu</span>
        </button>
        <div className="fw-700 fs-3">Sneakers</div>
      </div>
      {id_session ? (
         <nav className="fs-2 text-Grayish-blue">
         <ul data-visible="false" className="primary-navigation">
           <Link to='/store'>Collections</Link>
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