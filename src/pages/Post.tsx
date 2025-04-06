import { useNavigate } from "react-router-dom";
import ItemCover from "@/components/ItemCover";
import useCategoryStore from "@/features/category/store/useCategoryStore";
import CategoryCover from "@/components/CategoryCover";

import { useGetPost } from "@/features/post/query/post.query";
import PostItem from "@/features/post/components/PostItem";

function Post() {
  const navigate = useNavigate();
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const { data } = useGetPost(selectedCategory);

  return (
    <>
      <CategoryCover>
        <ItemCover title="토론 요약">
          {data.result.map((debate) => (
            <PostItem
              key={debate.postId}
              {...debate}
              onClick={() => navigate(`${debate.postId}`)}
            />
          ))}
        </ItemCover>
      </CategoryCover>
    </>
  );
}
export default Post;
