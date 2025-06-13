// useSocketStore.ts
import { create } from "zustand";
import { Client } from "@stomp/stompjs";

interface SocketStore {
  wsClient: Client | null;
  setWsClient: (client: Client | null) => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  wsClient: null,
  setWsClient: (client) => set({ wsClient: client }),
}));
