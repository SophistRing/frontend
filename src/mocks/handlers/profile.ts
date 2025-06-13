import { http, HttpResponse } from "msw";

export const profileHandlers = [
  http.post(
    `${import.meta.env.VITE_API_URL}/member/setProfile`,
    async ({ request }) => {
      const result = await request.json();

      return HttpResponse.json({
        message: "프로필 생성을 완료했습니다.",
        result: result,
      });
    }
  ),
];
