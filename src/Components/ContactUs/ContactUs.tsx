import React, { useState, useRef } from "react";
import "./ContactUs.css";
import emailjs from "@emailjs/browser";

// Define the type for the form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  // State to manage form data
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  // Reference for the form
  const formRef = useRef<HTMLFormElement | null>(null);

  // Event handler for input and textarea changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Event handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (formRef.current) {
      emailjs
        .send(
          "service_fyxpyhr", // Replace with your EmailJS service ID
          "template_73mr5yp", // Replace with your EmailJS template ID
          { ...formData }, // Convert formData to a Record<string, unknown>
          "rE_fkaioi-bmm-GPe" // Replace with your EmailJS public key
        )
        .then(
          (result) => {
            console.log("Email successfully sent:", result.text);
            alert("Your message has been sent successfully!");
            // Reset form after successful submission
            setFormData({
              name: "",
              email: "",
              message: "",
            });
            formRef.current?.reset();
          },
          (error) => {
            console.error("Failed to send email:", error.text);
            alert("Failed to send the email. Please try again.");
          }
        );
    }
  };

  // Event handler for cancel/reset button
  const handleCancel = (): void => {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <div className="contact-container">
      <div className="form-wrapper">
        <h1 className="form-title">Contact Us</h1>
        <p className="form-subtitle">Please fill out the form below</p>

        <form onSubmit={handleSubmit} ref={formRef} className="form">
          <input
            type="text"
            name="name" // This must match your EmailJS template key
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="form-input"
            required
          />

          <input
            type="email"
            name="email" // This must match your EmailJS template key
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="form-input"
            required
          />

          <textarea
            name="message" // This must match your EmailJS template key
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
