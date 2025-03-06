import React from "react";
import { motion } from "framer-motion";
import rex from "../../assets/rex.jpg";
import dogImage from "../../assets/blog2.jpg"; // Add another image for better visual variety

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 flex flex-col items-center py-10 px-6">
      {/* Header Section */}
      <motion.section
        className="text-center max-w-3xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow-lg">
          About Us
        </h1>
        <h2 className="text-2xl text-gray-600 mt-4">
          Welcome to Fetch Me Home!
        </h2>
        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
          At Fetch Me Home, we believe every pet deserves a loving home, even in
          the virtual world. Our mission is to create a heartwarming space where
          you can find your perfect virtual companion.
        </p>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          We aim to educate users about real-life pet care while allowing them
          to experience the joy of adoption. Our platform offers a variety of
          resources, tools, and educational content to make the adoption process
          easier for everyone.
        </p>
        <p className="mt-6 text-lg font-semibold text-indigo-600">
          Your new best friend is just a click away!
        </p>
      </motion.section>

      {/* Image and Links Section */}
      <motion.section
        className="mt-12 flex flex-col lg:flex-row items-center justify-center gap-10 max-w-6xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Image Section (first image coming from the left) */}
        <motion.div
          className="w-full lg:w-1/2 overflow-hidden rounded-xl shadow-xl"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={rex}
            alt="Child hugging dog"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">
          {[
            "Discover the Magic",
            "Adopt your Match",
            "Cherish Every Moment",
          ].map((text, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-lg font-semibold py-4 px-6 rounded-xl shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {text}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* More Details Section */}
      <motion.section
        className="mt-20 flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="w-full lg:w-1/2 flex flex-col gap-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-3xl font-semibold text-indigo-700">
            Why Choose Us?
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            We are committed to making a difference. With years of experience in
            animal care and virtual pet adoption, Fetch Me Home ensures that
            both pets and owners get the support they deserve. Our platform
            integrates with popular adoption services, making it easier for you
            to find your perfect companion.
          </p>
          <ul className="mt-4 text-lg text-gray-700 list-disc pl-6">
            <li>Easy adoption process</li>
            <li>Access to educational resources</li>
            <li>Supportive community for all users</li>
            <li>Top-notch customer service</li>
          </ul>
        </motion.div>

        {/* Image Section (second image coming from the right) */}
        <motion.div
          className="w-full lg:w-1/2 overflow-hidden rounded-xl shadow-xl"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={dogImage} // New image showcasing happy pet adoption
            alt="Happy dog with a family"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.section>

      {/* Footer Section with Call to Action */}
      <motion.section
        className="mt-20 text-center max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <p className="text-lg text-gray-700 mb-6">
          Join us on our mission to spread love and care for pets around the
          world. Be a part of the Fetch Me Home family today and start your
          adoption journey!
        </p>
        <motion.button
          className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transform transition duration-300 hover:scale-105"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => alert("Redirect to Adoption Page")}
        >
          Start Your Journey
        </motion.button>
      </motion.section>
    </div>
  );
};

export default AboutUs;
