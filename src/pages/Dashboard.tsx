import styled from "styled-components";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ItemCover from "@/components/ItemCover";
import SummaryContentItem from "@/features/home/components/summary/SummaryContentItem";
import { useNavigate } from "react-router-dom";
import useProfileStore from "@/features/login/store/useProfileStore";

const Container = styled.div`
  width: 100%;
  padding: 20px;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  background: white;
  width: 83%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 90%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ChartBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const MemberNameHeader = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const MemberInfo = styled.p`
  font-size: 0.8rem;
  color: #666;
`;

const dummyData = [
  { month: "1주", 참여: 20, 승리: 15 },
  { month: "2주", 참여: 25, 승리: 18 },
  { month: "3주", 참여: 30, 승리: 20 },
  { month: "4주", 참여: 35, 승리: 22 },
  { month: "5주", 참여: 40, 승리: 25 },
  { month: "6주", 참여: 50, 승리: 30 },
];

const expData = [
  { month: "1주", 경험치: 1000 },
  { month: "2주", 경험치: 2500 },
  { month: "3주", 경험치: 4000 },
  { month: "4주", 경험치: 7000 },
  { month: "5주", 경험치: 11000 },
  { month: "6주", 경험치: 16000 },
];
const dummyContents = [
  {
    id: 3,
    title: "AI 윤리적 한계는 어디까지인가?",
    description: "AI가 인간의 결정을 대체할 수 있는가에 대한 윤리적 논의",
    chats: 45,
    time: 20,
  },
  {
    id: 4,
    title: "원격근무는 미래의 표준이 될 수 있을까?",
    description: "생산성과 워라밸 측면에서 원격근무의 장단점을 토론",
    chats: 27,
    time: 14,
  },
  {
    id: 5,
    title: "플라스틱 사용, 규제가 필요한가?",
    description: "환경 보호를 위한 개인과 정부의 역할에 대해 논의",
    chats: 38,
    time: 18,
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const { profile, basicProfile } = useProfileStore();
  return (
    <Container>
      <ProfileCard>
        <Avatar
          src={basicProfile?.imgUrl || "src/assets/profile.png"}
          alt="Profile"
        />
        <div>
          <MemberNameHeader>{profile?.nickname || "녀루"}</MemberNameHeader>
          <MemberInfo>
            레벨: {basicProfile?.level} | 경험치: {basicProfile?.exp || 200}
          </MemberInfo>
        </div>
      </ProfileCard>

      <StatsContainer>
        <ChartBox>
          <h4>토론 활동 통계</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dummyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="참여" fill="#8884d8" />
              <Bar dataKey="승리" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox>
          <h4>경험치 획득 추이</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={expData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="경험치"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>
      </StatsContainer>
      <ItemCover title="최근 토론 요약">
        {dummyContents.map((item) => (
          <SummaryContentItem
            onClick={() => navigate(`/summary/${item.id}`)}
            key={item.title}
            title={item.title}
            description={item.description}
            time={item.time}
            chats={item.chats}
          />
        ))}
      </ItemCover>
    </Container>
  );
}

export default Dashboard;
