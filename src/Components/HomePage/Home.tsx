import React from 'react';
import './Home.css';
import home from '../../assets/home.jpg';    // Import the home image
import blog1 from '../../assets/blog1.jpg';    // Import the first blog image
import blog2 from '../../assets/blog2.jpg';  // Import the second blog image

const Home: React.FC = () => {
  return (
    <div className="home-container">
      {/* Main Content */}
      <main className="main">
        {/* Hero Section */}
        <section className="hero-section">
          <h1>Adopt. Love. Grow Together. Find your virtual best friend today!</h1>
          <div className="pet-image-container">
            <img src={home} alt="Pet" className="pet-image" /> {/* Use imported home image */}
          </div>
        </section>

        {/* Blog Section */}
        <section className="blog-section">
          <h2>Stay updated with heartwarming stories, tips, and more—check out our blogs!</h2>
          <div className="blog-cards">
            <div className="blog-card">
              <img src={blog1} alt="Blog 1" className="blog-image" /> {/* Use imported log1 image */}
              <h3>Discover heartwarming tales, pet care tips, and fun insights in our blog!</h3>
            </div>
            <div className="blog-card">
              <img src={blog2} alt="Blog 2" className="blog-image" /> {/* Use imported blog2 image */}
              <h3>Discover heartwarming tales, pet care tips, and fun insights in our blog!</h3>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2023 Fetch me Home. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
