import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();

    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        toast.success("Registered Successfully");
        navigate("/login");
      } else {
        toast.error("Please try again");
      }
    } catch (error) {
      toast.error("Error during signup");
    }
  };

  return (
    <div className="relative h-[30rem] ">
      <PageNav />

      <div className="border-2  overflow-hidden border-[#c9a687]  flex flex-col lg:flex-row   gap-5  justify-center  absolute top-[100%] lg:top-[80%] left-[50%]  translate-x-[-50%] translate-y-[-50%] rounded-xl">
        <div
          className={`w-[20rem] md:w-[23rem] flex flex-col items-center justify-start gap-3
          h-[10rem] lg:h-[33rem] bg-[url('/signup2.jpg')] bg-cover bg-center border-b-[10px] border-r-0 lg:border-r-[10px] lg:border-b-0 border-[#c9a687]`}
        >
          <h1 className=" font-extrabold text-2xl pt-8">Welcome</h1>
          <p className="text-center font-semibold lg:w-60 ">
            Sign up now to start the wonderful process of adopting a loving pet.
          </p>
        </div>
        <div className="px-10 lg:px-20 py-5">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img src="/paw.png" alt="paw" className="h-12" />
            <h1 className="text-3xl font-bold text-[#4A5568]">Sign up</h1>
          </div>
          <form className="flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex flex-col gap-5">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-[#4A5568]"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border-b-2 border-[#4A5568] outline-none py-2"
                  placeholder="Your Name"
                ></input>
              </div>
              <div className="flex flex-col gap-5">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-[#4A5568]"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="border-b-2 border-[#4A5568] outline-none py-2"
                  placeholder="Username"
                ></input>
              </div>
            </div>
            <label
              htmlFor="email"
              className="text-sm font-semibold text-[#4A5568]"
            >
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-b-2 border-[#4A5568] outline-none py-2"
              placeholder="example@gmail.com"
            ></input>
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex flex-col gap-5">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-[#4A5568]"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="*******"
                  className="border-b-2 border-[#4A5568] outline-none py-2"
                ></input>
              </div>
              <div className="flex flex-col gap-5">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-[#4A5568]"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="*******"
                  className="border-b-2 border-[#4A5568] outline-none py-2"
                ></input>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="text-sm  px-4 py-3 text-white font-bold hover:shadow-lg transition-all duration-300 cursor-pointer bg-[#d3b79f] hover:bg-[#c9a687]  rounded-full  focus:outline-none"
            >
              Submit
            </button>
          </form>
          <p className="text-center mt-8 text-[#4A5568]">
            Signed up already?{" "}
            <Link
              to="/login"
              className="text-[#2C5282] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
