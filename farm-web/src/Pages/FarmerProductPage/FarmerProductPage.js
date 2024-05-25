import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FarmerProductPage.css';
import EditProductDialog from '../Dialogue/EditProductDialogue';
import AddProductDialog from '../Dialogue/AddProductDialog';
import ConfirmationDialog from '../Dialogue/ConfirmationDialog';
import { useParams } from 'react-router-dom'; // Import useParams hook
import FarmerSidebar from '../../Components/Sidebar/FarmerSidebar';

const API_BASE_URL = 'https://freshfarm-2358894.up.railway.app'; // Define your API base URL

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { farmerId } = useParams();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products/${farmerId}`);
      setProducts(response.data); // Assuming response.data is an array of products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCloseDialog = () => {
    setEditingProduct(null);
    setAddingProduct(false);
    fetchProducts(); // Refresh products after closing dialog
  };

  const handleSave = async (editedProduct) => {
    try {
      await axios.put(`${API_BASE_URL}/api/products/${editedProduct.id}`, editedProduct);
      const updatedProducts = products.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = (productId) => {
    setProductToDelete(productId);
    setConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${productToDelete}`);
      const updatedProducts = products.filter((product) => product.id !== productToDelete);
      setProducts(updatedProducts);
      setConfirmDelete(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  const handleAddProduct = () => {
    setAddingProduct(true);
  };

  const handleAddProductSubmit = async (newProduct) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/products`, newProduct);
      const addedProduct = response.data;
      setProducts([...products, addedProduct]);
      setAddingProduct(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <FarmerSidebar />
      <div className="product-header-container" style={{ marginLeft: '270px', marginBottom: '0px' }}>
        <h1 style={{ marginBottom: '30px', fontWeight: '400' }}>Products</h1>
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            placeholder="Search products"
            className="search-input"
            style={{
              width: '400px',
              height: '20px',
              borderRadius: '4px',
              fontSize: '14px',
              color: '#aaa',
              border: '1px solid #ddd'
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleAddProduct} className="add-item-button" style={{ backgroundColor: '#219C90', color: 'white', fontWeight: 400, marginLeft: '575px', height: '40px', borderRadius: '8px' }}>
            Add New Product
          </button>
        </div>
      </div>
      <div className="product-container" style={{ marginLeft: '130px', width: '1250px' }}>
        <table className="product-table" style={{ marginLeft: '110px', fontSize: '14px' }}>
          <colgroup>
            <col style={{ width: '10%' }} />
            <col style={{ width: '15%' }} /> 
            <col style={{ width: '25%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '14%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <img src={`${API_BASE_URL}/${product.image}`} alt={product.name} className="product-image1" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>Rs {product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button className="edit-button-pro" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="delete-button-pro" onClick={() => handleDelete(product.id)} style={{ backgroundColor: '#e2e2e2c0', color: 'black' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingProduct && (
        <EditProductDialog
          product={editingProduct}
          onSave={handleSave}
          onClose={handleCloseDialog}
        />
      )}
      {addingProduct && (
        <AddProductDialog
          onSave={handleAddProductSubmit}
          onClose={handleCloseDialog}
        />
      )}
      {confirmDelete && (
        <ConfirmationDialog
          message="Are you sure you want to delete this product?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default ProductTable;
