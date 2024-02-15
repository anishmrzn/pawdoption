import { useParams } from "react-router-dom";
import { useEffect } from "react";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import { usePetContext } from "../context/petContext";
import { FaPaw } from "react-icons/fa"; // You may need to install this library for the paw icon

const API = "http://127.0.0.1:8000/api/get-pets/";

function SinglePet() {
  const { singlePet, getSinglePet } = usePetContext();
  const { id } = useParams();

  useEffect(() => {
    getSinglePet(`${API}${id}/`);
  }, [singlePet]);

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <PageNav />

      {singlePet && (
        <div className="flex flex-col items-center lg:flex-row gap-8 lg:mt-5">
          <div className="w-full lg:w-1/2">
            <img
              src={singlePet.petImgUrl}
              alt={`${singlePet.name} - ${singlePet.breed}`}
              className="w-full h-auto rounded-xl object-cover shadow-lg hover:shadow-xl transition-all duration-500"
            />
          </div>

          <div className="flex flex-col items-center lg:items-start gap-6 lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              {singlePet.name}
            </h1>

            <p className="text-lg text-gray-700 max-w-md">
              {singlePet.description}
            </p>

            <div className="flex items-center text-gray-700 mt-4">
              <FaPaw className="text-xl mr-2" />
              <span className="text-sm">Adoptable {singlePet.animal}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 text-center lg:text-left text-gray-700">
              <div>
                <strong className="text-gray-800">Age:</strong> {singlePet.age}
              </div>
              <div>
                <strong className="text-gray-800">Breed:</strong>{" "}
                {singlePet.breed}
              </div>
              <div>
                <strong className="text-gray-800">Gender:</strong>{" "}
                {singlePet.gender}
              </div>
              <div>
                <strong className="text-gray-800">Vaccinated:</strong>{" "}
                {singlePet.vaccinated ? "Yes" : "No"}
              </div>
              <div colSpan={2}>
                <strong className="text-gray-800">Medical Description:</strong>{" "}
                {singlePet.medicalDescription || "Not available"}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default SinglePet;
