import { useEffect, useState } from "react";
import styled from "styled-components";
import ExitIcon from "@/assets/exit.svg?react";
import useSocket from "../hooks/useSocket";
import { useChatRoomStore } from "../store/useChatRoomStore";
import axiosInstance from "@/api";
import { useMessageStore } from "../store/useMessageStore";
import ResultModal from "../ResultModal";

const DebateCard = styled.div`
  padding: 1rem 1.2rem;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  gap: 1rem;
  border: 1px solid #e5e7eb;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid gray;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Tag = styled.span`
  background-color: black;
  color: white;
  font-size: 0.6rem;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  display: inline-block;
  width: fit-content;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 0.85rem;
  margin-bottom: 10px;
`;

const Author = styled.span`
  font-size: 0.6rem;
  color: #555;
  margin-bottom: 10px;
`;

const Timer = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  text-align: right;
`;

const VoteSection = styled.div`
  display: flex;
  gap: 1rem;
`;

const VoteButton = styled.button<{ type: "pro" | "con" }>`
  padding: 0.5rem;
  border-radius: 10px;
  font-size: 0.6rem;
  font-weight: 500;
  background-color: ${({ type }) => (type === "pro" ? "#e6edff" : "#ffe6e6")};
  color: ${({ type }) => (type === "pro" ? "#2f5fd2" : "#d23c3c")};
  border: none;
  cursor: pointer;
`;

const BottomActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.4rem;
  font-size: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  cursor: pointer;

  &:nth-child(2) {
    color: red;
    border-color: red;
    background-color: #ffe6e6;
  }

  &:last-child {
    background-color: #1e1e1e;
    color: white;
    border: none;
  }
`;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function TopCard() {
  const data = useChatRoomStore((state) => state.currentRoom);

  const clearMessages = useMessageStore((state) => state.clearMessages);
  const [timeLeft, setTimeLeft] = useState(0);
  const messages = useMessageStore((state) => state.messages);
  const { stompHandler } = useSocket();
  const adminEntered = messages.some((msg) => msg.sender === "admin");
  const [open, setOpen] = useState(false);
  const onClick = () => {
    stompHandler.disconnect();
    clearMessages();
    axiosInstance.patch(`/room/finish`, { roomId: data?.roomId });
    setOpen(true);
  };

  useEffect(() => {
    if (data?.timer && adminEntered) {
      setTimeLeft(data.timer * 60);
    }
  }, [data?.timer, adminEntered]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  if (!data) return null;

  return (
    <>
      <DebateCard>
        <TopRow>
          <TitleSection>
            <Tag>{data.category}</Tag>
            <Title>{data.title}</Title>
            <Description>{data.description}</Description>
            <Author>작성자: {data.writer}</Author>
          </TitleSection>
          <Timer>
            {formatTime(timeLeft)}
            <br />
            남은 시간
          </Timer>
        </TopRow>
        <BottomRow>
          <VoteSection>
            <VoteButton type="pro">찬성: {data.agreePerson}</VoteButton>
            <VoteButton type="con">반대: {data.disagreePerson}</VoteButton>
          </VoteSection>
          <BottomActions>
            <ActionButton onClick={onClick}>
              <ExitIcon style={{ marginRight: "10px" }} onClick={onClick} />
              나가기
            </ActionButton>
          </BottomActions>
        </BottomRow>
      </DebateCard>
      {open && <ResultModal onClose={() => setOpen(false)} />}
    </>
  );
}

export default TopCard;
