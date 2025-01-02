import React, { useState } from "react";
import "./PetList.css";
import { Plus, Trash2 } from "lucide-react";
import AdminNavBar from "../AdminNavBar/AdminNavBar";

interface Pet {
  id: string;
  species: string;
  name: string;
  color: string;
  sex: string;
}

const PetListPage = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [newPet, setNewPet] = useState<Partial<Pet>>({});

  const addPet = () => {
    if (newPet.species && newPet.name && newPet.color && newPet.sex) {
      setPets([...pets, { ...newPet, id: Date.now().toString() } as Pet]);
      setNewPet({});
    }
  };

  const removePet = (id: string) => {
    setPets(pets.filter((pet) => pet.id !== id));
  };

  return (
    <div className="page">
      {/* Include AdminNavBar */}
      <AdminNavBar />
      <div className="container">
        <div className="header">
          <h1 className="title">Listed Pets</h1>
          <button onClick={addPet} className="btn add-btn">
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
              {/* Input row */}
              <tr>
                <td className="center">Auto-generated</td>
                <td>
                  <input
                    type="text"
                    value={newPet.species || ""}
                    onChange={(e) =>
                      setNewPet({ ...newPet, species: e.target.value })
                    }
                    className="input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newPet.name || ""}
                    onChange={(e) =>
                      setNewPet({ ...newPet, name: e.target.value })
                    }
                    className="input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newPet.color || ""}
                    onChange={(e) =>
                      setNewPet({ ...newPet, color: e.target.value })
                    }
                    className="input"
                  />
                </td>
                <td>
                  <select
                    value={newPet.sex || ""}
                    onChange={(e) =>
                      setNewPet({ ...newPet, sex: e.target.value })
                    }
                    className="select"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </td>
                <td></td>
              </tr>
              {/* Pet list rows */}
              {pets.map((pet) => (
                <tr key={pet.id}>
                  <td className="center">{pet.id}</td>
                  <td>{pet.species}</td>
                  <td>{pet.name}</td>
                  <td>{pet.color}</td>
                  <td>{pet.sex}</td>
                  <td className="action-cell">
                    <button
                      onClick={() => removePet(pet.id)}
                      className="btn delete-btn"
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
