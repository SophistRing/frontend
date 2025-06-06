import sendData from "@/api/sendData";
import { queryClient } from "@/services/TanstackQueryStore";
import { useMutation } from "@tanstack/react-query";
import { ProfileType } from "../types/ProfileType";

export const useSetProfile = () => {
  return useMutation({
    mutationFn: (data: ProfileType) =>
      sendData("patch", "/member/setProfile", data ),

    // ❌ 실패 시 처리
    onError: (err: Error) => {
      console.error("프로필 설정 오류:", err.message);
      alert(`프로필 설정 실패: ${err.message}`);
    },

    // ✅ 성공/실패 후 무효화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },

    onSuccess: () => {
      alert("프로필 설정 완료!");
    },
  });
};
