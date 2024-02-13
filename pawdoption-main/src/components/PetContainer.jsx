import { Link } from "react-router-dom";

function PetContainer({ pets }) {
  console.log(pets);
  return (
    <Link to={`/singlepet/${pets.petId}`}>
      <div className="mt-10">
        <h1 className="text-center">Select the pet you want to adopt</h1>
        <div className="border-2 rounded-xl overflow-hidden flex flex-col gap-5 cursor-pointer hover:shadow-2xl w-[15rem] h-[25rem]">
          <div className="justify-center align-center flex w-full">
            <img
              src={pets.petImgUrl}
              alt="Items"
              className="w-full h-[15rem] transform hover:scale-110 transition-all duration-500 "
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-center font-bold">{pets.name}</h3>

            <p className="text-center">{pets.description}</p>
          </div>
          <div>{pets.username}</div>
        </div>
      </div>
    </Link>
  );
}

export default PetContainer;
