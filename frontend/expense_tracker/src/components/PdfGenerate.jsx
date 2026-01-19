// import React, { useEffect, useState } from "react";
// import useShopStore from "../zustand/shopStore.js";
// import useCustomerStore from "../zustand/customerStore.js";
// import axios from "axios";

// const PdfGenerate = () => {
//   const { mainShopId } = useShopStore();
//   const { customerNames, setCustomerNames } = useCustomerStore();
//   const { customerIds, setCustomerIds } = useCustomerStore();
//   const [selectedCustomer, setSelectedCustomer] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const getAllCustomersName = async () => {
//     try {
//       console.log(mainShopId);
//       const response = await axios.get(
//         `http://localhost:4000/api/getallcustomers/${mainShopId}`,
//         { withCredentials: true }
//       );
//       const customerIdsArray = response.data.map((customer) => customer._id);
//       setCustomerIds(customerIdsArray);
//       const customerNamesArray = response.data.map(
//         (customer) => customer.customerName
//       );
//       setCustomerNames(customerNamesArray);
//     } catch (error) {
//       console.error("failed to fetch customer details", error);
//     }
//   };
//   useEffect(() => {
//     getAllCustomersName();
//   }, [mainShopId]);
//   const generatePDF = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(async () => {
//       setLoading(false);
//       try {
//         const index = customerNames.findIndex(
//           (name) => name === selectedCustomer
//         );
//         const selectedCustomerId = customerIds[index];
//         console.log("Selected Customer ID:", selectedCustomerId);
//         const response = await axios.get(
//           `http://localhost:4000/api/generatebill/${selectedCustomerId}`,

//           { responseType: "blob" }
//         );
//         const blob = new Blob([response.data], { type: "application/pdf" });
//         const url = window.URL.createObjectURL(blob);
//         // const link = document.createElement("a");
//         // link.href = url;
//         // link.download = `${selectedCustomer}_bill.pdf`;
//         // link.click();
//         // window.URL.revokeObjectURL(url);
//         window.open(url, "_blank");
//           setTimeout(() => window.URL.revokeObjectURL(url), 5000);
//         setMessage("Bill pdf is successfully generated ")
//          setTimeout(() => {
//         setMessage("");
//       }, 3000);
//       } catch (error) {
//         if(error.response && error.response.data && error.response.data.message){
//           setError(error.response.data.message)
//         }
//         else{
//           setError("failed to generate pdf")
//         }
//         setTimeout(() => {
//           setError("");
//         },1000)
//       }
//     }, 2000);
//   };
//   return (
//     <>
//       <div className="text-black px-4 py-5 text-4xl bg-white shadow-md text-center font-bold mb-14 ">
//         Customer Bill Generator
//       </div>
//       <div className=" flex justify-center items-center mb-6 mt-3">
//         {error && (
//           <p className="text-red-500 text-[15px]  mt-8 font-bold">{error}</p>
//         )}
//         {message && (
//           <p className="text-green-600 text-xl mt-8 text-center font-bold">
//             {message}
//           </p>
//         )}
//       </div>
//       <div className="flex justify-center items-center mb-6">
//         <div className="h-[250px] w-[700px] overflow-y-auto bg-white shadow-lg flext justify-center items-center">
//           <p className="font-bold text-center text-2xl ">Customer's Name</p>
//           <p className="text-black text-center mb-4 text-[15px]">
//             Select a customer and generate their invoice
//           </p>
//           {customerNames.length > 0 && (
//             <div className="flex flex-wrap items-center justify-center gap-4 mb-4 ">
//               {customerNames.map((name, index) => (
//                 <label
//                   key={index}
//                   className="w-1/2 flex items-center gap-2 border border-gray-400 rounded-xl px-4 py-2 text-white font-bold bg-black  cursor-pointer"
//                 >
//                   <input
//                     type="radio"
//                     checked={selectedCustomer == name}
//                     onChange={() => setSelectedCustomer(name)}
//                     className="h-4 w-4 accent-gray-900"
//                   />
//                   <span>{name}</span>
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="flex justify-center items-center">
//         <input
//           type="text"
//           id="shopname"
//           placeholder="no customer's selected yet"
//           readOnly
//           value={selectedCustomer}
//           className=" placeholder: italic w-[700px] px-5 py-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-1 focus:ring-gray-400 mb-8 "
//         ></input>
//       </div>
//       <div className="flex justify-center items-center">
//         <button
//           onClick={generatePDF}
//           className="font-bold text-white bg-black px-4 py-2 w-[700px] flex justify-center items-center "
//           disabled={loading}
//         >
//           {loading ? (
//             <div className="w-5 h-5 border-4 border-gray-400 border-dashed rounded-full animate-spin "></div>
//           ) : (
//             "Generate PDF"
//           )}
//         </button>
//       </div>
//     </>
//   );
// };
// export default PdfGenerate;


import React, { useEffect, useState } from "react";
import useShopStore from "../zustand/shopStore.js";
import useCustomerStore from "../zustand/customerStore.js";
import axios from "axios";

const PdfGenerate = () => {
  const { mainShopId } = useShopStore();
  const { customerNames, setCustomerNames, customerIds, setCustomerIds } =
    useCustomerStore();

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const getAllCustomersName = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/getallcustomers/${mainShopId}`,
        { withCredentials: true }
      );

      setCustomerIds(response.data.map((c) => c._id));
      setCustomerNames(response.data.map((c) => c.customerName));
    } catch (err) {
      console.error("failed to fetch customer details", err);
    }
  };

  useEffect(() => {
    if (mainShopId) getAllCustomersName();
  }, [mainShopId]);

  const generatePDF = async (e) => {
    e.preventDefault();
    if (!selectedCustomer) {
      setError("Please select a customer");
      setTimeout(() => setError(""), 1500);
      return;
    }

    setLoading(true);

    try {
      const index = customerNames.findIndex(
        (name) => name === selectedCustomer
      );
      const selectedCustomerId = customerIds[index];

      const response = await axios.get(
        `http://localhost:4000/api/generatebill/${selectedCustomerId}`,
        { responseType: "blob", timeout: 8000 } // 8 second timeout
      );

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });
      const url = window.URL.createObjectURL(blob);
      // Create a link element, set the filename, and trigger a click to download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `bill-${selectedCustomer}.pdf`);
      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      setTimeout(() => window.URL.revokeObjectURL(url), 5000);

      setMessage("Bill PDF generated successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to generate PDF"
      );
      setTimeout(() => setError(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow-md text-center font-bold text-xl sm:text-3xl py-4 mb-10">
        Customer Bill Generator
      </div>

      {/* Messages */}
      <div className="flex justify-center px-4 mb-4">
        {error && (
          <p className="text-red-500 font-semibold text-sm sm:text-base">
            {error}
          </p>
        )}
        {message && (
          <p className="text-green-600 font-semibold text-sm sm:text-base">
            {message}
          </p>
        )}
      </div>

      {/* Customer List */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-4 sm:p-6">
          <p className="font-bold text-center text-lg sm:text-2xl mb-1">
            Customer's Name
          </p>
          <p className="text-center text-sm text-gray-600 mb-4">
            Select a customer and generate their invoice
          </p>

          <div className="max-h-[280px] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {customerNames.map((name, index) => (
                <label
                  key={index}
                  className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 cursor-pointer hover:bg-black hover:text-white transition"
                >
                  <input
                    type="radio"
                    checked={selectedCustomer === name}
                    onChange={() => setSelectedCustomer(name)}
                    className="h-4 w-4 accent-black"
                  />
                  <span className="text-sm sm:text-base font-medium">
                    {name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Customer */}
      <div className="flex justify-center px-4 mt-6">
        <input
          type="text"
          readOnly
          value={selectedCustomer}
          placeholder="No customer selected yet"
          className="w-full max-w-3xl px-4 py-3 border rounded-md text-sm sm:text-base focus:outline-none"
        />
      </div>

      {/* Button */}
      <div className="flex justify-center px-4 mt-4">
        <button
          onClick={generatePDF}
          disabled={loading}
          className="w-full max-w-3xl bg-black text-white font-bold py-3 rounded-md flex justify-center items-center"
        >
          {loading ? (
            <div className="w-5 h-5 border-4 border-gray-300 border-dashed rounded-full animate-spin"></div>
          ) : (
            "Generate PDF"
          )}
        </button>
      </div>
    </>
  );
};

export default PdfGenerate;
