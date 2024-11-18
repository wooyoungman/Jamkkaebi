import React from "react";

import {
  ReportRightDiv,
  ReportSummaryDiv,
  ReportMainDiv,
  DrivingReportDiv,
  DrivingGraphWrapper,
} from "./DriverReportCSS";
import { DriverText } from "../driverMain/DriverMainCSS";
import DriverSummary from "./DriverSummary";
import DrivingReport from "./DrivingReport";
import DrivingGraph from "./DrivingGraph";

const DriverReportRight: React.FC = () => {
  return (
    <ReportRightDiv>
      <DriverText color="#E0E0E0" fontSize="35px" fontWeight={700}>
        운행 보고서
      </DriverText>

      <ReportSummaryDiv>
        <DriverSummary />
      </ReportSummaryDiv>

      <ReportMainDiv>
        <DrivingReportDiv>
          <DriverText fontSize="22px" fontWeight={700}>
            운행 기록
          </DriverText>
          <DrivingReport />
        </DrivingReportDiv>
        <DrivingGraphWrapper>
          <DrivingGraph />
          {/* <DrivingGraph graphType={"drowsy"} /> */}
        </DrivingGraphWrapper>
      </ReportMainDiv>
    </ReportRightDiv>
  );
};

export default DriverReportRight;
