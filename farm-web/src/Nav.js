import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Nav = ({ handleSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    handleSearchChange(value); // Pass the updated search term to the parent component
  };

  return (
    <>
      {/* First Navigation */}
      <nav
        style={{
          backgroundColor: '#fff',
          height: '50px',
          padding: '15px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '5px solid transparent',
        }}
      >
        <img src={require('./uss.png')} alt="logo" style={{ height: '100px' }} />
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              marginLeft: '300px',
              border: '0.7px solid rgba(0, 172, 127, 0.3)',
              borderRadius: '10px',
              padding: '4px 10px 0 20px',
            }}
          >
            <div
              style={{
                borderRight: '1px solid #ccc',
                height: '20px',
                display: 'flex',
              }}
            ></div>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search for items"
                value={searchTerm}
                onChange={onSearchChange}
                style={{
                  color: 'black',
                  fontSize: '12px',
                  padding: '8px 30px 8px 20px',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  width: '300px',
                }}
              />
              <FontAwesomeIcon
                icon={faSearch}
                style={{
                  position: 'absolute',
                  top: '45%',
                  transform: 'translateY(-50%)',
                  right: '15px',
                  color: '#888',
                }}
              />
            </div>
          </div>
          <div>
            <Link
              to="/farmer_signup"
              style={{
                color: 'black',
                fontSize: '14px',
                marginLeft: '120px',
                textDecoration: 'none',
                padding: '8px 15px',
                borderRadius: '5px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span>Become a seller</span>
              <span
                className="underline"
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  width: '50%',
                  height: '3px',
                  backgroundColor: '#00AC7F',
                  transition: 'width 0.2s ease',
                }}
              />
            </Link>
            <Link
              to="/login"
              style={{
                color: 'black',
                marginLeft: '10px',
                textDecoration: 'none',
                transition: 'backgroundColor 0.2s ease',
                padding: '8px 14px',
                borderRadius: '5px',
                border: '1px solid transparent',
                fontSize: '14px',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'white';
                e.target.style.backgroundColor = '#00AC7F';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'black';
                e.target.style.backgroundColor = 'white';
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{
                color: 'black',
                marginRight: '20px',
                textDecoration: 'none',
                transition: 'backgroundColor 0.2s ease',
                padding: '8px 15px',
                borderRadius: '5px',
                border: '1px solid transparent',
                fontSize: '14px',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'white';
                e.target.style.backgroundColor = '#00AC7F';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'black';
                e.target.style.backgroundColor = 'white';
              }}
            >
              Signup
            </Link>
          </div>
        </div>
      </nav>

      {/* Second Navigation */}
      <nav
        style={{
          height: '40px',
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: '0.5px solid #ccc',
          borderTop: '0.5px solid #ccc',
          fontSize: '14px',
        }}
      >
        <div style={{ display: 'flex', marginLeft: '450px' }}>

        </div>
        <div style={{ marginLeft: '320px' }}>
          {/* Cart Icon */}
          <Link
            to="/addCart"
            style={{
              color: 'black',
              marginLeft: '20px',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
            }}
          >
            <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '5px', fontSize: '14px' }} />
            Cart
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Nav;
