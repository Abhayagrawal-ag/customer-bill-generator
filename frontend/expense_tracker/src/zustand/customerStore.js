import { create } from "zustand";
import { persist } from "zustand/middleware";
const useCustomerStore = create(
  persist(
    (set) => ({
      customerId: null,
      customerNames: [],
      customerIds : [],
      setCustomerId: (id) => set({ customerId: id }),
      setCustomerNames: (name) => set({customerNames : name}),
      setCustomerIds : (id) => set({customerIds : id})
    }),
    {
      name: "customer-storage",
    }
  )
);
export default useCustomerStore;
