import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (formRef.current) {
      emailjs
        .send(
          "service_fyxpyhr",
          "template_73mr5yp",
          { ...formData },
          "rE_fkaioi-bmm-GPe"
        )
        .then(
          (result) => {
            console.log("Email successfully sent:", result.text);
            toast.success("Your message has been sent successfully!"); // Success Toast
            setFormData({
              name: "",
              email: "",
              message: "",
            });
            formRef.current?.reset();
          },
          (error) => {
            console.error("Failed to send email:", error.text);
            toast.error("Failed to send the email. Please try again."); // Error Toast
          }
        );
    }
  };

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
    <div className="min-h-screen bg-gradient-to-b from-[#f3e8ff] to-[#e0f2fe] flex justify-center items-center py-8">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-xl w-full animate-fadeIn">
        <h1 className="text-3xl font-bold text-center text-[#2b6cb0] mb-4">
          Contact Us
        </h1>
        <p className="text-center text-lg text-gray-600 mb-6 tracking-wide">
          Please fill out the form below
        </p>

        <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:border-[#007bff] transition"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:border-[#007bff] transition"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            rows={6}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:border-[#007bff] transition"
            required
          ></textarea>

          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-3 bg-[#007bff] text-white rounded-md shadow-md hover:bg-[#0056b3] transform transition hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-3 bg-[#007bff] text-white rounded-md shadow-md hover:bg-[#0056b3] transform transition hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* ToastContainer placed here */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ContactUs;
