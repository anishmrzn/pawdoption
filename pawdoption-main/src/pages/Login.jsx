import { Link, useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const inputHandler = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = (e, userType) => {
    const apiUrl =
      userType === "seller"
        ? "http://127.0.0.1:8000/api/seller/token/"
        : "http://127.0.0.1:8000/api/token/";

    const formData = new FormData();
    formData.append("username", loginFormData.username);
    formData.append("password", loginFormData.password);

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginFormData.username,
        password: loginFormData.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access) {
          const tokenName = userType === "seller" ? "sellerToken" : "userToken";
          localStorage.setItem(tokenName, data.access);

          navigate("/");
          toast.success("Successfully Logged in");
        } else {
          toast.error("Username OR password did not work");
        }
      });
  };

  const buttonEnabled =
    loginFormData.username !== "" && loginFormData.password !== "";

  return (
    <div className="relative h-[30rem] ">
      <PageNav />

      <div className="border-2 border-[#c9a687]  flex flex-col lg:flex-row   gap-5  justify-center  absolute top-[100%]  lg:top-[80%] left-[50%]  translate-x-[-50%] translate-y-[-50%] rounded-xl">
        <div
          className={`w-[28rem]  flex flex-col items-center justify-start gap-3
          h-[15rem] lg:h-[30rem] bg-[url('/login.jpg')] bg-cover bg-center border-b-[10px] border-r-0 lg:border-r-[10px] lg:border-b-0 border-[#c9a687]`}
        >
          <h1 className=" font-extrabold text-2xl pt-7">Welcome</h1>
          <p className="text-center font-semibold lg:w-60">
            Join the pawdoption family and explore more!
          </p>
        </div>
        <div className="px-10 lg:px-20 py-5 lg:py-7 w-[28rem]">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img src="/paw.png" alt="paw" className="h-12" />
            <h1 className="text-3xl font-bold text-[#4A5568]">Login</h1>
          </div>
          <form className="flex flex-col gap-6">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-[#4A5568]"
            >
              Username
            </label>
            <input
              type="text"
              className="border-b-2 border-[#4A5568] outline-none py-2"
              name="username"
              value={loginFormData.username}
              onChange={inputHandler}
              placeholder="Enter your username"
            ></input>
            <label
              htmlFor="password"
              className="text-sm font-semibold text-[#4A5568]"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={loginFormData.password}
              onChange={inputHandler}
              placeholder="Enter your password"
              className="border-b-2 border-[#4A5568] outline-none py-2"
            ></input>
            <div className="flex gap-8 justify-center">
              <button
                type="button"
                disabled={!buttonEnabled}
                onClick={(e) => submitHandler(e, "user")}
                className="text-sm  px-4 py-3 text-white font-bold hover:shadow-lg transition-all duration-300 cursor-pointer bg-[#d3b79f] hover:bg-[#c9a687]  rounded-full  focus:outline-none"
              >
                Login as User
              </button>
              <button
                type="button"
                disabled={!buttonEnabled}
                onClick={(e) => submitHandler(e, "seller")}
                className="text-sm  px-4 py-3 text-white font-bold hover:shadow-lg transition-all duration-300 cursor-pointer bg-[#d3b79f] hover:bg-[#c9a687]  rounded-full  focus:outline-none"
              >
                Login as Seller
              </button>
            </div>
          </form>

          <p className="text-center mt-8 text-[#4A5568]">
            Not signed up yet?{" "}
            <Link
              to="/signup"
              className="text-[#2C5282] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
          <p className="text-center text-[#4A5568]">
            Become a Seller{" "}
            <Link
              to="/sellersignup"
              className="text-[#2C5282] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
