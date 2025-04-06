import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const FormBox = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  height: 100px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  margin-top: 10px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 0.95rem;
  border-radius: 8px;
  margin-top: 10px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.95rem;
`;

const Button = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 14px;
  background: black;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #333;
  }
`;

const categoryOptions = [
  "시사/정치",
  "과학/기술",
  "문화/예술",
  "스포츠",
  "경제",
  "교육",
];

function SignUp() {
  const [form, setForm] = useState({
    gender: "male",
    nickname: "",
    age: "",
    introduction: "",
    preferCategory: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, gender: e.target.value }));
  };

  const handleSubmit = () => {
    console.log("회원가입 데이터:", form);
  };

  return (
    <Container>
      <FormBox>
        <Title>회원가입</Title>

        <div>
          <Label>성별</Label>
          <RadioGroup>
            <RadioLabel>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={form.gender === "male"}
                onChange={handleRadio}
              />
              남성
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={form.gender === "female"}
                onChange={handleRadio}
              />
              여성
            </RadioLabel>
          </RadioGroup>
        </div>

        <div>
          <Label>닉네임</Label>
          <Input
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해주세요"
          />
        </div>

        <div>
          <Label>나이</Label>
          <Input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="나이를 입력해주세요"
          />
        </div>

        <div>
          <Label>자기소개</Label>
          <Textarea
            name="introduction"
            value={form.introduction}
            onChange={handleChange}
            placeholder="자기소개를 입력해주세요"
          />
        </div>

        <div>
          <Label>선호 카테고리</Label>
          <Select
            name="preferCategory"
            value={form.preferCategory}
            onChange={handleChange}
          >
            <option value="">-- 선택 --</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </div>

        <Button type="button" onClick={handleSubmit}>
          회원가입
        </Button>
      </FormBox>
    </Container>
  );
}

export default SignUp;
