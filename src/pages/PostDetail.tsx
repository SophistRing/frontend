import CommentSector from "@/features/post/components/CommentSector";
import styled from "styled-components";

const DiscussionContainer = styled.div`
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoContainer = styled.p`
  font-weight: normal;
  color: #6b7280;
  font-size: 0.8rem;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0px;
`;

const Summary = styled.div`
  padding: 15px;
  background: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const ContentTitle = styled.h2`
  color: #111827;
  font-size: 0.9rem;
  font-weight: bold;
`;

const Content = styled.div`
  line-height: 1.6;
  margin-bottom: 20px;
`;

function PostDetail() {
  return (
    <DiscussionContainer>
      <Header>
        <Title>인공지능 윤리에 대한 토론</Title>
      </Header>
      <InfoContainer>2024년 2월 15일 * 참여자 238명</InfoContainer>
      <Summary>
        <ContentTitle>토론 요약</ContentTitle>
        인공지능의 발전에 따른 윤리적 문제와 규제 방안에 대한 토론입니다.
      </Summary>

      <Content>
        <ContentTitle>토론 내용</ContentTitle>
        인공지능의 윤리적 측면에서 가장 중요한 것은 투명성과 책임성입니다...
      </Content>
      <CommentSector />
    </DiscussionContainer>
  );
}

export default PostDetail;
