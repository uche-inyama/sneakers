import { useState, useEffect } from 'react'
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import avatar from '../images/image-avatar.png'
import { addClassName } from '../utilities/toggle'
import { useSessionsContext } from '../context/SessionContext'


ReactModal.setAppElement('#root')
const Modal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { endSession, isAuthenticated } = useSessionsContext()
  const token = localStorage.getItem('token')

  const navigate  = useNavigate()
  
  const handleLogout = () => {
    endSession()
    setTimeout(() => {
      navigate('/')
      window.location.reload();
    }, 500)
  }

  const handleLogin = () => {
    navigate('/')
  }

  return (
    <div className="modal-wrapper">
      {(isAuthenticated || token) && <img onClick={() => setModalIsOpen(true)} className="avatar" src={avatar} />}
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
          { token ? (<div className="logout" onClick={() => handleLogout()}>logout</div>):
            (<div className="login" onClick={() => handleLogin()}>Sign in</div>)
          }
        </div>
      </ReactModal>
    </div>
  )
}

export default Modal