import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Password criteria
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // At least 8 characters, one lowercase, one uppercase, one number
    if (!password.match(passwordRegex)) {
      alert('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number.');
      return;
    }
  
    // Form validation
    if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
  
    try {
      // If email doesn't exist, proceed with registration
      const signupResponse = await fetch('https://freshfarm-2358894.up.railway.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber,
          password,
        }),
      });
    
      if (!signupResponse.ok) {
        const errorMessage = await signupResponse.text();
        if (signupResponse.status === 409 && errorMessage.includes('duplicate key error')) {
          alert('This email is already registered. Please use a different email address.');
        } else {
          throw new Error('An error occurred while signing up.');
        }
        return;
      }
    
      // Clear form fields after successful registration
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
      setConfirmPassword('');
    
      alert('You have successfully signed up!');
    } catch (error) {
      console.error('Error:', error);
      if (error.message === 'An error occurred while signing up.') {
        alert('An error occurred while signing up.');
      } else {
        alert('An unexpected error occurred while signing up. Please try again.');
      }
    }
  };
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
    <div>
      {/* Navigation Header */}
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

      {/* Main Signup Content */}
      <div className="form-container" style={{ marginTop: '-50px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fff', marginBottom: '200px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', borderRadius: '10px', backgroundColor: '#ffffff', overflow: 'hidden', height: '600px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', marginRight:'20px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                  <h2 style={{ color: 'black', fontSize: '20px', marginBottom: '10px', marginLeft: '10px' }}>
                    Create your <span style={{ color: '#00AC7F' }}>Fresh Farms</span> Account
                  </h2>
                </div>
                <div style={{ marginBottom: '500px', backgroundColor: 'transparent', height: '300px'}}>
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
                  <button type="submit" style={{ padding: '8px 20px', marginTop: '10px',width:'320px', backgroundColor: '#06C265', border: 'none', height: '40px', borderRadius: '10px', cursor: 'pointer', color: '#fff', transition: 'background-color 0.3s ease', boxShadow: '0 4px 6px rgba(0, 123, 255, 0.1)' }}>Sign Up</button>
                  <div>
                    <p style={{ marginTop: '10px', textAlign: 'center' }}>Already have an account? <Link to="/login" style={{ color: '#28a745', textDecoration: 'none' }}>Login</Link></p>
                    <p style={{ marginTop: '1px', textAlign: 'center' }}> <Link to="/farmer_signup" style={{ color: '#28a745', textDecoration: 'none' }}>Become a Seller</Link></p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;