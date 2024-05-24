import React, { useState, useEffect } from 'react';
import './FarmerOrder.css';
import FarmerSidebar from '../../Components/Sidebar/FarmerSidebar'; // Import Sidebar component

const FarmerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [dropdownStatus, setDropdownStatus] = useState({}); // State to manage dropdown status

  useEffect(() => {
    fetchOrders(); // Fetch orders when the component mounts
  }, []); // Empty dependency array to run once on mount

  const fetchOrders = () => {
    // Make an API call to fetch orders
    fetch('https://freshfarm-2358894.up.railway.app/api11/farmer/orders') // Replace the URL with your actual backend endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return response.json();
      })
      .then(data => {
        // Transform the fetched data to match the table structure
        const transformedData = data.map(order => ({
          orderId: order.items[0].orderId,
          productName: order.items[0].productName, // Assuming the first item represents the product details
          productId: order.items[0].productId,
          productQuantity: order.items[0].quantity,
          productCategory: order.items[0].category,
          productPrice: order.items[0].price,
          totalPrice: order.totalPrice,
          orderPlacedDate: order.orderDate,
          orderedBy: order.buyerName,
          contactInfo: order.buyerPhoneNumber,
          status: order.status,
        }));

        setOrders(transformedData); // Update the orders state with transformed data
        // Set initial dropdown status for each order
        const initialDropdownStatus = {};
        transformedData.forEach(order => {
          initialDropdownStatus[order.orderId] = order.status;
        });
        setDropdownStatus(initialDropdownStatus);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        // Handle error (e.g., display error message to the user)
      });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    // Update the order status directly in the frontend
    const updatedOrders = orders.map(order => {
      if (order.orderId === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
    // Update dropdown status
    setDropdownStatus(prevStatus => ({
      ...prevStatus,
      [orderId]: newStatus,
    }));

    // Send a POST request to update the order status in the backend
    fetch(`https://freshfarm-2358894.up.railway.app/api11/farmer/orders/${orderId}/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      // Handle successful response if needed
    })
    .catch(error => {
      console.error('Error updating order status:', error);
      // Handle error (e.g., display error message to the user)
    });
  };

  const handleSearchInputChange = e => {
    setSearchInput(e.target.value);
  };

  const filteredOrders = orders.filter(order =>
    order.productName &&
    order.productName.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <FarmerSidebar /> {/* Include Sidebar component */}
      <h1 style={{ marginBottom: '30px', fontWeight: '400', fontSize: '24px', marginLeft: '290px' }}>Orders</h1>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchInputChange}
        placeholder="Search by product name"
        style={{ height: '8px', marginLeft: '290px', padding: '14px', fontSize: '13px', borderRadius: '4px', border: '1px solid #ddd', width: '400px', maxWidth: '400px' }}
      />
      <div className="farmer-order-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Price</th>
              <th>Total Price</th>
              <th>Date</th>
              <th>Ordered By</th>
              <th>Phone Number</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.orderId}> {/* Use 'orderId' as key */}
                <td>{order.orderId}</td> {/* Use 'orderId' to display */}
                <td>{order.productName}</td>
                <td>{order.productId}</td>
                <td>{order.productQuantity}</td>
                <td>{order.productCategory}</td>
                <td>{order.productPrice}</td>
                <td>{order.totalPrice}</td>
                <td>{order.orderPlacedDate}</td>
                <td>{order.orderedBy}</td>
                <td>{order.contactInfo}</td>
                <td style={{ textAlign: 'center', position: 'relative' }}>
                  <select
                    value={dropdownStatus[order.orderId] || ''} // Use dropdownStatus to set value
                    onChange={e => {
                      updateOrderStatus(order.orderId, e.target.value); // Use 'orderId' here
                    }}
                    style={{ margin: '0 auto', border: 'none', display: 'flex', alignItems: 'center', position: 'absolute', right: '0' }} // Align dropdown to the right
                  >
                    <option value="">-------</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Cancel">Cancelled</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FarmerOrder;
