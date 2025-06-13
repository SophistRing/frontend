import { useSuspenseQuery } from "@tanstack/react-query";
import getData from "@/api/getData";
import { PostResponse } from "../types/PostType";
import { ChatResponse } from "../types/ChatType";

export const useGetPost = (category?: string) => {
  return useSuspenseQuery<PostResponse>({
    queryKey: ["post", category],
    queryFn: () => {
      if (category) return getData("/post/category", { params: { category } });
      return getData("/post");
    },
  });
};

export const useGetPostDetail = (postId: string) => {
  return useSuspenseQuery<ChatResponse>({
    queryKey: ["post", postId],
    queryFn: () => getData(`/post/${postId}/chat`),
  });
};
