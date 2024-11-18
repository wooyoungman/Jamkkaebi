import DriverMainLeft from "@/components/driver/driverMain/DriverMainLeft";
import DriverMainRight from "@/components/driver/driverMain/DriverMainRight";
import { Body } from "@/components/driver/DriverStructure";
import styled from "styled-components";

const CustomBody = styled(Body)`
  gap: 20px;
`;

const Right = styled.div`
  width: 63%;
  min-width: 700px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  gap: 20px;
`;

const DriverMainPage: React.FC = () => {
  return (
    <>
      <CustomBody>
        <DriverMainLeft />
        <Right>
          <DriverMainRight />
        </Right>
      </CustomBody>
    </>
  );
};

export default DriverMainPage;
