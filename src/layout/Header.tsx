import styled, { css } from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useProfileStore from "@/features/login/store/useProfileStore";
import axiosInstance from "@/api";
import sophistIcon from "@/assets/sophist.png";

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
  width: 60px;
  height: 25px;
  background-color: black;
  color: white;
  border: none;
  font-size: 0.8rem;
  text-align: center;
  text-decoration: none;
  padding-top: 12px;
  border-radius: 5px;
  margin-right: 15px;
`;

const LogOutButton = styled.button`
  width: 60px;
  height: 25px;
  background-color: red;
  color: white;
  border-radius: 5px;
  border: none;
  font-size: 0.7rem;
  text-align: center;
  text-decoration: none;
  margin-right: 15px;
  cursor: pointer;
`;

const ProfileButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const HeaderButtonSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
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
      border-bottom: 2px solid black;
    `}

  cursor: pointer;
`;

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const basicProfile = useProfileStore((state) => state.basicProfile);
  console.log("basicProfile", basicProfile);

  const handleLogOut = async () => {
    try {
      await axiosInstance.post("/member/logout");
      useProfileStore.getState().clear();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <HeaderSection>
      <NavigationSection>
        <img src={sophistIcon} alt="logo" width={50} height={50} />
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

      {basicProfile ? (
        <HeaderButtonSection>
          <ProfileButton onClick={() => navigate("/dashboard")}>
            <img
              src={basicProfile.imgUrl || "/src/assets/profile.png"}
              alt="profile"
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
          </ProfileButton>
          <LogOutButton onClick={handleLogOut}>로그아웃</LogOutButton>
        </HeaderButtonSection>
      ) : (
        <LoginButton to={"/login"}>로그인</LoginButton>
      )}
    </HeaderSection>
  );
}

export default Header;
