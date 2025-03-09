import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import axios from "axios";
import { Pet } from "../../types/pet";

const PetListPage = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [newPet, setNewPet] = useState<Omit<Pet, "id">>({
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
    adopted: false,
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

  const handleAddPet = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/pets",
        newPet
      );
      setPets((prev) => [...prev, response.data]);
      setNewPet({
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
        adopted: false,
      });
    } catch (err) {
      console.error("Failed to add new pet:", err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Pet Management System
          </h1>
          <button
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={handleAddPet}
          >
            <Plus size={20} />
            Add New Pet
          </button>
        </div>

        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full table-auto">
            <thead className="bg-blue-500 text-white text-left">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Species</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Breed</th>
                <th className="px-4 py-2">Sex</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Color</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2 w-1/4">Description</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr
                  key={pet.id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-4 py-2">{pet.id}</td>
                  <td className="px-4 py-2">{pet.species}</td>
                  <td className="px-4 py-2">{pet.name}</td>
                  <td className="px-4 py-2">{pet.breed}</td>
                  <td className="px-4 py-2">{pet.sex}</td>
                  <td className="px-4 py-2">{pet.age}</td>
                  <td className="px-4 py-2">{pet.color}</td>
                  <td className="px-4 py-2">{pet.location}</td>
                  <td className="px-4 py-2">{pet.contactNo}</td>
                  <td className="px-4 py-2 w-1/4 break-words">
                    {pet.description}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => removePet(pet.id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
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
