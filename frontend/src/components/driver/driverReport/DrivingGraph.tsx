import React from "react";
import { DriverText } from "../driverMain/DriverMainCSS";
import { DrivingGraphDiv } from "./DriverReportCSS";
import DriverGraphDetail from "./DriverGraphDetail";

const DrivingGraph: React.FC = () => {
  return (
    <DrivingGraphDiv>
      <DriverText fontSize="22px" fontWeight={700}>
        집중 / 졸음 지수 변화 추이
      </DriverText>
      <DriverGraphDetail
        // xFontSize={17}
        xTickSize={17}
        yFontSize={17}
        yTickSize={17}
      />
    </DrivingGraphDiv>
  );
};

export default DrivingGraph;
