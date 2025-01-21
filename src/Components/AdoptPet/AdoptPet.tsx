import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./AdoptPet.css";
import { Search, RefreshCw } from "lucide-react";
import axios from "axios";
import { Pet } from "../../types/pet";


interface Filters {
  species: string;
  gender: string;
  age: string;
  color: string;
  description?: string;
}

const PetAdoptionPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    species: "",
    gender: "",
    age: "",
    color: "",
    description: "",
  });

  const [visiblePets, setVisiblePets] = useState<number>(6);
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);

  const resetFilters = (): void => {
    setFilters({ species: "", gender: "", age: "", color: "" });
  };

  const loadMorePets = (): void => {
    setVisiblePets((prev) => prev + 6);
  };

  useEffect(() => {
    const getPets = async () => {
      const response = await axios.get("http://localhost:8080/api/pets");
      setPets(response.data);
    };

    getPets();
  }, []);

  const handleFilter = (): void => {
    if (filters.species === "" && filters.age === "") {
      setFilteredPets(pets);
      return;
    }

    const filteredPets = pets.filter((pet) => {
      return (
        (filters.species === "" || pet.species === filters.species) &&
        (filters.age === "" || pet.age.toString() === filters.age)&&
        (filters.color === "" || pet.color === filters.color) &&
        (filters.gender === "" || pet.gender === filters.gender)
      );
    });

    setFilteredPets(filteredPets);
  };

  console.log(filteredPets);

  useEffect(() => {
    setFilteredPets(pets);
  }, [pets]);

  return (
    <div className="adoption-page">
      <div className="adoption-container">
        <div className="adoption-content">
          {/* Filters Sidebar */}
          <aside className="adoption-filters">
            <div className="adoption-filter-group">
              <label htmlFor="species">Species</label>
              <select
                id="species"
                value={filters.species}
                onChange={(e) =>
                  setFilters({ ...filters, species: e.target.value })
                }
              >
                <option value="">Select Species</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
                <option value="rabbit">Rabbit</option>
              </select>
            </div>

            <div className="adoption-filter-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={filters.gender}
                onChange={(e) =>
                  setFilters({ ...filters, gender: e.target.value })
                }
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="adoption-filter-group">
              <label htmlFor="age">Age</label>
              <select
                id="age"
                value={filters.age}
                onChange={(e) =>
                  setFilters({ ...filters, age: e.target.value })
                }
              >
                <option value="">Select Age</option>
                <option value="puppy">Puppy</option>
                <option value="young">Young</option>
                <option value="adult">Adult</option>
              </select>
            </div>

            <div className="adoption-filter-group">
              <label htmlFor="color">Color</label>
              <select
                id="color"
                value={filters.color}
                onChange={(e) =>
                  setFilters({ ...filters, color: e.target.value })
                }
              >
                <option value="">Select Color</option>
                <option value="brown">Brown</option>
                <option value="black">Black</option>
                <option value="white">White</option>
              </select>
            </div>

            <div className="adoption-filter-actions">
              <button onClick={resetFilters} className="adoption-btn reset">
                <RefreshCw size={16} /> Reset
              </button>
              <button className="adoption-btn search" onClick={handleFilter}>
                <Search size={16} /> Search
              </button>
            </div>
          </aside>

          {/* Pet Cards Grid */}
          <main className="adoption-pet-grid">
            {filteredPets.slice(0, visiblePets).map((pet) => (
              <div key={pet.id} className="adoption-pet-card">
                {/* Use Link to navigate to pet profile page */}
                <Link to={`/pet-profile/${pet.id}`}>
                  <img
                    src={pet.imageUrl}
                    alt={pet.name}
                    className="adoption-pet-img"
                  />
                </Link>
                <div className="adoption-pet-info">
                  <h3 className="adoption-pet-name">{pet.name}</h3>
                  <p>Breed: {pet.breed}</p>
                  <p>Age: {pet.age}</p>
                  <p>Location: {pet.location}</p>
                </div>
              </div>
            ))}
            {visiblePets < pets.length && (
              <div className="adoption-load-more-wrapper">
                <button
                  onClick={loadMorePets}
                  className="adoption-btn load-more"
                >
                  Load More
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PetAdoptionPage;
