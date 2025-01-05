import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./AdoptPet.css";
import dog1 from "../../assets/dog1.jpg";
import cat1 from "../../assets/cat1.jpg";
import bird1 from "../../assets/dog2.jpg";
import { Search, RefreshCw } from "lucide-react";

interface Pet {
  id: string;
  name: string;
  type: string;
  age: string;
  location: string;
  imageUrl: string;
}

interface Filters {
  species: string;
  gender: string;
  age: string;
  color: string;
}

const PetAdoptionPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    species: "",
    gender: "",
    age: "",
    color: "",
  });

  const [visiblePets, setVisiblePets] = useState<number>(6);

  const samplePets: Pet[] = [
    {
      id: "1",
      name: "Rex",
      type: "Dog",
      age: "6 months",
      location: "Kandy",
      imageUrl: dog1,
    },
    {
      id: "2",
      name: "Milo",
      type: "Cat",
      age: "2 years",
      location: "Galle",
      imageUrl: cat1,
    },
    {
      id: "3",
      name: "Charlie",
      type: "Dog",
      age: "1 year",
      location: "Colombo",
      imageUrl: dog1,
    },
    {
      id: "4",
      name: "Bella",
      type: "Bird",
      age: "8 months",
      location: "Matara",
      imageUrl: bird1,
    },
    {
      id: "5",
      name: "Max",
      type: "Dog",
      age: "3 years",
      location: "Kandy",
      imageUrl: dog1,
    },
    {
      id: "6",
      name: "Whiskers",
      type: "Cat",
      age: "5 months",
      location: "Galle",
      imageUrl: cat1,
    },
    {
      id: "7",
      name: "Polly",
      type: "Bird",
      age: "1 year",
      location: "Matale",
      imageUrl: bird1,
    },
    {
      id: "8",
      name: "Coco",
      type: "Rabbit",
      age: "2 years",
      location: "Nuwara Eliya",
      imageUrl: dog1,
    },
  ];

  const resetFilters = (): void => {
    setFilters({ species: "", gender: "", age: "", color: "" });
  };

  const loadMorePets = (): void => {
    setVisiblePets((prev) => prev + 6);
  };

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
              <button className="adoption-btn search">
                <Search size={16} /> Search
              </button>
            </div>
          </aside>

          {/* Pet Cards Grid */}
          <main className="adoption-pet-grid">
            {samplePets.slice(0, visiblePets).map((pet) => (
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
                  <p>Type: {pet.type}</p>
                  <p>Age: {pet.age}</p>
                  <p>Location: {pet.location}</p>
                </div>
              </div>
            ))}
            {visiblePets < samplePets.length && (
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
