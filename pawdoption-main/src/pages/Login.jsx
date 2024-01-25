import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import { useState } from "react";

function Login() {
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
  const submitHandler = (e) => {
    const formData = new FormData();
    formData.append("username", loginFormData.username);
    formData.append("password", loginFormData.password);
    console.log(formData);

    fetch("http://127.0.0.1:8000/api/token/", {
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
        console.log("DATA:", data.access);
        if (data.access) {
          localStorage.setItem("token", data.access);
          window.location = "http://127.0.0.1:8000/";
        } else {
          alert("Username OR password did not work");
        }
      });
  };

  const buttonEnabled =
    loginFormData.username !== "" && loginFormData.password !== "";

  return (
    <div className="relative h-[30rem]">
      <PageNav />

      <div className="border-2 w-[20rem] felx  flex-col p-5 justify-center h-[25rem] px-10 absolute top-[70%] left-[50%]  translate-x-[-50%] translate-y-[-50%]">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <form className="mt-5 flex flex-col gap-5">
          <label htmlFor="name" className="font-bold">
            Username
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
            Password
          </label>
          <input
            type="password"
            name="password"
            value={loginFormData.password}
            onChange={inputHandler}
            placeholder="*******"
            className="border-2 border-black rounded-md px-2 py-1"
          ></input>
          <button
            type="button"
            disabled={!buttonEnabled}
            onClick={submitHandler}
            className="button"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-8">
          Not signd up yet?{" "}
          <Link to="/signup" className="font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
