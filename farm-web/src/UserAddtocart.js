// import React, { useState } from 'react';
// import './UserAddtocart.css';

// const UserAddtocart = () => {
//   const [currentPage, setCurrentPage] = useState('products');
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);

//   const addToCart = (productName, price) => {
//     const existingItemIndex = cartItems.findIndex(item => item.product === productName);
//     if (existingItemIndex !== -1) {
//       const updatedCartItems = [...cartItems];
//       updatedCartItems[existingItemIndex].quantity += 1;
//       setCartItems(updatedCartItems);
//       setTotalPrice(totalPrice + price);
//     } else {
//       const newItem = {
//         product: productName,
//         quantity: 1,
//         price: price,
//         image: 'product_image_url', // Add the image URL here
//       };
//       setCartItems([...cartItems, newItem]);
//       setTotalPrice(totalPrice + price);
//     }
//     setCurrentPage('success');
//   };

//   const removeFromCart = (index, price, quantity) => {
//     const newCartItems = [...cartItems];
//     newCartItems.splice(index, 1);
//     setCartItems(newCartItems);
//     setTotalPrice(totalPrice - price * quantity);
//   };

//   const handleQuantityChange = (index, newQuantity, price) => {
//     const newCartItems = [...cartItems];
//     if (newQuantity > 0) {
//       const oldQuantity = newCartItems[index].quantity;
//       newCartItems[index].quantity = newQuantity;
//       setCartItems(newCartItems);
//       setTotalPrice(totalPrice + (newQuantity - oldQuantity) * price);
//     }
//   };

//   const navigateTo = (page) => {
//     setCurrentPage(page);
//   };

//   const renderProductsPage = () => {
//     return (
//       <div>
//         <h2>Products</h2>
//         <div className="product-list">
//           <div className="product-item">
//             <span className="product-name">Product 1: Cucumber</span>
//             <span className="product-price">Rs10</span>
//             <button onClick={() => addToCart('Cucumber', 10)}>Add</button>
//           </div>
//           <div className="product-item">
//             <span className="product-name">Product 2: Apple</span>
//             <span className="product-price">Rs20</span>
//             <button onClick={() => addToCart('Apple', 20)}>Add</button>
//           </div>
//           <div className="product-item">
//             <span className="product-name">Product 3: Orange</span>
//             <span className="product-price">Rs15</span>
//             <button onClick={() => addToCart('Orange', 15)}>Add</button>
//           </div>
//           {/* Add more products here */}
//         </div>
//       </div>
//     );
//   };

//   const renderCartPage = () => {
//     return (
//       <div className="user-add-to-cart">
//         <div className="cart-container">
//           <div className="cart-items">
//             <h2>Cart</h2>
//             {cartItems.map((item, index) => (
//               <div key={index} className="cart-item">
//                 <div className="product-image-container">
//                   <img src={item.image} alt={item.product} className="product-image" /> {/* Add image here */}
//                 </div>
//                 <span className="product-info">
//                   {item.product}
//                   <span className="price">Rs{item.price}</span>
//                 </span>
//                 <div className="quantity-controls">
//                   <button onClick={() => handleQuantityChange(index, item.quantity - 1, item.price)}>-</button>
//                   <input
//                     type="number"
//                     className="quantity-input"
//                     value={item.quantity}
//                     onChange={(e) => handleQuantityChange(index, parseInt(e.target.value), item.price)}
//                   />
//                   <button onClick={() => handleQuantityChange(index, item.quantity + 1, item.price)}>+</button>
//                 </div>
//                 <button className="remove-button" onClick={() => removeFromCart(index, item.price, item.quantity)}>Remove</button>
//               </div>
//             ))}
//           </div>
//           <div className="order-summary">
//             <h3>Order Summary</h3>
//             <p>Subtotal ({cartItems.length} items)   <span>Rs. {totalPrice}</span></p>
//             <p>Shipping Fee   <span>Rs. 250</span></p>
//             <p>Total   <span>Rs. {totalPrice + 250}</span></p>
//             <button onClick={() => navigateTo('checkout')}>PROCEED TO CHECKOUT</button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderSuccessMessage = () => {
//     return (
//       <div className="success-popup">
//         <div className="popup-content">
//           <h2>Success!</h2>
//           <p>Item added to cart successfully!</p>
//           <div className="popup-buttons">
//             <button onClick={() => navigateTo('products')}>Back to Products</button>
//             <button onClick={() => navigateTo('cart')}>Go to Cart</button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderCheckoutPage = () => {
//     return (
     
//     );
//   };

//   let content;
//   switch (currentPage) {
//     case 'products':
//       content = renderProductsPage();
//       break;
//     case 'cart':
//       content = renderCartPage();
//       break;
//     case 'success':
//       content = renderSuccessMessage();
//       break;
//     case 'checkout':
//       content = renderCheckoutPage();
//       break;
//     default:
//       content = renderProductsPage();
//   }

//   return (
//     <div className={`user-add-to-cart ${currentPage === 'checkout' ? 'checkout' : ''}`}>
//       {content}
//     </div>
//   );
// };

// export default UserAddtocart;