import DebateStartSection from "@/features/home/components/DebateStartSection";

import MainBanner from "@/features/home/components/MainBanner";
import PostCard from "@/features/post/components/PostCart";
import { useGetPost } from "@/features/post/query/post.query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Section = styled.div`
  padding: 20px;
`;

function Home() {
  const { data } = useGetPost();
  const navigate = useNavigate();

  return (
    <>
      <>
        <MainBanner />
        {data.result.length > 0 &&
          data.result.map((debate) => (
            <Section>
              <PostCard
                key={debate.postId}
                {...debate}
                onClick={() => navigate(`/post/${debate.postId}`)}
              />
            </Section>
          ))}
        <DebateStartSection />
      </>
    </>
  );
}

export default Home;
