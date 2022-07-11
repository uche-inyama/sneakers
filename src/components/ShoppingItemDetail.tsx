import { useParams } from 'react-router-dom';
import { formatCurrency } from '../utilities/formatCurrency'
import { useShoppingCart } from '../context/ShoppingCartContext'
import storeItems from '../data/items.json'
import product1 from '../images/image-product-1.jpg'
import product2 from "../images/image-product-2.jpg"
import product3 from "../images/image-product-3.jpg"
import product4 from "../images/image-product-4.jpg"
import cartImage from "../images/icon-cart.svg"


const ShoppingItemDetail = () => {
  const { name } = useParams()
  const storeItem = storeItems.find(item => item.name === name);
  const { increaseCartQuantity, getItemQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()

   return (
    <main className="ff-Kumbh">
      <img className="hero-image" src={product1} alt="hero-section-image" />
      <ul className="sample">
        <li><img src={product1} alt=""/></li>
        <li><img src={product2} alt=""/></li>
        <li><img src={product3} alt=""/></li>
        <li><img src={product4} alt=""/></li>
      </ul>
      <div className="container">
        <h4 className="uppercase text-Orange fs-1 fw-700">Sneaker Company</h4>
    
        <h1 className="fs-4 fw-700">Fall Limited Edition Sneakers</h1>
        <article>
          <p className="description fw-400 fs-2 text-light">
            {storeItem?.description}
          </p>
          
          <div className="price grid">
            <div className="price-detail">
              <span className="discount-value">$125.00</span> 
              <span className="discount-index text-Orange bg-Pale-Orange">{storeItem?.discount_index}%</span>
            </div> 
            <div className="original-value text-Grayish-blue fw-700">{formatCurrency(storeItem?.original_value)}</div>
          </div>
          <div className="cart-buttons">
            <div className="total-wrapper bg-Light-grayish-blue">
              <span onClick={() => increaseCartQuantity(storeItem?.id)} className="add text-Orange fw-700 fs-4">+</span>
              <span className="fw-700 fs-3">{getItemQuantity(storeItem?.id)}</span>
              <span className="subtract text-Orange fw-700 fs-4" onClick={() => decreaseCartQuantity(storeItem?.id)}>-</span>
            </div>
            <div className="bottom-cart text-center bg-Orange">
              <img className="text-white fw-700 bottom-cart-image" style={{display: "inline-block"}} src={cartImage} alt="" />
              <span className="text-white fw-700 fs-3">Add to cart</span>
            </div>
            </div>
        </article> 
      </div>
  </main>
  )
};

export default ShoppingItemDetail