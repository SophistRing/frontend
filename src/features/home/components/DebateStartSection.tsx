import DebateModal from "@/components/DebateModal";
import { useState } from "react";
import styled from "styled-components";
import profile from "@/assets/profile.png";
import minichat from "@/assets/minichat.png";
import star from "@/assets/star.png";

const Container = styled.div`
  width: 100%;
  background: #f5f6f7;
  padding: 40px 0;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background: black;
  color: white;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #333;
  }
`;

const DescriptionSection = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: row;
  color: black;
  font-weight: bold;
  height: 60px;
  gap: 10px;
  margin-top: 40px;
`;
const ImageContainer = styled.img`
  width: 20px;
  height: 20px;
`;

function DebateStartSection() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Container>
        <Content>
          <Title>새로운 토론을 시작해보세요</Title>
          <Subtitle>여러분의 생각을 나누고 다양한 의견을 들어보세요</Subtitle>
          <Button onClick={() => setShowModal(true)}>새 토론 시작하기 →</Button>
        </Content>
        {showModal && <DebateModal onClose={() => setShowModal(false)} />}
      </Container>
      <DescriptionSection>
        <ImageContainer src={profile} alt="profile" />
        신혁수님이 토론에 참여했습니다.
        <ImageContainer src={minichat} alt="minichat" />
        나영채님이 새로운 의견을 남겼습니다.
        <ImageContainer src={star} alt="star" />
        안용식님의 의견이 주목받고 있습니다.
      </DescriptionSection>
    </>
  );
}

export default DebateStartSection;
