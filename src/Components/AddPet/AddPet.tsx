import React, { useState } from "react";
import "./AddPet.css";
import { Upload } from "lucide-react";

interface AddPetFormData {
  species: string;
  name: string;
  breed: string;
  gender: string;
  sex: string;
  color: string;
  arrivedDate: string;
  arrivedFrom: string;
  contactNo: string;
  image?: File;
}

const AddPetForm = () => {
  const [formData, setFormData] = useState<AddPetFormData>({
    species: "",
    name: "",
    breed: "",
    gender: "",
    sex: "",
    color: "",
    arrivedDate: "",
    arrivedFrom: "",
    contactNo: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your submission logic here
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
              <option value="">Select Species</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
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
              name="gender"
              placeholder="Gender"
              value={formData.gender}
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
              name="color"
              placeholder="Color"
              value={formData.color}
              onChange={handleInputChange}
              className="add-pet-input"
            />

            <input
              type="date"
              name="arrivedDate"
              value={formData.arrivedDate}
              onChange={handleInputChange}
              className="add-pet-input"
            />

            <input
              type="text"
              name="arrivedFrom"
              placeholder="Arrived From"
              value={formData.arrivedFrom}
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

            <div className="add-pet-file-upload">
              <label className="add-pet-file-label">
                <Upload className="add-pet-file-icon" />
                <span>Upload an image</span>
                <input
                  type="file"
                  className="add-pet-file-input"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData((prev) => ({ ...prev, image: file }));
                    }
                  }}
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
