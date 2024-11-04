import styled from "styled-components";
import ReactDOM from "react-dom";
import {
  Card,
  GrayLine,
  EclipseDiv,
  GrayEclipseSVG,
  BlueEclipseSVG,
  ModalGlassDiv,
} from "@/styles/driver/GlassmorphismStyle";
import { DriverText, InlineTextDiv } from "../driverMain/DriverMainCSS";
import {
  ButtonDiv,
  ReportDetailJourneyDiv,
  ReportDetailMain,
  ReportDetailRightDiv,
  ReportDetailTextDiv,
  ReportMapDiv,
} from "./DriverReportCSS";
import { ReportDataProps } from "@/interfaces/driver";
import {
  EmptyCircleSVG,
  WhiteCircleSVG,
  RedCircleSVG,
  MandarineCircleSVG,
  GreenCircleSVG,
  DottedLineSVG,
} from "@/styles/driver/driverReport/DriverReportSVG";
import { HRLine } from "./DriverReportCSS";

const CustomHRLine = styled(HRLine)`
  height: 12px;
  background-color: #e0e0e0;
`;

const CustomInlineTextDiv = styled(InlineTextDiv)`
  align-items: center;
  gap: 8px;
`;

interface DrivingReportDetailProps {
  onClose: () => void;
  reportData: ReportDataProps;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* background: rgba(0, 0, 0, 0.5); */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
`;

// const CenteredReportModalGlassDiv = styled(ReportModalGlassDiv)`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   z-index: 1000;
// `;

const CustomDriverText = styled(DriverText)`
  text-align: start;
`;

const DrivingReportDetail: React.FC<DrivingReportDetailProps> = ({
  onClose,
  reportData,
}) => {
  // 날짜 형식을 변환하는 함수
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1 필요
    const day = date.getDate();

    // 요일 배열
    const dayOfWeek = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    const dayName = dayOfWeek[date.getDay()];

    return `${year}년 ${month}월 ${day}일 ${dayName}`;
  }

  function formatDuration(duration: string) {
    const [hours, minutes] = duration.split(":");
    return `${parseInt(hours, 10)}시간 ${parseInt(minutes, 10)}분 소요`;
  }

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <Card cardWidth="800px" cardHeight="630px">
        <GrayLine
          cardWidth="56%"
          opacity={0.6}
          position="top"
          offsetLeft="7%"
        />
        <EclipseDiv cardWidth="66%" cardHeight="14%" top="1%">
          <GrayEclipseSVG cardWidth="100%" cardHeight="100%" />
        </EclipseDiv>
        <EclipseDiv cardWidth="66%" cardHeight="14%" bottom="3%">
          <BlueEclipseSVG cardWidth="100%" cardHeight="100%" />
        </EclipseDiv>
        <GrayLine
          cardWidth="289px"
          opacity={0.6}
          position="bottom"
          centered={true}
        />
        <ModalGlassDiv
          onClick={(e) => e.stopPropagation()}
          cardWidth="100%"
          cardHeight="100%"
        >
          <CloseButton onClick={onClose}>✕</CloseButton>
          <DriverText fontSize="20px" color="#E0E0E0" fontWeight={700}>
            운행 상세 기록
          </DriverText>
          <ReportDetailMain>
            <ReportMapDiv />
            <ReportDetailRightDiv>
              <ReportDetailTextDiv>
                <CustomDriverText
                  color="#E0E0E0"
                  fontSize="14px"
                  fontWeight={600}
                >
                  {formatDate(reportData.date)}
                </CustomDriverText>
                <div>
                  <ReportDetailJourneyDiv>
                    <CustomDriverText fontSize="13px" fontWeight={300}>
                      {reportData.departureTime}
                    </CustomDriverText>
                    <EmptyCircleSVG />
                    <CustomDriverText fontSize="13px" fontWeight={500}>
                      {reportData.departureLocation}
                    </CustomDriverText>
                  </ReportDetailJourneyDiv>
                  <div style={{ marginLeft: "49px" }}>
                    <DottedLineSVG />
                  </div>
                  <ReportDetailJourneyDiv>
                    <CustomDriverText fontSize="13px" fontWeight={300}>
                      {reportData.arrivalTime}
                    </CustomDriverText>
                    <WhiteCircleSVG>{/* <DottedLineSVG /> */}</WhiteCircleSVG>
                    <CustomDriverText fontSize="13px" fontWeight={500}>
                      {reportData.arrivalLocation}
                    </CustomDriverText>
                  </ReportDetailJourneyDiv>
                  <CustomInlineTextDiv
                    style={{ marginLeft: "78px", marginTop: "5px" }}
                  >
                    <CustomDriverText
                      color="#E0E0E0"
                      fontSize="13px"
                      fontWeight={300}
                    >
                      {reportData.distance}
                    </CustomDriverText>
                    <CustomHRLine />
                    <CustomDriverText
                      color="#E0E0E0"
                      fontSize="13px"
                      fontWeight={300}
                    >
                      {formatDuration(reportData.duration)}
                    </CustomDriverText>
                  </CustomInlineTextDiv>
                </div>
              </ReportDetailTextDiv>

              
            </ReportDetailRightDiv>
          </ReportDetailMain>

          <ButtonDiv onClick={onClose}>
            <DriverText fontSize="20px" fontWeight={600}>
              Continue
            </DriverText>
          </ButtonDiv>
        </ModalGlassDiv>
      </Card>
    </ModalOverlay>,
    document.body
  );
};

export default DrivingReportDetail;
