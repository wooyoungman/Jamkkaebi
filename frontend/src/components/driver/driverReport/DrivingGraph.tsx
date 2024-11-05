import React from "react";
import { DriverText } from "../driverMain/DriverMainCSS";
import { DrivingGraphDiv } from "./DriverReportCSS";
import DriverGraphDetail from "./DriverGraphDetail";

const DrivingGraph: React.FC = () => {
  return (
    <DrivingGraphDiv>
      <DriverText fontSize="15px" fontWeight={700}>
        집중 / 졸음 지수 변화 추이
      </DriverText>
      <DriverGraphDetail
        xFontSize={12}
        xTickSize={12}
        yFontSize={12}
        yTickSize={12}
      />
    </DrivingGraphDiv>
  );
};

export default DrivingGraph;
