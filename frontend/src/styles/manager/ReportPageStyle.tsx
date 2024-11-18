import styled from "styled-components";

interface TabProps {
  active?: boolean; // $ 제거
}
const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

// PurpleButton의 스타일을 덮어씌우기
const ButtonWrapper = styled.div`
  width: 150px;
  height: 50px;
  button {
    width: 100%;
    height: 100%;
    padding: 0;
    font-size: 20px;
    box-shadow: none;
  }
`;
const DriverProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

const DriverName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

const ReportTitle = styled.h3`
  font-size: 35px;
  font-weight: semibold;
  margin: 0;
`;

const StatsContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  align-items: start;
`;

const TopStats = styled.div`
  display: flex;
  flex-direction: row; // 가로 배치
  gap: 1rem;
  margin-top: 1.5rem; // DriverProfile과의 간격
  flex-wrap: wrap; // 필요시 줄바꿈
`;

const MainContent = styled.div`
  flex: 1; // 남은 공간을 모두 차지하도록 설정
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0; // 필요한 경우 축소될 수 있도록 설정
`;

const StatCard = styled.div`
  padding: 1.25rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  border-radius: 0.5rem;
  flex: 1; // 동일한 너비로 분배
  min-width: 250px; // 최소 너비 설정
`;

const WorkLogCard = styled.div`
  background: #f0efff;
  padding: 2rem; // 패딩 좀 더 여유있게
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: 100%; // 세로로 꽉 차게
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

const Change = styled.div<{ positive?: boolean; negative?: boolean }>`
  font-size: 0.875rem;
  color: ${(props) => {
    if (props.positive) return "#10B981";
    if (props.negative) return "#EF4444";
    return "#64748B";
  }};
  margin-top: 0.25rem;
`;

const WorkLogTitle = styled.h4`
  font-size: 1.25rem; // 제목 크기 증가
  color: #1e293b;
  font-weight: 600;
  margin: 0 0 2rem 0; // 아래 여백 증가
`;

const LogGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const LogItem = styled.div`
  display: flex;
  flex-direction: column; // 세로로 배치
  gap: 0.5rem; // 라벨과 값 사이 간격
`;

const LogLabel = styled.span`
  color: #64748b;
  font-size: 0.875rem;
`;

const LogValue = styled.span`
  font-weight: 600; // 좀 더 굵게
  font-size: 1.25rem; // 크기 증가
  color: #1e293b; // 진한 색상
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
  align-items: baseline;
  margin-bottom: 1.5rem;
`;

const ChartTitle = styled.h4`
  font-size: 1.25rem;
  color: #1e293b;
  margin: 0;
  font-weight: 600;
`;

const TabGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Tab = styled.button<TabProps>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${({ active }) =>
    active &&
    `  // $ 제거
    background-color: #E5E7EB;
    color: #1F2937;
  `}
`;
const RadarWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 1rem 0;
`;

export {
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
};
