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
  AccidentCountItem,
  AccidentCountDiv,
  AccidentCountList,
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
  DarkRedCircleSVG,
  MandarineCircleSVG,
  DarkMandarineCircleSVG,
  GreenCircleSVG,
  DarkGreenCircleSVG,
  DottedLineSVG,
} from "@/styles/driver/driverReport/DriverReportSVG";
import { HRLine } from "./DriverReportCSS";
import DrivingDetailGraphCarousel from "./DrivingDetailGraphCarousel";
import DriverMap from "../DriverMap";

// const CustomModalGlassDiv = styled(ModalGlassDiv2)`
//   width: 800px;
//   height: 630px;
//   border-radius: 30px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 20px;
//   padding: 20px;
//   box-sizing: border-box;
// `;

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
      <Card cardwidth="800px" cardheight="630px">
        <GrayLine
          cardwidth="56%"
          opacity={0.6}
          position="top"
          offsetleft="7%"
        />
        <EclipseDiv cardwidth="66%" cardheight="14%" top="1%">
          <GrayEclipseSVG cardwidth="100%" cardheight="100%" />
        </EclipseDiv>
        <EclipseDiv cardwidth="66%" cardheight="14%" bottom="1%">
          <BlueEclipseSVG cardwidth="100%" cardheight="100%" />
        </EclipseDiv>
        <GrayLine
          cardwidth="289px"
          opacity={0.6}
          position="bottom"
          centered={true}
        />
        <ModalGlassDiv
          onClick={(e) => e.stopPropagation()}
          cardwidth="100%"
          cardheight="100%"
        >
          {/* <CustomModalGlassDiv onClick={(e) => e.stopPropagation()}> */}
          <CloseButton onClick={onClose}>✕</CloseButton>
          <DriverText fontSize="20px" color="#E0E0E0" fontWeight={700}>
            운행 상세 기록
          </DriverText>
          <ReportDetailMain>
            <ReportMapDiv>
              <DriverMap />
            </ReportMapDiv>
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
                  <ReportDetailJourneyDiv>
                    <CustomDriverText
                      fontSize="12px"
                      fontWeight={300}
                      style={{ opacity: 0 }}
                    >
                      00:00
                    </CustomDriverText>
                    <DottedLineSVG />
                  </ReportDetailJourneyDiv>
                  <ReportDetailJourneyDiv>
                    <CustomDriverText fontSize="13px" fontWeight={300}>
                      {reportData.arrivalTime}
                    </CustomDriverText>
                    <WhiteCircleSVG />
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

              <AccidentCountDiv>
                <AccidentCountList>
                  {/* 안전운행 상태 */}
                  {reportData.drowsinessCount === 0 &&
                  reportData.focusLossCount === 0 ? (
                    <AccidentCountItem>
                      <GreenCircleSVG />
                      <CustomDriverText fontSize="12px" fontWeight={600}>
                        안전운행
                      </CustomDriverText>
                    </AccidentCountItem>
                  ) : (
                    <>
                      <DarkGreenCircleSVG />
                      <CustomDriverText
                        fontSize="12px"
                        fontWeight={600}
                        color="#A9A9A9"
                      >
                        안전운행
                      </CustomDriverText>
                    </>
                  )}

                  {/* 졸음 상태 */}
                  {reportData.drowsinessCount === 0 ? (
                    <AccidentCountItem>
                      <DarkRedCircleSVG />
                      <CustomDriverText
                        fontSize="12px"
                        fontWeight={600}
                        color="#A9A9A9"
                      >
                        졸음 {reportData.drowsinessCount}회
                      </CustomDriverText>
                    </AccidentCountItem>
                  ) : (
                    <>
                      <RedCircleSVG />
                      <CustomDriverText fontSize="12px" fontWeight={600}>
                        졸음 {reportData.drowsinessCount}회
                      </CustomDriverText>
                    </>
                  )}

                  {/* 집중 저하 상태 */}
                  {reportData.focusLossCount === 0 ? (
                    <AccidentCountItem>
                      <DarkMandarineCircleSVG />
                      <CustomDriverText
                        fontSize="12px"
                        fontWeight={600}
                        color="#A9A9A9"
                      >
                        집중 저하 {reportData.focusLossCount}회
                      </CustomDriverText>
                    </AccidentCountItem>
                  ) : (
                    <AccidentCountItem>
                      <MandarineCircleSVG />
                      <CustomDriverText fontSize="12px" fontWeight={600}>
                        집중 저하 {reportData.focusLossCount}회
                      </CustomDriverText>
                    </AccidentCountItem>
                  )}
                </AccidentCountList>
              </AccidentCountDiv>

              {/* 그래프 */}
              {/* <DrivingDetailGraphDiv>
                <DriverText fontSize="15px" fontWeight={700}>
                  당일 평균 집중/졸음 지수
                </DriverText>
                <ConditionGraphWrapper>
                  <ConditionGraphDiv>
                    <DriverConditionGraph
                      graphType="concentration"
                      score={34}
                    />
                  </ConditionGraphDiv>
                  <ConditionGraphDiv>
                    <DriverConditionGraph graphType="drowsy" score={72} />
                  </ConditionGraphDiv>
                </ConditionGraphWrapper>
              </DrivingDetailGraphDiv> */}
              <DrivingDetailGraphCarousel />
            </ReportDetailRightDiv>
          </ReportDetailMain>

          <ButtonDiv onClick={onClose}>
            <DriverText fontSize="20px" fontWeight={600}>
              Continue
            </DriverText>
          </ButtonDiv>
          {/* </CustomModalGlassDiv> */}
        </ModalGlassDiv>
      </Card>
    </ModalOverlay>,
    document.body
  );
};

export default DrivingReportDetail;
