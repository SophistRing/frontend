import { ApiResponse } from "@/types/ApiResponse";
import { ProfileType } from "./ProfileType";

export interface GoogleProfile {
  googleId: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
  imageUrl: string;
}

export interface LoginType extends GoogleProfile {
  isFirstLogin: boolean;
  profile: ProfileType | null;
}

export type LoginResponse = ApiResponse<LoginType>;
