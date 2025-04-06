import { ApiResponse } from "@/types/ApiResponse";

export interface RoomType {
  title: string;
  timer: number;
  category: string;
  status: string;
  roomId: string;
  description: string;
  writer: string;
  createdAt: string;
}

export type RoomResponse = ApiResponse<RoomType[]>;

export interface RoomMakeType {
  title: string;
  timer: number;
  category: string;
  isShare: boolean;
  password: string;
  isApproval: boolean;
  description: string;
}
export type RoomMakeResponse = ApiResponse<RoomMakeType>;
