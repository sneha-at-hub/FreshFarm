import React, { useState, useEffect } from 'react';
import './UserAddtocart.css'; // Import the CSS file
import Nav from '../Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


function Cart({ userId }) {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhoneNumber, setBuyerPhoneNumber] = useState('');
  const [buyerLocation, setBuyerLocation] = useState('');
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false); // New state for order success message

  useEffect(() => {
    fetchCartItems(); // Fetch cart items when component mounts
  }, []); // Empty dependency array to run once on mount

  const fetchCartItems = () => {
    fetch('https://freshfarm-2358894.up.railway.app/api11/products/cart', {
      params: { user_id: userId }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch cart items. Status: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        setCartItems(data); // Directly set fetched items to state
        setError(null); // Clear any previous errors
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
        setError('Error fetching cart items. Please try again later.'); // Set error state
        setLoading(false); // Set loading to false in case of error
      });
  };

  const handleRemoveFromCart = (productId) => {
    fetch(`https://freshfarm-2358894.up.railway.app/api11/products/cart/${productId}`, {
      method: 'DELETE',
      params: { user_id: userId }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to remove product from cart. Status: ' + response.status);
        }
        // If the request is successful, update the cartItems state to remove the item
        setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== productId));
      })
      .catch(error => {
        console.error('Error removing product from cart:', error);
        setError('Error removing product from cart. Please try again.'); // Set error state
      });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    // Prevent decreasing quantity below 0
    if (newQuantity < 1) {
      return;
    }

    // Make a PATCH request to update the quantity and price in the backend
    fetch(`https://freshfarm-2358894.up.railway.app/api11/products/cart/${productId}`, {
      method: 'PATCH',
      params: { user_id: userId },
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: newQuantity }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update quantity. Status: ' + response.status);
        }
        // If the request is successful, update the quantity and price in the cartItems state
        setCartItems(prevCartItems =>
          prevCartItems.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
      })
      .catch(error => {
        console.error('Error updating quantity:', error);
        setError('Error updating quantity. Please try again.'); // Set error state
      });
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Show loading indicator while data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  // Show error message if there's an error
  if (error) {
    return <p>{error}</p>;
  }

  const handleProceedToCheckout = () => {
    setShowCheckoutDialog(true);
  };

  const handleCheckoutCancel = () => {
    setShowCheckoutDialog(false);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const modifiedCartItems = cartItems.map(item => ({
      ...item,
      productName: item.product_name // Assuming product_name is the field containing the product name
    }));
    const orderDetails = {
      buyerName,
      buyerLocation,
      cartItems: modifiedCartItems,
      totalPrice: calculateTotalPrice() // You need to implement this function
    };

    fetch('https://freshfarm-2358894.up.railway.app/api11/products/cart/match', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to validate user');
        }
        return response.json();
      })
      .then(data => {
        if (data.message === 'Order placed successfully') {
          // Proceed with placing the order
          const modifiedCartItems = cartItems.map(item => ({
            ...item,
            productName: item.product_name,
          }));

          const finalOrderDetails = {
            buyerName,
            buyerPhoneNumber,
            buyerLocation,
            cartItems: modifiedCartItems,
            totalPrice: calculateTotalPrice(),
          };

          fetch('https://freshfarm-2358894.up.railway.app/api11/products/cart/placeOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(finalOrderDetails),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to place order');
              }
              return response.json();
            })
            .then(data => {
              console.log('Order placed successfully:', data);
              setCartItems([]);
              setShowCheckoutDialog(false);
              setOrderPlaced(true); // Show success message
            })
            .catch(error => {
              console.error('Error placing order:', error);
            });
        } else {
          alert('Invalid name. Please check your details and try again.');
        }
      })
      .catch(error => {
        console.error('Error validating user:', error);
        alert('Error validating user. Please try again.');
      });
  };

  const calculateTotalPrice = () => {
    // Initialize total price
    let totalPrice = 0;

    // Loop through cart items and sum the prices
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });

    // Add shipping fee
    totalPrice += 250;

    return totalPrice;
  };

  const handleGoBackHome = () => {
    // Redirect to home page or perform any other action
    navigate(-3);
  };

  // Render cart items if data fetching is successful
  return (
    <div>
      <Nav />
      <div className="cart-container">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item.id} className="cart-item">
              {/* Product Image */}
              

              {/* Product Details */}
              <div className="product-details1">
                <div className="product-name1">{item.product_name}</div>

                <div className="quantity-control1">
                  <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="product-price1">Rs. {item.price}</div>
                <button className="remove-btn" onClick={() => handleRemoveFromCart(item.id)}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-cart">
            <p>Cart is empty</p>
          </div>
        )}
      </div>
      {/* Order Summary */}
      {cartItems.length > 0 && (
        <div className="order-summary">
          <h3>Order Summary</h3>
          {cartItems.map(item => (
            <div key={item.id}>
              <p>{item.product_name}: Quantity - {item.quantity}, Price - Rs. {item.price * item.quantity}</p>
            </div>
          ))}
          <p>Subtotal ({cartItems.length} items): <span>Rs. {totalPrice}</span></p>
          <p>Shipping Fee: <span>Rs. 250</span></p>
          <p>Total: <span>Rs. {totalPrice + 250}</span></p>
          <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
        </div>
      )}

      {showCheckoutDialog && (
        <div className="checkout-dialog" style={{ borderRadius: '20px', height: '450px' }}>
          <div className="checkout-header">
            <h2>Checkout</h2>
            <button className="close-button" onClick={handleCheckoutCancel}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <label htmlFor="buyerName" style={{ marginRight: '-12px' }}>Name:</label>
            <input type="text" id="buyerName" value={buyerName} onChange={e => setBuyerName(e.target.value)} required style={{ padding: '8px', height: '40px', borderRadius: '12px', width: '380px' }} />

            <label htmlFor="buyerPhoneNumber" style={{ marginRight: '-12px' }}>Phone Number:</label>
            <input type="text" id="buyerPhoneNumber" value={buyerPhoneNumber} onChange={e => setBuyerPhoneNumber(e.target.value)} required style={{ padding: '8px', height: '40px', borderRadius: '12px', width: '380px' }} />

            <label htmlFor="buyerLocation" style={{ marginRight: '-12px' }}>Location:</label>
            <input type="text" id="buyerLocation" value={buyerLocation} onChange={e => setBuyerLocation(e.target.value)} required style={{ padding: '8px', height: '40px', borderRadius: '12px', width: '380px' }} />

            <button type="submit" className='Buttonhere' style={{ width: '380px', height: '40px', backgroundColor: '#06C265', borderRadius: '12px', marginTop: '40px' }}>Place Order</button>
          </form>
        </div>
      )}

      {orderPlaced && (
        <div className="order-success-popup">
          <div className="popup-content">
            <h2>Your order has been placed successfully!</h2>
            <button onClick={handleGoBackHome} className="go-home-button">Go back to home</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
