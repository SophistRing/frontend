import { useState } from "react";
import styled from "styled-components";
import DeleteButton from "./DeleteButton";
import { useRoomEnter } from "../query/room.query";
import useSocket from "@/features/chatting/hooks/useSocket";
import { useProfileStore } from "@/features/login/store/useProfileStore";

const ChatItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 16px;
  gap: 10px;
  height: 120px;
  border: 1px solid #e5e7eb;
  background: #fff;
  transition: border-color 0.2s ease-in-out, transform 0.2s ease-in-out;
  &:hover {
    border-color: #6366f1;
    outline: none;
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Tag = styled.span<{ color: string }>`
  background: ${(props) => props.color};
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 3px 6px;
  border-radius: 4px;
  margin-right: 10px;
`;

const Title = styled.h1`
  color: #111827;
  font-size: 1rem;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
`;

const Spans = styled.div`
  gap: 10px;
  display: flex;
`;

const Info = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  gap: 10px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background: black;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
`;

const PasswordInput = styled.input`
  padding: 4px 8px;
  font-size: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  margin-right: 10px;
`;

interface ChatRoomItemProps {
  title: string;
  description: string;
  writer: string;
  date: string;
  timer: number;
  status: string;
  isShare: boolean;
  roomId: string;
}

const statusConfig = {
  WAITING: { color: "#FBBF24", text: "대기중" },
  processing: { color: "#34D399", text: "진행중" },
  finish: { color: "#EF4444", text: "완료" },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function ChatRoomItem({
  title,
  description,
  writer,
  date,
  timer,
  status,
  isShare,
  roomId,
}: ChatRoomItemProps) {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");

  const { mutate } = useRoomEnter(roomId);
  const { stompHandler } = useSocket();
  const { profile } = useProfileStore();

  const statusInfo = statusConfig[status as keyof typeof statusConfig] || {
    color: "#D1D5DB",
    text: "알 수 없음",
  };

  interface enterType {
    roomId: string;
    password?: string;
  }

  const onClick = ({ roomId, password }: enterType) => {
    stompHandler.connect(roomId);
    mutate({ roomId, password: password ? password : null });
  };

  const handleJoinClick = () => {
    if (isShare) {
      onClick({ roomId, password });
    } else {
      setShowPasswordInput(true);
    }
  };

  const handlePasswordSubmit = () => {
    onClick({ roomId, password });
    setPassword("");
    setShowPasswordInput(false);
  };

  return (
    <ChatItemContainer>
      <Tags>
        <Spans>
          <Tag color="#6366F1">ETC</Tag>
          <Tag color={statusInfo.color}>{statusInfo.text}</Tag>
          {!isShare && <Tag color="#f25146">비공개</Tag>}
        </Spans>
        <DeleteButton
          post={writer}
          user={profile?.nickname || ""}
          roomId={roomId}
        />
      </Tags>

      <Title>{title}</Title>
      <Description>{description}</Description>

      <Info>
        <Spans>
          <span>👤사용자: {writer}</span>
          <span>⌛제한 시간: {timer}분</span>
          <span>{formatDate(date)}</span>
        </Spans>
        {showPasswordInput ? (
          <div>
            <PasswordInput
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handlePasswordSubmit}>입장</Button>
          </div>
        ) : (
          <Button onClick={handleJoinClick}>참여하기</Button>
        )}
      </Info>
    </ChatItemContainer>
  );
}

export default ChatRoomItem;
