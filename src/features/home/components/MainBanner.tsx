import styled from "styled-components";
import DebateCard from "./HomeBannreCard";
import banner from "@/assets/banner.png";
import { useGetRoom } from "@/features/debate/query/room.query";

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 600px;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
`;

const BannerContentSection = styled.div`
  position: absolute;
  top: 20px;
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const BannerTitle = styled.h1`
  font-size: xx-large;
  color: white;
  text-align: center;
`;
const BannerDescription = styled.h3`
  font-size: smaller;
  color: white;
  text-align: center;
`;

const CardSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
`;

function MainBanner() {
  const { data } = useGetRoom();
  const slicedData = data.result.slice(0, 3);
  return (
    <BannerContainer>
      <BannerImg src={banner} alt="banner" />
      <BannerContentSection>
        <BannerTitle>실시간 HOT 토론</BannerTitle>
        <BannerDescription>
          지금 가장 뜨거운 토론에 참여하세요
        </BannerDescription>
        <CardSection>
          {slicedData.map((item) => (
            <DebateCard data={item}></DebateCard>
          ))}
        </CardSection>
      </BannerContentSection>
    </BannerContainer>
  );
}
export default MainBanner;
