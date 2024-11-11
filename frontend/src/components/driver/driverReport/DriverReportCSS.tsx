import styled from "styled-components";
import { GlassDiv } from "@/styles/driver/GlassmorphismStyle";
import mapImg from "@/assets/reportMapImg.png";

export const CustomGlassDiv = styled(GlassDiv)`
  border-radius: 10px;
`;

export const ReportRightDiv = styled.div`
  width: 63.5%;
  min-width: 650px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const ReportSummaryDiv = styled(GlassDiv)`
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
`;

export const ReportSummaryBody = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 5px;
  box-sizing: border-box;
`;
export const ReportSummaryContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const ReportMainDiv = styled.div`
  width: 100%;
  height: 63%;
  display: flex;
  gap: 20px;
`;

export const DrivingReportDiv = styled(GlassDiv)`
  width: 32%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 20px 10px;
  box-sizing: border-box;
  gap: 15px;
  overflow-y: auto; /* 스크롤 기능 추가 */
  max-height: 366px; /* 고정된 최대 높이 설정 */
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE와 Edge에서 스크롤바 숨기기 */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera에서 스크롤바 숨기기 */
  }
`;

export const DateReportDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DrivingReportList = styled(CustomGlassDiv)`
  width: 100%;
  height: 80px;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 4px;

  cursor: pointer;
  // 호버 스타일 추가
  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    transform: scale(1.05); // 살짝 확대되는 효과
    transition:
      background 0.3s ease,
      transform 0.3s ease;
  }
`;

export const DrivingGraphWrapper = styled.div`
  width: calc(100% - 32% - 20px);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DrivingGraphDiv = styled(GlassDiv)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 15px;
  box-sizing: border-box;
`;

export const HRLine = styled.hr`
  height: 70px;
  background-color: #fff;
  margin: 0;
`;

export const ReportDetailMain = styled.div`
  width: 100%;
  height: 81%;
  display: flex;
  gap: 20px;
`;

export const ReportMapDiv = styled.div`
  width: 40%;
  height: 100%;
  flex-shrink: 0;
  /* background-image: url(${mapImg}); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
`;

// 1
export const ReportDetailRightDiv = styled.div`
  width: calc(60% - 20px);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ReportDetailTextDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ReportDetailJourneyDiv = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const AccidentCountDiv = styled(CustomGlassDiv)`
  width: 100%;
  padding: 12px 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

export const AccidentCountList = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const AccidentCountItem = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

export const ButtonDiv = styled.div`
  width: 58%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 11px;
  background: linear-gradient(
    90deg,
    #113be1 0%,
    #4268ff 50.48%,
    #4062e3 72.41%,
    #113be1 100%
  );
  cursor: pointer;
  &:hover {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
    background: linear-gradient(
      90deg,
      #0e34c4 0%,
      #3b5dde 50.48%,
      #3754ca 72.41%,
      #0e34c4 100%
    ); /* 배경색을 살짝 어둡게 변경 */
  }
`;

export const DrivingDetailGraphDiv = styled(CustomGlassDiv)`
  width: 100%;
  height: 64%;
  /* height: 60%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 15px;
  box-sizing: border-box;
  gap: 15px;
`;

export const ConditionGraphWrapper = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  align-items: center;
  /* background-color: white; */
`;

export const ConditionGraphDiv = styled.div`
  width: 50%;
  height: 95%;
  position: relative;
  /* background-color: gray; */
`;
