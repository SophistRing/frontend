import { useState } from "react";
import CommentSector from "@/features/post/components/CommentSector";
import styled from "styled-components";

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

const InfoContainer = styled.p`
  font-weight: normal;
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 20px;
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
  const postData = {
    title: "인공지능 윤리에 대한 토론",
    summary:
      "인공지능의 발전에 따른 윤리적 문제와 규제 방안에 대한 토론입니다.",
    description: `인공지능의 윤리적 측면에서 가장 중요한 것은 투명성과 책임성입니다.\n이에 대한 규제를 어떤 식으로 적용해야 할지에 대한 논의가 활발히 진행 중입니다.`,
    finishedAt: "2024-02-15",
    agreeNickname: "mm",
    opponentNickname: "mm2",
    winner: "mm2",
    chats: [
      { sender: "asdf", message: "첫 번째 메시지입니다." },
      { sender: "qwer", message: "두 번째 메시지입니다." },
      { sender: "zxcv", message: "세 번째 메시지입니다." },
      { sender: "user1", message: "네 번째 메시지입니다." },
      { sender: "user2", message: "다섯 번째 메시지입니다." },
      { sender: "user3", message: "여섯 번째 메시지입니다." },
    ],
  };

  const [showAllChats, setShowAllChats] = useState(false);
  const visibleChats = showAllChats
    ? postData.chats
    : postData.chats.slice(0, 3);

  return (
    <DiscussionContainer>
      <Header>
        <Title>
          {postData.title} ({postData.agreeNickname} vs{" "}
          {postData.opponentNickname})
        </Title>
      </Header>
      <InfoContainer>{postData.finishedAt} · 참여자 238명</InfoContainer>

      <Summary>
        <ContentTitle>토론 요약</ContentTitle>
        {postData.summary}
      </Summary>

      <Content>
        <ContentTitle>토론 내용</ContentTitle>
        {postData.description}
      </Content>

      <ChatBox>
        <ContentTitle>채팅 기록</ContentTitle>
        {visibleChats.map((chat, idx) => (
          <Chat key={idx}>
            <Sender>{chat.sender}:</Sender>
            {chat.message}
          </Chat>
        ))}
        {postData.chats.length > 3 && (
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
