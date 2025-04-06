import styled from "styled-components";

const DebateContainer = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: none;
  }
`;

const DebateTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 6px;
`;

const DebateDescription = styled.p`
  font-size: 0.9rem;
  color: #444;
  margin-bottom: 8px;
`;

const DebateInfo = styled.div`
  font-size: 0.85rem;
  color: #666;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DebateMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Participants = styled.span`
  font-weight: bold;
  color: #333;
`;

const CommentCount = styled.span`
  color: #007aff;
  font-weight: bold;
`;

const Winner = styled.span`
  font-weight: bold;
  color: #6366f1;
`;

const EndDate = styled.span`
  font-size: 0.85rem;
  color: #888;
`;

interface DebateItemProps {
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
}: DebateItemProps) {
  return (
    <DebateContainer onClick={onClick}>
      <DebateTitle>{title}</DebateTitle>
      <DebateDescription>{description}</DebateDescription>
      <DebateInfo>
        <DebateMeta>
          <Participants>
            👥 {agreeNickname} vs {opponentNickname}
          </Participants>
          <CommentCount>💬 {totalComment} 댓글</CommentCount>
        </DebateMeta>
        <DebateMeta>
          <EndDate>🗓 종료일: {endDate}</EndDate>
          <Winner>🏆 승자: {whoiswin}</Winner>
        </DebateMeta>
      </DebateInfo>
    </DebateContainer>
  );
}

export default PostItem;
