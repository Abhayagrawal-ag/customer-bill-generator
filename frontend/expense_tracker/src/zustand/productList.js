import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductList = create(
  persist(
    (set) => ({
      products: [{ name: "", price: "", qty: "", amount: "" }],
      setProducts: (newProducts) => set({ products: newProducts }),
      addProduct: () =>
        set((state) => ({
          products: [
            ...state.products,
            { name: "", price: "", qty: "", amount: "" },
          ],
        })),
    }),
    {
      name: "productlist-storage",
    }
  )
);
export default useProductList;