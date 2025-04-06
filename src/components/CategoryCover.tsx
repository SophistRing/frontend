import Category from "@/features/category/components/Category";
import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 20px;
  min-height: 85vh;
`;
const CategoryContainer = styled.main`
  width: 80%;
`;

interface CategoryCoverProps {
  children: ReactNode;
}

function CategoryCover({ children }: CategoryCoverProps) {
  return (
    <Container>
      <CategoryContainer>{children}</CategoryContainer>
      <Category />
    </Container>
  );
}
export default CategoryCover;
