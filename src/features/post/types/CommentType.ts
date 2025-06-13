import { ApiResponse } from "@/types/ApiResponse";

export interface CommentType {
  content: string;
  writer: string;
  commentId: string;
  createdAt: string;
}
export type CommentResponse = ApiResponse<CommentType[]>;
