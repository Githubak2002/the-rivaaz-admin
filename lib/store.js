import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),  
  removeUser: () => set({ user: null }),  

  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
}))


export default useUserStore;