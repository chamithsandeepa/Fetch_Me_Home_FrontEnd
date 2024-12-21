import React, { useState } from 'react';
import './ContactUs.css';

// Define the type for the form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  // State to manage form data
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  // Event handler for input and textarea changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Event handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle further submission logic here
  };

  // Event handler for cancel/reset button
  const handleCancel = (): void => {
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="contact-container">
      <div className="form-wrapper">
        <h1 className="form-title">Contact Us</h1>
        <p className="form-subtitle">Please fill out the form below</p>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="form-input"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="form-input"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className="form-textarea"
            rows={6}
            required
          ></textarea>

          <div className="button-group">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
