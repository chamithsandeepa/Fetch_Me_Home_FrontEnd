import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/NavBar/NavBar'; // Import Navbar component
import Footer from './Components/Footer/Footer'; // Import Footer component
import Home from './Components/HomePage/Home'; // Import the Home component
import logos from './assets/logos.jpg'; // Import logo image

const App: React.FC = () => {
  // Define navigation links for the Header
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Adopt a Pet', path: '/adopt' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Home Route with Register/Login Buttons */}
          <Route
            path="/"
            element={
              <>
                <Header
                  logoSrc={logos}
                  navLinks={navLinks}
                  activeLink="/"
                  showAuthButtons={true} // Show buttons on Home page
                />
                <Home />
              </>
            }
          />

          {/* Other Routes without Register/Login Buttons */}
          <Route
            path="/adopt"
            element={
              <>
                <Header
                  logoSrc={logos}
                  navLinks={navLinks}
                  activeLink="/adopt"
                />
                <h1>Adopt a Pet Page</h1>
              </>
            }
          />
          <Route
            path="/blogs"
            element={
              <>
                <Header
                  logoSrc={logos}
                  navLinks={navLinks}
                  activeLink="/blogs"
                />
                <h1>Blogs Page</h1>
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Header
                  logoSrc={logos}
                  navLinks={navLinks}
                  activeLink="/contact"
                />
                <h1>Contact Us Page</h1>
              </>
            }
          />
        </Routes>

        {/* Footer Section */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
