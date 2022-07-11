import React, { useState } from 'react'
import ReactModal from 'react-modal';
import product1 from '../images/image-product-1.jpg'
import trash from '../images/icon-delete.svg'
import cart from '../images/icon-cart.svg'


ReactModal.setAppElement('#root')
const Modal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="modal-wrapper">
      <img onClick={() => setModalIsOpen(true)} className="cart" src={cart} />
      <ReactModal 
          onRequestClose={() => setModalIsOpen(false)} 
          style={{
              overlay: {
                position: 'absolute',
                display:  'grid',
                // justifyContent: 'end',
                width: '95%',
                margin: '0 auto',
                height: '260px',
                backgroundColor: 'transparent',
                inset: '62px 0 0 0',
              },
              content: {
                width: '100%',
                height: 'clamp(16rem, 60vw, 20rem)',
                justifySelf: 'start',
                // height: '261px',
                borderRadius:'5px',
                position: 'absolute',
                left: '0',
                top: '9%',
              }
            }}
          isOpen={modalIsOpen}>
        <div className="ff-Kumbh">
          <div className="modal-cart">Cart</div>
          <div className="d-grid modal-detail">
            <div style={{width: '90%'}}>
              <img className="modal-image" src={product1} alt="product-1"/>
            </div>
            <div className="checkout-price" style={{lineHeight: '1.6'}}>
              <p className="fw-400 fs-2 product-category">Autumn Limited Edition</p>
              <span className="fw-400 fs-2 evaluation">$125.00 x 3</span>
              <span className="fw-400 fs-2 total">$375.00</span>
            </div>
            <div className="trash"><img src={trash} alt="trash"/></div>
          </div>
          <button className="capitalize fw-700 checkout-button bg-Orange text-white">checkout</button>
        </div>
      </ReactModal>
    </div>
  )
}

export default Modal