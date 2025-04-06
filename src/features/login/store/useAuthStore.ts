import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  expiresAt: number | null;
  refreshToken: string | null;
  setToken: (
    accessToken: string,
    refreshToken: string,
    expiresInMinutes: number
  ) => void;
  setAccessToken: (accessToken: string, expiresInMinutes: number) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      setToken: (accessToken, refreshToken, expiresInMinutes) => {
        const expiresAt = Date.now() + expiresInMinutes * 60 * 1000;
        set({ accessToken, refreshToken, expiresAt });
      },
      setAccessToken: (accessToken, expiresInMinutes) => {
        const expiresAt = Date.now() + expiresInMinutes * 60 * 1000;
        set((prev) => ({
          ...prev,
          accessToken,
          expiresAt,
        }));
      },
      clearToken: () =>
        set({ accessToken: null, refreshToken: null, expiresAt: null }),
    }),
    { name: "auth-storage" }
  )
);

export const isTokenExpired = (): boolean => {
  const expiresAt = useAuthStore.getState().expiresAt;
  return !expiresAt || Date.now() > expiresAt;
};

export const isLoginChecking = (): boolean => {
  return isTokenExpired() || useAuthStore.getState().accessToken === null;
};
