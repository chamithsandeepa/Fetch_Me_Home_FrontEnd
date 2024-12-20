import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Home from './Components/HomePage/Home';
import Register from './Components/UserRegister/UserRegister'; // Import Register component
import logos from './assets/logos.jpg';

const App: React.FC = () => {
  // Define navigation links for the Header
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Adopt a Pet', path: '/adopt' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Register', path: '/register' }, // Add the Register page to nav links if desired
  ];

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <Header
                  logoSrc={logos}
                  navLinks={navLinks}
                  activeLink="/"
                  showAuthButtons={true}
                />
                <Home />
              </>
            }
          />

          {/* Register Route */}
          <Route
            path="/register"
            element={
              <>
                <Header
                  logoSrc={logos}
                  navLinks={navLinks}
                  activeLink="/register"
                  showAuthButtons={false} // No need for login/register buttons on this page
                />
                <Register />
              </>
            }
          />

          {/* Adopt a Pet Route */}
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

          {/* Blogs Route */}
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

          {/* Contact Us Route */}
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
