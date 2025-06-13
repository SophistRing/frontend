import { RoomType } from "@/features/debate/types/RoomType";
import { http, HttpResponse } from "msw";

const roomDummyresult: RoomType[] = [
  {
    title: "title1",
    timer: 30,
    category: "ai",
    status: "WAITING",
    roomId: "4",
    description: "료이키 테카이",
    createdAt: "2025-04-02T03:36:29.651Z",
    writer: "sfsf",
    isShare: true,
  },
  {
    title: "title2",
    timer: 0,
    category: "ai2",
    status: "WAITING",
    roomId: "3",
    description: "료이키 테카이",
    createdAt: "2025-04-02T03:36:29.651Z",
    writer: "sfsf",
    isShare: false,
  },
  {
    title: "title3",
    timer: 0,
    category: "ai3",
    status: "WAITING",
    roomId: "2",
    description: "료이키 테카이",
    createdAt: "2025-04-02T03:36:29.651Z",
    writer: "sfsf",
    isShare: true,
  },
];
const categoryDummyresult: RoomType[] = [
  {
    title: "title1",
    timer: 30,
    category: "ai",
    status: "WAITING",
    roomId: "1",
    description: "료이키 테카이",
    createdAt: "2025-04-02T03:36:29.651Z",
    writer: "sfsf",
    isShare: false,
  },
];

const dummyDetailRoom = {
  title: "AI 시대의 윤리",
  timer: 300,
  category: "TECH",
  status: "WAITING",
  roomId: "room12345",
  agreePerson: "홍길동",
  disagreePerson: "김철수",
  writer: "이영희",
  createdAt: "2025-04-23T15:00:00.000Z",
  description:
    "AI 기술의 발전이 인간 사회에 미치는 영향과 윤리적 기준에 대해 토론합니다.",
};

export const roomHandlers = [
  //유저 정보 가져오기기
  http.get(`${import.meta.env.VITE_API_URL}/room`, () => {
    return HttpResponse.json({
      result: roomDummyresult,
    });
  }),

  http.get(`${import.meta.env.VITE_API_URL}/room/4`, () => {
    return HttpResponse.json({
      result: dummyDetailRoom,
    });
  }),

  http.get(`${import.meta.env.VITE_API_URL}/room/category?debate`, () => {
    return HttpResponse.json({
      result: categoryDummyresult,
    });
  }),
  http.post(`${import.meta.env.VITE_API_URL}/room/add`, async ({ request }) => {
    const result = await request.json();

    return HttpResponse.json({
      message: "새로운 채팅방 생성을 완료했습니다.",
      result: result,
    });
  }),
  http.delete(`${import.meta.env.VITE_API_URL}/room/remove/1`, async () => {
    return HttpResponse.json({
      message: "채팅방을 삭제했습니다.",
    });
  }),

  http.post(
    `${import.meta.env.VITE_API_URL}/room/enter`,
    async ({ request }) => {
      const result = await request.json();

      return HttpResponse.json({
        message: "입장 성공.",
        result: result,
      });
    }
  ),
];
