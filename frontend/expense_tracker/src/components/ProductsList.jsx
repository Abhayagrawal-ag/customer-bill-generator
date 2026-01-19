// import React, { useEffect } from "react";
// import { useState } from "react";
// import useShopStore from "../zustand/shopStore.js";
// import useUserStore from "../zustand/userStore.js";
// import useProductStore from "../zustand/productStore.js";
// import useCustomerStore from "../zustand/customerStore.js";
// import axios from "axios";
// import useProductList from "../zustand/productList.js";
// import amountOfProduct from "../zustand/productAmount.js";
// import { useNavigate } from "react-router-dom";
// const ProductLists = () => {
//   const { totalAmount, setTotalAmount } = amountOfProduct();
//   const { date, setDate } = amountOfProduct();
//   const { mainShopId } = useShopStore();
//   const { userId } = useUserStore();
//   const { customerId } = useCustomerStore();
//   const { productIds, setProductIds } = useProductStore();
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { products, setProducts, addProduct } = useProductList();
//   const Navigate = useNavigate();
//   // delete a specific row
//   const handleDeleteProduct = (index) => {
//     const updateProducts = products.filter((_, i) => i !== index);
//     setProducts(updateProducts);
//   };

//   // handle input change
//   const handleChange = (index, field, value) => {
//     const updateProducts = [...products];
//     updateProducts[index][field] = value;
//     const price = parseFloat(updateProducts[index].price) || 0;
//     const qty = parseFloat(updateProducts[index].qty) || 0;
//     updateProducts[index].amount = (price * qty).toFixed(2);
//     setProducts(updateProducts);
//   };
//   useEffect(() => {
//     const total = products.reduce(
//       (sum, p) => sum + parseFloat(p.amount || 0),
//       0
//     );
//     setTotalAmount(parseFloat(total.toFixed(2)));
//   }, [products, setTotalAmount]);
//   const productListForm = async (e) => {
//     e.preventDefault();
//     console.log("mainuserId", userId);
//     console.log("mainshopId", mainShopId);
//     console.log("maincustomerId", customerId);
//     setLoading(true);
//     setTimeout(async () => {
//       setLoading(false);
//       try {
//         const productIdsArray = [];
//         for (const product of products) {
//           const res1 = await axios.post(
//             "http://localhost:4000/api/manageproduct",
//             {
//               shopId: mainShopId,
//               productName: product.name,
//               productPrice: parseFloat(product.price),
//             }
//           );
//           productIdsArray.push(res1.data.productData._id);
//           console.log("productId", res1.data.productData._id);
//         }
//         setProductIds(productIdsArray);
//         const productsArray = products.map((product, index) => ({
//           product: productIdsArray[index],
//           quantity: parseFloat(product.qty),
//           amount: parseFloat(product.amount),
//         }));
//         const res2 = await axios.post("http://localhost:4000/api/productsell", {
//           shopId: mainShopId,
//           userId,
//           customerId,
//           products: productsArray,
//           totalAmount: parseFloat(totalAmount),
//           soldOn: date,
//         });
//         setMessage("details are successfully submitted");
//         setTimeout(() => {
//           setMessage("");
//         }, 1000);
//         Navigate("/pdfgenerate");
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
//         setTimeout(() => {
//           setError("");
//         }, 1000);
//       }
//     }, 2000);
//   };
//   return (
//     <div className=" min-h-screen bg-white pb-8">
//       <h1 className=" text-center text-3xl text-black font-bold shadow-md  px-4 py-4 bg-white">
//         Add Purchased Items
//       </h1>
//       <div className=" flex justify-center items-start    pb-6 pt-6">
//         <div className="w-full max-w-5xl min-h-[70vh] shadow-md  bg-white rounded-lg p-6 mt-10">
//           <form onSubmit={productListForm} className="space-y-6">
//             <h1 className=" text-black font-bold text-3xl">
//               product Details
//             </h1>
//             <p className=" -mt-4">
//               Add items, set quantities and prices, and get an instant total.
//               Neutral, focused, and distraction-free.
//             </p>
//             <div className="h-1 flex justify-center items-center">
//               {error && (
//                 <p className="text-red-500 text-[15px] mt-1 text-center font-bold">
//                   {error}
//                 </p>
//               )}
//               {message && (
//                 <p className="text-green-600 text-xl mt-1 text-center font-bold">
//                   {message}
//                 </p>
//               )}
//             </div>

//             {products.length > 0 && (
//               <div className="flex justify-between items-center mb-6 px-4 py-2  rounded-md">
//                 <div className="w-[250px]">
//                   <label className="text-black text-[18px] font-bold transition-transform duration-200 hover:scale-120 inline-block">
//                     Product name
//                   </label>
//                 </div>
//                 <div className="w-[120px]">
//                   <label className="text-black text-[18px] font-bold transition-transform duration-200 hover:scale-120 inline-block">
//                     Price
//                   </label>
//                 </div>
//                 <div className="w-[80px]">
//                   <label className="text-black text-[18px] font-bold transition-transform duration-200 hover:scale-120 inline-block">
//                     Qty
//                   </label>
//                 </div>
//                 <div className="w-[120px]">
//                   <label className="text-black text-[18px] font-bold transition-transform duration-200 hover:scale-120 inline-block">
//                     Amount
//                   </label>
//                 </div>
//                  <div className="w-[60px]">
//                   <label className="text-black text-[18px] font-bold transition-transform duration-200 hover:scale-120 inline-block">
//                     Action
//                   </label>
//                 </div>

//               </div>
//             )}

//             {products.map((product, index) => (
//               <div
//                 key={index}
//                 className="flex justify-between items-center mb-6"
//               >
//                 <input
//                   type="text"
//                   id="Product name"
//                   placeholder="e.g., Organic Honey, Iphone 15"
//                   value={product.name}
//                   onChange={(e) => handleChange(index, "name", e.target.value)}
//                   className=" w-[250px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400  "
//                 />

//                 <input
//                   type="number"
//                   id="product price"
//                   placeholder="0"
//                   value={product.price}
//                   onChange={(e) => handleChange(index, "price", e.target.value)}
//                   className="w-[120px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 "
//                 />

//                 <input
//                   type="number"
//                   id="quantity"
//                   placeholder="0"
//                   value={product.qty}
//                   onChange={(e) => handleChange(index, "qty", e.target.value)}
//                   className="w-[80px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
//                 />

//                 <input
//                   type="number"
//                   id="amount"
//                   placeholder="Amt"
//                   value={product.amount}
//                   onChange={(e) =>
//                     handleChange(index, "amount", e.target.value)
//                   }
//                   className="w-[120px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 "
//                 />

//                 <button
//                   type="button"
//                   onClick={() => handleDeleteProduct(index)}
//                   className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-transform duration-200 hover:scale-105"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//             <div className="flex justify-between items-center mb-14 ">
//               <button
//                 type="button"
//                 onClick={addProduct}
//                 className="px-3 w-[250px] py-1 bg-black text-white font-bold  rounded-md text-xl transition-transform duration-200 hover:scale-105 "
//               >
//                 Add Items
//               </button>
//               <div className="flex items-center space-x-3">
//                 <label className="font-bold text-xl text-black">
//                   Total Amount :
//                 </label>
//                 <input
//                   type="number"
//                   id="total amount"
//                   placeholder="0.00 Rs"
//                   value={totalAmount}
//                   onChange={(e) => setTotalAmount(e.target.value)}
//                   className="w-[200px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 "
//                 />
//               </div>
//               <div className="flex flex-col mb-4">
//                 <label
//                   className=" text-black text-[18px] font-bold mb-1"
//                   htmlFor="date"
//                 >
//                   Date
//                 </label>
//                 <input
//                   type="date"
//                   id="soldOn"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   className="w-[200px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
//                 />
//               </div>
//             </div>
//             <div className="flex justify-center">
//               <button
//                 className=" bg-black px-5 py-2 rounded-md text-white font-bold w-[400px] text-xl transition-transform duration-200 hover:scale-105 flex justify-center items-center"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <div className="h-5 w-5 border-4 border-gray-400 border-dashed rounded-full animate-spin"></div>
//                 ) : (
//                   "Submit Details"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ProductLists;



import React, { useEffect, useState } from "react";
import useShopStore from "../zustand/shopStore.js";
import useUserStore from "../zustand/userStore.js";
import useProductStore from "../zustand/productStore.js";
import useCustomerStore from "../zustand/customerStore.js";
import axios from "axios";
import useProductList from "../zustand/productList.js";
import amountOfProduct from "../zustand/productAmount.js";
import { useNavigate } from "react-router-dom";

const ProductLists = () => {
  const { totalAmount, setTotalAmount, date, setDate } = amountOfProduct();
  const { mainShopId } = useShopStore();
  const { userId } = useUserStore();
  const { customerId } = useCustomerStore();
  const { setProductIds } = useProductStore();
  const { products, setProducts, addProduct } = useProductList();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleDeleteProduct = (index) => {
    const updateProducts = products.filter((_, i) => i !== index);
    setProducts(updateProducts);
  };

  const handleChange = (index, field, value) => {
    const updateProducts = [...products];
    updateProducts[index][field] = value;
    const price = parseFloat(updateProducts[index].price) || 0;
    const qty = parseFloat(updateProducts[index].qty) || 0;
    updateProducts[index].amount = (price * qty).toFixed(2);
    setProducts(updateProducts);
  };

  useEffect(() => {
    const total = products.reduce(
      (sum, p) => sum + parseFloat(p.amount || 0),
      0
    );
    setTotalAmount(parseFloat(total.toFixed(2)));
  }, [products, setTotalAmount]);

  const productListForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      setLoading(false);
      try {
        const productIdsArray = [];

        for (const product of products) {
          const res1 = await axios.post(
            "https://customer-bill-generator-bckend.onrender.com/api/manageproduct",
            {
              shopId: mainShopId,
              productName: product.name,
              productPrice: parseFloat(product.price),
            }
          );
          productIdsArray.push(res1.data.productData._id);
        }

        setProductIds(productIdsArray);

        const productsArray = products.map((product, index) => ({
          product: productIdsArray[index],
          quantity: parseFloat(product.qty),
          amount: parseFloat(product.amount),
        }));

        await axios.post("https://customer-bill-generator-bckend.onrender.com/api/productsell", {
          shopId: mainShopId,
          userId,
          customerId,
          products: productsArray,
          totalAmount: parseFloat(totalAmount),
          soldOn: date,
        });

        setMessage("details are successfully submitted");
        setTimeout(() => setMessage(""), 1000);
        navigate("/pdfgenerate");
      } catch (error) {
        setError(
          error.response?.data?.message ||
          "server error, please try again"
        );
        setTimeout(() => setError(""), 1000);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white pb-8 px-2 sm:px-4">
      <h1 className="text-center text-2xl sm:text-3xl text-black font-bold shadow-md px-4 py-4 bg-white">
        Add Purchased Items
      </h1>

      <div className="flex justify-center pt-6">
        <div className="w-full max-w-5xl shadow-md bg-white rounded-lg p-4 sm:p-6 mt-6">
          <form onSubmit={productListForm} className="space-y-6">
            <h1 className="text-black font-bold text-2xl sm:text-3xl">
              Product Details
            </h1>

            <p className="text-sm sm:text-base">
              Add items, set quantities and prices, and get an instant total.
              Neutral, focused, and distraction-free.
            </p>

            <div className="h-4 text-center">
              {error && (
                <p className="text-red-500 text-sm font-bold">{error}</p>
              )}
              {message && (
                <p className="text-green-600 text-lg font-bold">{message}</p>
              )}
            </div>

            {/* Header */}
            {products.length > 0 && (
              <div className="hidden md:flex gap-2 font-bold text-black px-2 items-center">
                <span className="w-[250px]">Product</span>
                <span className="w-[120px]">Price</span>
                <span className="w-[80px]">Qty</span>
                <span className="w-[120px]">Amount</span>
                <span className="w-[80px]">Action</span>
              </div>
            )}

            {/* Products */}
            {products.map((product, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-4 md:gap-2 items-center"
              >
                <input
                  type="text"
                  placeholder="Product name"
                  value={product.name}
                  onChange={(e) =>
                    handleChange(index, "name", e.target.value)
                  }
                  className="w-full md:w-[250px] px-4 py-2 border rounded-md"
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={product.price}
                  onChange={(e) =>
                    handleChange(index, "price", e.target.value)
                  }
                  className="w-full md:w-[120px] px-4 py-2 border rounded-md"
                />

                <input
                  type="number"
                  placeholder="Qty"
                  value={product.qty}
                  onChange={(e) =>
                    handleChange(index, "qty", e.target.value)
                  }
                  className="w-full md:w-[80px] px-4 py-2 border rounded-md"
                />

                <input
                  type="number"
                  placeholder="Amount"
                  value={product.amount}
                  readOnly
                  className="w-full md:w-[120px] px-4 py-2 border rounded-md bg-gray-100"
                />

                <button
                  type="button"
                  onClick={() => handleDeleteProduct(index)}
                  className="bg-red-700 text-white px-4 py-2 rounded-lg w-full md:w-[80px]"
                >
                  Delete
                </button>
              </div>
            ))}

            {/* Bottom Controls */}
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mt-8">
              <button
                type="button"
                onClick={addProduct}
                className="bg-black text-white font-bold px-4 py-2 rounded-md w-full lg:w-[250px]"
              >
                Add Items
              </button>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div>
                  <label className="font-bold text-black">Total Amount</label>
                  <input
                    type="number"
                    value={totalAmount}
                    className="w-full sm:w-[200px] px-4 py-2 border rounded-md"
                    readOnly
                  />
                </div>

                <div>
                  <label className="font-bold text-black">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full sm:w-[200px] px-4 py-2 border rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="bg-black text-white font-bold px-6 py-3 rounded-md w-full sm:w-[400px]"
                disabled={loading}
              >
                {loading ? (
                  <div className="h-5 w-5 border-4 border-gray-400 border-dashed rounded-full animate-spin mx-auto"></div>
                ) : (
                  "Submit Details"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductLists;

