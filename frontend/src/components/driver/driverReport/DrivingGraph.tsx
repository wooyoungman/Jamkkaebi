import React from "react";
import { DriverText } from "../driverMain/DriverMainCSS";
import { DrivingGraphDiv } from "./DriverReportCSS";
import DriverGraphDetail from "./DriverGraphDetail";

const DrivingGraph: React.FC = () => {
  return (
    <DrivingGraphDiv>
      <DriverText fontSize="15px" fontWeight={700}>
        집중 지수 변화 추이
      </DriverText>
      <DriverGraphDetail />
    </DrivingGraphDiv>
  );
};

export default DrivingGraph;
