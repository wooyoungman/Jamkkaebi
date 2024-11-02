import {
  ReportSummaryBody,
  ReportSummaryContent,
  HRLine,
} from "./DriverReportCSS";
import { UpSVG, DownSVG } from "@/styles/driver/driverReport/DriverReportSVG";
import { DriverText, InlineTextDiv } from "../driverMain/DriverMainCSS";
import styled from "styled-components";

const CustomInlineTextDiv = styled(InlineTextDiv)`
  gap: 5px;
`;
const DriverSummary: React.FC = () => {
  return (
    <>
      <ReportSummaryBody>
        <ReportSummaryContent>
          <DriverText fontSize="15px" fontWeight={700}>
            누적 주행거리
          </DriverText>
          <CustomInlineTextDiv>
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
          </CustomInlineTextDiv>
        </ReportSummaryContent>
      </ReportSummaryBody>
      <HRLine />
      <ReportSummaryBody>
        <ReportSummaryContent>
          <DriverText fontSize="15px" fontWeight={700}>
            일일 근무 시간
          </DriverText>
          <CustomInlineTextDiv>
            <DriverText fontSize="25px" fontWeight={800}>
              10
            </DriverText>
            <DriverText fontSize="13px" fontWeight={500}>
              H
            </DriverText>
            <DriverText fontSize="25px" fontWeight={800}>
              4
            </DriverText>
            <DriverText fontSize="13px" fontWeight={500}>
              M
            </DriverText>
            <UpSVG />
            <DriverText color="#2AC670" fontSize="12px" fontWeight={400}>
              124
            </DriverText>
          </CustomInlineTextDiv>
        </ReportSummaryContent>
      </ReportSummaryBody>
      <HRLine />
      <ReportSummaryBody>
        <ReportSummaryContent>
          <DriverText fontSize="15px" fontWeight={700}>
            평군 집중지수
          </DriverText>
          <CustomInlineTextDiv>
            <DriverText fontSize="25px" fontWeight={800}>
              76
            </DriverText>
            <DriverText fontSize="13px" fontWeight={500}>
              점
            </DriverText>
            <DownSVG />
            <DriverText color="#FF6252" fontSize="12px" fontWeight={400}>
              12
            </DriverText>
          </CustomInlineTextDiv>
        </ReportSummaryContent>
      </ReportSummaryBody>
      <HRLine />
      <ReportSummaryBody>
        <ReportSummaryContent>
          <DriverText fontSize="15px" fontWeight={700}>
            평균 졸음지수
          </DriverText>
          <CustomInlineTextDiv>
            <DriverText fontSize="25px" fontWeight={800}>
              76
            </DriverText>
            <DriverText fontSize="13px" fontWeight={500}>
              점
            </DriverText>
            <DownSVG />
            <DriverText color="#FF6252" fontSize="12px" fontWeight={400}>
              12
            </DriverText>
          </CustomInlineTextDiv>
        </ReportSummaryContent>
      </ReportSummaryBody>
    </>
  );
};

export default DriverSummary;
