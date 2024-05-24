import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HomeSlider from '../Pages/slider'; // Import the slider component

import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductListPage = ({ category }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Number of products per page
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to manage search term

  useEffect(() => {
    // Fetch products from the backend API when the component mounts or when category changes
    const fetchData = async () => {
      try {
        const response = await axios.get('https://freshfarm-2358894.up.railway.app/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, [category]); // Fetch data whenever category changes

  // Filter products by category if category is provided
  const filteredProducts = category ? products.filter(product => product.category === category) : products;

  // Filter products based on search term
  const searchedProducts = filteredProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle search input change
  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when search term changes
  };

  return (
    <>
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
        <img src={require('../uss.png')} alt="logo" style={{ height: '100px' }} />
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


   

  {/* Conditionally render the slider only when there's no search term */}
  {!searchTerm && currentPage === 1 && <HomeSlider />}

  {/* Product Listing */}
  <h1 style={{ margin: '20px 35px', fontSize: '32px', color: '#333' }}>Explore Fresh Product</h1>
  
  {/* Check if there are no searched products */}
  {searchedProducts.length === 0 && <p style={{ margin: '20px 35px', fontSize: '18px' }}>No products found.</p>}
  
  {/* Render the products if there are any */}
  {searchedProducts.length > 0 && (
    <div style={{ display: 'flex', marginTop: '20px', flexWrap: 'wrap', padding: '10px 0 10px 20px' }}>
      {/* Render the current page of products */}
      {currentProducts.map(product => (
        <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ margin: '20px', padding: '20px', height: 'auto', width: '200px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', cursor: 'pointer', transition: 'transform 0.3s', backgroundColor: '#f2f2f2', hover: { transform: 'scale(1.05)' } }}>
            <img src={`https://freshfarm-2358894.up.railway.app/${product.image}`} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 8px 8px' }} />
            <div style={{ backgroundColor: '#f2f2f2', padding: '10px', borderRadius: '0 0 8px 8px' }}>
              <h3 style={{ fontSize: '14px', marginBottom: '10px', color: '#333', fontWeight: 'bold' }}>{product.name}</h3>
              <p style={{ fontSize: '18px', marginBottom: '10px', color: '#00AC7F' }}>Rs {product.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )}

  {/* Pagination */}
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', padding: '0 0 60px 0' }}>
    {Array.from({ length: Math.ceil(searchedProducts.length / productsPerPage) }, (_, i) => (
      <button key={i} onClick={() => paginate(i + 1)} style={{ margin: '5px', padding: '8px 16px', border: '1px solid #00AC7F', background: currentPage === i + 1 ? '#00AC7F' : 'transparent', color: currentPage === i + 1 ? 'white' : '#00AC7F', cursor: 'pointer', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', outline: 'none', transition: 'background 0.3s, color 0.3s' }}>
        {i + 1}
      </button>
    ))}
  </div>
</>


  );
};

export default ProductListPage;

