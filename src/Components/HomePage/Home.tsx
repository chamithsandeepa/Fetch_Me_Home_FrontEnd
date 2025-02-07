import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { data } from "../../types/data";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);

  const handleExplore = () => {
    navigate("/about");
  };

  const handleStartJourney = () => {
    navigate("/blogs");
  };

  const handlePrev = () => {
    setActiveImg((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveImg((prev) => (prev + 1) % data.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 4000);
    return () => clearTimeout(timer);
  }, [activeImg]);

  return (
    <div className="home-container">
      {/* Carousel Hero Section */}
      <div className="carousel">
        <button className="carousel-button prev" onClick={handlePrev}>
          Prev
        </button>
        <div className="carousel-content">
          {data.map((item, i) => (
            <div
              key={item.id}
              className={`carousel-item ${i === activeImg ? "block" : "hide"}`}
            >
              <img src={item.url} alt={item.alt} className="carousel-image" />
              <div className="hero-overlay">
                <h1 className="hero-title">{item.title}</h1>
                <p className="hero-subtitle">{item.subtitle}</p>
                <button className="hero-button" onClick={handleExplore}>
                  Explore Now
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-button next" onClick={handleNext}>
          Next
        </button>
      </div>

      {/* Statistics Section */}
      <div className="stats-section">
        <h2 className="stats-title">Our Impact</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">1,200+</div>
            <div className="stat-label">Happy Adoptions</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">800+</div>
            <div className="stat-label">Caring Families</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5,000+</div>
            <div className="stat-label">Volunteers</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h2 className="cta-title">Ready to Find Your New Best Friend?</h2>
        <p className="cta-description">
          Join our community and make a difference today!
        </p>
        <button className="cta-button" onClick={handleStartJourney}>
          Start Your Journey
        </button>
      </div>
    </div>
  );
};

export default Home;
