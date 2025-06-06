import axios from "axios";
import { useCallback, useEffect } from "react";
import useToastNavigate from "./useToastNavigate";
import { useProfileStore } from "../store/useProfileStore";
import { LoginType } from "../types/LoginType";

function useHandleLoginPost() {
  const { toastAndGo } = useToastNavigate();
  const setGoogle = useProfileStore((state) => state.setGoogle);
  const setProfile = useProfileStore((state) => state.setProfile);

  const saveInformation = useCallback(
    (data: LoginType) => {
      if (data.profileDto) setProfile(data.profileDto);
      setGoogle({
        ...data,
      });
    },
    [setGoogle, setProfile]
  );

  const login = useCallback(async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      toastAndGo(false, "코드가 없습니다. 다시 로그인 해주세요.", "/", {
        autoClose: 1500,
      });
      return;
    }

    try {
      const response = await axios.post(`/api/v1/login/google`, {
        code,
        redirectUrl: import.meta.env.VITE_APP_GOOGLE_AUTH_REDIRECT_URI,
      });
      console.log(" 로그인 성공", response);

      if (response.data.result.isFirstLogin) {
        saveInformation(response.data.result);
        toastAndGo(true, "로그인 성공", "/signup", {
          autoClose: 1500,
        });
      } else {
        saveInformation(response.data.result);
        toastAndGo(true, "로그인 성공", "/", {
          autoClose: 1500,
        });
      }
    } catch (error) {
      toastAndGo(false, "로그인 실패", "/login", {
        autoClose: 1500,
      });
      console.error("에러 발생", error);
    }
  }, [saveInformation, toastAndGo]);

  useEffect(() => {
    login();
  }, [login]);
}

export default useHandleLoginPost;
