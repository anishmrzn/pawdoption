import { useState } from "react";

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
  const [gender, setGender] = useState("");
  const [vaccinated, setVaccinated] = useState("");
  const [medicalDescription, setMedicalDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("petImg", petImg);
      formData.append("description", description);
      formData.append("name", name);
      formData.append("age", age);
      formData.append("breed", breed);
      formData.append("gender", gender);
      formData.append("vaccinated", vaccinated);
      formData.append("medicalDescription", medicalDescription);

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
        window.location.reload();
        toast.success("Wiat till the form gets approved");
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
      <div className="flex flex-col mt-16 gap-10 border-2 px-16 py-10 rounded-2xl shadow-xl ">
        <h1 className="text-center font-extrabold text-2xl">
          Fill the following Form
        </h1>
        <form className="grid grid-cols-3 gap-5 font-semibold">
          <label htmlFor="petImg">Pet Image :</label>
          <input
            type="file"
            id="petImg"
            accept="image/*"
            onChange={(e) => {
              setPetImg(e.target.files[0]);
            }}
            className="col-span-2 border-2  rounded-xl border-gray-400"
          />
          <label htmlFor="petName">Pet Name :</label>
          <input
            type="text"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            className="col-span-2 border-2 rounded-xl border-gray-400 py-1 px-5"
          />
          <label htmlFor="ShortDes">Pet Description :</label>
          <input
            type="text"
            id="ShortDes"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            maxLength="40"
            className="col-span-2 border-2 rounded-xl border-gray-400 py-1 px-5"
          />
          <label htmlFor="age">Age :</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
            className="col-span-2 border-2 rounded-xl border-gray-400 py-1 px-5"
          />
          <label htmlFor="gender">Gender :</label>
          <select
            type="text"
            id="gender"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
            className="col-span-2 border-2 rounded-xl border-gray-400 py-1 px-5"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label htmlFor="breed">Breed :</label>
          <input
            type="text"
            id="breed"
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
            className="col-span-2 border-2 rounded-xl border-gray-400 py-1 px-5"
          />
          <label htmlFor="vaccinated">Vacination :</label>
          <select
            type="text"
            id="gender"
            value={vaccinated}
            onChange={(e) => {
              setVaccinated(e.target.value);
            }}
            className="col-span-2 border-2 rounded-xl border-gray-400 py-1 px-5"
          >
            <option value="Vaccinated">Vaccinated</option>
            <option value="NotVaccinated">Not Vaccinated</option>
          </select>

          <label htmlFor="medicaldesc">Medical Description :</label>
          <input
            type="text"
            id="medicaldesc"
            onChange={(e) => {
              setMedicalDescription(e.target.value);
            }}
            value={medicalDescription}
            maxLength="40"
            className="col-span-2 border-2 rounded-xl border-gray-400 py-1 px-5"
          />
        </form>
        <button onClick={handleSubmit} className="button ">
          Submit
        </button>
      </div>
    </>
  );
}
export default RehomePet;
