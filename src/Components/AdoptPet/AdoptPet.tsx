import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, RefreshCw } from "lucide-react";
import axios from "axios";
import { Pet } from "../../types/pet";

interface Filters {
  species: string;
  sex: string;
  age: string;
  color: string;
  description?: string;
}

const PetAdoptionPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    species: "",
    sex: "",
    age: "",
    color: "",
    description: "",
  });
  const [visiblePets, setVisiblePets] = useState<number>(6);
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);

  const resetFilters = (): void => {
    setFilters({ species: "", sex: "", age: "", color: "" });
  };

  const loadMorePets = (): void => {
    setVisiblePets((prev) => prev + 6);
  };

  useEffect(() => {
    const getPets = async () => {
      const response = await axios.get("http://localhost:8080/api/pets");
      setPets(response.data);
      setPets((prev) => {
        return prev.filter((pet) => pet.adopted === false);
      });
    };
    getPets();
  }, []);

  const handleFilter = (): void => {
    const filtered = pets.filter((pet) => {
      return (
        (filters.species === "" || pet.species === filters.species) &&
        (filters.age === "" ||
          pet.age
            .toString()
            .toLowerCase()
            .includes(filters.age.toString().toLowerCase())) &&
        (filters.color === "" ||
          pet.color
            .toString()
            .toLowerCase()
            .includes(filters.color.toLowerCase())) &&
        (filters.sex === "" || pet.sex.toString() === filters.sex)
      );
    });
    setFilteredPets(filtered);
    setVisiblePets(6); // Reset visible pets count when filtering
  };

  useEffect(() => {
    setFilteredPets(pets);
  }, [pets]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 p-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow-lg sticky top-8">
            <h3 className="text-lg font-semibold text-blue-600 uppercase tracking-wide mb-4">
              Filters
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Species</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={filters.species}
                  onChange={(e) =>
                    setFilters({ ...filters, species: e.target.value })
                  }
                >
                  <option value="">All Species</option>
                  <option value="dog">Doooooog</option>
                  <option value="cat">Cat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Gender</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={filters.sex}
                  onChange={(e) =>
                    setFilters({ ...filters, sex: e.target.value })
                  }
                >
                  <option value="">All Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Age</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Age"
                  value={filters.age}
                  onChange={(e) =>
                    setFilters({ ...filters, age: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Color</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Color"
                  value={filters.color}
                  onChange={(e) =>
                    setFilters({ ...filters, color: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={resetFilters}
                  className="flex items-center justify-center gap-2 bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                >
                  <RefreshCw size={16} /> Reset
                </button>
                <button
                  onClick={handleFilter}
                  className="flex items-center justify-center gap-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
                >
                  <Search size={16} /> Search
                </button>
              </div>
            </div>
          </aside>
          {/* Pet Cards */}
          <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.slice(0, visiblePets).map((pet) => (
              <div
                key={pet.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-1"
              >
                <Link to={`/pet-profile/${pet.id}`}>
                  <img
                    src={pet.imageUrl}
                    alt={pet.name}
                    className="w-full h-56 object-cover hover:scale-105 transition-transform"
                  />
                </Link>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-blue-600">
                    {pet.name}
                  </h3>
                  <p className="text-sm text-gray-600">Breed: {pet.breed}</p>
                  <p className="text-sm text-gray-600">Age: {pet.age}</p>
                  <p className="text-sm text-gray-600">
                    Location: {pet.location}
                  </p>
                </div>
              </div>
            ))}
            {filteredPets.length > visiblePets && filteredPets.length > 0 && (
              <button
                onClick={loadMorePets}
                className="col-span-full bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-700"
              >
                Load More
              </button>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PetAdoptionPage;
