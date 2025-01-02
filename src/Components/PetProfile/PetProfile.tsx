import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import "./PetProfile.css";
import rex from "../../assets/rex.jpg";

interface PetProfile {
  name: string;
  breed: string;
  color: string;
  age: string;
  sex: string;
  birthCertificate: string;
  size: string;
  contact: string;
  description: string;
  socialInfo: string;
  medicalInfo: string;
  imageUrl: string;
}

const PetProfilePage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch or filter pet data based on petId, here we use a static pet for simplicity
  const petData: PetProfile = {
    name: "REX",
    breed: "Labrador",
    color: "Brown",
    age: "6 months old",
    sex: "Male",
    birthCertificate: "pdf",
    size: "Medium",
    contact: "+123 456 7890",
    description:
      "Rex is a lively Labrador mix looking for his forever home. He's a playful, affectionate pup who gets along well with other dogs and is learning how to play and walk nicely on a lead.",
    socialInfo:
      "Rex has had limited human socialization early in life and still needs house training, but he's making great progress.",
    medicalInfo:
      "Rex is vaccinated, microchipped, and treated for fleas and worms.",
    imageUrl: rex, // Use the imported image
  };

  // Function to handle the navigation
  const handleApplyToAdopt = () => {
    navigate("/adopt-to-pet"); // Navigate to the Adoption Form page
  };

  return (
    <div className="pet-profile">
      <div className="profile-container">
        <div className="profile-grid">
          <div className="image-section">
            <img
              src={petData.imageUrl}
              alt={petData.name}
              className="pet-image"
            />
            <h2 className="title">Meet {petData.name}!</h2>
            <p className="description">{petData.description}</p>
          </div>

          <div className="details-section">
            <div className="availability">Available to Adopt</div>
            <h1 className="pet-name">{petData.name}</h1>
            <div className="details-list">
              {[
                ["Breed", petData.breed],
                ["Color", petData.color],
                ["Age", petData.age],
                ["Sex", petData.sex],
                ["Birth Certificate", petData.birthCertificate],
                ["Size", petData.size],
              ].map(([label, value]) => (
                <div key={label} className="details-item">
                  <span className="details-label">{label}:</span>
                  <span className="details-value">{value}</span>
                </div>
              ))}
            </div>
            <div className="contact-info">
              <span>Contact:</span>
              <p>{petData.contact}</p>
            </div>
            <button className="adopt-button" onClick={handleApplyToAdopt}>
              Apply to Adopt
            </button>
          </div>
        </div>

        <div className="additional-info">
          <h3>Description</h3>
          <p>{petData.socialInfo}</p>
          <p>{petData.medicalInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default PetProfilePage;
