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
        window.location.replace("http://localhost:5173/login");
      } else {
        window.location.replace("http://localhost:5173/error");
      }
    } catch (error) {
      console.error("Error during signup: ", error);
    }
  };

  return (
    <div className="relative h-[30rem] ">
      <PageNav />
      <img
        src="/loginbg.png"
        alt="dogo"
        className="absolute top-[50%] left-[70%] hidden md:inline-block lg:left-[82%]"
      ></img>

      <div className="border-2 border-[#c9a687]  flex flex-col lg:flex-row   gap-5  justify-center  absolute top-[100%] lg:top-[70%] left-[47%]  translate-x-[-50%] translate-y-[-50%] rounded-xl">
        <div
          className={`w-[20rem] md:w-[23rem] flex flex-col items-center justify-center gap-3
          h-[10rem] lg:h-[28rem] bg-[linear-gradient(to_right_bottom,rgba(211,183,159,0.3),rgba(222,201,183,0.3)),url('/login.png')] bg-cover bg-center border-b-[10px] border-r-0 lg:border-r-[10px] lg:border-b-0 border-[#c9a687]`}
        >
          <h1 className=" font-extrabold text-2xl ">Welcome</h1>
          <p className="text-center font-semibold lg:w-60">
            Join the pawdoption family and explore more!
          </p>
        </div>
        <div className="px-10 lg:px-15 py-5 ">
          <div className="flex items-center justify-center gap-2">
            <img src="/paw.png" alt="paw" className="h-10" />
            <h1 className=" text-2xl font-bold">Sign up</h1>
          </div>
          <form className="mt-5 flex flex-col gap-5">
            <div className="flex flex-col lg:flex-row  gap-10">
              <div className="flex flex-col gap-5">
                <label htmlFor="name" className="font-bold">
                  🐾Name
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
                  🐾Username
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
              🐾E-mail
            </label>
            <input
              type="email"
              name={"email"}
              value={formData.email}
              onChange={handleChange}
              className="border-2 border-black rounded-md px-2 py-1"
              placeholder="example@gmail.com"
            ></input>
            <div className="flex flex-col lg:flex-row  gap-10">
              <div className="flex flex-col gap-5">
                <label htmlFor="name" className="font-bold">
                  🐾Password
                </label>
                <input
                  type="password"
                  name={"password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="*******"
                  className="border-2 border-black rounded-md px-2 py-1"
                ></input>
              </div>
              <div className="flex flex-col gap-5">
                <label htmlFor="name" className="font-bold">
                  🐾Confirm Password
                </label>
                <input
                  type="password"
                  name={"confirm_password"}
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="*******"
                  className="border-2 border-black rounded-md px-2 py-1"
                ></input>
              </div>
            </div>
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
    </div>
  );
}

export default Signup;
