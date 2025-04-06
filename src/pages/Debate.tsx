import { useNavigate } from "react-router-dom";
import ItemCover from "@/components/ItemCover";
import { useGetRoom } from "@/features/debate/query/room.query";
import ChatRoomItem from "@/features/debate/components/ChatRoomItem";
import useCategoryStore from "@/features/category/store/useCategoryStore";
import CategoryCover from "@/components/CategoryCover";

function Debate() {
  const navigate = useNavigate();
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const { data } = useGetRoom(selectedCategory);

  return (
    <>
      <CategoryCover>
        <ItemCover title="현재 준비된 토론들">
          {data.result.map((debate) => (
            <ChatRoomItem
              key={debate.roomId}
              {...debate}
              date={debate.createdAt}
              onClick={() => navigate(`room/${debate.roomId}`)}
            />
          ))}
        </ItemCover>
      </CategoryCover>
    </>
  );
}
export default Debate;
