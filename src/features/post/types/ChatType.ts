import { ApiResponse } from "@/types/ApiResponse";

export interface CommentType {
  comment: string;
  writer: string;
  createdAt: string;
}
export type CommentResponse = ApiResponse<CommentType[]>;
