import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BasicProfile } from "../types/LoginType";
import { ProfileType } from "../types/ProfileType";

interface UserStore {
  basicProfile: BasicProfile | null;
  profile: ProfileType | null;
  setGoogle: (googleData: BasicProfile) => void;
  setProfile: (profileData: ProfileType) => void;
  clear: () => void;
}

export const useProfileStore = create<UserStore>()(
  persist(
    (set) => ({
      basicProfile: null,
      profile: null,
      setGoogle: (googleData) => set({ basicProfile: googleData }),
      setProfile: (profileData) => set({ profile: profileData }),
      clear: () => set({ basicProfile: null, profile: null }),
    }),
    {
      name: "user-profile-store",
    }
  )
);
