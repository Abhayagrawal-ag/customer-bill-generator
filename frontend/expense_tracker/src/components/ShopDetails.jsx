// import React from "react";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import useShopStore from "../zustand/shopStore.js";

// const ShopDetails = () => {
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [shopName, setShopName] = useState("");
//   const [shopAddress, setShopAddress] = useState("");
//   const [shopPhoneNumber, setShopPhoneNumber] = useState("");
//   const [openingTime, setOpeningTime] = useState("");
//   const [closingTime, setClosingTime] = useState("");
//   const [gstNumber, setGstNumber] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { shopIds ,setShopIds } = useShopStore();

//   const navigateToCustomerDetails = () => {
//     navigate("/customerdetails");
//   };
//   const shopDetailsForm = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(async () => {
//       setLoading(false);
//       if (
//         !shopName ||
//         !shopAddress ||
//         !shopPhoneNumber ||
//         !openingTime ||
//         !closingTime
//       ) {
//         setError("please fill all the fields");
//         setTimeout(() => {
//           setError("");
//         }, 1000);
//         return;
//       }

//       try {
//         const res = await axios.post(
//           "http://localhost:4000/api/shopdetails",
//           {
//             shopName,
//             shopAddress,
//             shopPhoneNumber,
//             openingTime,
//             closingTime,
//             GST_number: gstNumber,
//           },
//           { withCredentials: true }
//         );
//         console.log(res.data);

//         setShopIds([...shopIds, res.data.shop._id])
//         setMessage("shop is successfully added");
//         setTimeout(() => {
//           setMessage("");
//           setShopName("");
//           setShopAddress("");
//           setShopPhoneNumber("");
//           navigate("/customerdetails");
//         }, 1000);
//       } catch (error) {
//         if (
//           error.response &&
//           error.response.data &&
//           error.response.data.message
//         ) {
//           setError(error.response.data.message);
//         } else {
//           setError("server error");
//         }
//         setTimeout(() => {
//           setError("");
//         }, 1000);
//       }
//     }, 2000);
//   };

//   return (
//     <div className="h-screen flex justify-center items-center bg-white  ">
//       <div className="w-[850px] h-[600px] bg-white  shadow-md rounded-lg p-4">
//         <h1 className="text-black text-3xl font-bold mb-2">Shop Details</h1>
//         <p className="mb-4 text-black">Complete your shop profile with accurate business information.....  </p>
//         <div className="h-6 flex justify-center items-center">
//           {error && (
//             <h1 className="text-[20px] text-red-500  font-bold">
//               {error}
//             </h1>
//           )}
//           {message && (
//             <h1 className="text-[20px] text-green-600  font-bold">
//               {message}
//             </h1>
//           )}
//         </div>
//         <form onSubmit={shopDetailsForm} className="space-y-8">
//           <div>
//             <label
//               className="block text-black font-medium mb-4"
//               htmlFor="shop name"
//             >
//               Shop Name
//             </label>
//             <input
//               type="text"
//               id="shopname"
//               placeholder="Enter your Shop Name"
//               value={shopName}
//               onChange={(e) => setShopName(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-1 focus:ring-gray-400"
//             />
//           </div>

//           <div>
//             <label
//               className="block text-black font-medium mb-4"
//               htmlFor="shop address"
//             >
//               Shop Address
//             </label>
//             <input
//               type="text"
//               id="shopaddress"
//               placeholder="Enter your Shop Address"
//               value={shopAddress}
//               onChange={(e) => setShopAddress(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-1 focus:ring-gray-400"
//             />
//           </div>

//           <div className="flex justify-between items-center">
//             <div>
//               <label
//                 className="block text-black font-medium mb-4"
//                 htmlFor="shopPhoneNumber"
//               >
//                 shopPhoneNumber
//               </label>
//               <input
//                 type="text"
//                 id="shopPhoneNumber"
//                 placeholder="Mobile:+91 XXXXXXXXXX"
//                 value={shopPhoneNumber}
//                 onChange={(e) => setShopPhoneNumber(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-1 focus:ring-gray-400"
//               />
//             </div>
//             <div>
//               <label
//                 className=" block text-black font-medium mb-4"
//                 htmlFor="opening time"
//               >
//                 Opening Time
//               </label>
//               <input
//                 type="time"
//                 id="opening time"
//                 placeholder="opening time"
//                 value={openingTime}
//                 onChange={(e) => setOpeningTime(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-1 focus:ring-gray-400"
//               />
//             </div>

//             <div>
//               <label
//                 className="block text-black font-medium mb-4"
//                 htmlFor="closingtime"
//               >
//                 Closing Time
//               </label>
//               <input
//                 type="time"
//                 id="closing time"
//                 placeholder="closing time"
//                 value={closingTime}
//                 onChange={(e) => setClosingTime(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-1 focus:ring-gray-40"
//               />
//             </div>
//           </div>

//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <label
//                 className="block text-black font-medium mb-4"
//                 htmlFor="GSTnumber"
//               >
//                 GST_number
//               </label>
//               <input
//                 type="text"
//                 id="GSTNumber"
//                 placeholder="e.g., 27AABCU9603R1Z5"
//                 value={gstNumber}
//                 onChange={(e) => setGstNumber(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-1 focus:ring-gray-40"
//               />
//             </div>
//             <button
//               className="bg-black px-4 py-2 w-[200px] text-white font-bold rounded-md  transition-transform duration-200 hover:scale-105 flex justify-center items-center "
//               disabled={loading}
//             >
//               {loading ? (
//                 <div className="w-5 h-5 border-4 border-gray-400 border-dashed rounded-full animate-spin"></div>
//               ) : (
//                 "Submit"
//               )}
//             </button>
//           </div>
//         </form>
//         <p className="text-center text-black mt-4">
//           If shop details are already submitted.?
//           <span
//             onClick={navigateToCustomerDetails}
//             className="text-black inline-block transition-transform duration-200 hover:scale-120 cursor-pointer ml-2 font-bold"
//           >
//             Click
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };
// export default ShopDetails;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useShopStore from "../zustand/shopStore.js";

const ShopDetails = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopPhoneNumber, setShopPhoneNumber] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { shopIds, setShopIds } = useShopStore();

  const navigateToCustomerDetails = () => {
    navigate("/customerdetails");
  };

  const shopDetailsForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      setLoading(false);

      if (
        !shopName ||
        !shopAddress ||
        !shopPhoneNumber ||
        !openingTime ||
        !closingTime
      ) {
        setError("please fill all the fields");
        setTimeout(() => setError(""), 1000);
        return;
      }

      try {
        const res = await axios.post(
          "http://localhost:4000/api/shopdetails",
          {
            shopName,
            shopAddress,
            shopPhoneNumber,
            openingTime,
            closingTime,
            GST_number: gstNumber,
          },
          { withCredentials: true }
        );

        setShopIds([...shopIds, res.data.shop._id]);
        setMessage("shop is successfully added");

        setTimeout(() => {
          setMessage("");
          setShopName("");
          setShopAddress("");
          setShopPhoneNumber("");
          navigate("/customerdetails");
        }, 1000);
      } catch (error) {
        if (error.response?.data?.message) {
          setError(error.response.data.message);
        } else {
          setError("server error");
        }
        setTimeout(() => setError(""), 1000);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-4">
      <div className="w-full max-w-[850px] bg-white shadow-md rounded-lg p-4 sm:p-6">
        <h1 className="text-black text-2xl sm:text-3xl font-bold mb-2">
          Shop Details
        </h1>

        <p className="mb-4 text-black text-sm sm:text-base">
          Complete your shop profile with accurate business information.....
        </p>

        <div className="h-6 flex justify-center items-center">
          {error && (
            <h1 className="text-sm sm:text-[20px] text-red-500 font-bold">
              {error}
            </h1>
          )}
          {message && (
            <h1 className="text-sm sm:text-[20px] text-green-600 font-bold">
              {message}
            </h1>
          )}
        </div>

        <form onSubmit={shopDetailsForm} className="space-y-6">
          {/* Shop Name */}
          <div>
            <label className="block text-black font-medium mb-2">
              Shop Name
            </label>
            <input
              type="text"
              placeholder="Enter your Shop Name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Shop Address */}
          <div>
            <label className="block text-black font-medium mb-2">
              Shop Address
            </label>
            <input
              type="text"
              placeholder="Enter your Shop Address"
              value={shopAddress}
              onChange={(e) => setShopAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Phone + Time */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block text-black font-medium mb-2">
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="Mobile:+91 XXXXXXXXXX"
                value={shopPhoneNumber}
                onChange={(e) => setShopPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-2">
                Opening Time
              </label>
              <input
                type="time"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-2">
                Closing Time
              </label>
              <input
                type="time"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* GST + Button */}
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full">
              <label className="block text-black font-medium mb-2">
                GST Number
              </label>
              <input
                type="text"
                placeholder="e.g., 27AABCU9603R1Z5"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <button
              className="bg-black w-full md:w-[200px] px-4 py-2 text-white font-bold rounded-md transition-transform hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-4 border-gray-400 border-dashed rounded-full animate-spin mx-auto"></div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-black mt-6 text-sm sm:text-base">
          If shop details are already submitted?
          <span
            onClick={navigateToCustomerDetails}
            className="font-bold cursor-pointer ml-2"
          >
            Click
          </span>
        </p>
      </div>
    </div>
  );
};

export default ShopDetails;

