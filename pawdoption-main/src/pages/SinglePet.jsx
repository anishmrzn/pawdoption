import { useParams } from "react-router-dom";
import { useEffect } from "react";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import { usePetContext } from "../context/petContext";
const API = "http://127.0.0.1:8000/api/get-pets/";

function SinglePet() {
  const { singlePet, getSinglePet } = usePetContext();

  const { id } = useParams();

  useEffect(() => {
    getSinglePet(`${API}${id}/`);
  }, []);

  // window.location.reload();

  return (
    <div className="flex flex-col gap-20 md:gap-[10rem] ">
      <PageNav />
      <div className="flex flex-col md:flex-row gap-16 lg:gap-16">
        <div className="flex flex-col items-center ml-[8rem] md:ml-[0] w-[20rem] md:w-[40rem] border-2 border-black px-5 py-5 rounded-xl">
          {singlePet && (
            <img
              src={singlePet.petImgUrl}
              alt="product"
              className="w-[18rem] md:w-[45rem] rounded-xl transform hover:scale-105 transition-all duration-500"
            ></img>
          )}
        </div>
        <div className="flex flex-col gap-6 lg:mt-[5rem]">
          {singlePet && (
            <h1 className="text-2xl lg:text-3xl font-extrabold">
              {singlePet.name}
            </h1>
          )}

          {singlePet && (
            <p className="text-lg w-[30rem]">{singlePet.description}</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SinglePet;
