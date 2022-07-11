import React from 'react'
import { Container, Nav, Navbar as NavbarBs, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext'
import cart from '../images/icon-cart.svg'
import avatar from '../images/image-avatar.png'
import { toggle } from '../toggle'
import Modal from './Modal'

const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart()

  const handleToggle = () => toggle();

  return (
    <header>
      <div className="mobile-nav-wrapper">
        <button className="mobile-nav-toggle" onClick={handleToggle} aria-controls="primary-navigation">
          <span className="sr-only" aria-expanded="false">Menu</span>
        </button>
        <div className="fw-700 fs-3">Sneakers</div>
      </div>
      <nav className="fs-2 text-Grayish-blue">
        <ul data-visible="false" className="primary-navigation">
          <Link to='/store'>Collections</Link>
          <li>Men</li>
          <li>Women</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
      <div className="cart_profile">
        <Modal />
        {cartQuantity === 0 ? '' : (
          <div className="cart-total">{cartQuantity}</div>
        )}
        <img className="avatar" src={avatar}/>
      </div>
  </header>
  )
}

export default Navbar;