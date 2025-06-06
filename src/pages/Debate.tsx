import ItemCover from "@/components/ItemCover";
import { useGetRoom } from "@/features/debate/query/room.query";
import ChatRoomItem from "@/features/debate/components/ChatRoomItem";
import useCategoryStore from "@/features/category/store/useCategoryStore";
import CategoryCover from "@/components/CategoryCover";
//import { useEffect } from "react";

function Debate() {
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  console.log(selectedCategory);
  const { data } = useGetRoom();

  // useEffect(() => {
  //   const response = fetch(`${import.meta.env.VITE_BACK_URL}/room`);

  //   response.then((res) => res.json()).then((data) => console.log(data));
  // }, [selectedCategory]);

  return (
    <>
      <CategoryCover>
        <ItemCover title="현재 준비된 토론들">
          {data.result &&
            data.result.map((debate) => (
              <ChatRoomItem
                key={debate.roomId}
                {...debate}
                date={debate.createdAt}
              />
            ))}
        </ItemCover>
      </CategoryCover>
    </>
  );
}
export default Debate;
