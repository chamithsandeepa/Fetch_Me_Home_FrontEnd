import React, { useState } from 'react';
import './App.css';
import Header from './Components/NavBar/NavBar'; // Adjust the import path as needed
import Footer from './Components/Footer/Footer'; // Adjust the import path as needed
import logos from './assets/logos.jpg'; // Replace with the actual logo file path

function App() {
  const [activeLink, setActiveLink] = useState(window.location.pathname); // Set the current active link

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Adopt a Pet', path: '/adopt' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className="app-container">
      {/* Header Section */}
      <Header
        logoSrc={logos} // Pass logo image source
        navLinks={navLinks} // Pass navigation links
        activeLink={activeLink} // Pass the active link
      />

      {/* Main Content */}
      <main className="main-content">
        {/* Add your page content here */}
        <h1>Welcome to Fetch Me Home</h1>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
