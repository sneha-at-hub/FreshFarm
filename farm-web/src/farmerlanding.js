import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppHeader from './Components/AppHeader';
import { faBoxes, faShoppingCart, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import FarmerSidebar from './Components/Sidebar/FarmerSidebar';

const FarmerLanding = () => {
  const [data, setData] = useState({
    inventory: { value: 800, increase: null, lastMonth: null },
    products: { value: 0, increase: null, lastMonth: null },
    orders: { value: 338, increase: 30, lastMonth: null, pending: null, shipping: null, totalPriceDelivered: 0 }, // Initialize to 0
    sales: { value: 'Rs 40,000.00', increase: 40.63 },
  });

  useEffect(() => {
    axios.get('https://freshfarm-2358894.up.railway.app/api/totaldata')
      .then(response => {
        console.log('Fetched total data:', response.data);
        setData({
          ...data,
          products: { ...data.products, value: response.data.totalProducts },
          inventory: { ...data.inventory, value: response.data.totalInventory },
          orders: {
            ...data.orders,
            pending: response.data.pendingOrders,
            shipping: response.data.shippingOrders,
            totalPriceDelivered: response.data.totalPriceDelivered
          }
        });
      })
      .catch(error => console.error('Error fetching total data:', error));
  }, []);

  const DashboardBox = ({ title, value, increase, lastMonth, icon }) => (
    <div style={{
      borderRadius: '15px',
      padding: '20px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease-in-out',
      cursor: 'pointer',
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid #e9ecef'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(to bottom, #77dd77, #3ac162)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '15px' }}>
            <FontAwesomeIcon icon={icon} style={{ fontSize: '20px', color: '#ffffff' }} />
          </div>
          <h3 style={{ marginTop: 0, marginBottom: '0', color: '#343a40', fontSize: '12px' }}>{title}</h3>
        </div>
        <div style={{ fontSize: '20px', color: '#4CAF50', fontWeight: 'bold' }}>{value}</div>
      </div>
      <p style={{ marginBottom: '10px', color: '#6c757d', fontSize: '9px', lineHeight: '1.5' }}>
        {increase !== null && `+${increase}% from last month`}
        {lastMonth && <span>, Last month: {lastMonth}</span>}
      </p>
      <div style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '4px', background: 'linear-gradient(to right, #77dd77, #3ac162)', borderRadius: '0 0 15px 15px' }}></div>
    </div>
  );

  return (
    <div>
      <AppHeader />
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ flex: '0 0 20%', marginRight: '20px' }}>
          <FarmerSidebar />
        </div>
        <div style={{ flex: '1' }}>
          <h2 style={{ color: '#4CAF50' }}>Dashboard</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', width: '90%', margin: '0 30px 0 0 ', marginTop: '20px', justifyContent: 'center', backgroundColor: '#fff', borderRadius: '20px', padding: '20px' }}>
            <DashboardBox
              title="Total Products"
              value={data.products.value}
              increase={data.products.increase}
              lastMonth={data.products.lastMonth}
              icon={faShoppingCart}
            />
            <DashboardBox
              title="Total Inventory"
              value={data.inventory.value}
              increase={data.inventory.increase}
              lastMonth={data.inventory.lastMonth}
              icon={faBoxes}
            />
            <DashboardBox
              title="Total Orders"
              value={data.orders.pending}
              icon={faShoppingCart}
            />

            <DashboardBox
              title="Total Sales"
              value={data.orders.totalPriceDelivered} // Display total price of delivered orders
              icon={faDollarSign}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerLanding;
