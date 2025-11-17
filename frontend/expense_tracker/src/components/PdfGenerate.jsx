import React, { useEffect, useState } from "react";
import useShopStore from "../zustand/shopStore.js";
import useCustomerStore from "../zustand/customerStore.js";
import axios from "axios";

const PdfGenerate = () => {
  const { mainShopId } = useShopStore();
  const { customerNames, setCustomerNames } = useCustomerStore();
  const { customerIds, setCustomerIds } = useCustomerStore();
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const getAllCustomersName = async () => {
    try {
      console.log(mainShopId);
      const response = await axios.get(
        `http://localhost:4000/api/getallcustomers/${mainShopId}`,
        { withCredentials: true }
      );
      const customerIdsArray = response.data.map((customer) => customer._id);
      setCustomerIds(customerIdsArray);
      const customerNamesArray = response.data.map(
        (customer) => customer.customerName
      );
      setCustomerNames(customerNamesArray);
    } catch (error) {
      console.error("failed to fetch customer details", error);
    }
  };
  useEffect(() => {
    getAllCustomersName();
  }, [mainShopId]);
  const generatePDF = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        const index = customerNames.findIndex(
          (name) => name === selectedCustomer
        );
        const selectedCustomerId = customerIds[index];
        console.log("Selected Customer ID:", selectedCustomerId);
        const response = await axios.get(
          `http://localhost:4000/api/generatebill/${selectedCustomerId}`,
          
          { responseType: "blob" }
        );
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        // const link = document.createElement("a");
        // link.href = url;
        // link.download = `${selectedCustomer}_bill.pdf`;
        // link.click();
        // window.URL.revokeObjectURL(url);
        window.open(url, "_blank");
          setTimeout(() => window.URL.revokeObjectURL(url), 5000);
        setMessage("Bill pdf is successfully generated ")
         setTimeout(() => {
        setMessage("");
      }, 3000);
      } catch (error) {
        if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message)
        }
        else{
          setError("failed to generate pdf")
        }
        setTimeout(() => {
          setError("");
        },1000)
      }
    }, 2000);
  };
  return (
    <>
      <div className="text-black px-4 py-5 text-4xl bg-white shadow-md text-center font-bold mb-14 ">
        Customer Bill Generator
      </div>
      <div className=" flex justify-center items-center mb-6 mt-3">
        {error && (
          <p className="text-red-500 text-[15px]  mt-8 font-bold">{error}</p>
        )}
        {message && (
          <p className="text-green-600 text-xl mt-8 text-center font-bold">
            {message}
          </p>
        )}
      </div>
      <div className="flex justify-center items-center mb-6">
        <div className="h-[250px] w-[700px] overflow-y-auto bg-white shadow-lg flext justify-center items-center">
          <p className="font-bold text-center text-2xl ">Customer's Name</p>
          <p className="text-black text-center mb-4 text-[15px]">
            Select a customer and generate their invoice
          </p>
          {customerNames.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-4 mb-4 ">
              {customerNames.map((name, index) => (
                <label
                  key={index}
                  className="w-1/2 flex items-center gap-2 border border-gray-400 rounded-xl px-4 py-2 text-white font-bold bg-black  cursor-pointer"
                >
                  <input
                    type="radio"
                    checked={selectedCustomer == name}
                    onChange={() => setSelectedCustomer(name)}
                    className="h-4 w-4 accent-gray-900"
                  />
                  <span>{name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <input
          type="text"
          id="shopname"
          placeholder="no customer's selected yet"
          readOnly
          value={selectedCustomer}
          className=" placeholder: italic w-[700px] px-5 py-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-1 focus:ring-gray-400 mb-8 "
        ></input>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={generatePDF}
          className="font-bold text-white bg-black px-4 py-2 w-[700px] flex justify-center items-center "
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 border-4 border-gray-400 border-dashed rounded-full animate-spin "></div>
          ) : (
            "Generate PDF"
          )}
        </button>
      </div>
    </>
  );
};
export default PdfGenerate;
