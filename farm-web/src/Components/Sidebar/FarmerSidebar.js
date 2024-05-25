import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faBox, faClipboardList, faUserCircle, faSignOutAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Added faEnvelope
import './Sidebar.css';
import logo from '../../uss.png';
import { jwtDecode } from 'jwt-decode';

const FarmerSidebar = () => {
  const [token, setToken] = useState('');
  const [farmerId, setFarmerId] = useState('');
  const location = useLocation();
  const { farmerId: paramFarmerId } = useParams(); // Accessing the farmerId from the URL params

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwtDecode(storedToken);
      if (decodedToken && decodedToken.isFarmer) {
        setFarmerId(decodedToken.farmerId);
      }
    }
  }, []);

  useEffect(() => {
    if (paramFarmerId) {
      setFarmerId(paramFarmerId); // Set farmerId from route params
    }
  }, [paramFarmerId]);

  const [title, setTitle] = useState('Farmer Dashboard');

  const handleItemClick = (newTitle) => {
    setTitle(newTitle);
  };

  const handleLogout = () => {
    // Perform logout actions here (e.g., clear local storage, reset session, etc.)
    // After logout, redirect the user to the login page
    localStorage.removeItem('token'); // Clear token from local storage
    setToken(''); // Clear token from state
    window.location.href = '/'; // Redirect to the login page

  };

  return (
    <div className="sidebar">
      <img src={logo} alt="logo" style={{ height: '100px', marginLeft: '20px', borderRadius: '8px' }} />
      <ul>
        <li className={location.pathname === '/farmerlanding' ? 'active' : ''} onClick={() => handleItemClick('Dashboard')}>
          <Link to={`/farmerlanding/${farmerId}`}>
            <FontAwesomeIcon icon={faChartBar} />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={location.pathname === '/products' ? 'active' : ''} onClick={() => handleItemClick('Products')}>
          <Link to={`/farmer_products/${farmerId}`}>
            <FontAwesomeIcon icon={faBox} />
            <span style={{paddingLeft: '13px'}}>Products</span>
          </Link>
        </li>
        <li className={location.pathname === '/orders' ? 'active' : ''} onClick={() => handleItemClick('Orders')}>
  <Link to={`/FarmerOrder/${farmerId}`}>
    <FontAwesomeIcon icon={faClipboardList} />
    <span style={{ paddingLeft: '13px' }}>Orders</span>
  </Link>
</li>

        <li className={location.pathname === '/inventory' ? 'active' : ''} onClick={() => handleItemClick('Inventory')}>
          <Link to={`/farmer_inventory/${farmerId}`}>
            <FontAwesomeIcon icon={faUserCircle} />
            <span>Inventory</span>
          </Link>
        </li>
        <li className={location.pathname === '/inquiries' ? 'active' : ''} onClick={() => handleItemClick('Inquiries')}>
          <Link to={`/inquiries/${farmerId}`}>
            <FontAwesomeIcon icon={faEnvelope} /> {/* Changed icon to faEnvelope */}
            <span>Inquiries</span>
          </Link>
        </li>
        <li onClick={handleLogout} className="logout-button">
          <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
          <span style={{paddingLeft: '5px'}}>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default FarmerSidebar;
