import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const PasswordChange = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const backToLogin = () => {
    navigate("/login");
  };
  const changePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      if (!email || !password || !confirmPassword) {
        setError("Please fill all the fields");
        setTimeout(() => {
          setError("");
        }, 1000);
        return;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        setError("Invalid Email Address");
        setTimeout(() => {
          setError("");
          setEmail("");
        }, 1000);
        return;
      }

      if (password.length < 8 || confirmPassword.length < 8) {
        setError("password length must be atleast 8 characters");
        setTimeout(() => {
          setError("");
        }, 1000);
        return;
      }
      if (password !== confirmPassword) {
        setError("password don't match, try again");
        setTimeout(() => {
          setError("");
        }, 1000);
        return;
      }

      try {
        const res = await axios.post(
          "http://localhost:4000/api/passwordchange",
          { email, password, confirmPassword }
        );
        setMessage("Password is successfully changed, Now you can login");
        setTimeout(() => {
          setMessage("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          navigate("/login");
        }, 1000);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("error");
        }
        setTimeout(() => {
          setError("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
      }
    }, 2000);
  };
  return (
    <div className="h-screen flex justify-center items-center bg-white ">
      <div className="bg-white shadow-md rounded-lg p-8 sm:w-[300px] md:w-[450px] lg-w-[500px] sm:h-[300px] md:h-[350px] lg:h-[520px]">
        <h1 className=" text-3xl font-bold mb-8 text-black">
          Reset your password
        </h1>
        <div className="h-2 flex justify-center items-center">
          {message && (
            <h1 className="text-green-600 text-[15px] mb-4 font-bold text-center ">
              {message}
            </h1>
          )}
          {error && (
            <h1 className="text-red-600 text-[15px] mb-4 font-bold text-center ">
              {error}
            </h1>
          )}
        </div>
        <form onSubmit={changePassword} className="space-y-6">
          <div>
            <label
              className="block text-black font-medium mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

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
              placeholder="Enter  password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <div>
            <label
              className="block text-black font-medium mb-2"
              htmlFor="confirmPassword"
            >
              confirm Password
            </label>
            <input
              type="Password"
              id="confirmPassword"
              placeholder="Enter confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
          <button
            className="px-4 py-2  rounded-md w-full text-white font-bold bg-black transition-transform duration-200 hover:scale-105 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-gray-400 border-dashed rounded-full animate-spin"></div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
        <br></br>
        <p onClick={backToLogin} className="text-center ">
          <span className="text-black inline-block transition-transform duration-200 hover:scale-105 cursor-pointer font-bold">
            --Back to login
          </span>
        </p>
      </div>
    </div>
  );
};
export default PasswordChange;
