import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar/sidebar.js';
import axios from 'axios';
import './AdminProduct.css';

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [editedProduct, setEditedProduct] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [fadeContainer, setFadeContainer] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [imageError, setImageError] = useState('');
  const [productToDelete, setProductToDelete] = useState(null);
  const API_BASE_URL = 'https://freshfarm-2358894.up.railway.app'; // Define your API base URL

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (productId) => {
    const productToEdit = products.find(product => product.id === productId);
    setEditedProduct({ ...productToEdit, category: productToEdit.category || "----" });
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editedProduct.name);
      formData.append('description', editedProduct.description);
      formData.append('category', editedProduct.category);
      formData.append('price', editedProduct.price);
      formData.append('quantity', editedProduct.quantity);
      if (editedProduct.image) {
        formData.append('image', editedProduct.image);
      }

      const response = await axios.put(`${API_BASE_URL}/api/products/${editedProduct.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      // Update the specific product in the products array
      setProducts(products.map(product =>
        product.id === editedProduct.id ? editedProduct : product
      ));
  
      setEditedProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving edited product:', error);
    }
  };

  const handleDeleteConfirmation = (productId, name) => {
    setDeleteMessage(`Are you sure you want to delete this product?`);
    setFadeContainer(true);
    setProductToDelete(productId);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${productToDelete}`);
      setDeleteMessage('');
      setFadeContainer(false);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteMessage('');
    setFadeContainer(false);
  };

  const handleFieldChange = (fieldName, value) => {
    setEditedProduct({ ...editedProduct, [fieldName]: value });
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedProduct({ ...editedProduct, image: file });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const isNumeric = (value) => /^\d+$/.test(value);

  const isCapitalized = (value) => value[0] === value[0].toUpperCase();

  return (
    <div>
      <Sidebar adminName="Your Admin Name" />
      <h1 style={{ fontWeight: '400', fontSize: '24px', marginLeft: '280px', marginBottom: '20px' }}>Products</h1>
      <div style={{ opacity: fadeContainer ? 0.5 : 1 }} className="container"></div>
      <div className="container" style={{ marginBottom: '20px', marginRight: '470px', paddingTop: '0px' }}>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search by product name"
          style={{ padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', maxWidth: '400px', marginLeft: '0px' }}
        />
      </div>
      <div className="container">
        <div className="product-management">
          <table style={{ width: '1150px', borderCollapse: 'collapse', marginLeft: '260px', fontSize: '12px' }}>
            <colgroup>
              <col style={{ width: '10%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '5%' }} />
              <col style={{ width: '8%' }} />
              <col style={{ width: '8%' }} />
              <col style={{ width: '14%' }} />
            </colgroup>
            <thead>
              <tr style={{ backgroundColor: '#e2e2e2c0', color: 'rgb(57, 57, 57)' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Image</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Farmer Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product.id} style={{ backgroundColor: index % 2 === 0 ? '#fff' : 'inherit' }}>
                <td style={{ border: '1px solid #ddd', padding: '8px', borderRight: '1px solid #ddd' }}>
                  <img
                    src={`${API_BASE_URL}/${product.image}`}
                    alt={product.name}
                    className="product-image1"
                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginLeft: '20px' }}
                  />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', borderRight: '1px solid #ddd', borderLeft: '1px solid #fff' }}>{product.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', borderRight: '1px solid #ddd' }}>{product.description}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', borderRight: '1px solid #ddd' }}>{product.category}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', borderRight: '1px solid #ddd' }}>{product.price}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', borderRight: '1px solid #ddd' }}>{product.quantity}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', borderRight: '1px solid #ddd' }}>{product.farmerName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', borderRight: '1px solid #fff' }}>
                  <button
                    style={{ marginRight: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '8px 12px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '12px', borderRadius: '8px' }}
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ backgroundColor: '#e2e2e2c0', color: 'black', border: 'none', padding: '8px 12px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '                  12px', borderRadius: '9px' }}
                    onClick={() => handleDeleteConfirmation(product.id, product.name)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          {deleteMessage && (
            <div className="overlay">
              <div className="delete-dialog">
                <p>{deleteMessage}</p>
                <button style={{ marginRight: '5px', color: 'white' }} onClick={handleDelete}>Yes</button>
                <button style={{ marginRight: '5px' }} onClick={handleCancelDelete}>Cancel</button>
              </div>
            </div>
          )}
          {editedProduct && (
            <div className="edit-popup" style={{ border: '1px solid #ccc', padding: '20px 60px 40px 60px', borderRadius: '16px', marginTop: '20px' }}>
              <h2>Edit Product</h2>
              <div className="form-group55">
                <label htmlFor="farmerName">Farmer Name:</label>
                <input
                  type="text"
                  id="farmerName"
                  value={editedProduct.farmerName}
                  onChange={e => handleFieldChange('farmerName', e.target.value)}
                  style={{ width: '250px', padding: '8px', marginLeft: '0px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '10px', marginTop: '5px' }}
                />
                {!isCapitalized(editedProduct.farmerName) && <p style={{ color: 'red' }}>Name should start with a capital letter</p>}
              </div>
              <div className="form-group55">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  value={editedProduct.description}
                  onChange={e => handleFieldChange('description', e.target.value)}
                  style={{ width: '250px', padding: '8px', marginLeft: '0px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '10px', marginTop: '5px' }}
                />
              </div>
              <div className="form-group55">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  value={editedProduct.category}
                  onChange={e => handleFieldChange('category', e.target.value)}
                  style={{ padding: '8px', width: '268px', marginLeft: '0px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '10px', marginTop: '5px' }}
                >
                  <option value="----">----</option>
                  <option value="Dairy Products">Dairy Products</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                </select>
              </div>
              <div className="form-group55">
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  id="price"
                  value={editedProduct.price}
                  onChange={e => handleFieldChange('price', e.target.value)}
                  style={{ width: '250px', padding: '8px', marginLeft: '0px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '10px', marginTop: '5px' }}
                />
                {!isNumeric(editedProduct.price) && <p style={{ color: 'red' }}>Price should be numeric</p>}
              </div>
              <div className="form-group55">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="text"
                  id="quantity"
                  value={editedProduct.quantity}
                  onChange={e => handleFieldChange('quantity', e.target.value)}
                  style={{ width: '250px', padding: '8px', marginLeft: '0px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', marginBottom:'10px', marginTop: '5px' }}
                  />
                  {!isNumeric(editedProduct.quantity) && <p style={{ color: 'red' }}>Quantity should be numeric</p>}
                </div>
                <div className="form-group55">
                  <label htmlFor="image">Image:</label>
                  <input
                    type="file"
                    id="image"
                    accept=".jpg, .jpeg, .png, .gif"
                    onChange={handleImageChange}
                    style={{ marginLeft: '0px', fontSize: '14px', borderRadius: '4px', marginBottom: '10px', marginTop: '5px' }}
                  />
                  {imageError && <p style={{ color: 'red' }}>{imageError}</p>}
                </div>
                <button
                  className="btn btn-success"
                  onClick={handleSaveEdit}
                  style={{ borderRadius: '4px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginRight: '10px' ,marginLeft: '50px' , marginTop: '20px' , border:'none', backgroundColor:'green', color:'white' }}
                >
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => setEditedProduct(null)}
                  style={{ borderRadius: '4px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', border:'none', backgroundColor:'red', color:'white' }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminProduct;
  

