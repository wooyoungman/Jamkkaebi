import { DateReportDiv, DrivingReportList, HRLine } from "./DriverReportCSS";
import { DriverText, InlineTextDiv } from "../driverMain/DriverMainCSS";
import {
  GoodDrivingBadge,
  BadDrivingBadge,
} from "@/styles/driver/driverReport/DriverReportTag";
import styled from "styled-components";

const CustomDriverText = styled(DriverText)`
  text-align: start;
`;

const CustomHRLine = styled(HRLine)`
  height: 10px;
`;

const CustomInlineTextDiv = styled(InlineTextDiv)`
  align-items: center;
`;

const DrivingReport: React.FC = () => {
  return (
    <>
      <DateReportDiv>
        <CustomDriverText fontSize="12px" fontWeight={600}>
          24.10.01
        </CustomDriverText>
        <DrivingReportList>
          <CustomDriverText fontSize="12px" fontWeight={600}>
            원지 휴게소
          </CustomDriverText>
          <CustomInlineTextDiv>
            <CustomDriverText color="#E0E0E0" fontSize="10px" fontWeight={500}>
              08:45 출발
            </CustomDriverText>
            <CustomHRLine />
            <CustomDriverText color="#E0E0E0" fontSize="10px" fontWeight={500}>
              205.5km
            </CustomDriverText>
            <CustomHRLine />
            <CustomDriverText color="#E0E0E0" fontSize="10px" fontWeight={500}>
              6시간 45분 운행
            </CustomDriverText>
          </CustomInlineTextDiv>
          <GoodDrivingBadge />
        </DrivingReportList>

        <DrivingReportList>
          <CustomDriverText fontSize="12px" fontWeight={600}>
            싸피 휴게소
          </CustomDriverText>
          <CustomInlineTextDiv>
            <CustomDriverText color="#E0E0E0" fontSize="10px" fontWeight={500}>
              08:45 출발
            </CustomDriverText>
            <CustomHRLine />
            <CustomDriverText color="#E0E0E0" fontSize="10px" fontWeight={500}>
              205.5km
            </CustomDriverText>
            <CustomHRLine />
            <CustomDriverText color="#E0E0E0" fontSize="10px" fontWeight={500}>
              6시간 45분 운행
            </CustomDriverText>
          </CustomInlineTextDiv>
          <BadDrivingBadge drowsy={0} focusLoss={1} />
        </DrivingReportList>
      </DateReportDiv>
    </>
  );
};

export default DrivingReport;
