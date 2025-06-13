import { ApiResponse } from "@/types/ApiResponse";

export interface RoomDetailType {
  title: string;
  timer: number;
  category: string;
  status: string; 
  roomId: string;
  agreePerson: string;
  disagreePerson: string;
  writer: string;
  createdAt: string;
  description: string;
}

export type RoomDetailResponse = ApiResponse<RoomDetailType>;
