import React from 'react';

const UserDetailsPage = ({ user, onClose }) => (
  <div className="modal-overlay">
    <div className="modal">
      <span className="close" onClick={onClose} style={{ fontSize: '24px' }}>&times;</span>
      <div className="user-details">
        <h2>User Details</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Registration Date: {user.registrationDate}</p>
      </div>
      <button onClick={onClose}>Close Details</button>
    </div>
  </div>
);

export default UserDetailsPage;