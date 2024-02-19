import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";

function RehomePet() {
  const navigate = useNavigate();
  const [petImg, setPetImg] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(1);
  const [breed, setBreed] = useState("");
  const [animal, setAnimal] = useState("");
  const [gender, setGender] = useState("");
  const [vaccinated, setVaccinated] = useState("");
  const [medicalDescription, setMedicalDescription] = useState("");
  const [reason, setReason] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("petImg", petImg);
      formData.append("description", description);
      formData.append("name", name);
      formData.append("age", age);
      formData.append("breed", breed);
      formData.append("animal", animal);
      formData.append("gender", gender);
      formData.append("vaccinated", vaccinated);
      formData.append("medicalDescription", medicalDescription);
      formData.append("reason", reason);

      const token = localStorage.getItem("userToken");
      const response = await fetch("http://127.0.0.1:8000/api/add-pets/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        navigate("/adopt");
        toast.success("Wait until the form gets approved");
      } else {
        toast.error("Unsuccessful");
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <>
      <PageNav />
      <div className="container mx-auto mt-16 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-center font-extrabold text-2xl mb-6">
          Fill out the Adoption Form
        </h1>
        <form className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="petImg" className="block font-semibold">
              Pet Image:
            </label>
            <input
              type="file"
              id="petImg"
              accept="image/*"
              onChange={(e) => setPetImg(e.target.files[0])}
              className="border-2 rounded-md border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="petName" className="block font-semibold">
              Pet Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 rounded-md border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ShortDes" className="block font-semibold">
              Pet Description:
            </label>
            <input
              type="text"
              id="ShortDes"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 rounded-md border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="animal" className="block font-semibold">
              Animal:
            </label>
            <input
              type="text"
              id="gender"
              value={animal}
              onChange={(e) => setAnimal(e.target.value)}
              className="border-2 rounded-md border-gray-300 p-2 w-full"
              placeholder="Dog / Cat"
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block font-semibold">
              Age:
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border-2 rounded-md border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block font-semibold">
              Gender:
            </label>
            <input
              type="text"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border-2 rounded-md border-gray-300 p-2 w-full"
              placeholder="Male / Female"
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="breed" className="block font-semibold">
              Breed:
            </label>
            <input
              type="text"
              id="breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="border-2 rounded-md border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="vaccinated" className="block font-semibold">
              Vaccination:
            </label>
            <input
              type="text"
              id="vaccinated"
              value={vaccinated}
              onChange={(e) => setVaccinated(e.target.value)}
              className="border-2 rounded-md border-gray-300 p-2 w-full"
              placeholder="Vaccinated / Not Vaccinated"
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="medicaldesc" className="block font-semibold">
              Medical Description:
            </label>
            <input
              type="text"
              id="medicaldesc"
              value={medicalDescription}
              onChange={(e) => setMedicalDescription(e.target.value)}
              className="border-2 rounded-md border-gray-300 p-2 w-full"
            />
            <label htmlFor="reason" className="block font-semibold">
              Reason for Rehoming:
            </label>
            <input
              type="text"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border-2 rounded-md border-gray-300 p-2 w-full"
            />
          </div>
        </form>
        <button
          onClick={handleSubmit}
          className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full mt-4"
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default RehomePet;
