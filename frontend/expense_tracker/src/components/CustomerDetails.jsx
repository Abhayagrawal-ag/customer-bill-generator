// import React, { useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";
// import useShopStore from "../zustand/shopStore.js";
// import useUserStore from "../zustand/userStore.js";
// import useCustomerStore from "../zustand/customerStore.js";
// import { useNavigate } from "react-router-dom";
// const CustomerDetails = () => {
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [customerName, setCustomerName] = useState("");
//   const [customerAddress, setCustomerAddress] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [whatsappNumber, setWhapsappNumber] = useState("");
//   const { userId } = useUserStore();
//   const { shopIds } = useShopStore();
//   const { setCustomerId } = useCustomerStore();
//   const Navigate = useNavigate();
//   const { setShopIds } = useShopStore();
//   const { shopName } = useShopStore();
//   const { setShopName } = useShopStore();
//   const [selectedShop, setSelectedShop] = useState("");
//   const { setMainShopId } = useShopStore();
//   const syncShops = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:4000/api/getallshopsids",
//         { withCredentials: true }
//       );
//       const validShopIds = response.data.map((shop) => shop._id);
//       setShopIds(validShopIds);
//     } catch (error) {
//       console.error("failed to sync shop list: ", error);
//     }
//   };
//   useEffect(() => {
//     syncShops();
//   }, []);

//   const fetchShopsName = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:4000/api/getallshopsids",
//         { withCredentials: true }
//       );
//       const shopNames = response.data.map((shop) => shop.shopName);
//       setShopName(shopNames);
//     } catch (error) {
//       console.error("failed to fetch shopNames", error);
//     }
//   };
//   useEffect(() => {
//     fetchShopsName();
//   }, []);
//   const customerDetailsForm = async (e) => {
//     console.log("userId", userId);
//     console.log("shopIdArray", shopIds);
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(async () => {
//       setLoading(false);
//       try {
//         const index = shopName.findIndex((name) => name === selectedShop);
//         const selectedShopId = shopIds[index];
//         setMainShopId(selectedShopId);
//         const res = await axios.post(
//           "http://localhost:4000/api/customerdetails",
//           {
//             shopId: selectedShopId,
//             userId,
//             customerName,
//             address: customerAddress,
//             mobileNumber,
//             whatsappNumber,
//           }
//         );
//         setCustomerId(res.data.customerData._id);
//         console.log("customerid ", res.data.customerData._id);
//         setMessage("customer details is successfully added");
//         setTimeout(() => {
//           setMessage("");
//           setCustomerName("");
//           setCustomerAddress("");
//           setMobileNumber("");
//           setWhapsappNumber("");
//         }, 1000);
//         Navigate("/listofproducts");
//       } catch (error) {
//         if (
//           error.response &&
//           error.response.data &&
//           error.response.data.message
//         ) {
//           setError(error.response.data.message);
//         } else {
//           setError("server error, please try again");
//         }
//       }
//     }, 2000);
//   };
//   return (
//     <div className="h-screen flex justify-center items-center bg-white ">
//       <div className="w-[1100px] h-[600px] shadow-lg  rounded-lg p-4 overflow-y-auto ">
//         <h1 className=" text-black text-3xl text-center font-bold mb-6">
//           Customer Details
//         </h1>
//         <div className="h-6 flex justify-center items-center">
//           {error && (
//             <h1 className="text-[20px] text-red-500 text-center font-bold">
//               {error}
//             </h1>
//           )}
//           {message && (
//             <h1 className="text-[20px] text-green-600 text-center font-bold">
//               {message}
//             </h1>
//           )}
//         </div>
//         <form onSubmit={customerDetailsForm} className="space-y-6 ">
//           <div>
//             <label
//               className="block text-black   font-medium mb-4"
//               htmlFor="Customer's Name"
//             >
//               Customer's Name
//             </label>
//             <input
//               type="text"
//               id="Customer's Name"
//               placeholder="Enter Customer's Name"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none   focus:ring-1 focus:ring-gray-400"
//             />
//           </div>
//           <div className="flex justify-between items-center">
//             <div>
//               <label
//                 className="block  text-black font-medium mb-4"
//                 htmlFor="customer address"
//               >
//                 Customer's Address
//               </label>
//               <input
//                 type="text"
//                 id="customer address"
//                 placeholder="Enter Customer's Address"
//                 value={customerAddress}
//                 onChange={(e) => setCustomerAddress(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-1 focus:ring-gray-400"
//               />
//             </div>
//             <div>
//               <label
//                 className="block text-black font-medium mb-4"
//                 htmlFor="Customer mobile Number"
//               >
//                 Mobile Number
//               </label>
//               <input
//                 type="text"
//                 id="mobile number"
//                 placeholder="Mobile:+91 XXXXXXXXXX"
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-1 focus:ring-gray-400"
//               />
//             </div>
//             <div>
//               <label
//                 className=" block text-black  font-medium mb-4"
//                 htmlFor="whatsapp Number"
//               >
//                 Whatsapp Number
//               </label>
//               <input
//                 type="text"
//                 id="Whatsapp Number"
//                 placeholder="Mobile:+91 XXXXXXXXXX"
//                 value={whatsappNumber}
//                 onChange={(e) => setWhapsappNumber(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-1 focus:ring-gray-400"
//               />
//             </div>
//           </div>
//           <hr className="border-t border-black " />
//           <div>
//             <h1 className=" font-bold text-black text-xl mb-8">
//               Select Shops
//             </h1>
//             <input
//               type="text"
//               id="shopname"
//               placeholder="no shops selected yet"
//               readOnly
//               value={selectedShop}
//               className=" placeholder: italic w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-1 focus:ring-gray-400 mb-8 "
//             ></input>

//             {shopName.length > 0 && (
//               <div className="flex flex-wrap gap-4 mb-6">
//                 {shopName.map((name, index) => (
//                   <label
//                     key={index}
//                     className="w-1/4 flex items-center gap-2 border border-gray-400 rounded-xl px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
//                   >
//                     <input
//                       type="radio"
//                       name="selected shop"
//                       className="h-4 w-4 accent-gray-900"
//                       checked={selectedShop === name}
//                       onChange={() => setSelectedShop(name)}
//                     />
//                     <span>{name}</span>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>
//           <button
//             className="bg-black px-4 py-2 w-[550px] text-white font-bold rounded-md  transition-transform duration-200 hover:scale-105 flex justify-center items-center "
//             disabled={loading}
//           >
//             {loading ? (
//               <div className="w-5 h-5 border-4 border-gray-400 border-dashed rounded-full animate-spin"></div>
//             ) : (
//               "Submit"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetails;


import React, { useEffect, useState } from "react";
import axios from "axios";
import useShopStore from "../zustand/shopStore.js";
import useUserStore from "../zustand/userStore.js";
import useCustomerStore from "../zustand/customerStore.js";
import { useNavigate } from "react-router-dom";

const CustomerDetails = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [whatsappNumber, setWhapsappNumber] = useState("");
  const [selectedShop, setSelectedShop] = useState("");

  const { userId } = useUserStore();
  const { shopIds, setShopIds, shopName, setShopName, setMainShopId } =
    useShopStore();
  const { setCustomerId } = useCustomerStore();

  const navigate = useNavigate();

  const syncShops = async () => {
    try {
      const response = await axios.get(
        "https://customer-bill-generator-bckend.onrender.com/api/getallshopsids",
        { withCredentials: true }
      );
      const validShopIds = response.data.map((shop) => shop._id);
      setShopIds(validShopIds);
    } catch (error) {
      console.error("failed to sync shop list: ", error);
    }
  };

  const fetchShopsName = async () => {
    try {
      const response = await axios.get(
        "https://customer-bill-generator-bckend.onrender.com/api/getallshopsids",
        { withCredentials: true }
      );
      const shopNames = response.data.map((shop) => shop.shopName);
      setShopName(shopNames);
    } catch (error) {
      console.error("failed to fetch shopNames", error);
    }
  };

  useEffect(() => {
    syncShops();
    fetchShopsName();
  }, []);

  const customerDetailsForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      setLoading(false);
      try {
        const index = shopName.findIndex((name) => name === selectedShop);
        const selectedShopId = shopIds[index];
        setMainShopId(selectedShopId);

        const res = await axios.post(
          "http://localhost:4000/api/customerdetails",
          {
            shopId: selectedShopId,
            userId,
            customerName,
            address: customerAddress,
            mobileNumber,
            whatsappNumber,
          }
        );

        setCustomerId(res.data.customerData._id);
        setMessage("customer details is successfully added");

        setTimeout(() => {
          setMessage("");
          setCustomerName("");
          setCustomerAddress("");
          setMobileNumber("");
          setWhapsappNumber("");
        }, 1000);

        navigate("/listofproducts");
      } catch (error) {
        if (error.response?.data?.message) {
          setError(error.response.data.message);
        } else {
          setError("server error, please try again");
        }
        setTimeout(() => setError(""), 1000);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-4">
      <div className="w-full max-w-[1100px] shadow-lg rounded-lg p-4 sm:p-6 overflow-y-auto">
        <h1 className="text-black text-2xl sm:text-3xl text-center font-bold mb-6">
          Customer Details
        </h1>

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

        <form onSubmit={customerDetailsForm} className="space-y-6">
          {/* Customer Name */}
          <div>
            <label className="block text-black font-medium mb-2">
              Customer's Name
            </label>
            <input
              type="text"
              placeholder="Enter Customer's Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-1"
            />
          </div>

          {/* Address + Numbers */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block text-black font-medium mb-2">
                Customer's Address
              </label>
              <input
                type="text"
                placeholder="Enter Customer's Address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-2">
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="Mobile:+91 XXXXXXXXXX"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-2">
                Whatsapp Number
              </label>
              <input
                type="text"
                placeholder="Mobile:+91 XXXXXXXXXX"
                value={whatsappNumber}
                onChange={(e) => setWhapsappNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>

          <hr className="border-t border-black" />

          {/* Shops */}
          <div>
            <h1 className="font-bold text-black text-lg sm:text-xl mb-4">
              Select Shops
            </h1>

            <input
              type="text"
              readOnly
              value={selectedShop}
              placeholder="no shops selected yet"
              className="w-full px-4 py-2 border rounded-md mb-6 placeholder:italic"
            />

            {shopName.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {shopName.map((name, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 border border-gray-400 rounded-xl px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <input
                      type="radio"
                      name="selected shop"
                      className="h-4 w-4 accent-gray-900"
                      checked={selectedShop === name}
                      onChange={() => setSelectedShop(name)}
                    />
                    <span>{name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            className="bg-black w-full md:w-[550px] mx-auto px-4 py-2 text-white font-bold rounded-md transition-transform hover:scale-105 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-gray-400 border-dashed rounded-full animate-spin"></div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerDetails;
