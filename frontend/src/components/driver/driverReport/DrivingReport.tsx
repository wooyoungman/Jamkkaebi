import { DateReportDiv } from "./DriverReportCSS";
import { DriverText } from "../driverMain/DriverMainCSS";
import styled from "styled-components";
import dummyData from "@/tempData/driver/ReportDummyData.json";
import { ReportDataProps } from "@/interfaces/driver";
import DrivingReportItem from "./DrivingReportItem";

const CustomDriverText = styled(DriverText)`
  text-align: start;
`;

interface GroupedDataProps {
  [key: string]: ReportDataProps[];
}

const DrivingReport: React.FC = () => {
  const groupedData = dummyData.reduce((acc: GroupedDataProps, item) => {
    (acc[item.date] = acc[item.date] || []).push(item);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(groupedData).map(([date, reports]) => (
        <DateReportDiv key={date}>
          <CustomDriverText fontSize="17px" fontWeight={600}>
            {date.replace(/-/g, ".")}
          </CustomDriverText>
          {reports.map((report) => (
            <DrivingReportItem reportData={report} />
          ))}
        </DateReportDiv>
      ))}
      {}
    </>
  );
};

export default DrivingReport;
