import DebateStartSection from "@/features/home/components/DebateStartSection";

import MainBanner from "@/features/home/components/MainBanner";
import PostCard from "@/features/post/components/PostCart";
import { useGetPost } from "@/features/post/query/post.query";
import { useNavigate } from "react-router-dom";

function Home() {
  const { data } = useGetPost();
  const navigate = useNavigate();

  return (
    <>
      <>
        <MainBanner />
        {data.result.map((debate) => (
          <PostCard
            key={debate.postId}
            {...debate}
            onClick={() => navigate(`${debate.postId}`)}
          />
        ))}
        <DebateStartSection />
      </>
    </>
  );
}

export default Home;
