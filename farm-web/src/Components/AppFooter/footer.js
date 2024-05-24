import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './footer.css';
import Icon1 from '../../assets/images/icon-1.svg';
import Icon2 from '../../assets/images/icon-2.svg'
import Icon3 from '../../assets/images/icon-3.svg'
import Icon4 from '../../assets/images/icon-4.svg'
import Icon5 from '../../assets/images/icon-5.svg'

const Footer = () => {
  return (
    <footer className="footer">
        
        <div className='footerBoxes' style={{ display: 'flex' }}>
    <div className='col' style={{ flex: '1' }}>
      <div className='box d-flex align-items-center w-100'>
        <span><img src={Icon1} alt="Icon1" /></span>
        <div className='info'>
          <h4>Best prices & offers</h4>
          <p>Orders $50 or more</p>
        </div>
      </div>
    </div>

    <div className='col' style={{ flex: '1' }}>
      <div className='box d-flex align-items-center w-100'>
        <span><img src={Icon2} alt="Icon2" /></span>
        <div className='info'>
          <h4>Free delivery</h4>
          <p>Orders $50 or more</p>
        </div>
      </div>
    </div>

    <div className='col' style={{ flex: '1' }}>
      <div className='box d-flex align-items-center w-100'>
        <span><img src={Icon3} alt="Icon3" /></span>
        <div className='info'>
          <h4>Great daily deal</h4>
          <p>Orders $50 or more</p>
        </div>
      </div>
    </div>

    <div className='col' style={{ flex: '1' }}>
      <div className='box d-flex align-items-center w-100'>
        <span><img src={Icon4} alt="Icon4" /></span>
        <div className='info'>
          <h4>Wide assortment</h4>
          <p>Orders $50 or more</p>
        </div>
      </div>
    </div>

    <div className='col' style={{ flex: '1' }}>
      <div className='box d-flex align-items-center w-100'>
        <span><img src={Icon5} alt="Icon5" /></span>
        <div className='info'>
          <h4>Easy returns</h4>
          <p>Orders $50 or more</p>
        </div>
      </div>
    </div>
  </div>

      <div className="footer-container">


        {/* Get Support Section */}
        <div className="get-support-section">
          <h3>Get Support</h3>
          <ul className="support-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Live Chat</a></li>
            <li><a href="#">Check Order Status</a></li>
            <li><a href="#">Refunds</a></li>
            <li><a href="#">Report Abuse</a></li>
          </ul>
        </div>

        {/* Products Section */}
        <div className="product-categories">
          <h3>Products</h3>
          <ul>
            <li>Fruits</li>
            <li>Vegetables</li>
            <li>Dairy Products</li>
          </ul>
        </div>

        {/* Sell on Fresh Farms Section */}
        <div className="sell-on-fresh-farms">
          <h3>Sell on Fresh Farms</h3>
          <ul className="sell-links">
            <li><a href="#">Start Selling</a></li>
            <li><a href="#">Seller Central</a></li>
            <li><a href="#">Become a Verified Seller</a></li>
            <li><a href="#">Partnerships</a></li>
          </ul>
        </div>

        {/* Trade Assurance Section */}
        <div className="trade-assurance-section">
          <h3>Trade Assurance</h3>
          <ul className="trade-assurance-links">
            <li>Safe and Easy Payments</li>
            <li>Money-back Policy</li>
            <li>On-time Shipping</li>
            <li>Product Monitoring Services</li>
            <li>Cash on Delivery</li>
          </ul>
        </div>

        {/* Get to Know Us Section */}
        <div className="get-to-know-us-section">
          <h3>Get to Know Us</h3>
          {/* About Fresh Farms Link */}
          <a href="#" className="about-fresh-farms-link">
            About Fresh Farms
          </a>
        </div>



        {/* Connect with Us Section (Social Media Icons) */}
        <div className="connect-section">
          <h3>Connect with Us</h3>
          {/* Social Media Icons */}
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x" style={{ color: '#3b5998' }} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" style={{ color: '#e4405f' }} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="2x" style={{ color: '#1da1f2' }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;