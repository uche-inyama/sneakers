import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatCurrency, discount_value } from '../utilities/formatCurrency'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { ProductListContext } from '../context/ProductListState'
import product1 from '../images/image-product-1.jpg'
import product2 from "../images/image-product-2.jpg"
import product3 from "../images/image-product-3.jpg"
import product4 from "../images/image-product-4.jpg"
import cartImage from "../images/icon-cart.svg"


const ShoppingItemDetail = () => {
  let { id } = useParams()
  let id_param = Number(id)
  const [image, setImage] = useState(product1)
  const { increaseCartQuantity, getItemQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
  const { getProduct, product, loading } = useContext(ProductListContext)

  const updateImageUrl = (imageUrl: string) => {
    setImage(imageUrl)
  }

  useEffect(() => {
    getProduct(id_param)
  }, [])
  
  if(loading) return <div>loading...</div>
  const { name, marketing_statement, product_price, product_discount, samples } = product

  const selling_price = () => {
    return discount_value(product_price, product_discount)
  }
  
   return (
    <main className="ff-Kumbh">
      <img className="hero-image" src={samples[0]['image_url']} alt="hero-section-image" />
      <ul className="sample">
        <li><img className="sample-image" onClick={() => updateImageUrl(product1)} src={product1} alt="img1"/></li>
        <li><img className="sample-image" onClick={() => updateImageUrl(product2)} src={product2} alt="img2"/></li>
        <li><img className="sample-image" onClick={() => updateImageUrl(product3)} src={product3} alt="img3"/></li>
        <li><img className="sample-image" onClick={() => updateImageUrl(product4)} src={product4} alt="img4"/></li>
      </ul>
      <div className="container">
        <h4 className="uppercase text-Orange fs-1 fw-700">Sneaker Company</h4>
    
        <h1 className="fs-4 fw-700">Fall Limited Edition Sneakers</h1>
        <article>
          <p className="description fw-400 fs-2 text-light">
            {marketing_statement}
          </p>
          
          <div className="price grid">
            <div className="price-detail">
              <span className="discount-value">{formatCurrency(selling_price())}</span> 
              <span className="discount-index text-Orange bg-Pale-Orange">{product_discount}%</span>
            </div> 
            <div className="original-value text-Grayish-blue fw-700">{formatCurrency(product_price)}</div>
          </div>
          <div className="cart-buttons">
            <div className="total-wrapper bg-Light-grayish-blue">
              <span onClick={() => increaseCartQuantity(id_param)} className="add text-Orange fw-700 fs-4">+</span>
              <span className="fw-700 fs-3">{getItemQuantity(id_param)}</span>
              <span className="subtract text-Orange fw-700 fs-4" onClick={() => decreaseCartQuantity(id_param)}>-</span>
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