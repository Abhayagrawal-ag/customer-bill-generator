import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductStore = create(
  persist(
    (set) => ({
      productIds: [],
      setProductIds: (ids) => set({ productIds: ids}),
    }),
    {
      name: "product-storage",
    }
  )
);
export default useProductStore;
