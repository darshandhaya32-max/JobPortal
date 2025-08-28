import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
              const apiUrl = process.env.VITE_API_URL;
      const result = await axios.post(`${apiUrl}/login`, {
        email: loginData.email,
        password: loginData.password,
      });

      localStorage.setItem("token", result.data.accessToken);

      toast.success("Login Successful 🚀");
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <div>
      <form className="max-w-md mx-auto mt-20 bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 drop-shadow-md mt-8">
          Log In
        </h1>{" "}
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="mb-1 text-sm font-semibold text-gray-600"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            className="px-3 py-2 border rounded-lg "
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="mb-1 text-sm font-semibold text-gray-600"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter You Password"
            className="px-3 py-2 border rounded-lg "
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </div>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-400 text-white font-medium rounded-lg"
        >
          Login
        </button>
        <p>
          New User Click Here{" "}
          <NavLink to={"/signin"} className="text-blue-600">
            to SignIn
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
