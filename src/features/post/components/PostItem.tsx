import styled from "styled-components";

const ListContainer = styled.div`
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  height: 120px;
  padding: 16px;
  &:hover {
    border-color: #6366f1;
    outline: none;
  }
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  color: #111827;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #6b7280;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #4b5563;
`;

const Winner = styled.span`
  font-weight: bold;
  color: #6366f1;
`;

interface ListItemProps {
  title: string;
  description: string;
  totalComment: number;
  endDate: string;
  agreeNickname: string;
  opponentNickname: string;
  whoiswin: string;
  onClick: () => void;
}

function PostItem({
  title,
  description,
  totalComment,
  endDate,
  agreeNickname,
  opponentNickname,
  whoiswin,
  onClick,
}: ListItemProps) {
  return (
    <ListContainer onClick={onClick}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <InfoContainer>
        <span>🗓 종료일: {endDate}</span>
        <span>💬 댓글 수: {totalComment}</span>
      </InfoContainer>
      <InfoContainer>
        <span>
          🤝 {agreeNickname} vs {opponentNickname}
        </span>
        <Winner>🏆 승자: {whoiswin}</Winner>
      </InfoContainer>
    </ListContainer>
  );
}

export default PostItem;
