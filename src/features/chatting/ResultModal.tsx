import ModalCover from "@/components/ModalCover";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 350px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const TeamBox = styled.div`
  background: #f5f5f5;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 20px;
`;

const TeamName = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

const PlayerList = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  color: gray;
`;

const Points = styled.div`
  font-size: 22px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;

  .gain {
    font-size: 16px;
    color: green;
  }
`;

const ProgressWrapper = styled.div`
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-bottom: 20px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  margin: 5px 0;
  position: relative;
`;

const ProgressFill = styled.div`
  width: 70%;
  height: 100%;
  background: black;
  border-radius: 3px;
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 10px;
  background: black;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

interface WinModalProps {
  onClose: () => void;
}

function ResultModal({ onClose }: WinModalProps) {
  const navigate = useNavigate();

  return (
    <ModalCover onClose={onClose}>
      <Container>
        <Title>승리</Title>
        <TeamBox>
          <TeamName>test</TeamName>
          <PlayerList>
            <span>test</span>
            <span>sins051301</span>
          </PlayerList>
        </TeamBox>
        <Points>
          <span className="total">0</span>
          <span className="gain">+25</span>
        </Points>
        <ProgressWrapper>
          <span>레벨 0</span>
          <ProgressBar>
            <ProgressFill />
          </ProgressBar>
          <span>다음 레벨까지 20 포인트</span>
        </ProgressWrapper>
        <ConfirmButton onClick={() => navigate("/")}>확인</ConfirmButton>
      </Container>
    </ModalCover>
  );
}

export default ResultModal;
