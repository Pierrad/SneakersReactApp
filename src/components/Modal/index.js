import { useEffect } from "react"
import PropTypes from "prop-types"

import Portal from "../Portal"

import "./styles.css"

const Modal = ({ children, title, isOpen, onClose }) => {
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? onClose() : null)
    document.body.addEventListener("keydown", closeOnEscapeKey)
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey)
    }
  }, [onClose])

  if (!isOpen) return null

  return (
    <Portal wrapperId="portal-modal-container">
      <div className="customModal">
        <div className="customModalContent">
          <div className="customModalContentHeader">
            <div className="customModalContentTitle">{title}</div>
            <button onClick={onClose} className="customModalContentButton">
              X
            </button>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export default Modal
