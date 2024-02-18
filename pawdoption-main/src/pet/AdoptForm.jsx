import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import PageNav from "../components/PageNav";
import { usePetContext } from "../context/petContext";
import axios from "axios";
const API = "http://127.0.0.1:8000/api/get-pets/";

function AdoptForm() {
  const { singlePet, getSinglePet } = usePetContext();
  const { id } = useParams();

  useEffect(() => {
    getSinglePet(`${API}${id}/`);
  }, [singlePet]);

  const petId = singlePet.petId;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [previous, setPrevious] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("email", email);
      formData.append("phone_number", phoneNumber);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("previous_pet_experience", previous);
      formData.append("petId", petId);

      await handleCheckout(formData);
      toast.success("Wait for approval");
    } catch (error) {
      toast.error("Error");
    }
  };

  const handleCheckout = async (formData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/AdoptionCheckout/",
        {
          petId: petId,
        }
      );

      const checkoutUrl = response.data.url;

      window.location.href = checkoutUrl;
    } catch (error) {
      toast.error("Unsuccessful");
    }
  };

  return (
    <>
      <PageNav />
      <div className="container mx-auto mt-16 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-center font-extrabold text-2xl mb-6">
          Fill out the Adoption Form
        </h1>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block font-semibold">
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border-2 rounded-md border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold">
              Email:
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 rounded-md border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block font-semibold">
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border-2 rounded-md border-gray-300 p-2 w-full"
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block font-semibold">
              Address:
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border-2 rounded-md border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block font-semibold">
              City:
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border-2 rounded-md border-gray-300 p-2 w-full"
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="previous" className="block font-semibold">
              Previous Pet Experience:
            </label>
            <input
              type="text"
              id="prevous"
              value={previous}
              onChange={(e) => setPrevious(e.target.value)}
              className="border-2 rounded-md border-gray-300 p-2 w-full"
            />
          </div>
          <p className="text-sm text-gray-500 mt-4 p-1 border border-gray-300 rounded-lg bg-gray-100">
            Disclaimer: A certain fee is required to deter misuse of pets. You
            will be redirected to the payment page to complete the transaction
            before proceeding.
          </p>
          <button
            onClick={handleSubmit}
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AdoptForm;
