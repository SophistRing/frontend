import { ReactNode } from "react";
import styled from "styled-components";

const SummaryContainer = styled.main`
  background: white;
  border-radius: 5px;
  border: solid #e5e7eb;
  margin-bottom: 30px;
  margin-left: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SummaryHeader = styled.p`
  color: #111827;
  font-size: 1.1rem;
  height: 40px;
  margin-top: 20px;
  font-weight: bold;
  text-indent: 8px;
`;

interface HomeItemProps {
  children: ReactNode;
  title: string;
}

function ItemCover({ children, title }: HomeItemProps) {
  return (
    <SummaryContainer>
      <SummaryHeader>{title}</SummaryHeader>
      {children}
    </SummaryContainer>
  );
}
export default ItemCover;
