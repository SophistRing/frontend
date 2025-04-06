import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { RoomMakeType, RoomResponse, RoomType } from "../types/RoomType";
import getData from "@/api/getData";
import sendData from "@/api/sendData";
import deleteData from "@/api/deleteData";
import { queryClient } from "@/services/TanstackQueryStore";

export const useGetRoom = (category?: string) => {
  return useSuspenseQuery<RoomResponse>({
    queryKey: ["room", category],
    queryFn: () => {
      if (category) return getData("/room/category", { params: { category } });
      return getData("/room");
    },
  });
};
export const useRoomAdd = () => {
  return useMutation({
    mutationFn: (data: RoomMakeType) => sendData("post", "/room/add", { data }),

    // ✅ 낙관적 업데이트
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["room"] }); // 기존 요청 중지

      const oldData = queryClient.getQueryData<RoomType[]>(["room"]); // 안전한 타입 적용

      // 캐시 업데이트 (oldData 존재 시만)
      if (oldData) {
        // 새로운 데이터를 추가할 때 기존 데이터를 바탕으로 업데이트
        queryClient.setQueryData<RoomType[]>(
          ["room"],
          [
            ...oldData,
            {
              title: data.title,
              timer: data.timer,
              category: data.category,
              status: "waiting",
              roomId: "new_room_id", // 예시로 추가된 방 ID
              description: "새로 생성된 방입니다.", // 예시로 추가된 설명
              writer: "작성자", // 예시로 추가된 작성자 정보
              createdAt: "21031",
            },
          ]
        );
      }

      return { oldData }; // context로 전달
    },

    // ❌ 요청 실패 시 이전 데이터 복원
    onError: (err: Error, _, context) => {
      console.error("Error Email put:", err.message);
      alert(`방 생성 실패: ${err.message}`);
      if (context?.oldData) {
        queryClient.setQueryData(["room"], context.oldData); // 안전하게 복원
      }
    },

    // ✅ 성공/실패 후 쿼리 무효화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["room"] });
    },

    onSuccess: () => {
      alert("방 생성!");
    },
  });
};

export const useRoomDelete = () => {
  return useMutation({
    mutationFn: (roomId: string) => deleteData(`/room/remove/${roomId}`), // ✅ 올바른 삭제 요청 방식

    onMutate: async (roomId) => {
      await queryClient.cancelQueries({ queryKey: ["room"] });

      const oldData = queryClient.getQueryData<RoomType[]>(["room"]);

      if (oldData) {
        queryClient.setQueryData<RoomType[]>(
          ["room"],
          oldData.filter((room) => room.roomId !== roomId) // ✅ 방 삭제 후 상태 업데이트
        );
      }

      return { oldData };
    },

    onError: (err, _, context) => {
      console.error("방 삭제 오류:", err.message);
      alert(`방 삭제 실패: ${err.message}`);

      if (context?.oldData) {
        queryClient.setQueryData(["room"], context.oldData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["room"] });
    },

    onSuccess: () => {
      alert("방 삭제 완료!");
    },
  });
};
