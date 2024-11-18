import { Body } from "@/components/driver/DriverStructure";
// import DriverMainLeft from "@/components/driver/driverMain/DriverMainLeft";
import DriverReportRight from "@/components/driver/driverReport/DriverReportRight";
import styled from "styled-components";

const CustomBody = styled(Body)`
  gap: 20px;
`;

const DriverReportPage: React.FC = () => {
  return (
    <>
      <CustomBody>
        {/* <DriverMainLeft /> */}
        <DriverReportRight />
      </CustomBody>
    </>
  );
};

export default DriverReportPage;
