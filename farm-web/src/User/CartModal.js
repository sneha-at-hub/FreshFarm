// CartModal.js
import React from 'react';
import './CartModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

const CartModal = ({ show, onClose, onGoToCart }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="modal-body">
          <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
          <p>Added to cart successfully!</p>
          <button className="go-to-cart-button" onClick={onGoToCart}>
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;