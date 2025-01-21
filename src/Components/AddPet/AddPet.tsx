import React, { useState } from "react";
import axios from "axios";
import "./AddPet.css";
import { AddPetFormData } from "../../types/pet";
import { Upload } from "lucide-react";

const CLOUDINARY_CLOUD_NAME = "dhkig0hkl"; // Your Cloudinary cloud name
const UPLOAD_PRESET = "pet-adoption-system"; // Your Cloudinary upload preset

const AddPetForm = () => {
  const [formData, setFormData] = useState<AddPetFormData>({
    species: "",
    name: "",
    breed: "",
    sex: "",
    age: "",
    color: "",
    location: "",
    contactNo: "",
    description: "",
    imageUrl: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET); // Your preset
      formData.append("cloud_name", CLOUDINARY_CLOUD_NAME); // Your cloud name

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        setFormData((prev) => ({
          ...prev,
          imageUrl: response.data.secure_url,
        }));
        console.log(response);
        // alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/pets", // Update with your API endpoint
        formData, // Send formData directly as JSON
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Pet added successfully!");
      console.log(response.data);
    } catch (error: any) {
      console.error("Error adding pet:", error.response || error.message);
      alert("Failed to add pet. Please try again.");
    }
  };

  return (
    <div className="add-pet-container">
      <div className="add-pet-wrapper">
        <h1 className="add-pet-title">Add a Pet</h1>
        <form onSubmit={handleSubmit} className="add-pet-form">
          <div className="add-pet-fields">
            <select
              name="species"
              value={formData.species}
              onChange={handleInputChange}
              className="add-pet-input"
            >
              <option value="" disabled>
                Select Species
              </option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="add-pet-input"
            />
            <input
              type="text"
              name="breed"
              placeholder="Breed"
              value={formData.breed}
              onChange={handleInputChange}
              className="add-pet-input"
            />
            <input
              type="text"
              name="sex"
              placeholder="Sex"
              value={formData.sex}
              onChange={handleInputChange}
              className="add-pet-input"
            />
            <input
              type="text"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleInputChange}
              className="add-pet-input"
            />
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={formData.color}
              onChange={handleInputChange}
              className="add-pet-input"
            />
            <input
              type="text"
              name="location"
              placeholder="Arrived From"
              value={formData.location}
              onChange={handleInputChange}
              className="add-pet-input"
            />
            <input
              type="tel"
              name="contactNo"
              placeholder="Contact No"
              value={formData.contactNo}
              onChange={handleInputChange}
              className="add-pet-input"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="add-pet-input add-pet-textarea"
            />
            <div className="add-pet-file-upload">
              <label className="add-pet-file-label">
                <Upload className="add-pet-file-icon" />
                <span>Upload an image</span>
                <input
                  type="file"
                  className="add-pet-file-input"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          <div className="add-pet-buttons">
            <button type="button" className="add-pet-btn add-pet-btn-cancel">
              Cancel
            </button>
            <button type="submit" className="add-pet-btn add-pet-btn-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetForm;
