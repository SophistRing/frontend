import styled from "styled-components";
import CommentItem from "./Comments";
import { useCommentAdd, useGetComment } from "../query/comment.query";
import useCustomParams from "@/utils/useCustomParams";
import { useState } from "react";

const CommentsSection = styled.div`
  margin-top: 20px;
`;

const CommentInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const CommentInput = styled.textarea`
  width: 90%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
`;

const CommentButton = styled.button`
  margin-top: 10px;
  padding: 8px 15px;
  background: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CommentTitle = styled.h2`
  color: #111827;
  font-size: 0.9rem;
  font-weight: bold;
`;

function CommentSector() {
  const [userComment, setUserComment] = useState("");
  const postId = useCustomParams();

  const { data } = useGetComment(postId);
  const { mutate } = useCommentAdd();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserComment(e.target.value);
  };

  const handleSubmit = () => {
    if (!userComment.trim()) return;

    mutate(
      { postId, comment: userComment },
      {
        onSuccess: () => {
          setUserComment("");
        },
      }
    );
  };

  return (
    <CommentsSection>
      <CommentTitle>댓글 ({data.result.length || 0})</CommentTitle>

      <CommentInputContainer>
        <CommentInput
          placeholder="댓글을 입력하세요..."
          value={userComment}
          onChange={handleChange}
        />
        <CommentButton onClick={handleSubmit}>등록</CommentButton>
      </CommentInputContainer>

      {data.result.map((comment, index) => (
        <CommentItem key={index} {...comment} />
      ))}
    </CommentsSection>
  );
}

export default CommentSector;
