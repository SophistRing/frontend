import { ApiResponse } from "@/types/ApiResponse";
import { ProfileType } from "./ProfileType";

export interface BasicProfile {
  email: string;
  memberName: string;
  level: number;
  exp: number;
  isFirstLogin: boolean;
  imgUrl: string;
}

export interface TokenResponse {
  token: string;
}

export interface LoginType extends BasicProfile {
  profileDto: ProfileType | null;
  accessToken: TokenResponse;
  refreshToken: TokenResponse;
}

export type LoginResponse = { data: ApiResponse<LoginType> };
