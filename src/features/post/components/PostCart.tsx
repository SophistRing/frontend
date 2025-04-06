import styled from "styled-components";

const ListContainer = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    border-color: #6366f1;
    box-shadow: 0 6px 18px rgba(99, 102, 241, 0.2);
    transform: translateY(-2px);
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.4;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
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

function PostCard({
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

export default PostCard;
