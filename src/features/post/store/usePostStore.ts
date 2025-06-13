// src/store/usePostStore.ts
import { create } from "zustand";
import { PostType } from "../types/PostType";


interface PostState {
  post: PostType | null;
  setPost: (post: PostType) => void;
  clearPost: () => void;
}

export const usePostStore = create<PostState>((set) => ({
  post: null,
  setPost: (post) => set({ post }),
  clearPost: () => set({ post: null }),
}));
