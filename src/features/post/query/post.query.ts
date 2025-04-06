import { useSuspenseQuery } from "@tanstack/react-query";
import getData from "@/api/getData";
import { PostResponse } from "../types/PostType";

export const useGetPost = (category?: string) => {
  return useSuspenseQuery<PostResponse>({
    queryKey: ["post", category],
    queryFn: () => {
      if (category) return getData("/post/category", { params: { category } });
      return getData("/post");
    },
  });
};
