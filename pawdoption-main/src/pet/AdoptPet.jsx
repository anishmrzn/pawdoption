// AdoptPet.jsx
import React, { useState, useEffect } from "react";
import PageNav from "../components/PageNav";
import PetContainer from "../components/PetContainer";
import { usePetContext } from "../context/petContext";

function AdoptPet() {
  const { pets } = usePetContext();
  const [searchBreed, setSearchBreed] = useState("");
  const [petType, setPetType] = useState("all");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPets = filteredPets.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-8">
      <PageNav />

      <h1 className="text-4xl font-bold text-center mb-8 mt-10">
        Adopt a Furry Friend
      </h1>

      <div className="flex justify-between items-center mb-6">
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
        {currentPets.map((pet) => (
          <PetContainer key={pet.petId} pets={pet} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          className={`${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-800 hover:bg-blue-900"
          } text-white px-4 py-2 rounded-full mx-2 transition-all duration-300`}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={`${
            currentPage === Math.ceil(filteredPets.length / itemsPerPage)
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-800 hover:bg-blue-900"
          } text-white px-4 py-2 rounded-full mx-2 transition-all duration-300`}
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(filteredPets.length / itemsPerPage)
          }
        >
          Next
        </button>
      </div>

      {showScrollButton && (
        <button
          className="fixed bottom-7 right-7 bg-blue-800 text-white text-2xl px-3 py-2 rounded-full"
          onClick={scrollToTop}
        >
          <ion-icon name="arrow-up-outline"></ion-icon>
        </button>
      )}
    </div>
  );
}

export default AdoptPet;
