import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [timeleft, setTimeleft] = useState(0);
  const [otp, setOtp] = useState("");
  const [otpsent, setOtpsent] = useState(false);
  const navigate = useNavigate();
  const backToLogin = () => {
    navigate("/login");
  };
  useEffect(() => {
    const storedExpiry = localStorage.getItem("OTPexpiry");
    if (storedExpiry) {
      const remainingTime = Math.floor((storedExpiry - Date.now()) / 1000);
      if (remainingTime > 0) {
        setTimeleft(remainingTime);
        setOtpsent(true);
        setIsExpired(false);
      } else {
        setTimeleft(0);
        localStorage.removeItem("OTPexpiry");
        setIsExpired(true);
      }
    }
  }, []);
  useEffect(() => {
    if (timeleft <= 0 || !otpsent) {
      setIsExpired(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeleft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          localStorage.removeItem("OTPexpiry");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeleft]);
  const formatTime = () => {
    const minutes = Math.floor(timeleft / 60);
    const seconds = timeleft % 60;
    return `${minutes}: ${seconds.toString().padStart(2, "0")}`;
  };
  const resetPasswordRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      if (!email) {
        setError("please enter your email");
        setTimeout(() => {
          setError("");
        }, 1000);
        return;
      }
      try {
        const res = await axios.post(
          "http://localhost:4000/api/passwordresetcode",
          { email }
        );
        setMessage("OTP has been sent successfully");
        setOtpsent(true);
        const deadlineTime = Date.now() + 5 * 60 * 1000;
        localStorage.setItem("OTPexpiry", deadlineTime);
        setTimeleft(300);
        setIsExpired(false);
        setTimeout(() => {
          setMessage("");
          setEmail("");
        }, 1000);
      } catch (error) {
        if (
          error.response &&
          error.response.message &&
          error.response.message.data
        ) {
          setError(error.response.message.data);
        } else {
          setError("error, please try again");
        }
        setTimeout(() => {
          setError("");
          setEmail("");
        });
      }
    }, 2000);
  };
  const resetPasswordVerify = async (e) => {
    e.preventDefault();
    setSpinner(true);
    setTimeout(async () => {
      setSpinner(false);
      if (!otp) {
        setError("please enter OTP");
        setTimeout(() => {
          setError("");
        }, 1000);
        return;
      }
      if (isExpired) {
        setError("OTP has expired");
        setTimeout(() => {
          setError("");
          setOtp("");
        }, 1000);
        return;
      }
      try {
        const res = await axios.post(
          "http://localhost:4000/api/passwordresetcodeverify",
          { code: otp }
        );
        setMessage("OTP verified! You can now reset your password.");
        setTimeout(() => {
          setMessage("");
          setOtp("");
          navigate("/passwordchange", { replace: true });
          localStorage.removeItem("OTPexpiry");
        }, 1000);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("The OTP could not be verified. Please try again.");
        }
        setTimeout(() => {
          setError("");
          setOtp("");
        }, 1000);
      }
    }, 2000);
  };
  return (
    <div className="h-screen flex justify-center items-center  bg-white">
      <div className="sm:w-[300px] md:w-[550px] lg-w-[400px] sm:h-[300px] md:h-[400px] lg:h-[570px] bg-white shadow-md  rounded-lg p-8 ">
        <h1 className=" text-3xl font-bold mb-1 text-black">
          Reset your password
        </h1>
        <p className=" text-black mb-2">
          Enter your email adress and we'll send you a verification code
        </p>
        <div className="h-2 flex justify-center items-center ">
          {error && (
            <h1 className="text-[15px] text-red-600  font-bold ">{error}</h1>
          )}
          {message && (
            <h1 className="text-[15px] text-green-700 font-bold">{message}</h1>
          )}
        </div>
        <br></br>
        <label className="block text-black font-medium  mb-4" htmlFor="email">
          Email Address
        </label>
        <input
          type="text"
          id="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 mb-8"
        />
        <button
          onClick={resetPasswordRequest}
          className="text-center w-full px-4 py-2 rounded-md text-white font-bold bg-black flex justify-center items-center mb-4 transition-transform duration-200 hover:scale-105"
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 border-4 border-gray-400 border-dashed rounded-full animate-spin "></div>
          ) : (
            "Send OTP"
          )}
        </button>
        <p className="text-center text-black mb-6">
          Then verify with OTP.....{" "}
          <span className="text-black font-bold">
            Expires in.. {formatTime()}
          </span>
        </p>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 px-4 py-2 focus:ring-gray-400 mb-12 "
        ></input>
        <button
          onClick={resetPasswordVerify}
          className=" rounded-md w-full px-4 py-2 text-white font-bold bg-black mb-6 transition-transform duration-200 hover:scale-105 flex justify-center items-center"
          disabled={spinner}
        >
          {spinner ? (
            <div className="w-5 h-5 border-4  border-gray-400 border-dashed rounded-full animate-spin"></div>
          ) : (
            "verify OTP"
          )}
        </button>
        <p
          onClick={backToLogin}
          className=" text-center text-black cursor-pointer text-[15px] font-bold transition-transform duration-200 hover:scale-105  "
        >
          -Back to login
        </p>
      </div>
    </div>
  );
};
export default PasswordResetRequest;
