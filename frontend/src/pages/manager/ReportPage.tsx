import { useParams } from "react-router-dom";
import { Share } from "lucide-react";
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
import { useReportData } from "@/queries/manager/report";
import exportToPDF from "@/hooks/exportToPDF";
import PurpleButton from "@/components/manager/PurpleButton";
import { ReportDriverInfo } from "@/interfaces/manager";
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
  IconWrapper,
  Label,
  Value,
  ChartsGrid,
  ChartCard,
  ChartHeader,
  ChartTitle,
  TabGroup,
  Tab,
} from "@/styles/manager/ReportPageStyle";

// Chart.js 등록
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

// 차트 옵션 정의
const commonChartOptions = {
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
        font: { size: 12 },
        color: "#64748B",
      },
    },
    x: {
      grid: {
        color: "#E5E7EB",
        drawBorder: false,
      },
      ticks: {
        font: { size: 12 },
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
        font: { size: 12 },
        color: "#64748B",
      },
    },
    tooltip: {
      backgroundColor: "#1E293B",
      padding: 12,
      titleFont: { size: 12 },
      bodyFont: { size: 12 },
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

const getStatusText = (status: ReportDriverInfo["status"]) => {
  const statusMap = {
    ON_ROUTE: "운행중",
    REST: "휴식중",
    IDLE: "대기중",
  };
  return statusMap[status];
};

interface WeeklyChartProps {
  data: {
    lastWeek: (number | null)[];
    thisWeek: (number | null)[];
  } | null;
  title: string;
  type?: "line" | "bar";
}

const WeeklyChart = ({ data, title, type = "line" }: WeeklyChartProps) => {
  if (!data) {
    return (
      <ChartCard>
        <ChartHeader>
          <ChartTitle>{title}</ChartTitle>
          <TabGroup>
            <Tab active>주간</Tab>
          </TabGroup>
        </ChartHeader>
        <div className="p-4 text-center text-gray-500">데이터가 없습니다.</div>
      </ChartCard>
    );
  }

  const chartData = {
    labels: ["일", "월", "화", "수", "목", "금", "토"],
    datasets: [
      {
        label: "저번 주",
        data: data.lastWeek,
        borderColor: "#4F46E5",
        backgroundColor: type === "bar" ? "#4F46E5" : undefined,
        tension: 0.4,
      },
      {
        label: "이번 주",
        data: data.thisWeek,
        borderColor: "#EC4899",
        backgroundColor: type === "bar" ? "#EC4899" : undefined,
        tension: 0.4,
      },
    ],
  };

  const ChartComponent = type === "line" ? Line : Bar;

  return (
    <ChartCard>
      <ChartHeader>
        <ChartTitle>{title}</ChartTitle>
        <TabGroup>
          <Tab active>주간</Tab>
        </TabGroup>
      </ChartHeader>
      <ChartComponent data={chartData} options={commonChartOptions} />
    </ChartCard>
  );
};

const ReportPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useReportData(Number(id));

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!data) return <div>운전자 정보를 찾을 수 없습니다.</div>;

  const handleExport = async () => {
    const fileName = `${data.driverInfo.driverName}-report-${
      new Date().toISOString().split("T")[0]
    }.pdf`;

    const success = await exportToPDF("report-container", fileName);
    if (!success) {
      console.error("Failed to export PDF");
    }
  };

  const stats = [
    {
      icon: "🚗",
      label: "차량 번호",
      value: data.driverInfo.vehicleNumber,
    },
    {
      icon: "📱",
      label: "연락처",
      value: data.driverInfo.phoneNumber || "미등록",
    },
    {
      icon: "📍",
      label: "지역",
      value: data.driverInfo.region,
    },
    {
      icon: "⚡",
      label: "현재 상태",
      value: getStatusText(data.driverInfo.status),
    },
  ];
  console.log(data.eegData, "뇌파 차트");
  console.log(data.driveTime, "근무 시간");
  console.log(data.avgSleepIndex, "평균 졸음 지수");
  console.log(data.distance, "운행 거리");

  return (
    <Container id="report-container">
      <HeaderSection>
        <div>
          <DriverProfile>
            <ProfileImage
              src={`https://api.dicebear.com/7.x/personas/svg?seed=${id}`}
              alt={data.driverInfo.driverName}
            />
            <div>
              <DriverName>{data.driverInfo.driverName} 기사님</DriverName>
              <ReportTitle>운전 보고서</ReportTitle>
            </div>
          </DriverProfile>

          <TopStats>
            {stats.map((stat, index) => (
              <StatCard key={index}>
                <IconWrapper>{stat.icon}</IconWrapper>
                <div>
                  <Label>{stat.label}</Label>
                  <Value>{stat.value}</Value>
                </div>
              </StatCard>
            ))}
          </TopStats>
        </div>

        <ButtonWrapper>
          <PurpleButton onClick={handleExport}>
            <Share size={18} className="mr-2" /> Export
          </PurpleButton>
        </ButtonWrapper>
      </HeaderSection>

      <StatsContainer>
        <MainContent>
          <ChartsGrid>
            <WeeklyChart data={data.eegData} title="뇌파 차트" />
            <WeeklyChart data={data.driveTime} title="근무 시간" type="bar" />
            <WeeklyChart data={data.avgSleepIndex} title="평균 졸음 지수" />
            <WeeklyChart data={data.distance} title="운행 거리" />
          </ChartsGrid>
        </MainContent>
      </StatsContainer>
    </Container>
  );
};

export default ReportPage;
