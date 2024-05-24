// ProductDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav';
import Footer from '../Components/AppFooter/footer';
import './ProductDetailPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBagShopping, faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Import the envelope icon
import CartModal from './CartModal';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [availability, setAvailability] = useState('Unknown');
  const [category, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { productId } = useParams();

  useEffect(() => {
    axios.get(`https://freshfarm-2358894.up.railway.app/api1/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        setCategory(response.data.category);
        if (response.data.quantity >= 10) {
          setAvailability('High Stock');
        } else if (response.data.quantity > 0 && response.data.quantity < 10) {
          setAvailability('Low Stock');
        } else {
          setAvailability('Out of Stock');
        }
      })
      .catch(error => {
        console.error('Error fetching product detail:', error);
      });

    const fetchedReviews = [
      { customerName: 'Sam', comment: 'Great product!', rating: 5 },
      { customerName: 'Neha', comment: 'Could be better.', rating: 3 },
    ];
    setReviews(fetchedReviews);
  }, [productId]);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const totalPrice = product.price * quantity;

    axios.post('https://freshfarm-2358894.up.railway.app/api11/products/cart', {
      product_name: product.name,
      quantity,
      category: category,
      price: totalPrice,
      timestamp: product.timestamp
    })
      .then(response => {
        console.log('Product added to cart successfully');
        setShowModal(true); // Show modal on successful add to cart
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
      });
  };

  const handleGoToCart = () => {
    setShowModal(false);
    navigate('/addCart');
  };

  const handleInquiry = () => {
    navigate('/inquiry');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Nav />
      <div className="product-container">
        <div className="product-details">
          <img className="product-image" src={`https://freshfarm-2358894.up.railway.app/${product.image}`} alt={product.name} />
          <div className="product-info">
            <h2>{product.name}</h2>
            <p>Price: Rs.{product.price}</p>
            <p1>{product.description}</p1>
            <p style={{ color: 'black' }}>Category: {category}</p>
            <p style={{ color: 'grey', fontSize: '16px' }}>Availability: {availability ? 'In Stock' : 'Out of Stock'}</p>
            <div className="quantity-control">
              <span>Kilogram:</span>
              <button onClick={handleDecreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={handleIncreaseQuantity}>+</button>
            </div>
            <div className='new-button'>
              <div className="add-to-cart-button">
                <button onClick={handleAddToCart} className='buttonStyle'>
                  <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                </button>
              </div>
              <div className="buy-now-button">
                <button onClick={handleGoToCart} className='buyNowButton'>
                  <FontAwesomeIcon icon={faBagShopping} /> Buy Now
                </button>
              </div>
            </div>
          </div>
          <div className="inquiry-button">
          <button className="inquiryButton" onClick={handleInquiry}>
              <FontAwesomeIcon icon={faEnvelope} /> Inquiry
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <CartModal show={showModal} onClose={() => setShowModal(false)} onGoToCart={handleGoToCart} />
    </div>
  );
};

export default ProductDetailPage;