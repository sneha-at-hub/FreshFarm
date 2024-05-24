import React, { useState, useEffect } from 'react';
import './FarmerInquiry.css';
import FarmerSidebar from '../../Components/Sidebar/FarmerSidebar';
import axios from 'axios';

const FarmerInquiry = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    // Fetch inquiries from backend
    async function fetchInquiries() {
      try {
        const response = await axios.get('https://freshfarm-2358894.up.railway.app/get-inquiries'); // Replace the URL with your actual backend endpoint
        setInquiries(response.data);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      }
    }

    fetchInquiries();
  }, []);

  return (
    <div>
      <FarmerSidebar /> {/* Include Sidebar component */}
      <h1 className="farmer-inquiry-heading">Inquiries</h1>
      <div className="farmer-inquiry-container">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Contact Info</th>
              <th>Email Address</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(inquiry => (
              <tr key={inquiry.id}>
                <td>{`${inquiry.firstName} ${inquiry.lastName}`}</td>
                <td>{inquiry.contactNumber}</td>
                <td>{inquiry.email}</td>
                <td>{inquiry.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FarmerInquiry;