import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FarmerManagement.css'; // Import CSS file
import Sidebar from '../../Components/Sidebar/sidebar.js'; // Import Sidebar component

const FarmerManagement = () => {
  const [farmers, setFarmers] = useState([]);
  const [editedFarmer, setEditedFarmer] = useState(null);
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [deleteFarmerId, setDeleteFarmerId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState({});

  // Fetch farmers data from backend on component mount
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get('https://freshfarm-2358894.up.railway.app/farmers');
        setFarmers(response.data);
      } catch (error) {
        console.error('Error fetching farmers:', error);
      }
    };
    fetchFarmers();
  }, []);

  const handleEdit = (id) => {
    const farmerToEdit = farmers.find(farmer => farmer.id === id);
    setEditedFarmer({ ...farmerToEdit });
    setEditPopupVisible(true);
  };

  const validateFarmer = (farmer) => {
    const errors = {};
    if (!farmer.fullName.match(/^[A-Z]/)) {
      errors.fullName = "Name must start with a capital letter.";
    }
    if (!farmer.email.includes('@')) {
      errors.email = "Email must contain '@'.";
    }
    if (!farmer.phoneNumber.match(/^\d{10}$/)) {
      errors.phoneNumber = "Phone number must be numeric and 10 digits long.";
    }
    return errors;
  };

  const handleSaveEdit = async () => {
    const errors = validateFarmer(editedFarmer);
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }

    try {
      await axios.put(`https://freshfarm-2358894.up.railway.app/farmers/${editedFarmer.id}`, editedFarmer);
      setFarmers(farmers.map(farmer => (farmer.id === editedFarmer.id ? editedFarmer : farmer)));
      setEditedFarmer(null);
      setEditPopupVisible(false);
      setErrorMessage({});
    } catch (error) {
      console.error('Error updating farmer:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditedFarmer(null);
    setEditPopupVisible(false);
    setErrorMessage({});
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteMessage('Are you sure you want to delete this farmer?');
    setDeleteFarmerId(id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://freshfarm-2358894.up.railway.app/farmers/${deleteFarmerId}`);
      setFarmers(farmers.filter(farmer => farmer.id !== deleteFarmerId));
      setDeleteMessage('');
      setDeleteFarmerId(null);
    } catch (error) {
      console.error('Error deleting farmer:', error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteMessage('');
    setDeleteFarmerId(null);
  };

  const handleFieldChange = (fieldName, value) => {
    setEditedFarmer({ ...editedFarmer, [fieldName]: value });
  };

  // Function to filter farmers by name
  const filteredFarmers = farmers.filter(farmer =>
    farmer.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <Sidebar adminName="Your Admin Name" />
      <div className="container">
        <div className="farmer-management">
          <h1 style={{marginBottom:'30px',marginTop:'0px', fontWeight:'400', fontSize:'24px', marginLeft:'85px'}}>Farmers</h1>
          <div className="container" style={{ marginBottom: '20px', marginRight:'470px', paddingTop:'0px'}}>
            {/* Add the search bar here */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search by farmer name"
              style={{ padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', maxWidth: '400px', marginLeft:'0px' }}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFarmers.map(farmer => (
                <tr key={farmer.id}>
                  <td>{farmer.fullName}</td>
                  <td>{farmer.farmerAddress}</td>
                  <td>{farmer.email}</td>
                  <td>{farmer.phoneNumber}</td>
                  <td>
                    <button style={{backgroundColor:'#4CAF50', color:' white', border:'none', padding: '8px 14px', fontSize:'12px', borderRadius:'8px'}} onClick={() => handleEdit(farmer.id)}>Edit</button>
                    <button style={{backgroundColor:'#e2e2e2c0', color:' rgb(57, 57, 57)', border:'none',fontSize:'12px', padding: '8px 14px', borderRadius:'8px', marginLeft:'14px'}} onClick={() => handleDeleteConfirmation(farmer.id)} >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {deleteMessage && (
            <div className="delete-dialog" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', zIndex: '9999', maxWidth: '300px', width: '100%' }}>
              <p style={{ fontSize: '16px', marginBottom: '20px' }}>{deleteMessage}</p>
              <button onClick={handleDelete} style={{  padding: '8px 25px', fontSize: '14px', border: 'none', borderRadius: '8px', cursor: 'pointer', marginLeft:'50px' }}>OK</button>
              <button onClick={handleCancelDelete} style={{ marginLeft:'30px', padding: '8px 16px', fontSize: '14px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
            </div>
          )}
{editPopupVisible && (
  <div className="edit-popup12" style={{ 
    position: 'fixed', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)', 
    backgroundColor: '#ffffff', 
    padding: '20px', 
    borderRadius: '8px', 
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
    zIndex: '9999', 
    maxWidth: '350px', 
    width: '260px' 
  }}>
    <h2 style={{ 
      textAlign: 'center', 
      marginBottom: '20px', 
      color: '#333333' 
    }}>Edit Farmer</h2>
    <div className="form-group12">
      <label htmlFor="name" style={{ 
        display: 'block', 
        marginLeft:'20px',
        marginTop: '10px', 
        
        color: '#666666' 
      }}>Name:</label>
      <input
        type="text"
        id="name"
        value={editedFarmer.fullName}
        onChange={e => handleFieldChange('fullName', e.target.value)}
        style={{ 
          width: '100%', 
          marginLeft:'20px',
          marginTop: '5px', 
          padding: '8px 10px 8px', 
          fontSize: '14px', 
          borderRadius: '4px', 
          border: '1px solid #cccccc' 
        }}
      />
      {errorMessage.fullName && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errorMessage.fullName}</p>}
    </div>
    <div className="form-group12">
      <label htmlFor="location" style={{ 
        display: 'block', 
        marginLeft:'20px',
        marginTop: '10px', 
        color: '#666666' 
      }}>Location:</label>
      <input
        type="text"
        id="location"
        value={editedFarmer.farmerAddress}
        onChange={e => handleFieldChange('farmerAddress', e.target.value)}
        style={{ 
          width: '100%', 
          marginTop: '5px', 
          marginLeft:'20px',
          
          padding: '8px', 
          fontSize: '14px', 
          borderRadius: '4px', 
          border: '1px solid #cccccc' 
        }}
      />
    </div>
    <div className="form-group12">
      <label htmlFor="email" style={{ 
        display: 'block', 
        marginTop: '10px', 
        marginLeft:'20px',
        color: '#666666' 
      }}>Email:</label>
      <input
        type="text"
        id="email"
        value={editedFarmer.email}
        onChange={e => handleFieldChange('email', e.target.value)}
        style={{ 
          width: '100%', 
          padding: '8px', 
          fontSize: '14px', 
          marginTop: '5px', 
          marginLeft:'20px',
          borderRadius: '4px', 
          border: '1px solid #cccccc' 
        }}
      />
      {errorMessage.email && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errorMessage.email}</p>}
    </div>
    <div className="form-group12">
      <label htmlFor="phoneNumber" style={{ 
        display: 'block', 
        marginLeft:'20px',
        marginTop: '10px', 
        color: '#666666' 
      }}>Phone Number:</label>
      <input
        type="text"
        id="phoneNumber"
        value={editedFarmer.phoneNumber}
        onChange={e => handleFieldChange('phoneNumber', e.target.value)}
        style={{ 
          width: '100%', 
          marginLeft:'20px',
          padding: '8px', 
          fontSize: '14px', 
          marginTop: '5px', 
          borderRadius: '4px', 
          border: '1px solid #cccccc' 
        }}
      />
      {errorMessage.phoneNumber && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errorMessage.phoneNumber}</p>}
    </div>
    <div className="buttons12" style={{ 
      marginTop: '20px', 
      textAlign: 'center' 
    }}>
      <button onClick={handleSaveEdit} style={{ 
        padding: '8px 16px', 
        fontSize: '14px', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer', 
        marginRight: '10px', 
        backgroundColor: '#4CAF50', 
        color: 'white' 
      }}>Save</button>
      <button onClick={handleCancelEdit} style={{ 
        padding: '8px 16px', 
        fontSize: '14px', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer', 
        backgroundColor: '#f44336', 
        color: 'white' 
      }}>Cancel</button>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default FarmerManagement;