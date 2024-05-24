import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AddProductDialog = ({ onSave, onClose }) => {
  const { farmerId } = useParams(); // Extract farmerId from URL
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
    image: null
  });
  const [imageError, setImageError] = useState('');
  const [inputErrors, setInputErrors] = useState({});

  useEffect(() => {
    console.log('Farmer ID:', farmerId); // Log the farmerId when component mounts
  }, [farmerId]); // Run this effect whenever farmerId changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the selected file is an image
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setImageError('Please select a valid image file (JPEG, PNG, GIF)');
        setNewProduct({ ...newProduct, image: null }); // Reset image state
      } else {
        setNewProduct({ ...newProduct, image: file });
        setImageError('');
      }
    }
  };

  const handleSaveClick = async () => {
    try {
      // Check if any required fields are unfilled
      const requiredFields = ['name', 'description', 'category', 'price', 'quantity', 'image'];
      const unfilledFields = requiredFields.filter(field => !newProduct[field]);
      if (unfilledFields.length > 0) {
        throw new Error('Please fill in all fields.');
      }

      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('category', newProduct.category);
      formData.append('price', newProduct.price);
      formData.append('quantity', newProduct.quantity);
      formData.append('image', newProduct.image);

      // Pass the farmerId as a query parameter in the URL
      await axios.post(`https://freshfarm-2358894.up.railway.app/api/products1?farmerId=${farmerId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Clear form fields after saving
      setNewProduct({
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
        image: null
      });

      // Close the dialog
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px 30px 30px 50px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', maxWidth: '450px', width: '100%', textAlign: 'center' }}>
        <h2 style={{ color: '#333', borderBottom: '2px solid #ccc', paddingBottom: '10px', margin: '10px 0 30px 0px' }}>Add Product</h2>
        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Name:</label>
          <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} style={{ width: '90%', padding: '10px', border: '1px solid #ccc', borderRadius: '12px', marginBottom: '15px', fontSize: '14px' }} />
          <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Description:</label>
          <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} style={{ width: '90%', padding: '10px', border: '1px solid #ccc', borderRadius: '12px', marginBottom: '15px', fontSize: '14px' }} />
          <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Category:</label>
          <input type="text" name="category" value={newProduct.category} onChange={handleInputChange} style={{ width: '90%', padding: '10px', border: '1px solid #ccc', borderRadius: '12px', marginBottom: '15px', fontSize: '14px' }} />
          <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Price:</label>
          <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} style={{ width: '90%', padding: '10px', border: '1px solid #ccc', borderRadius: '12px', marginBottom: '15px', fontSize: '14px' }} />
          <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Quantity:</label>
          <input type="number" name="quantity" value={newProduct.quantity} onChange={handleInputChange} style={{ width: '90%', padding: '10px', border: '1px solid #ccc', borderRadius: '12px', marginBottom: '15px', fontSize: '14px' }} />
          <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ width: '90%', marginBottom: '5px', fontSize: '14px' }} />
          {newProduct.image && <img src={URL.createObjectURL(newProduct.image)} alt="Product" style={{ maxWidth: '30%', height: '100px', marginBottom: '15px' }} />}
          {imageError && <p style={{ color: 'red', fontSize: '12px' }}>{imageError}</p>}
        </div>
        <div>
          <button onClick={handleSaveClick} style={{ padding: '12px 24px', border: 'none', borderRadius: '5px', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer', marginRight: '10px', fontSize: '16px' }}>Save</button>
          <button onClick={onClose} style={{ padding: '12px 24px', border: 'none', borderRadius: '5px', backgroundColor: '#B01818', color: 'white', cursor: 'pointer', fontSize: '16px' }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddProductDialog;
