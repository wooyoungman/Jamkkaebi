import styled from "styled-components";
import { DriverText } from "../driverMain/DriverMainCSS";
import { DrivingGraphDiv } from "./DriverReportCSS";
import DriverGraphDetail from "./DriverGraphDetail";

interface DrivingGraphProps {
  graphType: string;
}

const CustomDriverText = styled(DriverText)`
  text-align: start;
`;

const DrivingGraph: React.FC<DrivingGraphProps> = ({ graphType }) => {
  return (
    <DrivingGraphDiv>
      {graphType === "concentration" ? (
        <CustomDriverText fontSize="15px" fontWeight={700}>
          집중 지수 변화 추이
        </CustomDriverText>
      ) : (
        <CustomDriverText fontSize="15px" fontWeight={700}>
          졸음 지수 변화 추이
        </CustomDriverText>
      )}
      <DriverGraphDetail />
    </DrivingGraphDiv>
  );
};

export default DrivingGraph;
