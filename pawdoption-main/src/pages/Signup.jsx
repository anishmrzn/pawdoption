import { useState } from "react";
import PageNav from "../components/PageNav";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    // console.log(e.target);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log(response);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error during signup: ", error);
    }
  };

  return (
    <div className="relative h-[30rem]">
      <PageNav />

      <div className="border-2 w-[20rem] lg:w-[32rem] felx  flex-col p-5 justify-center h-[40rem] px-10 absolute top-[90%] left-[50%]  translate-x-[-50%] translate-y-[-50%]">
        <h1 className="text-center text-2xl font-bold">Signup</h1>
        <form className="mt-5 flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row  gap-10">
            <div className="flex flex-col gap-5">
              <label htmlFor="name" className="font-bold">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border-2 border-black rounded-md px-2 py-1"
                placeholder="name"
              ></input>
            </div>
            <div className="flex flex-col gap-5">
              <label htmlFor="name" className="font-bold">
                Username
              </label>
              <input
                type="text"
                name={"username"}
                value={formData.username}
                // onChange={handleUsernameChange}
                // onClick={(e) => console.log(e)}
                onChange={handleChange}
                className="border-2 border-black rounded-md px-2 py-1"
                placeholder="Username"
              ></input>
            </div>
          </div>
          <label htmlFor="email" className="font-bold">
            E-mail
          </label>
          <input
            type="email"
            name={"email"}
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-black rounded-md px-2 py-1"
            placeholder="example@gmail.com"
          ></input>

          <label htmlFor="name" className="font-bold">
            Password
          </label>
          <input
            type="password"
            name={"password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="*******"
            className="border-2 border-black rounded-md px-2 py-1"
          ></input>
          <label htmlFor="name" className="font-bold">
            Confirm Password
          </label>
          <input
            type="password"
            name={"confirm_password"}
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="*******"
            className="border-2 border-black rounded-md px-2 py-1"
          ></input>
          <button
            onClick={handleSubmit}
            value="Signup"
            name="Signup "
            className="button"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
