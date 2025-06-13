// src/store/useMessageStore.ts
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

export interface MessagesType {
  sender: string;
  message: string;
}

interface MessageState {
  messages: MessagesType[];
  addMessage: (msg: MessagesType) => void;
  clearMessages: () => void;
}

// ✅ 타입을 정확히 맞춘 커스텀 sessionStorage 객체
const sessionStorageProvider: PersistStorage<MessageState> = {
  getItem: (name) => {
    const value = sessionStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    sessionStorage.removeItem(name);
  },
};

export const useMessageStore = create<MessageState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (msg) =>
        set((state) => ({ messages: [...state.messages, msg] })),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: "chat-messages",
      storage: sessionStorageProvider,
    }
  )
);
