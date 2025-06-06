// store/useRoomStore.ts
import { create } from "zustand";
import { RoomDetailType } from "@/features/debate/types/RoomDetailType";

interface RoomState {
  currentRoom: RoomDetailType | null;
  setRoom: (room: RoomDetailType) => void;
  clearRoom: () => void;
}

export const useChatRoomStore = create<RoomState>((set) => ({
  currentRoom: null,
  setRoom: (room) => set({ currentRoom: room }),
  clearRoom: () => set({ currentRoom: null }),
}));
