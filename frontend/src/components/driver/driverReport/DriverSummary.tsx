import {
  ReportSummaryBody,
  ReportSummaryContent,
  HRLine,
} from "./DriverReportCSS";
import { UpSVG, DownSVG } from "@/styles/driver/driverReport/DriverReportSVG";
import { DriverText, InlineTextDiv } from "../driverMain/DriverMainCSS";

const DriverSummary: React.FC = () => {
  return (
    <>
      <ReportSummaryBody>
        <ReportSummaryContent>
          <DriverText fontSize="15px" fontWeight={700}>
            누적 주행거리
          </DriverText>
          <InlineTextDiv>
            <DriverText fontSize="25px" fontWeight={800}>
              2,024
            </DriverText>
            <DriverText fontSize="13px" fontWeight={500}>
              km
            </DriverText>
            <UpSVG />
            <DriverText color="#2AC670" fontSize="12px" fontWeight={400}>
              124
            </DriverText>
          </InlineTextDiv>
        </ReportSummaryContent>
      </ReportSummaryBody>
      <HRLine />
      <ReportSummaryBody>
        <ReportSummaryContent>
          <DriverText fontSize="15px" fontWeight={700}>
            일일 근무 시간
          </DriverText>
          <InlineTextDiv>
            <DriverText fontSize="25px" fontWeight={800}>
              2,024
            </DriverText>
            <DriverText fontSize="13px" fontWeight={500}>
              km
            </DriverText>
            <UpSVG />
            <DriverText color="#2AC670" fontSize="12px" fontWeight={400}>
              124
            </DriverText>
          </InlineTextDiv>
        </ReportSummaryContent>
      </ReportSummaryBody>
      <HRLine />
      <ReportSummaryBody>
        <ReportSummaryContent>
          <DriverText fontSize="15px" fontWeight={700}>
            평군 집중지수
          </DriverText>
          <InlineTextDiv>
            <DriverText fontSize="25px" fontWeight={800}>
              2,024
            </DriverText>
            <DriverText fontSize="13px" fontWeight={500}>
              km
            </DriverText>
            <UpSVG />
            <DriverText color="#2AC670" fontSize="12px" fontWeight={400}>
              124
            </DriverText>
          </InlineTextDiv>
        </ReportSummaryContent>
      </ReportSummaryBody>
      <HRLine />
      <ReportSummaryBody>
        <ReportSummaryContent>
          <DriverText fontSize="15px" fontWeight={700}>
            평균 졸음지수
          </DriverText>
          <InlineTextDiv>
            <DriverText fontSize="25px" fontWeight={800}>
              2,024
            </DriverText>
            <DriverText fontSize="13px" fontWeight={500}>
              km
            </DriverText>
            <UpSVG />
            <DriverText color="#2AC670" fontSize="12px" fontWeight={400}>
              124
            </DriverText>
          </InlineTextDiv>
        </ReportSummaryContent>
      </ReportSummaryBody>
    </>
  );
};

export default DriverSummary;
