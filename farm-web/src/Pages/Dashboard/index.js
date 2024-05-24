import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import AppHeader from '../../Components/AppHeader';
import { useParams } from 'react-router-dom';
import { faUsers, faTractor, faBoxes, faShoppingCart, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const DashboardBox = ({ title, value, increase, lastMonth, icon }) => {
  return (
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
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(to bottom, #4CAF50, #4CAF50)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '15px' }}>
            <FontAwesomeIcon icon={icon} style={{ fontSize: '20px', color: '#ffffff' }} />
          </div>
          <h3 style={{ marginTop: 0, marginBottom: '0', color: '#343a40', fontSize: '14px' }}>{title}</h3>
        </div>
        <div style={{ fontSize: '20px', color: '#4CAF50', fontWeight: 'bold' }}>{value}</div>
      </div>
      <p style={{ marginBottom: '10px', color: '#6c757d', fontSize: '9px', lineHeight: '1.5' }}>
        {increase !== null && `+${increase}% from last month`}
        {lastMonth && <span>, Last month: {lastMonth}</span>}
      </p>
      <div style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '4px', background: 'linear-gradient(to right, #4CAF50, #4CAF50)', borderRadius: '0 0 15px 15px' }}></div>
    </div>
  );
};

const DashboardTable = () => {
  const tableData = [
    { product: 'Product A', category: 'Category 1', farmer: 'Farmer X', price: '$100', order: 50, sales: '$5,000' },
    { product: 'Product B', category: 'Category 2', farmer: 'Farmer Y', price: '$150', order: 30, sales: '$4,500' },
    { product: 'Product C', category: 'Category 3', farmer: 'Farmer Z', price: '$200', order: 20, sales: '$4,000' },
  ];

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', borderRadius: '10px', overflow: 'hidden' }}>
      <thead>
        <tr style={{ backgroundColor: '#4CAF50', color: '#fff' }}>
          <th style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '10px 10px 0 0' }}>Product</th>
          <th style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '10px 10px 0 0' }}>Category</th>
          <th style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '10px 10px 0 0' }}>Farmer</th>
          <th style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '10px 10px 0 0' }}>Price</th>
          <th style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '10px 10px 0 0' }}>Order</th>
          <th style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '10px 10px 0 0' }}>Sales</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index} style={{ backgroundColor: '#f8f9fa', color: '#212529' }}>
            <td style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '0 0 0 10px' }}>{row.product}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.category}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.farmer}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.price}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.order}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '0 0 10px 0' }}>{row.sales}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Dashboard = () => {
  const { email } = useParams();
  const [data, setData] = useState({
    users: { value: 0, increase: null, lastMonth: null },
    farmers: { value: 0, increase: null, lastMonth: null },
    inventory: { value: 0, increase: null, lastMonth: null },
    products: { value: 0, increase: null, lastMonth: null },
    orders: { value: 0, increase: null, lastMonth: null },
    sales: { value: 'Rs 0.00', increase: null, lastMonth: null }
  });

  useEffect(() => {
    axios.get('https://freshfarm-2358894.up.railway.app/api/admintotaldata')
      .then(response => {
        console.log('Fetched admin total data:', response.data);
        setData({
          products: { value: response.data.totalProducts },
          inventory: { value: response.data.totalInventory },
          orders: { value: response.data.totalOrders},
          farmers: { value: response.data.totalFarmers },
          users: { value: response.data.totalUsers },
          sales: {value: response.data.totalSales}
          // Add more properties as needed
        });
      })
      .catch(error => {
        console.error('Error fetching admin total data:', error);
      });
  }, []);

   



  return (
    <div>
      <AppHeader />
      <div style={{ display: 'flex', marginTop: '20px' }}>
        {/* Sidebar component */}
        <div style={{ flex: '0 0 20%', marginRight: '20px' }}>
  
        </div>

        {/* Dashboard content */}
        <div style={{ flex: '1' }}>
          <h2 style={{ color: '#4CAF50' }}>Dashboard</h2>
          {/* Grid layout for DashboardBox components */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', width: '90%', margin: '0 30px 0 0 ', marginTop: '20px', justifyContent: 'center', backgroundColor: '#fff', borderRadius: '20px', padding: '20px' }}>
          <DashboardBox
              title="Total Products"
              value={data.products.value}
              increase={data.products.increase}
              lastMonth={data.products.lastMonth}
              icon={faShoppingCart}
            />
               <DashboardBox
              title="Total Orders"
              value={data.orders.value}
              increase={data.orders.increase}
              lastMonth={data.orders.lastMonth}
              icon={faShoppingCart}
            />
             <DashboardBox
              title="Total Farmers"
              value={data.farmers.value}
              increase={data.farmers.increase}
              lastMonth={data.farmers.lastMonth}
              icon={faTractor}
            />
            <DashboardBox
              title="Total Users"
              value={data.users.value}
              increase={data.users.increase}
              lastMonth={data.users.lastMonth}
              icon={faUsers}
            />

            <DashboardBox
              title="Total Inventory"
              value={data.inventory.value}
              increase={data.inventory.increase}
              lastMonth={data.inventory.lastMonth}
              icon={faBoxes}
            />


            <DashboardBox
              title="Total Sales"
              value={data.sales.value}
              increase={data.sales.increase}
              lastMonth={data.sales.lastMonth}
              icon={faDollarSign}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;