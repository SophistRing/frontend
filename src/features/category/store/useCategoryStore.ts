import { create } from "zustand";

interface CategoryState {
  selectedCategory: string | undefined;
  setCategory: (category: string | undefined) => void;
}

const useCategoryStore = create<CategoryState>((set) => ({
  selectedCategory: undefined,
  setCategory: (category) => set({ selectedCategory: category }),
}));

export default useCategoryStore;
