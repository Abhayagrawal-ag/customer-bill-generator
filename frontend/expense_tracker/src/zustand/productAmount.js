import { create } from "zustand";
import { persist } from "zustand/middleware";
const amountOfProduct = create(
  persist(
    (set) => ({
      totalAmount: "",
      date: "",
      setTotalAmount: (newAmount) => set({ totalAmount: newAmount }),
      setDate: (date) => set({date: date}),
    }),
    {
      name: "productamount-storage",
    }
  )
);
export default amountOfProduct;
