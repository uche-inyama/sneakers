import { useState } from 'react'
import ReactModal from 'react-modal';
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency, discount_value } from '../utilities/formatCurrency'
import trash from '../images/icon-delete.svg'
import cart from '../images/icon-cart.svg'
import { pubsub } from '../utilities/pubsub'
import { useSessionsContext } from '../context/SessionContext'


ReactModal.setAppElement('#root')
const Modal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {  items, removeFromCart } = useShoppingCart()
  const { session } = useSessionsContext()
  const id_session = localStorage.getItem('session_id');

  const handleDelete = (item: any) => {
    removeFromCart(item.id)
    pubsub.publish('resetCount', item.id)
  }

  return (
    <div className="modal-wrapper">
      {id_session && <img onClick={() => setModalIsOpen(true)} className="cart" src={cart} />}
      <ReactModal 
          onRequestClose={() => setModalIsOpen(false)} 
          style={{
              overlay: {
                position: 'absolute',
                display:  'grid',
                width: '95%',
                margin: '0 auto',
                backgroundColor: 'transparent',
                inset: '62px 0 0 0',
              },
              content: {
                width: '100%',
                height: 'clamp(16rem, 60vw, 20rem)',
                justifySelf: 'start',
                borderRadius:'5px',
                position: 'absolute',
                left: '0',
                top: '9%',
              }
            }}
          isOpen={modalIsOpen}>
        <div className="ff-Kumbh modal-container">
          <div className="modal-cart">Cart</div>
            { items.length === 0 ? <div className="empty-modal">Your cart is empty</div> :
            items.map(item => {
              const selling_price = () => {
                return discount_value(item.product_price, item.product_discount)
              }
                const total = selling_price()*item.quantity
                return <div className="d-grid modal-detail">
                  <div style={{width: '90%'}}>
                    <img className="modal-image" src={item.image} alt="product-1"/>
                  </div>
                  <div className="checkout-price" style={{lineHeight: '1.6'}}>
                    <p className="fw-400 fs-2 product-category">Autumn Limited Edition</p>
                    <span className="fw-400 fs-2 evaluation">{formatCurrency(selling_price())} x {item.quantity}</span>
                    <span className="fw-400 fs-2 total">{formatCurrency(total)}</span>
                  </div>
                  <div className="pointer trash"><img onClick={() => handleDelete(item)} src={trash} alt="trash"/></div>
                </div>
              })
            }
          { items.length > 0 && 
            <button className="pointer capitalize fw-700 checkout-button bg-Orange text-white">checkout</button>
          }
        </div>
      </ReactModal>
    </div>
  )
}

export default Modal