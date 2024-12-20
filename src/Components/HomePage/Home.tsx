import React, { useRef } from 'react';
import './Home.css';
import blog1 from '../../assets/blog1.jpg';
import blog2 from '../../assets/blog2.jpg';
import home from '../../assets/home.jpg';
import rex from '../../assets/rex.jpg';
//import logos from '../../assets/logos.jpg'; // Hero section background image

const Home: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <img src={blog1} alt="Hero Background" className="hero-background" />
        <div className="hero-overlay">
          <h1 className="hero-title">Adopt. Love. Grow Together.</h1>
          <p className="hero-subtitle">Find your virtual best friend today and make a difference!</p>
          <button className="hero-button">Explore Now</button>
        </div>
      </section>

      <main className="main-content">
        {/* Blog Section */}
        {/* <div className="blog-section">
          <h2 className="blog-title">Heartwarming Stories & Tips</h2>
          <div className="blog-carousel" ref={carouselRef}>
            {[blog2, home, rex].map((img, index) => (
              <div key={index} className="blog-card">
                <img src={img} alt={`Blog ${index + 1}`} className="blog-image" />
                <div className="blog-caption">
                  <h3 className="blog-heading">Blog Post {index + 1}</h3>
                  <p className="blog-description">Discover heartwarming tales, tips, and insights in our blogs.</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-next" onClick={scrollNext}>
            <span className="arrow-right">→</span>
          </button>
        </div> */}

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
          <button className="cta-button">Start Your Journey</button>
        </section>
      </main>
    </div>
  );
};

export default Home;
