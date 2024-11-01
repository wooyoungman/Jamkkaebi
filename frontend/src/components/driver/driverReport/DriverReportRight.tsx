import {
  ReportRightDiv,
  ReportSummaryDiv,
  ReportMainDiv,
  DrivingReportDiv,
  DrivingGraphWrapper,
  DrivingGraphDiv,
} from "./DriverReportCSS";
import { DriverText} from "../driverMain/DriverMainCSS";
import DriverSummary from "./DriverSummary";

const DriverReportRight: React.FC = () => {
  return (
    <>
      <ReportRightDiv>
        <DriverText color="#E0E0E0" fontSize="22px" fontWeight={700}>
          운행 보고서
        </DriverText>

        <ReportSummaryDiv>
         <DriverSummary />
        </ReportSummaryDiv>

        <ReportMainDiv>
          <DrivingReportDiv />
          <DrivingGraphWrapper>
            <DrivingGraphDiv />
            <DrivingGraphDiv />
          </DrivingGraphWrapper>
        </ReportMainDiv>
      </ReportRightDiv>
    </>
  );
};

export default DriverReportRight;
