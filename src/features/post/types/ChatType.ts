import { ApiResponse } from "@/types/ApiResponse";

export interface ChatType {
  message: string;
  sender: string;
  createdAt: string;
}
export type ChatResponse = ApiResponse<ChatType[]>;
