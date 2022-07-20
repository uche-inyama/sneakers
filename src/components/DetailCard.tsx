import React, { useState } from 'react'
import { formatCurrency, discount_value } from '../utilities/formatCurrency'
import { useShoppingCart } from '../context/ShoppingCartContext'
import cartImage from "../images/icon-cart.svg"

const DetailCard = ({id, product}: any) => {
  console.log(id)
  const {items, increaseCartQuantity, getItemQuantity, decreaseCartQuantity, removeFromCart, addToCart } = useShoppingCart()
  const { marketing_statement, product_price, product_discount, samples } = product
  const [image, setImage] = useState(samples[0]['image_url'])
    
  console.log(getItemQuantity(id))
  const selling_price = () => {
    return discount_value(product_price, product_discount)
  }

  const updateImageUrl = (id: number) => {
    setImage(get_image_url(id))
  }

  const get_image_url = (id: any) => {
    const sample = samples.find((sample: { id: any }) => sample.id === id)
    return sample.image_url
  }


  return (
    <div>
      <main className="ff-Kumbh">
      <div className="hero-image">
        <img  src={image} alt="hero-section-image" />
        <ul className="sample">
        {samples.map((sample :any) => {
          return  <li key={sample.id}>
              <img className="sample-image" onClick={() => updateImageUrl(sample.id)} src={sample.image_url} alt="img1"/>
            </li>
          }
        )}
      </ul>
      </div>
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
              <span onClick={() => increaseCartQuantity(id)} className="add text-Orange fw-700 fs-4">+</span>
              <span className="fw-700 fs-3">{getItemQuantity(id)}</span>
              <span className="subtract text-Orange fw-700 fs-4" onClick={() => decreaseCartQuantity(id)}>-</span>
            </div>
            <div className="bottom-cart text-center bg-Orange">
              <img className="text-white fw-700 bottom-cart-image" style={{display: "inline-block"}} src={cartImage} alt="" />
              <span onClick={() => addToCart(id, samples[0]['image_url'])} className="text-white fw-700 fs-3">Add to cart</span>
            </div>
            </div>
        </article> 
      </div>
  </main>
    </div>
  )
}

export default DetailCard