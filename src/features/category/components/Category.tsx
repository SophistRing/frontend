import styled from "styled-components";
import { useState } from "react";
import DebateModal from "../../../components/DebateModal";
import useCategoryStore from "../store/useCategoryStore";

const CategorySection = styled.aside`
  width: 15vw;
  display: flex;
  flex-direction: column;
`;

const CategoryContents = styled.div`
  background-color: rgba(0, 0, 0, 0);
  border: solid #e5e7eb;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

`;

const CategorySelectButton = styled.button<{ selected: boolean }>`
  font-size: 0.7rem;
  text-indent: 8px;
  border: none;
  text-align: left;
  margin-bottom: 5px;
  padding: 1%;
  background-color: ${({ selected }) =>
    selected ? "#4b5563" : "rgba(0, 0, 0, 0)"};
  color: ${({ selected }) => (selected ? "white" : "black")};
`;

const CategoryTitle = styled.p`
  color: #111827;
  font-size: 0.7rem;
  font-weight: bold;
  text-indent: 8px;
  padding-bottom: 10px;
  border-bottom: solid #e5e7eb;
`;

const CategoryCreateButton = styled.button`
  background-color: #000000;
  color: white;
  font-size: 0.6rem;
  height: 24px;
  border: none;
  border-radius: 0px 0px 5px 5px;
  cursor: pointer;
`;

const category = [
  { label: "시사/정치", value: "debate" },
  { label: "과학/기술", value: "debate" },
  { label: "문화/예술", value: "debate" },
  { label: "스포츠", value: "debate" },
  { label: "경제", value: "debate" },
  { label: "교육", value: "debate" },
];

function Category() {
  const { selectedCategory, setCategory } = useCategoryStore();
  const [showModal, setShowModal] = useState(false);

  const onClick = (value: string) => {
    if (value === selectedCategory) setCategory(undefined);
    else setCategory(value);
  };

  return (
    <CategorySection>
      <CategoryContents>
        <CategoryTitle>카테고리</CategoryTitle>
        {category.map((item) => (
          <CategorySelectButton
            key={item.label}
            selected={selectedCategory === item.label}
            onClick={() => onClick(item.value)}
          >
            {item.label}
          </CategorySelectButton>
        ))}
      </CategoryContents>
      <CategoryCreateButton onClick={() => setShowModal(true)}>
        + 새 토론 만들기
      </CategoryCreateButton>
      {showModal && <DebateModal onClose={() => setShowModal(false)} />}
    </CategorySection>
  );
}

export default Category;
