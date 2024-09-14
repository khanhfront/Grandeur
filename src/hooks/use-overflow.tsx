import { create } from "zustand";

interface OverflowState {
  overflow: boolean;
  setOverflow: (value: boolean) => void;
}

const useOverflowStore = create<OverflowState>((set) => ({
  overflow: false,
  setOverflow: (value) => set({ overflow: value }),
}));

export default useOverflowStore;
