import { Link } from "react-router-dom";

function PetContainer({ pets }) {
  return (
    <Link to={`/singlepet/${pets.petId}`}>
      <div className="mt-10">
        <div className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg w-[20rem] max-w-[15rem] h-[23rem] mx-auto">
          <div className="relative aspect-w-4 aspect-h-5">
            <img
              src={pets.petImgUrl}
              alt={pets.name}
              className="object-cover w-full h-[15rem] transform hover:scale-110 transition-all duration-500"
            />
          </div>
          <div className="p-4">
            <h3 className="text-center font-bold text-lg mb-2">{pets.name}</h3>
            <h3 className="text-center font-bold text-lg mb-2">{pets.breed}</h3>
            <p className="text-center text-gray-700">{pets.description}</p>
            <div className="mt-3 text-center text-sm text-gray-500">
              <span>Posted by: {pets.username}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PetContainer;
