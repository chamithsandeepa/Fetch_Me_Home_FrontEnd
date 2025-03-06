import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Pet } from "../../types/pet";

const PetProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
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
  const id = params.petId;

  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/pets/${id}`
        );
        setPetData(response.data);
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };

    getPets();
  }, [id]);

  const handleApplyToAdopt = () => {
    navigate("/adopt-to-pet");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-10 px-6 font-sans">
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="lg:grid lg:grid-cols-2 gap-6 p-8">
          <div className="text-center">
            {petData.imageUrl && (
              <motion.img
                src={petData.imageUrl}
                alt={petData.name}
                className="w-full h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
              />
            )}
            <h2 className="text-2xl font-semibold text-indigo-600 mt-4">
              Meet {petData.name || "this pet"}!
            </h2>
          </div>

          <div className="text-center lg:text-left">
            <motion.h1
              className="text-3xl font-bold text-indigo-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {petData.name || "Unknown Pet"}
            </motion.h1>

            <div className="mt-4">
              {[
                ["Breed", petData.breed],
                ["Color", petData.color],
                ["Age", petData.age],
                ["Sex", petData.sex],
                ["Contact No", petData.contactNo],
              ].map(([label, value], index) => (
                <motion.div
                  key={label}
                  className="flex justify-between items-center py-2 border-b border-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <span className="font-medium text-gray-600">{label}:</span>
                  <span className="text-gray-800">
                    {value || "Not specified"}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={handleApplyToAdopt}
              className="mt-6 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:from-indigo-700 hover:to-purple-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply to Adopt
            </motion.button>
          </div>
        </div>

        <div className="mt-10 px-6">
          <h3 className="text-2xl font-semibold text-indigo-700">
            Description
          </h3>
          <p className="text-lg text-gray-600 mt-4">
            {petData.description || "No additional information provided."}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PetProfilePage;
