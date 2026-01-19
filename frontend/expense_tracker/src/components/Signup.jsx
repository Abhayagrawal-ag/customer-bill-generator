import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const switchedToLogin = () => {
    navigate("/login");
  };
  const userRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      if (!name || !email || !password) {
        setLoading(false);
        setError("Please fill all the fields");
        setTimeout(() => {
          setError("");
        }, 1000);
        return;
      }
      if (password.length < 8) {
        setLoading(false);
        setError("Password length must be greater than 8 characters");
        setTimeout(() => {
          setError("");
          setPassword("");
        }, 1000);
        return;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        setLoading(false);
        setError("Invalid Email Adress");
        setTimeout(() => {
          setError("");
          setEmail("");
        }, 1000);
        return;
      }
      try {
        const res = await axios.post("https://customer-bill-generator-bckend.onrender.com/api/register", {
          username: name,
          email,
          password,
        });
        setLoading(false);
        console.log(res.data);

        setMessage("SignUp successfull !");
        setName("");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          setMessage("");
          navigate("/emailverify", { state: { email, otpSent: true } });
          const expiryTime = Date.now() + 2 * 60 * 1000;
          localStorage.setItem("otpExpiry", expiryTime);
        }, 1000);
        console.log(res.data);
      } catch (err) {
        setLoading(false);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
          setName("");
          setPassword("");
          setEmail("");
        } else {
          setError("Registration failed, try again");
        }
        setTimeout(() => {
          setError("");
        }, 1000);
      }
    }, 2000);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-white ">
      <div className="bg-white shadow-md rounded-lg p-8 sm:w-[300px] md:w-[550px] lg-w-[500px] sm:h-[300px] md:h-[400px] lg:h-[500px] ">
        <h1 className=" text-4xl font-bold -mt-4  text-black  ">
          Create Account
        </h1>
        <form onSubmit={userRegistration} className="space-y-6 -mt-4 ">
          <div className="h-6 flex justify-center items-center mt-3">
            {error && (
              <p className="text-red-500 text-[15px]  mt-8 font-bold">
                {error}
              </p>
            )}
            {message && (
              <p className="text-green-600 text-xl mt-8 text-center font-bold">
                {message}
              </p>
            )}
          </div>
          {/* Full Name */}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400  "
            />
          </div>

          {/* Email */}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 "
            />
          </div>

          {/* Password */}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 "
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md  transition-transform duration-200 hover:scale-105 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-4 border-gray-400 border-dashed rounded-full animate-spin "></div>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
          <p className="">
            Already have an account ?
            <span
              onClick={switchedToLogin}
              className="text-black inline-block transition-transform duration-200 hover:scale-105 cursor-pointer ml-2 font-bold"
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Signup;
