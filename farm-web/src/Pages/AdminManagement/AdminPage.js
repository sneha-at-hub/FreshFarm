import React from 'react';
import Sidebar from '../../Components/Sidebar/sidebar'; // Import the Sidebar component
import SignupForm2 from '../Signup/AdminSignup';
import AppHeader from '../../Components/AppHeader';

import { useLocation } from 'react-router-dom';

const AdminPage = () => {
  const location = useLocation();
  const { adminEmail } = location.state || {};

  return (
    <div>
      <AppHeader />
      <div style={{ display: 'flex', marginTop: '20px' }}>
        {/* Sidebar component with admin's email */}
        <div style={{ flex: '0 0 20%', marginRight: '20px' }}>
       
        </div>
        
        {/* Main content */}
        <div style={{ flex: '1' }}>
          {/* Display admin signup form */}
          <SignupForm2 />
          {/* You can include any adsditional content or components here */}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
