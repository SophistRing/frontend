import { ApiResponse } from "@/types/ApiResponse";

export interface PostType {
  postId: string;
  title: string;
  description: string;
  totalComment: number;
  endDate: string;
  agreeNickname: string;
  opponentNickname: string;
  whoiswin: string;
}
export type PostResponse = ApiResponse<PostType[]>;
