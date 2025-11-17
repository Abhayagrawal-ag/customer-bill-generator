import { create } from "zustand";
import { persist } from "zustand/middleware";
const useShopStore = create(
  persist(
    (set) => ({
      shopIds: [],
      shopName: [],
      mainShopId: null,
      setShopIds: (id) => set({ shopIds: id }),
      setShopName: (name) => set({shopName: name}),
      setMainShopId: (id) => set({mainShopId: id})
    }),
    {
      name: "shop-storage",
    }
  )
);
export default useShopStore;
