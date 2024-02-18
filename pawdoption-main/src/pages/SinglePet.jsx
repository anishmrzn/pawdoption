import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import { usePetContext } from "../context/petContext";
import { FaPaw } from "react-icons/fa";

const API = "http://127.0.0.1:8000/api/get-pets/";

function SinglePet() {
  const { singlePet, getSinglePet, pets } = usePetContext();
  const { id } = useParams();

  useEffect(() => {
    getSinglePet(`${API}${id}/`);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <PageNav />

      <div className="flex-grow mx-auto p-8 bg-white shadow-lg rounded-lg flex justify-center items-center">
        {singlePet && (
          <div className="flex flex-col justify-center items-center lg:flex-row gap-16 lg:mt-5 ml-[1rem] md:ml-[3rem] lg:ml-[7rem] ">
            <img
              src={singlePet.petImgUrl}
              alt={`${singlePet.name} - ${singlePet.breed}`}
              className=" h-[25rem] rounded-xl object-cover shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 "
            />

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
                  <strong className="text-gray-800">Age:</strong>{" "}
                  {singlePet.age}
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
                  <strong className="text-gray-800">
                    Medical Description:
                  </strong>{" "}
                  {singlePet.medicalDescription || "Not available"}
                </div>
              </div>
              <Link to={`/adoptform/${id}`} className="button">
                Adopt
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default SinglePet;
