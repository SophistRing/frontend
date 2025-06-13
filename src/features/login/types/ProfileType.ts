import { ApiResponse } from "@/types/ApiResponse";

export interface ProfileType {
  nickname: string;
  gender: string;
  age: number;
  introduction: string;
  preferCategory: string;
}

export type ProfileResponse = ApiResponse<ProfileType>;
