import { Link } from "react-router-dom";

function Adoption() {
  return (
    <div className="border-2 px-10 py-5 rounded-xl">
      <h1 className="text-[#c9a687] font-bold text-2xl text-center mb-10 ">
        Adoption
      </h1>
      <div
        className="flex flex-col md:flex-row md:text-xl lg:text-2xl items-center justify-center gap-10 md:gap-28 "
        data-aos="zoom-in"
      >
        <div className="flex flex-col items-center justify-center gap-5">
          <Link
            to="/rehome"
            className=" relative overflow-hidden rounded-xl transform hover:scale-110 transition-all duration-500 "
          >
            <img
              src="/rehome.jpeg"
              alt="Rehome Background"
              className=" h-[15rem] w-[20rem]  object-cover "
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(0,0,0,0.5)] via-transparent to-transparent flex flex-col items-center justify-center">
              <h1 className="text-white font-bold text-2xl mb-2">
                Rehome Your Pet
              </h1>
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <Link
            to="/adopt"
            className=" relative overflow-hidden rounded-xl transform hover:scale-110 transition-all duration-500"
          >
            <img
              src="/adopt.jpg"
              alt="Adopt Background"
              className="h-[15rem] w-[20rem] object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(0,0,0,0.5)] via-transparent to-transparent flex flex-col items-center justify-center">
              <h1 className="text-white font-bold text-2xl mb-2">
                Adopt a Pet
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Adoption;
