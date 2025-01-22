import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import "./PetProfile.css";
import axios from "axios";
import { Pet } from "../../types/pet";

const PetProfilePage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const params = useParams();
  // Initialize petData as an object
  const [petData, setPetData] = useState<Pet>({
    id: "",
    name: "",
    species: "",
    breed: "",
    color: "",
    age: "",
    imageUrl: "",
    description: "",
    location: "",
    sex: "",
    contactNo: "",
  });
  const id = params.petId; // Example pet ID

  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/pets/${id}`
        );
        setPetData(response.data); // Set the pet data
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };

    getPets();
  }, [id]);

  // Function to handle the navigation
  const handleApplyToAdopt = () => {
    navigate("/adopt-to-pet"); // Navigate to the Adoption Form page
  };

  return (
    <div className="pet-profile">
      <div className="profile-container">
        <div className="profile-grid">
          <div className="image-section">
            {petData.imageUrl && (
              <img
                src={petData.imageUrl}
                alt={petData.name}
                className="pet-image"
              />
            )}
            <h2 className="title">Meet {petData.name || "this pet"}!</h2>
          </div>

          <div className="details-section">
            <h1 className="pet-name">{petData.name || "Unknown Pet"}</h1>
            <div className="details-list">
              {[
                ["Breed", petData.breed],
                ["Color", petData.color],
                ["Age", petData.age],
                ["Sex", petData.sex],
                ["Contact NO", petData.contactNo],
              ].map(([label, value]) => (
                <div key={label} className="details-item">
                  <span className="details-label">{label}:</span>
                  <span className="details-value">
                    {value || "Not specified"}
                  </span>
                </div>
              ))}
            </div>
            <button className="adopt-button" onClick={handleApplyToAdopt}>
              Apply to Adopt
            </button>
          </div>
        </div>

        <div className="additional-info">
          <h3>Description</h3>
          <p>{petData.description || "No additional information provided."}</p>
        </div>
      </div>
    </div>
  );
};

export default PetProfilePage;
