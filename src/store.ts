import { create } from "zustand";

interface PositionState {
  position: number[];
  titleButtonShow: boolean;
  setPosition: (index: number, value: number) => void;
  setTitleButtonShow: (value: boolean) => void;
}

const usePositionStore = create<PositionState>((set) => ({
  position: [],
  titleButtonShow: false,
  setTitleButtonShow: (value) => set({ titleButtonShow: value }),
  setPosition: (index, value) =>
    set((state) => {
      const current = state.position;
      const newPosition = [...current];

      // Fill missing indexes
      for (let i = newPosition.length; i <= index; i++) {
        newPosition[i] = 0;
      }

      // Prevent unnecessary updates
      if (newPosition[index] === value) return {};

      newPosition[index] = value;

      return { position: newPosition };
    }),
}));

export default usePositionStore;