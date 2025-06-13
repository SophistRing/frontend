import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { RoomEnterType, RoomMakeType, RoomResponse } from "../types/RoomType";
import getData from "@/api/getData";
import sendData from "@/api/sendData";
import deleteData from "@/api/deleteData";
import { queryClient } from "@/services/TanstackQueryStore";
import { toast } from "react-toastify";
import { RoomDetailResponse, RoomDetailType } from "../types/RoomDetailType";
import { useNavigate } from "react-router-dom";
import { useChatRoomStore } from "@/features/chatting/store/useChatRoomStore";
import useCategoryStore from "@/features/category/store/useCategoryStore";
import useSocket from "@/features/chatting/hooks/useSocket";

export const useGetRoom = () => {
  const category = useCategoryStore((state) => state.selectedCategory);
  return useSuspenseQuery<RoomResponse>({
    queryKey: ["room", category],
    queryFn: () => {
      if (category) return getData(`/room/category?category=${category}`);
      return getData("/room");
    },
  });
};

export const useGetRoomAll = () => {
  return useSuspenseQuery<RoomResponse>({
    queryKey: ["room"],
    queryFn: () => getData(`/room`),
  });
};

export const useGetDetailRoom = (id?: string) => {
  return useSuspenseQuery<RoomDetailResponse>({
    queryKey: ["room", id],
    queryFn: () => getData(`/room/${id}`),
  });
};

export const useRoomAdd = () => {
  const navigate = useNavigate();
  const setRoom = useChatRoomStore((state) => state.setRoom);
  const { stompHandler } = useSocket();
  return useMutation({
    mutationFn: (data: RoomMakeType) => sendData("post", "/room/add", data),

    onSuccess: (res) => {
      const roomId = res.result?.roomId as any;

      stompHandler.connect(roomId);
      setRoom(res.result as RoomDetailType);
      if (roomId) {
        toast.success("방 생성 완료!");
        navigate(`/room/${roomId}`); // ✅ 생성된 방으로 이동
      } else {
        toast.error("방 생성은 됐지만 ID를 받지 못했습니다.");
      }
    },

    onError: () => {
      toast.error("방 생성 실패");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["room"] });
    },
  });
};

export const useRoomDelete = () => {
  const category = useCategoryStore((state) => state.selectedCategory);
  return useMutation({
    mutationFn: (roomId: string) => deleteData(`/room/remove/${roomId}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["room"] });
      queryClient.invalidateQueries({ queryKey: ["room", category] });
      toast.success("방 삭제 완료!");
    },
  });
};

export const useRoomEnter = (roomId: string) => {
  const setRoom = useChatRoomStore((state) => state.setRoom);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: RoomEnterType) => sendData("post", "/room/enter", data),
    onSuccess: (res) => {
      setRoom(res.result as RoomDetailType);
      console.log("입장 데이터!", res.result);
      navigate(`/room/${roomId}`);
    },
    onError: () => {
      toast.warn("방 입장 실패!");
    },
  });
};
