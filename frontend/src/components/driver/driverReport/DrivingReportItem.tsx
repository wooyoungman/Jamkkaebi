import { useState } from "react";

import { ReportDataProps } from "@/interfaces/driver";
import { DrivingReportList, HRLine } from "./DriverReportCSS";
import styled from "styled-components";
import { DriverText, InlineTextDiv } from "../driverMain/DriverMainCSS";
import {
  BadDrivingBadge,
  GoodDrivingBadge,
} from "@/styles/driver/driverReport/DriverReportTag";

import DrivingReportDetail from "./DrivingReportDetail";

interface DrivingReportItemProps {
  reportData: ReportDataProps;
}

const CustomDriverText = styled(DriverText)`
  text-align: start;
  white-space: nowrap; /* 텍스트를 한 줄로 제한 */
  overflow: hidden; /* 넘치는 텍스트를 숨김 */
  text-overflow: ellipsis; /* 넘치는 부분을 ...로 표시 */
`;

const CustomInlineTextDiv = styled(InlineTextDiv)`
  align-items: center;
`;

const CustomHRLine = styled(HRLine)`
  height: 10px;
`;

const DrivingReportItem: React.FC<DrivingReportItemProps> = ({
  reportData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    departureTime,
    arrivalLocation,
    distance,
    duration,
    drowsinessCount,
    focusLossCount,
  } = reportData;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <DrivingReportList onClick={handleOpenModal}>
      {isModalOpen && (
        <DrivingReportDetail
          reportData={reportData}
          onClose={handleCloseModal}
        />
      )}
      <CustomDriverText fontSize="15px" fontWeight={600}>
        {arrivalLocation}
      </CustomDriverText>
      <CustomInlineTextDiv>
        <CustomDriverText color="#E0E0E0" fontSize="14px" fontWeight={500}>
          {departureTime} 출발
        </CustomDriverText>
        <CustomHRLine />
        <CustomDriverText color="#E0E0E0" fontSize="14px" fontWeight={500}>
          {distance}
        </CustomDriverText>
        <CustomHRLine />
        <CustomDriverText color="#E0E0E0" fontSize="14px" fontWeight={500}>
          {duration.replace(/:/g, "시간 ")}분 운행
        </CustomDriverText>
      </CustomInlineTextDiv>
      <InlineTextDiv>
        {drowsinessCount === 0 && focusLossCount === 0 ? (
          <GoodDrivingBadge />
        ) : (
          <BadDrivingBadge
            drowsy={drowsinessCount}
            focusLoss={focusLossCount}
          />
        )}
      </InlineTextDiv>
    </DrivingReportList>
  );
};

export default DrivingReportItem;
