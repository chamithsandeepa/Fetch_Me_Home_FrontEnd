import React from 'react';
import './AboutUs.css';
import rex from '../../assets/rex.jpg';

const AboutUs: React.FC = () => {
    return (
        <div className="about-container">
            {/* Header Section */}
            <section className="header-section">
                <h1>About Us</h1>
                <h2>Welcome to Fetch Me Home!</h2>
                
                <div className="content-wrapper">
                    <p>
                        At Fetch Me Home, we believe every pet deserves a loving home, even in the virtual world.
                        Our mission is to create a heartwarming space where you can find your perfect virtual
                        companion. Whether you're adopting your first furry friend or expanding your digital family,
                        Fetch Me Home offers a variety of adorable pets waiting to bring joy to your life.
                    </p>
                    
                    <p>
                        We've designed this platform to not only be fun but also to educate users about real-life pet
                        care and responsibilities. With Fetch Me Home, you'll experience the unconditional love of a
                        pet without any hassle.
                    </p>
                    
                    <p className="highlight-text">
                        Explore, connect, and let the adventure begin. Your new best friend is just a click away!
                    </p>
                </div>
            </section>

            {/* Image and Links Section */}
            <section className="content-section">
                <div className="flex-container">
                    <div className="image-container">
                        <img
                            src={rex}
                            alt="Child hugging dog"
                            className="featured-image"
                        />
                    </div>

                    <div className="links-container">
                        <p className="content-box">
                            Discover the Magic
                        </p>
                        <p className="content-box">
                            Adopt your Match
                        </p>
                        <p className="content-box">
                            Cherish Every Moment
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
