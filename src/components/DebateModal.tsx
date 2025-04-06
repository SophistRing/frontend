import { useState } from "react";
import styled from "styled-components";
import { RoomMakeType } from "../features/debate/types/RoomType";
import { useRoomAdd } from "../features/debate/query/room.query";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.form`
  background: white;
  width: 400px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  margin: 10px 0 5px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 300px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 150px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 5px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: black;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
`;

interface DebateModalProps {
  onClose: () => void;
}

const category = [
  { label: "시사/정치", value: "debate" },
  { label: "과학/기술", value: "debate" },
  { label: "문화/예술", value: "debate" },
  { label: "스포츠", value: "debate" },
  { label: "경제", value: "debate" },
  { label: "교육", value: "debate" },
];

function DebateModal({ onClose }: DebateModalProps) {
  const [formData, setFormData] = useState<RoomMakeType>({
    title: "",
    category: "",
    timer: 10,
    isShare: true,
    password: "",
    isApproval: true,
    description: "",
  });
  const { mutate } = useRoomAdd();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value === "true" }));
  };

  const handleCreateRoom = () => {
    mutate(formData);
    onClose();
  };

  return (
    <ModalContainer onClick={onClose}>
      <ModalContent
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Title>토론방 생성하기</Title>

        <Label>토론 제목</Label>
        <Input
          id="title"
          type="text"
          placeholder="토론 제목을 입력해주세요"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <Label>토론 분야</Label>
        <Select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          {category.map((item) => (
            <option key={item.label} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
        <Label>토론 내용</Label>
        <Input
          id="description"
          type="text"
          placeholder="토론 내용을 입력해주세요"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <Label>토론 시간</Label>
        <Select
          name="timer"
          value={formData.timer}
          onChange={handleInputChange}
        >
          <option value={10}>10분</option>
          <option value={20}>20분</option>
          <option value={30}>30분</option>
        </Select>

        <Label>찬반 선택</Label>
        <RadioGroup>
          <RadioLabel>
            <input
              type="radio"
              name="isApproval"
              value="true"
              checked={formData.isApproval === true}
              onChange={handleRadioChange}
            />
            찬성
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="isApproval"
              value="false"
              checked={formData.isApproval === false}
              onChange={handleRadioChange}
            />
            반대
          </RadioLabel>
        </RadioGroup>

        <Label>방 공개 설정</Label>
        <RadioGroup>
          <RadioLabel>
            <input
              type="radio"
              name="isShare"
              value="true"
              checked={formData.isShare === true}
              onChange={handleRadioChange}
            />
            공개
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="isShare"
              value="false"
              checked={formData.isShare === false}
              onChange={handleRadioChange}
            />
            비공개
          </RadioLabel>
        </RadioGroup>

        {!formData.isShare && (
          <>
            <Label>비밀번호</Label>
            <Input
              id="password"
              placeholder="비밀번호를 입력해주세요"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </>
        )}

        <Button type="button" onClick={handleCreateRoom}>
          방 생성하기
        </Button>
      </ModalContent>
    </ModalContainer>
  );
}

export default DebateModal;
