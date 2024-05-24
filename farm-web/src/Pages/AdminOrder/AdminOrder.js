import React, { useState, useEffect } from 'react';
import './AdminOrder.css';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar/sidebar.js'; // Import Sidebar component

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://freshfarm-2358894.up.railway.app/api11/farmer/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredOrders = orders.filter(order =>
    order.items[0].productName.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <h1 style={{marginBottom:'30px', fontWeight:'400', fontSize:'24px', marginLeft:'280px'}}>Orders</h1>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchInputChange}
        placeholder="Search by product name"
        style={{ height:'16px', marginLeft:'280px', marginBottom:'9px', padding: '8px', fontSize: '13px', borderRadius: '4px', border: '1px solid #ddd', width: '400px', maxWidth: '400px' }}
      />

      <Sidebar adminName="Your Admin Name" />
      <div className="admin-order-container">
        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items Purchased</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Customer Name</th>
              <th>Customer Phone</th>
              <th>Customer Location</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.items[0].orderId}</td>
                <td>{order.items[0].productName}</td>
                <td>{order.items[0].quantity}</td>
                <td>{order.totalPrice}</td>
                <td>{order.buyerName}</td>
                <td>{order.buyerPhoneNumber}</td>
                <td>{order.buyerLocation}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrder;
