import { Link, useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import { useState } from "react";
import { toast } from "react-toastify";

function Login() {
  // const { setToken } = useContext(LoginContext);
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

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
        // console.log("DATA:", data.access);
        if (data.access) {
          // setAuth({
          //   ...auth
          //   user: data.access.user,
          //   token: data.access.token,
          // });
          const tokenName = userType === "seller" ? "sellerToken" : "userToken";
          localStorage.setItem(tokenName, data.access);
          // setToken(data.access);
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
      <img
        src="/loginbg.png"
        alt="dogo"
        className="absolute top-[50%] left-[80%] hidden md:inline-block lg:left-[82%]"
      ></img>

      <div className="border-2 border-[#c9a687]  flex flex-col lg:flex-row   gap-5  justify-center  absolute top-[70%] left-[50%]  translate-x-[-50%] translate-y-[-50%] rounded-xl">
        <div
          className={`w-[28rem]  flex flex-col items-center justify-center gap-3
          h-[15rem] lg:h-[30rem] bg-[linear-gradient(to_right_bottom,rgba(211,183,159,0.3),rgba(222,201,183,0.3)),url('/login.png')] bg-cover bg-center border-b-[10px] border-r-0 lg:border-r-[10px] lg:border-b-0 border-[#c9a687]`}
        >
          <h1 className=" font-extrabold text-2xl ">Welcome</h1>
          <p className="text-center font-semibold lg:w-60">
            Join the pawdoption family and explore more!
          </p>
        </div>
        <div className="px-10 lg:px-20 py-5 lg:py-10 w-[28rem]">
          <div className="flex items-center justify-center gap-2">
            <img src="/paw.png" alt="paw" className="h-10" />
            <h1 className=" text-2xl font-bold">Login</h1>
          </div>
          <form className="mt-5 flex flex-col gap-5">
            <label htmlFor="name" className="font-bold">
              🐾Username
            </label>
            <input
              type="text"
              className="border-2 border-black rounded-md px-2 py-1"
              name="username"
              value={loginFormData.username}
              onChange={inputHandler}
              placeholder="Username"
            ></input>
            <label htmlFor="name" className="font-bold">
              🐾Password
            </label>
            <input
              type="password"
              name="password"
              value={loginFormData.password}
              onChange={inputHandler}
              placeholder="*******"
              className="border-2 border-black rounded-md px-2 py-1"
            ></input>
            <div className="flex gap-5 justify-center">
              <button
                type="button"
                disabled={!buttonEnabled}
                onClick={(e) => submitHandler(e, "user")}
                className="text-sm bg-[#c9a687] rounded-xl px-4 py-3 text-white font-bold hover:shadow-xl"
              >
                Login as User
              </button>
              <button
                type="button"
                disabled={!buttonEnabled}
                onClick={(e) => submitHandler(e, "seller")}
                className="text-sm bg-[#c9a687] rounded-xl px-4 py-3 text-white font-bold hover:shadow-xl"
              >
                Login as Seller
              </button>
            </div>
          </form>
          <p className="text-center mt-8">
            Not signed up yet?{" "}
            <Link to="/signup" className="font-bold hover:underline">
              Sign up
            </Link>
          </p>
          <p className="text-center ">
            Become a Seller{" "}
            <Link to="/sellersignup" className="font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
