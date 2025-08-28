import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";

const Signin = () => {
  const [signinData, setSignInData] = useState({
    username: "",
    email: "",
    password: "",
    user: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3000/api/signin", {
        username: signinData.username,
        email: signinData.email,
        password: signinData.password,
        user: signinData.user,
      });
      console.log(result.data.message);
    } catch (error) {
      console.error("❌ Post error:", error.message);
    }
    navigate("/login");
  };
  return (
    <div>
      <form className="max-w-md mx-auto mt-20 bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 drop-shadow-md mt-8">
          Sign In
        </h1>{" "}
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="mb-1 text-sm font-semibold text-gray-600"
          >
            UserName:
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter Your Name"
            className="px-3 py-2 border rounded-lg "
            onChange={(e) =>
              setSignInData({ ...signinData, username: e.target.value })
            }
          />
        </div>
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
              setSignInData({ ...signinData, email: e.target.value })
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
            type="Password"
            id="password"
            placeholder="Enter You Password"
            className="px-3 py-2 border rounded-lg "
            onChange={(e) =>
              setSignInData({ ...signinData, password: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="mb-1 text-sm font-semibold text-gray-600"
          >
            USER:
          </label>
          <select
            type="Select"
            id="Select"
            placeholder="Enter You Password"
            className="px-3 py-2 border rounded-lg "
            onChange={(e) =>
              setSignInData({ ...signinData, user: e.target.value })
            }
          >
            <option value="Select an option">Select an Option</option>
            <option value="Recruiter">Recruiter</option>
            <option value="Appicants">Applicant</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-400 text-white font-medium rounded-lg"
        >
          SignIn
        </button>
        <p>
          Already A User Click Here{" "}
          <NavLink to={"/login"} className="text-blue-600">
            to Login
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Signin;
