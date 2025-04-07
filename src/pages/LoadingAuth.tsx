import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { LoginResponse } from "@/features/login/types/LoginType";
import { useProfileStore } from "@/features/login/store/useProfilestore";

function LoadingAuth() {
  const navigate = useNavigate();
  const setGoogle = useProfileStore((state) => state.setGoogle);
  const setProfile = useProfileStore((state) => state.setProfile);
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  console.log(code);
  const handleLoginPost = async () => {
    if (!code) {
      console.log("로그인 재시도하세요.");
      return;
    }

    try {
      const res: LoginResponse = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/login/google/2`,
        {
          code: code,
          redirectUrl: "http://localhost:5173/loadingAuth",
        }
      );
      const pickRes = {
        googleId: res.result.googleId,
        email: res.result.email,
        name: res.result.name,
        givenName: res.result.givenName,
        familyName: res.result.familyName,
        imageUrl: res.result.imageUrl,
      };
      if (res.result.isFirstLogin) {
        setGoogle(pickRes);
        navigate("/signup");
      } else {
        if (res.result.profile) setProfile(res.result.profile);
        setGoogle(pickRes);
        navigate("/");
      }
    } catch (error) {
      console.log("로그인 요청 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    handleLoginPost();
  }, []); // 의존성 배열 제거

  return <Loading title="로그인 중.." description="로그인 하고 있어요!" />;
}

export default LoadingAuth;
