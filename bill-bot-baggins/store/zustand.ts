import create from 'zustand';

export const salesForceDataStore = create((set) => ({
  invoiceData: [],
  add: () => set((state) => ({ cart: state.cart + 1 }))
}))