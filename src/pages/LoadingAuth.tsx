import axios from "axios";
import { useEffect } from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const H2 = styled.h2`
  font-size: 1.5rem;
  color: #343a40;
`;

function LoadingAuth() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  console.log(code);
  const handleLoginPost = async () => {
    if (!code) {
      console.log("로그인 재시도하세요.");
      return;
    }

    try {
      const res = await axios.post(
        "https://7760-115-91-214-5.ngrok-free.app/login/google/2",
        {
          code: code,
          redirectUrl: "http://localhost:5173/loadingAuth",
        }
      );

      console.log(res);
      //localStorage.setItem("bagtoken", accessToken);

      //res.data.isExistingMember ? navigate("/home") : navigate("/nickname");
      window.location.reload();
    } catch (error) {
      console.log("로그인 요청 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    handleLoginPost();
  }, []); // 의존성 배열 제거

  return (
    <LoadingContainer>
      <H2>로그인 중입니다...</H2>
    </LoadingContainer>
  );
}

export default LoadingAuth;
