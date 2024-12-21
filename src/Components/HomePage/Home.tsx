import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import blog1 from '../../assets/blog1.jpg';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/about');
  };

  const handleStartJourney = () => {
    navigate('/blogs'); // Navigates to the Blogs page
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <img src={blog1} alt="Hero Background" className="hero-background" />
        <div className="hero-overlay">
          <h1 className="hero-title">Adopt. Love. Grow Together.</h1>
          <p className="hero-subtitle">Find your virtual best friend today and make a difference!</p>
          <button className="hero-button" onClick={handleExplore}>Explore Now</button>
        </div>
      </section>

      <main className="main-content">
        {/* Statistics Section */}
        <section className="stats-section">
          <h2 className="stats-title">Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3 className="stat-number">1,200+</h3>
              <p className="stat-label">Happy Adoptions</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">800+</h3>
              <p className="stat-label">Caring Families</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">5,000+</h3>
              <p className="stat-label">Volunteers</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h2 className="cta-title">Ready to Find Your New Best Friend?</h2>
          <p className="cta-description">Join our community and make a difference today!</p>
          <button className="cta-button" onClick={handleStartJourney}>Start Your Journey</button> {/* Updated button */}
        </section>
      </main>
    </div>
  );
};

export default Home;
