import { dummyDrivers } from "@interfaces/dummydrivers";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PurpleButton from "@/components/manager/PurpleButton";
import { Share } from "lucide-react";
import { DriverResponse } from "@/interfaces/manager";
import { Line, Bar } from "react-chartjs-2";
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

import {
  Container,
  HeaderSection,
  ButtonWrapper,
  DriverProfile,
  ProfileImage,
  DriverName,
  ReportTitle,
  StatsContainer,
  TopStats,
  MainContent,
  StatCard,
  WorkLogCard,
  IconWrapper,
  Label,
  Value,
  Unit,
  Change,
  WorkLogTitle,
  LogGrid,
  LogItem,
  LogLabel,
  LogValue,
  ChartsGrid,
  ChartCard,
  ChartHeader,
  ChartTitle,
  TabGroup,
  Tab,
  RadarWrapper,
} from '@styles/manager/ReportPageStyle'


export const ReportPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: driver } = useQuery<DriverResponse>({
    queryKey: ["driver", id],
    queryFn: () => {
      const foundDriver = dummyDrivers.find((driver) => driver.driverId === Number(id));
      if (!foundDriver) throw new Error("Driver not found");
      return foundDriver;
    },
    enabled: !!id,
  });

  // 집중 시간 비교 임의 데이터
  const concentrationData = {
    labels: ["May 5", "May 6", "May 7", "May 8", "May 9", "May 10", "May 11"],
    datasets: [
      {
        label: "운전 시간",
        data: [200, 180, 276, 230, 190, 180, 170],
        borderColor: "#22C55E",
        backgroundColor: "#22C55E",
        tension: 0.4,
        fill: false,
      },
      {
        label: "휴식 시간",
        data: [100, 90, 150, 120, 100, 90, 85],
        borderColor: "#F59E0B",
        backgroundColor: "#F59E0B",
        tension: 0.4,
        fill: false,
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
        <div>
          <DriverProfile>
            <ProfileImage src={driver.profileImage} alt={driver.driverName} />
            <div>
              <DriverName>{driver.driverName} 기사님</DriverName>
              <ReportTitle>운전 보고서</ReportTitle>
            </div>
          </DriverProfile>
          <TopStats>
            <StatCard>
              <IconWrapper>🚗</IconWrapper>
              <div>
                <Label>차량 번호</Label>
                <Value>{driver.vehicleNumber}</Value>
              </div>
            </StatCard>

            <StatCard>
              <IconWrapper>📱</IconWrapper>
              <div>
                <Label>연락처</Label>
                <Value>{driver.phoneNumber || "미등록"}</Value>
              </div>
            </StatCard>

            <StatCard>
              <IconWrapper>📍</IconWrapper>
              <div>
                <Label>주소</Label>
                <Value>{driver.address || "미등록"}</Value>
              </div>
            </StatCard>

            <StatCard>
              <IconWrapper>⚡</IconWrapper>
              <div>
                <Label>현재 상태</Label>
                <Value>
                  {driver.status === "ON_ROUTE" && "운행중"}
                  {driver.status === "REST" && "휴식중"}
                  {driver.status === "IDLE" && "대기중"}
                </Value>
              </div>
            </StatCard>
          </TopStats>
        </div>
        <ButtonWrapper>
          <PurpleButton>
            <Share size={18} className="mr-2" /> Export
          </PurpleButton>
        </ButtonWrapper>
      </HeaderSection>

      <StatsContainer>
        <WorkLogCard>
          <WorkLogTitle>근무 일지</WorkLogTitle>
          <LogGrid>
            <LogItem>
              <LogLabel>차량 번호</LogLabel>
              <LogValue>{driver.vehicleNumber}</LogValue>
            </LogItem>
            <LogItem>
              <LogLabel>연락처</LogLabel>
              <LogValue>{driver.phoneNumber || "미등록"}</LogValue>
            </LogItem>
            <LogItem>
              <LogLabel>주소</LogLabel>
              <LogValue>{driver.address || "미등록"}</LogValue>
            </LogItem>
            <LogItem>
              <LogLabel>현재 상태</LogLabel>
              <LogValue>
                {driver.status === "ON_ROUTE" && "운행중"}
                {driver.status === "REST" && "휴식중"}
                {driver.status === "IDLE" && "대기중"}
              </LogValue>
            </LogItem>
          </LogGrid>
        </WorkLogCard>

        <MainContent>
          <ChartsGrid>
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
                <ChartTitle>근전도 차트</ChartTitle>
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



export default ReportPage;
