import React from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const EmailVerify = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [info, setInfo] = useState("");
  const Navigate = useNavigate();
  const Email = location.state?.email;
  const { email, otpSent } = location.state || {};
  useEffect(() => {
    if (!email || !otpSent) {
      Navigate("/");
    }
  }, []);
  useEffect(() => {
    const storedExpiry = localStorage.getItem("otpExpiry");
    if (storedExpiry) {
      const remainingTime = Math.floor((storedExpiry - Date.now()) / 1000);
      if (remainingTime > 0) {
        setTimeLeft(remainingTime);
      } else {
        setTimeLeft(0);
        setIsExpired(true);
        localStorage.removeItem("otpExpiry");
      }
    }
  }, []);
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          localStorage.removeItem("otpExpiry");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}: ${seconds.toString().padStart(2, "0")}`;
  };
  const userEmailVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      if (!otp) {
        setMessage("Please enter your OTP");
        setTimeout(() => {
          setMessage("");
        }, 1000);
        return;
      }
      try {
        const res = await axios.post("https://customer-bill-generator-bckend.onrender.com/api/verifyEmail", {
          code: otp,
        });
        setInfo("Email verification successfull");
        setTimeout(() => {
          setInfo("");
          setOtp("");
          Navigate("/login", { replace: true });
          localStorage.removeItem("otpExpiry");
        }, 1000);
        console.log(res.data);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Email verication failed, try again");
        }
        setTimeout(() => {
          setMessage("");
          setOtp("");
        }, 1000);
      }
    }, 2000);
  };
  const resendOtp = async (e) => {
    e.preventDefault();
    setSpinner(true);
    setTimeout(async () => {
      setSpinner(false);
      try {
        const res = await axios.post("https://customer-bill-generator-bckend.onrender.com/api/resendotp", {
          email: Email,
        });
        setInfo("OTP has been resent successfully");
        const newExpiry = Date.now() + 2 * 60 * 1000;
        localStorage.setItem("otpExpiry", newExpiry);
        setTimeLeft(120);
        setIsExpired(false);
        setTimeout(() => {
          setInfo("");
        }, 1000);
        console.log(res.data);
      } catch (error) {
        if (
          error.response ||
          error.response.data ||
          error.response.data.message
        ) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Email verification failed, try again");
        }
        setTimeout(() => {
          setMessage("");
          setOtp("");
        });
      }
    }, 2000);
  };
  return (
    <div className="h-screen flex justify-center items-center  bg-white ">
      <div className="sm:w-[400px] md:w-[500px] lg-w-[500px] sm:h-[300px] md:h-[400px] lg:h-[450px] bg-white shadow-md  rounded-lg p-8 ">
        <h1 className="text-3xl font-bold mb-6 text-black">
          Email Verification
        </h1>
        <p className="text-black mb-6 ">
          An OTP has been sent to{" "}
          <span className=" text-black inline-block transition-transform duration-200 hover:scale-90 font-semibold text-xl">
            {Email}
          </span>
          <br />
          <span>OTP has expires in.... {formatTime()} </span>
        </p>
        <div className="h-4 flex justify-center items-center">
          {message && (
            <p className="text-red-500 text-xl mb-4 text-center font-bold">
              {message}
            </p>
          )}
          {info && (
            <p className="text-green-600 text-xl mb-4 font-bold text-center ">
              {info}
            </p>
          )}
        </div>
        <input
          type="text"
          placeholder="Enter your OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 px-4 py-2 focus:ring-gray-400 mb-8"
        ></input>

        <button
          onClick={userEmailVerification}
          type="submit"
          className=" w-full  text-white font-semibold py-2 px-4 rounded-md bg-black to-gray-400  transition-transform duration-200 hover:scale-105 mt-4 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 border-4 border-gray-400 border-dashed rounded-full animate-spin"></div>
          ) : (
            "verify your email"
          )}
        </button>
        <button
          onClick={resendOtp}
          type="submit"
          className=" w-full text-white font-semibold py-2 px-4 rounded-md bg-black transition-transform duration-200 hover:scale-105 mt-8 flex justify-center items-center"
          disabled={spinner}
        >
          {spinner ? (
            <div className="w-5 h-5 border-4 border-gray-400 border-dashed rounded-full animate-spin"></div>
          ) : (
            "Resend OTP"
          )}
        </button>
      </div>
    </div>
  );
};
export default EmailVerify;
