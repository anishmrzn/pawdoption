import React, { useState, useEffect } from "react";
import PageNav from "../components/PageNav";
import PetContainer from "../components/PetContainer";
import { usePetContext } from "../context/petContext";

function AdoptPet() {
  const { pets } = usePetContext();
  const [searchBreed, setSearchBreed] = useState("");
  const [petType, setPetType] = useState("all");
  const [showScrollButton, setShowScrollButton] = useState(false);

  const filteredPets = pets.filter((pet) => {
    const byBreed = pet.breed.toLowerCase().includes(searchBreed.toLowerCase());
    const byType = petType === "all" || pet.animal.toLowerCase() === petType;
    return byBreed && byType;
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollButton(scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto p-8">
      <PageNav />

      <h1 className="text-4xl font-bold text-center mb-8 mt-10">
        Adopt a Furry Friend
      </h1>

      <div className="flex justify-between items-center mb-6">
        {/* Existing code for pet type buttons */}
        <div className="flex gap-10 ml-10">
          <button
            className={`type-btn text-2xl font-semibold hover:text-gray-500 transition-all duration-500 ${
              petType === "all" ? "active" : ""
            }`}
            onClick={() => setPetType("all")}
          >
            All
          </button>
          <button
            className={`type-btn text-2xl font-semibold hover:text-gray-500 transition-all duration-500 ${
              petType === "dog" ? "active" : ""
            }`}
            onClick={() => setPetType("dog")}
          >
            Dogs
          </button>
          <button
            className={`type-btn text-2xl font-semibold hover:text-gray-500 transition-all duration-500 ${
              petType === "cat" ? "active" : ""
            }`}
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
          className="border border-gray-300 p-3 rounded-xl w-64 ml-2 mr-10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8">
        {filteredPets.map((pet) => (
          <PetContainer key={pet.petId} pets={pet} />
        ))}
      </div>

      {showScrollButton && (
        <button
          className="fixed bottom-7 right-7 bg-blue-500 text-white text-2xl px-3 py-2 rounded-full"
          onClick={scrollToTop}
        >
          <ion-icon name="arrow-up-outline"></ion-icon>
        </button>
      )}
    </div>
  );
}

export default AdoptPet;
