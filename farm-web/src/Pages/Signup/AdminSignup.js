import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignupForm2 = () => {
  const { adminId } = useParams(); // Extract adminId from URL path
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Password complexity check
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.]).{8,}$/;
    if (!passwordPattern.test(password)) {
      setErrorMessage('Password must be at least 8 characters long and contain an uppercase letter, lowercase letter, number, and special character');
      return;
    }

    try {
      // Server request for form submission
      const response = await fetch(`https://freshfarm-2358894.up.railway.app/adminsignup/${adminId}`, { // Pass adminId in the URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('An error occurred while signing up');
      }

      // Reset form fields on successful submission
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrorMessage('');
      alert('Signup successful!');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while signing up. Please try again.');
    }
  };

  return (
    <div className="form-container" style={{ marginTop: '-50px', marginRight: '150px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fff', marginBottom: '200px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', borderRadius: '10px', backgroundColor: '#ffffff', overflow: 'hidden', height: '450px', width: '450px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <h2 style={{ color: 'black', fontSize: '20px', marginBottom: '0px', marginLeft: '2px' }}>
                  Create a new  <span style={{ color: '#00AC7F' }}>Admin</span>
                </h2>
              </div>
              <div style={{ marginBottom: '500px', backgroundColor: 'transparent', height: '200px', marginRight:'20px' }}>
                {/* Form Fields */}

                <label style={{ marginTop: '0px', color: '#333'}}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: '12px', borderRadius: '8px', height: '7px', border: '1px solid #ccc', transition: 'border-color 0.3s ease', marginBottom: '5px' }}
                  />
                </label>


                <label style={{ marginTop: '0px', color: '#333'}}>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '12px', borderRadius: '8px', height: '7px', border: '1px solid #ccc', transition: 'border-color 0.3s ease', marginBottom: '5px'}}
                  />
                </label>
                <label style={{ marginTop: '0px', color: '#333'}}>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ padding: '12px', borderRadius: '8px', height: '7px', border: '1px solid #ccc', transition: 'border-color 0.3s ease', marginBottom: '5px' }}
                  />
                </label>
                {/* Display error message */}
                {errorMessage && (
                  <div style={{ color: 'red', marginBottom: '10px' }}>
                    {errorMessage}
                  </div>
                )}
                {/* Submit Button */}
                <button
                  type="submit"
                  style={{ padding: '10px 20px', width: '325px', marginTop: '10px', backgroundColor: '#06C265', border: 'none', height: '40px', borderRadius: '10px', cursor: 'pointer', color: '#fff', transition: 'background-color 0.3s ease', boxShadow: '0 4px 6px rgba(0, 123, 255, 0.1)' }}
                >
                  Sign Up
                </button>
              
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm2;
