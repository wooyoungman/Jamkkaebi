import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import PurpleButton from "@/components/manager/PurpleButton";
import { User } from "@/interfaces/manager";
import { DUMMY_USERS } from "@interfaces/driveruser";
import { Line, Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  RadarController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  RadarController,
  Title,
  Tooltip,
  Legend
);

export const ReportPage = () => {
  const { id } = useParams();
  const { data: driver } = useQuery<User>({
    queryKey: ["driver", id],
    queryFn: () => {
      return DUMMY_USERS.find((user) => user.id === id) as User;
    },
  });

  // 집중 시간 비교 임의 데이터
  const concentrationData = {
    labels: ["May 5", "May 6", "May 7", "May 8", "May 9", "May 10", "May 11"],
    datasets: [
      {
        label: "운전 시간",
        data: [200, 180, 276, 230, 190, 180, 170],
        borderColor: "#22C55E", // 초록색으로 변경
        backgroundColor: "#22C55E",
        tension: 0.4,
        fill: false,
      },
      {
        label: "휴식 시간",
        data: [100, 90, 150, 120, 100, 90, 85],
        borderColor: "#F59E0B", // 주황색으로 변경
        backgroundColor: "#F59E0B",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  // 운전 분석 임의 데이터
  const radarData = {
    labels: ["운전 능력", "피로도", "집중력", "위험도", "안정성", "속도"],
    datasets: [
      {
        data: [85, 70, 90, 65, 80, 75],
        borderColor: "#38BDF8",
        backgroundColor: "rgba(56, 189, 248, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  // 근무 시간 임의 데이터
  const workTimeData = {
    labels: [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ],
    datasets: [
      {
        label: "이번 주",
        data: [120, 80, 100, 40, 60, 130, 90],
        backgroundColor: "#38BDF8",
      },
      {
        label: "저번 주",
        data: [150, 60, 110, 50, 60, 140, 60],
        backgroundColor: "#FB923C",
      },
    ],
  };

  // 뇌파 차트 임의 데이터
  const brainwaveData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun"],
    datasets: [
      {
        label: "Content 1",
        data: [20, -15, -20, 40, 25, -15],
        borderColor: "#4F46E5",
        tension: 0.4,
      },
      {
        label: "Content 2",
        data: [40, 20, 10, -10, 10, 30],
        borderColor: "#EC4899",
        tension: 0.4,
      },
      {
        label: "Content 3",
        data: [-15, 30, 30, 20, -15, 60],
        borderColor: "#F43F5E",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "#E5E7EB",
          drawBorder: false,
        },
        ticks: {
          stepSize: 50,
          font: {
            size: 12,
          },
          color: "#64748B",
        },
      },
      x: {
        grid: {
          color: "#E5E7EB",
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#64748B",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        align: "center" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          boxHeight: 6,
          padding: 20,
          font: {
            size: 12,
          },
          color: "#64748B",
        },
      },
      tooltip: {
        backgroundColor: "#1E293B",
        padding: 12,
        titleFont: {
          size: 12,
        },
        bodyFont: {
          size: 12,
        },
        displayColors: false,
      },
    },
    elements: {
      point: {
        radius: 3,
        hitRadius: 10,
        hoverRadius: 5,
        backgroundColor: "white",
        borderWidth: 2,
      },
      line: {
        borderWidth: 2,
      },
    },
  };

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          display: false,
        },
        grid: {
          color: "#E5E7EB",
        },
        pointLabels: {
          font: {
            size: 12,
          },
          color: "#64748B",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#E5E7EB",
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#64748B",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#64748B",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          boxHeight: 6,
          padding: 20,
          font: {
            size: 12,
          },
          color: "#64748B",
        },
      },
    },
  };

  if (!driver) return <div>Loading...</div>;

  return (
    <Container>
      <HeaderSection>
        <DriverProfile>
          <ProfileImage src={driver.profileImage} alt={driver.name} />
          <div>
            <DriverName>{driver.name} 기사님</DriverName>
            <ReportTitle>운전 보고서</ReportTitle>
          </div>
        </DriverProfile>
        <ButtonWrapper>
          <PurpleButton>Export</PurpleButton>
        </ButtonWrapper>
      </HeaderSection>

      <StatsContainer>
        <LeftStats>
          <StatCard>
            <IconWrapper>👤</IconWrapper>
            <div>
              <Label>총 주행거리</Label>
              <Value>
                2,924<Unit>km</Unit>
              </Value>
              <Change positive>▲ 124km</Change>
            </div>
          </StatCard>

          <StatCard>
            <IconWrapper>⏰</IconWrapper>
            <div>
              <Label>일일 근무 시간</Label>
              <Value>
                9<Unit>H</Unit> 4<Unit>M</Unit>
              </Value>
              <Change negative>▼ 10%</Change>
            </div>
          </StatCard>

          <StatCard>
            <IconWrapper>📊</IconWrapper>
            <div>
              <Label>평균 집중지수</Label>
              <Value>
                86<Unit>점</Unit>
              </Value>
              <Change positive>▲ 10점</Change>
            </div>
          </StatCard>

          <StatCard>
            <IconWrapper>🔒</IconWrapper>
            <div>
              <Label>평균 졸음지수</Label>
              <Value>
                65<Unit>점</Unit>
              </Value>
              <Change negative>▼ 10점</Change>
            </div>
          </StatCard>
        </LeftStats>

        <MainContent>
          <WorkLogCard>
            <WorkLogTitle>근무 일지</WorkLogTitle>
            <LogGrid>
              <LogItem>
                <LogLabel>주행거리</LogLabel>
                <LogValue>2924km</LogValue>
              </LogItem>
              <LogItem>
                <LogLabel>시간당 주행거리</LogLabel>
                <LogValue>324.8km</LogValue>
              </LogItem>
              <LogItem>
                <LogLabel>출근시간</LogLabel>
                <LogValue>AM 3시 10분</LogValue>
              </LogItem>
              <LogItem>
                <LogLabel>퇴근시간</LogLabel>
                <LogValue>PM 2시 34분</LogValue>
              </LogItem>
              <LogItem>
                <LogLabel>휴식시간</LogLabel>
                <LogValue>2시간 20분</LogValue>
              </LogItem>
            </LogGrid>
          </WorkLogCard>

          <ChartsGrid>
            <ChartCard>
              <ChartHeader>
                <ChartTitle>운전 분석</ChartTitle>
              </ChartHeader>
              <RadarWrapper>
                <Radar data={radarData} options={radarOptions} />
              </RadarWrapper>
            </ChartCard>

            <ChartCard>
              <ChartHeader>
                <ChartTitle>집중 시간 비교</ChartTitle>
                <TabGroup>
                  <Tab active>Day</Tab>
                  <Tab>Week</Tab>
                  <Tab>Month</Tab>
                </TabGroup>
              </ChartHeader>
              <Line data={concentrationData} options={chartOptions} />
            </ChartCard>

            <ChartCard>
              <ChartHeader>
                <ChartTitle>뇌파 차트</ChartTitle>
                <TabGroup>
                  <Tab>시간별</Tab>
                  <Tab>일별</Tab>
                  <Tab active>주간</Tab>
                </TabGroup>
              </ChartHeader>
              <Line data={brainwaveData} options={chartOptions} />
            </ChartCard>

            <ChartCard>
              <ChartHeader>
                <ChartTitle>근무 시간</ChartTitle>
                <TabGroup>
                  <Tab>Day</Tab>
                  <Tab active>Week</Tab>
                  <Tab>Month</Tab>
                </TabGroup>
              </ChartHeader>
              <Bar data={workTimeData} options={barOptions} />
            </ChartCard>
          </ChartsGrid>
        </MainContent>
      </StatsContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  background: #f8fafc;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const ButtonWrapper = styled.div`
  width: 100px; // Export 버튼의 너비 지정
  height: 36px; // Export 버튼의 높이 지정

  // PurpleButton의 스타일을 덮어씌우기
  button {
    width: 100%;
    height: 100%;
    padding: 0;
    font-size: 14px;
  }
`;
const DriverProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
`;

const DriverName = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

const ReportTitle = styled.h3`
  font-size: 1rem;
  color: #64748b;
  margin: 0;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const LeftStats = styled.div`
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.25rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const WorkLogCard = styled(StatCard)`
  padding: 1.5rem;
  margin-bottom: 0;
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
`;

const Label = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.25rem;
`;

const Value = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
`;

const Unit = styled.span`
  font-size: 0.875rem;
  font-weight: normal;
  color: #64748b;
`;

const Change = styled.div<{ positive?: boolean }>`
  font-size: 0.875rem;
  color: ${(props) => (props.positive ? "#10B981" : "#EF4444")};
  margin-top: 0.25rem;
`;

const WorkLogTitle = styled.h4`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 1rem 0;
`;

const LogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const LogItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogLabel = styled.span`
  color: #64748b;
  font-size: 0.875rem;
`;

const LogValue = styled.span`
  font-weight: 500;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
`;

const ChartCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ChartTitle = styled.h4`
  font-size: 1rem;
  color: #1e293b;
  margin: 0;
  font-weight: 600;
`;

const TabGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  border: none;
  background: ${(props) => (props.active ? "#4F46E5" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#64748B")};
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.active ? "#4338CA" : "#F1F5F9")};
  }
`;

const RadarWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 1rem 0;
`;

export default ReportPage;
