import styled, { css } from "styled-components";
import DummyLogo from "@/assets/dummyLogo.svg?react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DummyProfile from "@/assets/dummyLogo.svg?react";

const HeaderSection = styled.header`
  border-bottom: 1px solid gray;
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const LoginButton = styled(Link)`
  width: 40px;
  height: 15px;
  background-color: black;
  color: white;
  border: none;
  font-size: 0.5rem;
  text-align: center;
  text-decoration: none;
  padding-top: 5px;
  border-radius: 2px;
  margin-right: 10px;
`;
const NavigationSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const NavigateButton = styled.button<{ active?: boolean }>`
  font-size: smaller;
  color: black;
  text-align: center;
  background-color: white;
  border: none;
  width: auto;
  height: 30px;

  ${(props) =>
    props.active &&
    css`
      border-bottom: 1px solid black;
    `}
`;

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <HeaderSection>
      <NavigationSection>
        <DummyLogo onClick={() => navigate("/")} />
        <NavigateButton
          onClick={() => navigate("/debate")}
          active={location.pathname === "/debate"}
        >
          현재 진행 토론
        </NavigateButton>
        <NavigateButton
          onClick={() => navigate("/post")}
          active={location.pathname === "/post"}
        >
          토론 요약
        </NavigateButton>
        <NavigateButton
          onClick={() => navigate("/")}
          active={location.pathname === "/"}
        >
          홈
        </NavigateButton>
      </NavigationSection>
      <DummyProfile onClick={() => navigate("/dashboard")} />
      <LoginButton to={"/login"}>로그인</LoginButton>
    </HeaderSection>
  );
}

export default Header;
