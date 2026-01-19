import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserStore from "../zustand/userStore.js";
const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserId } = useUserStore();
  const backToSignup = () => {
    navigate("/");
  };
  const passwordChange = () => {
    navigate("/passwordresetrequest");
  };
  const userLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      if (!name || !password) {
        setError("Please fill all the fields");
        setTimeout(() => {
          setError("");
        }, 1000);
        return;
      }
      if (password.length < 8) {
        setError("password length must be 8 characters");
        setTimeout(() => {
          setError("");
          setPassword("");
        }, 1000);
        return;
      }
      try {
        const res = await axios.post(
          "https://customer-bill-generator-bckend.onrender.com/api/login",
          {
            username: name,
            password,
          },
          { withCredentials: true }
        );
        console.log(res.data);
        console.log("userId", res.data.userData._id);
        setUserId(res.data.userData._id);
        setMessage("Login successfull");
        setTimeout(() => {
          setName("");
          setPassword("");
          setMessage("");
          navigate("/shopdetails");
        }, 1000);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("login failed, try again");
        }
        setTimeout(() => {
          setError("");
          setName("");
          setPassword("");
        }, 1000);
      }
    }, 2000);
  };
  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="bg-white shadow-md rounded-lg p-8 sm:w-[300px] md:w-[500px] lg-w-[500px] sm:h-[300px] md:h-[350px] lg:h-[500px]">
        <h1 className=" text-4xl font-bold text-black">Join Now</h1>
        <p className="text-[14px] text-black">
          {" "}
          Fill in your details to unlock amazing features........
        </p>
        <div className="h-6 flex justify-center items-center mb-3">
          {error && (
            <p className="text-red-500 text-[15px] mt-3  font-bold">{error}</p>
          )}
          {message && (
            <p className="text-green-500 text-[15px] mt-1  font-bold">
              {message}
            </p>
          )}
        </div>
        <div>
          <label
            className="block text-black font-medium mb-2"
            htmlFor="fullname"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
        <br></br>
        {/* password */}
        <div>
          <label
            className="block text-black font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 mb-4"
          />
        </div>
        <p className="text-xs text-gray-600 mb-6">
          If you don’t remember the password ?
          <span
            onClick={passwordChange}
            className="ml-2 text-[15px] text-black inline-block transition-transform duration-200 hover:scale-105 cursor-pointer"
          >
            Forgot password
          </span>
        </p>

        <button
          onClick={userLogin}
          className="w-full font-bold px-4 py-2 rounded-md text-white transition-transform duration-200 hover:scale-105 bg-black flex justify-center items-center mb-8 text-xl"
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 border-4 border-gray-400 border-dashed rounded-full animate-spin"></div>
          ) : (
            "Login"
          )}
        </button>
        <p onClick={backToSignup} className="">
          Don't have an account ?
          <span className="text-black inline-block transition-transform duration-200 hover:scale-105 cursor-pointer ml-2 font-bold">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};
export default Login;
