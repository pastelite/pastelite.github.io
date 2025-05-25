import { create } from "zustand";

interface PositionState {
  position: number[];
  setPosition: (index: number, value: number) => void;
}

const usePositionStore = create<PositionState>((set) => ({
  position: [],
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