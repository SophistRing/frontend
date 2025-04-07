import { create } from "zustand";
import { GoogleProfile } from "../types/LoginType";
import { ProfileType } from "../types/ProfileType";

interface UserStore {
  google: GoogleProfile | null;
  profile: ProfileType | null;
  setGoogle: (googleData: GoogleProfile) => void;
  setProfile: (profileData: ProfileType) => void;
  clear: () => void;
}

export const useProfileStore = create<UserStore>((set) => ({
  google: null,
  profile: null,

  setGoogle: (googleData) => set({ google: googleData }),
  setProfile: (profileData) => set({ profile: profileData }),
  clear: () => set({ google: null, profile: null }),
}));
