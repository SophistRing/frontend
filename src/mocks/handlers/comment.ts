import { http, HttpResponse } from "msw";

export const dummyComments = [
  {
    comment: "정말 좋은 의견이네요!",
    writer: "토론왕",
    createdAt: "2025-04-06 17:30:00", // 현재 시각에서 3분 이내라면 '방금 전'
  },
  {
    comment: "저는 조금 다른 생각입니다.",
    writer: "반박러",
    createdAt: "2025-04-06 15:20:00",
  },
  {
    comment: "좋은 토론 감사합니다!",
    writer: "참가자1",
    createdAt: "2025-04-05 21:45:00",
  },
  {
    comment: "그건 좀 다른 방향으로도 볼 수 있을 것 같아요.",
    writer: "깊은생각",
    createdAt: "2025-04-03 10:05:00",
  },
  {
    comment: "정리해 주셔서 감사합니다!",
    writer: "정리의달인",
    createdAt: "2024-12-31 23:59:00",
  },
];

export const commentHandlers = [
  //유저 정보 가져오기기
  http.get(`${import.meta.env.VITE_API_URL}/comment/1`, () => {
    return HttpResponse.json({
      result: dummyComments,
    });
  }),

  http.post(`${import.meta.env.VITE_API_URL}/comment/add`, async ({ request }) => {
    const result = await request.json();

    return HttpResponse.json({
      message: "댓글 생성을 완료했습니다.",
      result: result,
    });
  }),
  http.delete(`${import.meta.env.VITE_API_URL}/comment/remove/1`, async () => {
    return HttpResponse.json({
      message: "댓글을 삭제했습니다.",
    });
  }),
];
