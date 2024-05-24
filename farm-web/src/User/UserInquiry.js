import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserInquiry.css';
import axios from 'axios'; // Import Axios for making HTTP requests
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserInquiry = ({ productName }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: '',
  });
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "First Name is required";
    if (!form.lastName) newErrors.lastName = "Last Name is required";
    if (!form.contactNumber) newErrors.contactNumber = "Contact Number is required";
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!form.message) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        await axios.post('https://freshfarm-2358894.up.railway.app/submit-inquiry', form); // Send form data to backend
        setIsMessageSent(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error if submission fails
      }
    } else {
      setErrors(formErrors);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="user-inquiry">
       <button className="go-back-button1" onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} className="go-back-icon1" /> 
        <span className="go-back-text1">Go Back</span>
      </button>
      {!isMessageSent ? (
        <div className="form-container1">
         
          <h2>We will get in touch with you shortly</h2>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={form.contactNumber}
              onChange={handleChange}
            />
            {errors.contactNumber && <span className="error">{errors.contactNumber}</span>}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Leave your message here..."
              value={form.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <span className="error">{errors.message}</span>}
          </div>
          <button2 onClick={handleSubmit}>Send</button2>
        </div>
      ) : (
        <div className="thank-you-message">
          
          <h2>Message Sent!</h2>
          <p>Thank you for your inquiry regarding {productName}. We'll get back to you soon.</p>
        </div>
      )}
    </div>
  );
};

export default UserInquiry;