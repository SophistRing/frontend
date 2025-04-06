import styled from "styled-components";
import { useEffect, useState } from "react";

interface CommentItemProps {
  comment: string;
  writer: string;
  createdAt: string;
}

const CommentContainer = styled.div`
  border-bottom: 1px solid #e5e7eb;
  padding: 10px 0;
  line-height: 1.5;
`;

const Writer = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  color: #111827;
`;

const Content = styled.div`
  margin-top: 5px;
  font-size: 0.8rem;
  color: #374151;
`;

const Timestamp = styled.div`
  margin-top: 5px;
  font-size: 0.75rem;
  color: #6b7280;
`;

function formatTime(createdAt: string): string {
  const created = new Date(createdAt);
  const now = new Date();
  const diff = (now.getTime() - created.getTime()) / 1000;

  if (diff < 180) return "방금 전";

  const yyyy = created.getFullYear();
  const mm = String(created.getMonth() + 1).padStart(2, "0");
  const dd = String(created.getDate()).padStart(2, "0");
  const hh = String(created.getHours()).padStart(2, "0");
  const min = String(created.getMinutes()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

function CommentItem({ comment, writer, createdAt }: CommentItemProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(formatTime(createdAt));
  }, [createdAt]);

  return (
    <CommentContainer>
      <Writer>{writer}</Writer>
      <Content>{comment}</Content>
      <Timestamp>{time}</Timestamp>
    </CommentContainer>
  );
}

export default CommentItem;
