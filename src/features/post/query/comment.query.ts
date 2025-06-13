import sendData from "@/api/sendData";
import { queryClient } from "@/services/TanstackQueryStore";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { CommentResponse } from "../types/CommentType";
import getData from "@/api/getData";
import deleteData from "@/api/deleteData";
import { toast } from "react-toastify";

// 댓글 가져오기
export const useGetComment = (postId: string) => {
  return useSuspenseQuery<CommentResponse>({
    queryKey: ["comment", postId],
    queryFn: () => getData(`/comment/${postId}`),
  });
};

// 댓글 추가
export const useCommentAdd = (postId: string) => {
  return useMutation({
    mutationFn: ({ comment }: { comment: string }) =>
      sendData("post", "/comment/add", { postId, comment }),

    onSuccess: () => {
      toast.success("댓글 작성 완료!");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", postId] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
};

// 댓글 삭제
export const useCommentDelete = (postId: string) => {
  return useMutation({
    mutationFn: (commentId: string) => deleteData(`/comment/${commentId}`),

    onSuccess: () => {
      toast.success("댓글 삭제 완료!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", postId] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
};
