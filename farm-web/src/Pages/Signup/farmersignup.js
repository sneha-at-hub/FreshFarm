import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const NavigationBar = () => {
  const spanStyle = {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '50%',
    height: '3px',
    backgroundColor: '#00AC7F',
    transition: 'width 0.2s ease'
  };

  const handleTextMouseEnter = (e) => {
    e.target.style.color = '#00AC7F';
    e.target.parentNode.querySelector('.underline').style.width = '100%';
  };

  const handleTextMouseLeave = (e) => {
    e.target.style.color = 'black';
    e.target.parentNode.querySelector('.underline').style.width = '50%';
  };

  return (
    <nav style={{ backgroundColor: '#fff', height: '50px', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderBottom: '5px solid transparent', }}>
      <img src={require('../../uss.png')} alt="logo" style={{ height: '100px' }} />
      <div>
        <Link
          to="/farmer_signup"
          style={{
            color: 'black',
            marginRight: '20px',
            textDecoration: 'none',
            transition: 'backgroundColor 0.2s ease',
            padding: '8px 15px',
            borderRadius: '5px',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={handleTextMouseEnter}
          onMouseLeave={handleTextMouseLeave}
        >
          <span
            style={{ position: 'relative', zIndex: 1 }}
          >
            Become a seller
          </span>
          <span
            className="underline"
            style={{ ...spanStyle }}
          />
        </Link>
        <Link
          to="/login"
          style={{ color: 'black', marginRight: '20px', textDecoration: 'none', transition: 'backgroundColor 0.2s ease', padding: '8px 15px', borderRadius: '5px', border: '1px solid transparent'}}
          onMouseEnter={(e) => { e.target.style.color = 'white'; e.target.style.backgroundColor = '#00AC7F'; }}
          onMouseLeave={(e) => { e.target.style.color = 'black'; e.target.style.backgroundColor = 'white'; }}
        >
          Login
        </Link>
        <Link
          to="/signup"
          style={{ color: 'black', textDecoration: 'none', transition: 'backgroundColor 0.2s ease', padding: '8px 15px', borderRadius: '5px', border: '1px solid transparent'}}
          onMouseEnter={(e) => { e.target.style.color = 'white'; e.target.style.backgroundColor = '#00AC7F'; }}
          onMouseLeave={(e) => { e.target.style.color = 'black'; e.target.style.backgroundColor = 'white'; }}
        >
          Signup
        </Link>
      </div>
    </nav>
  );
}

const SignupForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [farmName, setFarmName] = useState('');
  const [farmerAddress, setFarmerAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const formData = {
      fullName,
      email,
      phoneNumber,
      farmName,
      farmerAddress,
      password
    };

    try {
      const response = await fetch('https://freshfarm-2358894.up.railway.app/farmer_signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        // Reset form fields only after successful signup
        clearForm();
        alert('Signup successful');
      } else {
        // Handle non-successful responses
        const errorData = await response.json();
        alert('Signup failed: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };
  
  const clearForm = () => {
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setFarmName('');
    setFarmerAddress('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <NavigationBar />
      <div className="form-container" style={{ marginTop: '-50px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fff', marginBottom: '200px'}}>
          <div style={{ display: 'flex', flexDirection: 'column', borderRadius: '10px', backgroundColor: '#ffffff', overflow: 'hidden', height: '630px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column'}}>
                <div>
                  <h2 style={{ color: 'black', fontSize: '20px', marginBottom: '0px', marginLeft: '10px' }}>
                    Create your <span style={{ color: '#00AC7F' }}>Fresh Farms</span> Account
                  </h2>
                </div>
                <div style={{ marginBottom: '500px', backgroundColor: 'transparent', height: '200px', marginRight:'22px'}}>
                  <label style={{ marginTop: '0px', color: '#333' }}>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{ padding: '12px', borderRadius: '8px', height: '7px', border: '1px solid #ccc', transition: 'border-color 0.3s ease', marginBottom: '5px' }}
                    />
                  </label>
                  <label style={{ marginTop: '0px', color: '#333' }}>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ padding: '12px', borderRadius: '8px', height: '7px', border: '1px solid #ccc', transition: 'border-color 0.3s ease', marginBottom: '5px' }}
                    />
                  </label>
                  <label style={{ marginTop: '0px', color: '#333' }}>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      style={{ padding: '12px', borderRadius: '8px', height: '7px', border: '1px solid #ccc', transition: 'border-color 0.3s ease', marginBottom: '5px' }}
                    />
                  </label>
                  <label style={{ marginTop: '0px', color: '#333' }}>
                    <input
                      type="text"
                      placeholder="Farm Name"
                      value={farmName}
                      onChange={(e) => setFarmName(e.target.value)}
                      style={{ padding: '12px', borderRadius: '8px', height: '7px', border: '1px solid #ccc', transition: 'border-color 0.3s ease', marginBottom: '5px' }}
                    />
                  </label>
                  <label style={{ marginTop: '0px', color: '#333' }}>
                    <input
                      type="text"
                      placeholder="Farmer Address"
                      value={farmerAddress}
                      onChange={(e) => setFarmerAddress(e.target.value)}
                      style={{ padding: '12px', borderRadius: '8px', height: '7px', border: '1px solid #ccc', transition: 'border-color 0.3s ease', marginBottom: '5px' }}
                    />
                  </label>
                  <label style={{ marginTop: '0px', color: '#333' }}>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ padding: '12px', borderRadius: '8px', height: '7px', border: '1px solid #ccc', transition: 'border-color 0.3s ease', marginBottom: '5px' }}
                    />
                  </label>
                  <label style={{ marginTop: '0px', color: '#333' }}>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={{ padding: '12px', borderRadius: '8px', height: '7px', border: '1px solid #ccc', transition: 'border-color 0.3s ease', marginBottom: '5px' }}
                    />
                  </label>
                  <button type="submit" style={{ padding: '8px 18px', marginTop: '10px',  backgroundColor: '#06C265', border: 'none', height: '40px', borderRadius: '10px', cursor: 'pointer', color: '#fff', transition: 'background-color 0.3s ease', boxShadow: '0 4px 6px rgba(0, 123, 255, 0.1)' , width:'320px'}}>Sign Up</button>
                        {/* Move the "Already have an account?" link inside the form container */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <p style={{ marginTop: '10px', textAlign: 'center' }}>Already have an account? <Link to="/login" style={{ color: '#28a745', textDecoration: 'none' }}>Login</Link></p>
      </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default SignupForm;