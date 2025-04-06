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
  },
];

export const roomHandlers = [
  //유저 정보 가져오기기
  http.get(`${import.meta.env.VITE_API_URL}/room`, () => {
    return HttpResponse.json({
      result: roomDummyresult,
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
];
