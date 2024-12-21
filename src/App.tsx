import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Home from './Components/HomePage/Home';
import AboutUs from './Components/AboutUs/AboutUs';
import Register from './Components/UserRegister/UserRegister';
import ContactUs from './Components/ContactUs/ContactUs';
import logos from './assets/logos.jpg';

const App: React.FC = () => {
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <Router>
      <div className="app-container">
        <NavBar logoSrc={logos} navLinks={navLinks} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blogs" element={<h1>Blogs Page</h1>} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;