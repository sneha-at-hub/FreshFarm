import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Us Section */}
        <div className="about-us-section">
          <h3>About Us</h3>
          <p>
            Fresh Farms is your go-to platform connecting local farmers directly with consumers,
            offering a wide variety of farm-fresh products. We are committed to promoting
            sustainability and supporting local agriculture.
          </p>
        </div>

        {/* Product Categories (Centered) */}
        <div className="product-categories">
          <h3>Products</h3>
          <ul>
            <li>Fruits</li>
            <li>Vegetables</li>
            <li>Dairy Products</li>
          </ul>
        </div>

        {/* Connect with Us Section */}
        <div className="connect-section">
          <h3>Connect with Us</h3>
          {/* Social Media Icons */}
          <div className="social-icons">
            <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x" style={{ color: '#3b5998' }} />
            </a>
            <a href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" style={{ color: '#e4405f' }} />
            </a>
            <a href="https://www.twitter.com/yourpage" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="2x" style={{ color: '#1da1f2' }} />
            </a>
          </div>

          {/* Scanner Icon */}
          <div className="scanner-icon">
            <FontAwesomeIcon icon={faQrcode} size="2x" style={{ color: '#333' }} />
          </div>
        </div>

      
            

       
    
      </div>
    </footer>
  );
};

export default Footer;
