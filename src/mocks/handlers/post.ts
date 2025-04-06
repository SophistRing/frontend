import { http, HttpResponse } from "msw";

const postDummyresult = [
  {
    postId: "1",
    title: "논쟁 1",
    description: "이 주제에 대해 어떻게 생각하시나요?",
    totalComment: 45,
    endDate: "2024-02-15",
    agreeNickname: "Alice",
    opponentNickname: "Bob",
    whoiswin: "Alice",
  },
  {
    postId: "2",
    title: "논쟁 2",
    description: "기술 발전이 사회에 미치는 영향에 대한 토론입니다.",
    totalComment: 67,
    endDate: "2024-03-10",
    agreeNickname: "Charlie",
    opponentNickname: "Dave",
    whoiswin: "Dave",
  },
  {
    postId: "3",
    title: "논쟁 3",
    description: "AI가 인간의 창의성을 대체할 수 있을까요?",
    totalComment: 89,
    endDate: "2024-04-05",
    agreeNickname: "Eve",
    opponentNickname: "Frank",
    whoiswin: "Eve",
  },
];

const categoryPostDummyresult = [
  {
    postId: "1",
    title: "논쟁 5",
    description: "기후 변화 대응을 위한 최선의 방법은?",
    totalComment: 74,
    endDate: "2024-06-30",
    agreeNickname: "Ivy",
    opponentNickname: "Jack",
    whoiswin: "Ivy",
  },
];

export const postHandlers = [
  //유저 정보 가져오기기
  http.get(`${import.meta.env.VITE_API_URL}/post`, () => {
    return HttpResponse.json({
      result: postDummyresult,
    });
  }),

  http.get(`${import.meta.env.VITE_API_URL}/post/category?debate`, () => {
    return HttpResponse.json({
      result: categoryPostDummyresult,
    });
  }),
];
