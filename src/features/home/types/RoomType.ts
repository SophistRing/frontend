export interface RoomType {
  title: string;
  timer: number;
  category: string;
  status: "WAITING" | "ONGOING" | "FINISHED";
  roomId: string;
  description: string;
  createdAt: string;
  writer: string;
}
