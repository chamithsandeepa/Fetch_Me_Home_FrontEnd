import React, { useState } from 'react';
import './App.css';
import Header from './Components/NavBar/NavBar'; // Adjust the import path as needed
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
    <>
      <Header
        logoSrc={logos} // Pass logo image source
        navLinks={navLinks} // Pass navigation links
        activeLink={activeLink} // Pass the active link
      />
    </>
  );
}

export default App;
