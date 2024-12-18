import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {/* Links Section */}
      <div className="footer-top">
        <ul className="footer-links">
          <li><a href="#">Adoption Platform</a></li>
          <li><a href="#">Sitemap</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Notice at Collection</a></li>
          <li><a href="#">Privacy Policy (Updated)</a></li>
          <li><a href="#">About Our Ads</a></li>
          <li><a href="#">Your Privacy Choices</a></li>
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p className="footer-contact">
          © 2024 Fetch Me Home. All rights reserved.
        </p>

        <div className="footer-social">
          <a href="https://facebook.com" aria-label="Facebook" className="social-icon">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" className="social-icon">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="social-icon">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="tel:+941234567" aria-label="Call Us" className="phone-number">
            <FontAwesomeIcon icon={faPhone} /> +94 123 4567
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
