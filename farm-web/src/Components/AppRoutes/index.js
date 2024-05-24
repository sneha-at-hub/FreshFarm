import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Dashboard from '../../Pages/Dashboard';
import AdminPage1 from '../../Admins';

function AppRoutes() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
 
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPage1 />} />

  
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default AppRoutes;
