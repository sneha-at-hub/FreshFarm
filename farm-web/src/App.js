import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import FarmerSidebar from './Components/Sidebar/FarmerSidebar';
import AdminProduct from './Pages/AdminProduct/AdminProduct';
import Login from './Login';
import RegistrationForm from './Pages/Signup/Signup';
import RegistrationForm1 from './Pages/Signup/farmersignup';
import AdminPage from './Pages/AdminManagement/AdminPage';
import Dashboard from './Pages/Dashboard/index';
import Sidebar from './Components/Sidebar/sidebar';
import { TokenProvider } from './TokenContext';
import FarmerProductPage from './Pages/FarmerProductPage/FarmerProductPage';
import AdminOrder from './Pages/AdminOrder/AdminOrder';
//import { products } from './User/products';
import { jwtDecode } from 'jwt-decode';
import FarmerManagement from './Pages/FarmerManagement/FarmerManagement';
import HomeSlider from './Pages/slider';
import FarmerInventory from './Pages/FarmerInventory/FarmerInventory';
import ProductDetailPage from './User/ProductDetailPage';
import AdminManagementInterface from './Pages/AdminManagement/AdminManagementInterface';
import UserManagement from './Pages/UserManagement/UserManagement';
import UserLanding from './User/userlanding';
import FarmerLanding from './farmerlanding';
import SignupForm2 from './Pages/Signup/AdminSignup';
import FarmerOrder from './Pages/FarmerOrder/FarmerOrder';
import UserAddtocart from './User/UserAddtocart';
import CartModal from './User/CartModal';
import UserInquiry from './User/UserInquiry';
import FarmerInquiry from './Pages/FarmerInquiry/FarmerInquiry';


export const MyContext = createContext();

// Define PrivateRoute component
function PrivateRoute({ element, authenticated, ...rest }) {
  return authenticated ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
}


function App() {

  const [adminEmail, setAdminEmail] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [farmerEmail, setFarmerEmail] = useState('');
  const [farmerId, setFarmerId] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken) {
        // Check for admin role
        if (decodedToken.isAdmin) {
          setAdminEmail(decodedToken.email);
          setAuthenticated(true);
        }
        // Check for user role
        if (decodedToken.isUser) {
          setUserEmail(decodedToken.email);
          setUserId(decodedToken.userId);
          setAuthenticated(true);
        }
        // Check for farmer role
        if (decodedToken.isFarmer) {
          setFarmerEmail(decodedToken.email);
          setFarmerId(decodedToken.farmerId);
          setAuthenticated(true);
        }
        // Add conditions for other roles as needed
      }
    }
  }, []);



  return (
    <div className="App">
      <TokenProvider>
        <BrowserRouter>
          <MyContext.Provider value={{}}>
            <Routes>
              <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
              <Route path="/signup" element={<RegistrationForm />} />
              <Route path="/userlanding" element={<UserLanding />} />
              <Route path="/product/:productId" element={<ProductDetailPage/>} />
              <Route path="/inquiries/:farmerId" element={<FarmerInquiry />} />
              <Route path="/farmer_signup" element={<RegistrationForm1 />} />
              <Route path="/addCart" element={<UserAddtocart/>} />
              <Route path="/slider" element={<HomeSlider />} />
              <PrivateRoute path="/farmermanagement/:farmerId" element={<FarmerManagement />} authenticated={authenticated} />
              <PrivateRoute path="/farmerorder/:farmerId" element={<FarmerOrder />} authenticated={authenticated} />
              <PrivateRoute path="/farmer_products/:farmerId" element={<FarmerProductPage />} authenticated={authenticated} />
              <PrivateRoute path="/farmer_inventory/:farmerId" element={<FarmerInventory />} authenticated={authenticated} />
              <PrivateRoute path="/admin_management/:adminId" element={<AdminManagementInterface />} authenticated={authenticated} />
              <PrivateRoute path="/AdminProduct/:adminId" element={<AdminProduct />} authenticated={authenticated} />
              <PrivateRoute path="/adminorder/:adminId" element={<AdminOrder />} authenticated={authenticated} />
              <PrivateRoute path="/create/:adminId" element={<CreatePage />} authenticated={authenticated} />
              <PrivateRoute path="/usermanagement/:adminId" element={<UserManagement />} authenticated={authenticated} />
              <PrivateRoute path="/dashboard/:id" element={<DashboardWithSidebar />} authenticated={authenticated} />
              <PrivateRoute path="/farmerlanding/:farmerId" element={<FarmerDashboardWithSidebar />} authenticated={authenticated} />
              <Route path="/cart" element={<CartModal/>} />
              <Route path="/inquiry" element={<UserInquiry/>} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </MyContext.Provider>
        </BrowserRouter>
      </TokenProvider>
    </div>
  );


  
  function CreatePage() {
    return (
      <div>
        <Sidebar adminEmail={adminEmail} />
        <AdminPage />
      </div>
    );
  }
  function DashboardWithSidebar() {
    return (
      <div>
        <Sidebar adminEmail={adminEmail} />
        <Dashboard />
      </div>
    );
  }

  function FarmerDashboardWithSidebar() {
    return (
      <div>
        <FarmerSidebar farmerId={farmerId} />
        <FarmerLanding />
      </div>
    );
  }
}

export default App;
