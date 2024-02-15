import React, { useState } from "react";
import PageNav from "../components/PageNav";
import PetContainer from "../components/PetContainer";
import { usePetContext } from "../context/petContext";

function AdoptPet() {
  const { pets } = usePetContext();
  const [searchBreed, setSearchBreed] = useState("");
  const [petType, setPetType] = useState("all");

  const filteredPets = pets.filter((pet) => {
    const byBreed = pet.breed.toLowerCase().includes(searchBreed.toLowerCase());
    const byType = petType === "all" || pet.animal.toLowerCase() === petType;
    return byBreed && byType;
  });

  return (
    <div className="container mx-auto p-8">
      <PageNav />

      <h1 className="text-4xl font-bold text-center mb-8 mt-10">
        Adopt a Furry Friend
      </h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-10 ml-10">
          <button
            className={`type-btn ${
              petType === "all"
            } text-2xl font-semibold hover:text-gray-500 transition-all duration-500`}
            onClick={() => setPetType("all")}
          >
            All
          </button>
          <button
            className={`type-btn ${
              petType === "dog"
            } text-2xl font-semibold hover:text-gray-500 transition-all duration-500`}
            onClick={() => setPetType("dog")}
          >
            Dogs
          </button>
          <button
            className={`type-btn ${
              petType === "cat"
            } text-2xl font-semibold hover:text-gray-500 transition-all duration-500`}
            onClick={() => setPetType("cat")}
          >
            Cats
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by Breed"
          value={searchBreed}
          onChange={(e) => setSearchBreed(e.target.value)}
          className="border border-gray-300 p-3 rounded-xl w-64  ml-2 mr-10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredPets.map((pet) => (
          <PetContainer key={pet.petId} pets={pet} />
        ))}
      </div>
    </div>
  );
}

export default AdoptPet;
