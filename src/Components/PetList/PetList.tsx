import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PetList.css";

interface Pet {
  id: string;
  species: string;
  name: string;
  color: string;
  sex: string;
}

const PetListPage = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [editingPetId, setEditingPetId] = useState<string | null>(null);
  const [editedPetData, setEditedPetData] = useState<Partial<Pet>>({});
  const navigate = useNavigate();

  const fetchPets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/pets");
      setPets(response.data);
    } catch (err) {
      console.error("Failed to fetch pets:", err);
    }
  };

  const removePet = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/pets/${id}`);
      setPets((prev) => prev.filter((pet) => pet.id !== id));
    } catch (err) {
      console.error("Failed to remove pet:", err);
    }
  };

  const handleEditClick = (pet: Pet) => {
    setEditingPetId(pet.id);
    setEditedPetData({ ...pet });
  };

  const handleInputChange = (field: keyof Pet, value: string) => {
    setEditedPetData((prev) => ({ ...prev, [field]: value }));
  };

  const saveEditedPet = async () => {
    if (!editingPetId || !editedPetData) return;

    try {
      await axios.put(
        `http://localhost:8080/api/pets/${editingPetId}`,
        editedPetData
      );
      setPets((prev) =>
        prev.map((pet) =>
          pet.id === editingPetId ? { ...pet, ...editedPetData } : pet
        )
      );
      setEditingPetId(null);
      setEditedPetData({});
    } catch (err) {
      console.error("Failed to save edited pet:", err);
    }
  };

  const saveAllChanges = async () => {
    if (!editingPetId || !editedPetData) return;

    try {
      await saveEditedPet();
      alert("Changes saved successfully!");
    } catch (err) {
      console.error("Failed to save all changes:", err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="header">
          <h1 className="title">Listed Pets</h1>
          <button
            onClick={() => navigate("/admin/add-pet")}
            className="btn add-btn"
          >
            <Plus size={20} />
            Add
          </button>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Pet ID</th>
                <th>Species</th>
                <th>Name</th>
                <th>Color</th>
                <th>Sex</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr key={pet.id}>
                  <td className="center">{pet.id}</td>
                  <td>
                    {editingPetId === pet.id ? (
                      <input
                        type="text"
                        value={editedPetData.species || ""}
                        onChange={(e) =>
                          handleInputChange("species", e.target.value)
                        }
                        className="input"
                      />
                    ) : (
                      pet.species
                    )}
                  </td>
                  <td>
                    {editingPetId === pet.id ? (
                      <input
                        type="text"
                        value={editedPetData.name || ""}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="input"
                      />
                    ) : (
                      pet.name
                    )}
                  </td>
                  <td>
                    {editingPetId === pet.id ? (
                      <input
                        type="text"
                        value={editedPetData.color || ""}
                        onChange={(e) =>
                          handleInputChange("color", e.target.value)
                        }
                        className="input"
                      />
                    ) : (
                      pet.color
                    )}
                  </td>
                  <td>
                    {editingPetId === pet.id ? (
                      <select
                        value={editedPetData.sex || ""}
                        onChange={(e) =>
                          handleInputChange("sex", e.target.value)
                        }
                        className="select"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    ) : (
                      pet.sex
                    )}
                  </td>
                  <td className="action-cell">
                    {editingPetId === pet.id ? (
                      <button onClick={saveEditedPet} className="btn save-btn">
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(pet)}
                          className="btn edit-btn"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => removePet(pet.id)}
                          className="btn delete-btn"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="save-all-wrapper">
          <button onClick={saveAllChanges} className="btn save-all-btn">
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetListPage;
