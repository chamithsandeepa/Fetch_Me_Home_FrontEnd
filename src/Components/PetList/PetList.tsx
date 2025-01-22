import { useEffect, useState } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import axios from "axios";
import "./PetList.css";
import { Pet } from "../../types/pet";


const PetListPage = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [editingPetId, setEditingPetId] = useState<string | null>(null);
  const [editedPetData, setEditedPetData] = useState<Partial<Pet>>({});
  const [newPet, setNewPet] = useState<Pet>({
    id: "",
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

  const handleInputChange = (field: keyof Pet, value: string | number) => {
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

  const handleAddPet = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/pets",
        newPet
      );
      setPets((prev) => [...prev, response.data]);
      setNewPet({
              id: "",
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
              // gender: "",
            });
    } catch (err) {
      console.error("Failed to add new pet:", err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const renderEditableCell = (
    pet: Pet,
    field: keyof Pet,
    type: string = "text"
  ) => {
    if (editingPetId === pet.id) {
      if (field === "sex") {
        return (
          <select
            value={editedPetData[field] || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="select"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        );
      } else if (field === "description") {
        return (
          <textarea
            value={editedPetData[field] || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="textarea"
          />
        );
      } else {
        return (
          <input
            type={type}
            value={editedPetData[field] || ""}
            onChange={(e) =>
              handleInputChange(
                field,
                type === "number" ? Number(e.target.value) : e.target.value
              )
            }
            className="input"
          />
        );
      }
    }
    return pet[field];
  };

  return (
    <div className="page">
      <div className="container">
        <div className="header">
          <h1 className="title">Pet Management System</h1>
          <button className="btn add-btn" onClick={handleAddPet}>
            <Plus size={20} />
            Add New Pet
          </button>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Species</th>
                <th>Name</th>
                <th>Breed</th>
                <th>Sex</th>
                <th>Age</th>
                <th>Color</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr key={pet.id}>
                  <td>{pet.id}</td>
                  <td>{renderEditableCell(pet, "species")}</td>
                  <td>{renderEditableCell(pet, "name")}</td>
                  <td>{renderEditableCell(pet, "breed")}</td>
                  <td>{renderEditableCell(pet, "sex")}</td>
                  <td>{renderEditableCell(pet, "age", "number")}</td>
                  <td>{renderEditableCell(pet, "color")}</td>
                  <td>{renderEditableCell(pet, "location")}</td>
                  <td>{renderEditableCell(pet, "contactNo")}</td>
                  <td>{renderEditableCell(pet, "description")}</td>
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
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => removePet(pet.id)}
                          className="btn delete-btn"
                          title="Delete"
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
      </div>
    </div>
  );
};

export default PetListPage;
