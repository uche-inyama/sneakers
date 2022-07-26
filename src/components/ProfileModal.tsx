import React, { useState } from 'react'
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom'
import avatar from '../images/image-avatar.png'
import { addClassName } from '../utilities/toggle'


ReactModal.setAppElement('#root')
const Modal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="modal-wrapper">
      <img onClick={() => setModalIsOpen(true)} className="avatar" src={avatar} />
      <ReactModal 
          onRequestClose={() => setModalIsOpen(false)} 
          onAfterOpen={() => addClassName()}
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
                height: 'clamp(6rem, 10vw, 3rem)',
                justifySelf: 'start',
                borderRadius:'5px',
                position: 'absolute',
                left: '0',
                top: '9%',
              }
            }}
          isOpen={modalIsOpen}>
        <div className="ff-Kumbh modal-container">
          <div>logout</div>
        </div>
      </ReactModal>
    </div>
  )
}

export default Modal