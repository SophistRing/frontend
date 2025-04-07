import { ApiResponse } from "@/types/ApiResponse";

export interface ProfileType {
  gender: string;
  nickname: string;
  age: number;
  introduction: string;
  preferCategory: string;
}

export type ProfileResponse = ApiResponse<ProfileType>;
