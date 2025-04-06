import sendData from "@/api/sendData";
import { queryClient } from "@/services/TanstackQueryStore";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { CommentResponse, CommentType } from "../types/ChatType";
import getData from "@/api/getData";
import deleteData from "@/api/deleteData";

// 댓글 가져오기
export const useGetComment = (postId: string) => {
  return useSuspenseQuery<CommentResponse>({
    queryKey: ["comment", postId],
    queryFn: () => getData(`/comment/${postId}`),
  });
};

// 댓글 추가
export const useCommentAdd = () => {
  return useMutation({
    mutationFn: (result: { postId: string; comment: string }) =>
      sendData("post", "/comment/add", { result }),

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["comment", data.postId] });

      const oldData = queryClient.getQueryData<CommentResponse>([
        "comment",
        data.postId,
      ]);

      if (oldData) {
        const newComment: CommentType = {
          comment: data.comment,
          writer: "현재 사용자", // 필요한 경우 수정
          createdAt: new Date().toISOString(),
        };

        queryClient.setQueryData<CommentType[]>(
          ["comment", data.postId],
          [...oldData.result, newComment]
        );
      }

      return { oldData, postId: data.postId };
    },

    onError: (err, _, context) => {
      alert(`댓글 등록 실패: ${err.message}`);
      if (context?.oldData) {
        queryClient.setQueryData(["comment", context.postId], context.oldData);
      }
    },

    onSettled: (_, __, ___, context) => {
      if (context?.postId) {
        queryClient.invalidateQueries({
          queryKey: ["comment", context.postId],
        });
      }
    },

    onSuccess: () => {
      alert("댓글 작성 완료!");
    },
  });
};

// 댓글 삭제
export const useCommentDelete = () => {
  return useMutation({
    mutationFn: (postId: string) => deleteData(`/comment/${postId}`),

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["comment", postId] });

      const oldData = queryClient.getQueryData<CommentType[]>([
        "comment",
        postId,
      ]);

      if (oldData) {
        // 삭제한 댓글을 구분하려면 commentId 필요 (백엔드 구조에 따라 수정)
        queryClient.setQueryData<CommentType[]>(
          ["comment", postId],
          oldData.slice(0, -1) // 예시: 마지막 댓글 삭제
        );
      }

      return { oldData, postId };
    },

    onError: (err, _, context) => {
      alert(`댓글 삭제 실패: ${err.message}`);
      if (context?.oldData) {
        queryClient.setQueryData(["comment", context.postId], context.oldData);
      }
    },

    onSettled: (_, __, ___, context) => {
      if (context?.postId) {
        queryClient.invalidateQueries({
          queryKey: ["comment", context.postId],
        });
      }
    },

    onSuccess: () => {
      alert("댓글 삭제 완료!");
    },
  });
};
