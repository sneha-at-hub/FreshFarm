import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import Sidebar from '../../Components/Sidebar/sidebar.js';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user for details
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [userToDelete, setUserToDelete] = useState(null); // State to store the user to be deleted
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    // Fetch users from backend API when component mounts
    axios.get('https://freshfarm-2358894.up.railway.app/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const deleteUser = (userId) => {
    setUserToDelete(userId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = (confirmed) => {
    if (confirmed) {
      // Delete user from backend API
      axios.delete(`https://freshfarm-2358894.up.railway.app/api/deleteUser/${userToDelete}`)
        .then(response => {
          console.log('User deleted successfully:', response.data);
          // Update frontend state after successful deletion
          setUsers(users.filter(user => user.id !== userToDelete));
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    }
    setShowDeleteConfirmation(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <Sidebar adminName="Your Admin Name" />
      <div className="container">
        <div className="user-management">
          <h1 style={{ marginBottom: '30px', marginTop: '0px', fontWeight: '400', fontSize: '24px', marginLeft: '262px' }}>Customers</h1>
          <div className="container" style={{ marginBottom: '20px', marginRight: '470px', paddingTop: '0px' }}>
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Search by user name"
              style={{ padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', maxWidth: '400px', marginLeft: '0px' }}
            />
          </div>
          <table className="users-table">
            <thead>
              <tr>
                <th className="username">Username</th>
                <th className="email">Email Address</th>
                <th className="phone">Phone Number</th>
                <th className="registration">Registration Date</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_number}</td>
                  <td>{user.created_at}</td>
                  <td>
                    <button className="view-details" onClick={() => openModal(user)}>View Details</button>
                    <button className="delete" style={{ backgroundColor: '#e2e2e2c0', color: 'rgb(57, 57, 57)' }} onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>User Details</h2>
            {selectedUser && (
              <div>
                <p><strong>Username:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone Number:</strong> {selectedUser.phone_number}</p>
                <p><strong>Registration Date:</strong> {selectedUser.registrationDate}</p>
                {/* Add more user details as needed */}
              </div>
            )}
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation-box">
            <p>Are you sure you want to delete this user?</p>
            <div className="confirmation-buttons">
              <button onClick={() => handleDeleteConfirmation(true)} className="confirm-button">Yes</button>
              <button onClick={() => handleDeleteConfirmation(false)} className="confirm-button no-button">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
