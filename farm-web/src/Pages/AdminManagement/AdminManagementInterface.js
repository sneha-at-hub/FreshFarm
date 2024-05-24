import React, { useState, useEffect } from 'react';
import './AdminManagementInterface.css';
import AppHeader from '../../Components/AppHeader/index.js';
import Sidebar from '../../Components/Sidebar/sidebar.js';
import axios from 'axios';

const AdminManagementInterface = () => {
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editedAdmin, setEditedAdmin] = useState(null);
  const [deleteAdminId, setDeleteAdminId] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [fadeContainer, setFadeContainer] = useState(false);

  useEffect(() => {
    fetchAdminsData();
  }, []);

  const fetchAdminsData = async () => {
    try {
      const response = await axios.get('https://freshfarm-2358894.up.railway.app/admins');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins data:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEdit = (adminId) => {
    const adminToEdit = admins.find((admin) => admin.admin_id === adminId);
    setEditedAdmin(adminToEdit);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`https://freshfarm-2358894.up.railway.app/admins/${editedAdmin.admin_id}`, editedAdmin);
      setEditedAdmin(null);
      fetchAdminsData(); // Refresh admin list after update
    } catch (error) {
      console.error('Error saving edited admin:', error);
    }
  };

  const handleDeleteConfirmation = (adminId) => {
    const adminToDelete = admins.find((admin) => admin.admin_id === adminId);
    if (adminToDelete) {
      setDeleteAdminId(adminId);
      setDeleteMessage(`Are you sure you want to delete ${adminToDelete.email}?`);
      setFadeContainer(true);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://freshfarm-2358894.up.railway.app/admins/${deleteAdminId}`);
      setDeleteMessage('');
      setFadeContainer(false);
      setAdmins(admins.filter((admin) => admin.admin_id !== deleteAdminId)); // Remove admin from frontend
      setDeleteAdminId(null);
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteMessage('');
    setFadeContainer(false);
    setDeleteAdminId(null);
  };

  const handleFieldChange = (fieldName, value) => {
    setEditedAdmin({ ...editedAdmin, [fieldName]: value });
  };

  // Filter admins based on search query
  const filteredAdmins = admins.filter(
    (admin) =>
      (admin.admin_id && admin.admin_id.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
      (admin.email && admin.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>

      <Sidebar adminName="Your Admin Name" />
      <div className="admin-management">
      <h1 style={{marginBottom:'30px',marginTop:'0px', fontWeight:'400', fontSize:'24px', marginLeft:'0px'}}>Admin Management</h1>
        
        <div className="main-content">
     
          
        
          {/* Search bar */}
          <input
  type="text"
  placeholder="Search by ID or Email..."
  value={searchQuery}
  onChange={handleSearch}
  style={{
    width: '400px',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
  }}
/>

<table className="admins-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Created by</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin) => (
                <tr key={admin.admin_id}>
                  <td>{admin.admin_id}</td>
                  <td>{admin.email}</td>
                  <td>{admin.created_by}</td>
                  <td>
                    <button onClick={() => handleEdit(admin.admin_id)} className="action-button edit-button">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(admin.admin_id)}
                      className="action-button delete-button"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Delete dialog */}
          {deleteMessage && (
            <div className="delete-dialog">
              <p>{deleteMessage}</p>
              <button onClick={handleDelete} className="action-button delete-button">
                OK
              </button>
              <button onClick={handleCancelDelete} className="action-button edit-button">
                Cancel
              </button>
            </div>
          )}

          {/* Edit popup */}
          {editedAdmin && (
            <div className="edit-popup" style={{width:'800px'}}>
              <h2>Edit Admin</h2>
              <div className="form-group"  style={{width:'200px'}}>
                <label htmlFor="adminEmail">Email:</label>
                <input
                  type="text"
                  id="adminEmail"
                  value={editedAdmin.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                />
              </div>
              {/* More fields can be added here */}
              <div className="buttons" style={{marginRight:'50px'}}>
                <button style={{backgroundColor:'#4CAF50', color:'white', border:'none', padding: '8px 14px', fontSize:'12px', borderRadius:'8px'}} onClick={handleSaveEdit} className="action-button edit-button">
                  Save
                </button>
                <button   style={{backgroundColor:'#e2e2e2c0', color:' rgb(57, 57, 57)', border:'none',fontSize:'12px', padding: '8px 14px', borderRadius:'8px', marginLeft:'14px'}} onClick={() => setEditedAdmin(null)} className="action-button delete-button">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminManagementInterface;