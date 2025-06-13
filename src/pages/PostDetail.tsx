import { useState } from "react";
import CommentSector from "@/features/post/components/CommentSector";
import styled from "styled-components";
import { usePostStore } from "@/features/post/store/usePostStore";
import { useGetPostDetail } from "@/features/post/query/post.query";
import useCustomParams from "@/utils/useCustomParams";

const DiscussionContainer = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Summary = styled.div`
  padding: 18px;
  background: #f9fafb;
  border-radius: 10px;
  margin-bottom: 25px;

  line-height: 1.8; // 줄 간격
  letter-spacing: 0.5px; // 글자 간격
`;

const ContentTitle = styled.h2`
  color: #111827;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Content = styled.div`
  line-height: 1.8;
  margin-bottom: 30px;
  white-space: pre-wrap;
`;

const ChatBox = styled.div`
  margin-bottom: 30px;
`;

const Chat = styled.div`
  margin-bottom: 12px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
`;

const Sender = styled.span`
  font-weight: 600;
  margin-right: 6px;
`;

const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: #2563eb;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

function PostDetail() {
  const postId = useCustomParams();
  const { data } = useGetPostDetail(postId);
  const post = usePostStore((state) => state.post);

  const [showAllChats, setShowAllChats] = useState(false);

  return (
    <DiscussionContainer>
      <Header>
        <Title>
          {post?.title} ({post?.agreeNickname} vs {post?.opponentNickname})
        </Title>
      </Header>

      <Summary>
        <ContentTitle>토론 요약</ContentTitle>
        {post?.summary}
      </Summary>

      <Content>
        <ContentTitle>토론 내용</ContentTitle>
        {post?.description}
      </Content>

      <ChatBox>
        <ContentTitle>채팅 기록</ContentTitle>
        {data?.result.map((chat, idx) => (
          <Chat key={idx}>
            <Sender>{chat.sender}:</Sender>
            {chat.message}
          </Chat>
        ))}
        {data?.result.length > 3 && (
          <ShowMoreButton onClick={() => setShowAllChats(!showAllChats)}>
            {showAllChats ? "접기" : "채팅 더보기"}
          </ShowMoreButton>
        )}
      </ChatBox>

      <CommentSector />
    </DiscussionContainer>
  );
}

export default PostDetail;
