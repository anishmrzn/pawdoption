import React, { useState } from "react";
import PageNav from "../components/PageNav";
import PetContainer from "../components/PetContainer";
import { usePetContext } from "../context/petContext";

function AdoptPet() {
  const { pets } = usePetContext();
  const [searchBreed, setSearchBreed] = useState("");
  const filteredPets = pets.filter((pet) =>
    pet.breed.toLowerCase().includes(searchBreed.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8">
      <PageNav />

      <h1 className="text-4xl font-bold text-center mb-8 mt-10">
        Adopt a Furry Friend
      </h1>

      <div className="flex justify-end mb-6">
        <input
          type="text"
          placeholder="Search by Breed"
          value={searchBreed}
          onChange={(e) => setSearchBreed(e.target.value)}
          className="border border-gray-300 p-3 rounded-md w-64 focus:outline-none"
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
