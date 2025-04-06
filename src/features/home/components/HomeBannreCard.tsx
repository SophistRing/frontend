import styled from "styled-components";

interface DebateData {
  title: string;
  timer: number;
  category: string;
  status: string;
  roomId: string;
  description: string;
  createdAt: string;
  writer: string;
}

interface DebateCardProps {
  data: DebateData;
}

interface CardProps {
  status: DebateData["status"];
}

const Card = styled.div<CardProps>`
  width: 320px;
  padding: 16px;
  border-radius: 8px;
  background: ${({ status }) =>
    status === "WAITING"
      ? "#ffefd5"
      : status === "ONGOING"
      ? "#f0e68c"
      : "#e6e6fa"};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Category = styled.span`
  font-size: 0.9rem;
  color: #555;
  padding: 4px 8px;
  background: #ddd;
  border-radius: 4px;
`;

const Status = styled.div<CardProps>`
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
  background: ${({ status }) =>
    status === "WAITING"
      ? "#ff8c00"
      : status === "ONGOING"
      ? "#32cd32"
      : "#4682b4"};
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  margin: 8px 0;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #333;
  margin: 8px 0;
`;

const Writer = styled.span`
  font-size: 0.85rem;
  color: #666;
`;

const CreatedAt = styled.div`
  font-size: 0.8rem;
  color: #999;
  margin-top: 8px;
  text-align: right;
`;

function DebateCard({ data }: DebateCardProps) {
  return (
    <Card status={data.status}>
      <Title>{data.title}</Title>
      <Category>{data.category}</Category>
      <Status status={data.status}>{data.status}</Status>
      <Description>{data.description}</Description>
      <Writer>작성자: {data.writer}</Writer>
      <CreatedAt>{new Date(data.createdAt).toLocaleString()}</CreatedAt>
    </Card>
  );
}

export default DebateCard;
