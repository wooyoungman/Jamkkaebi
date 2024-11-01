import { CarRightBody } from "./DriverCarCSS";
import { DriverText } from "../driverMain/DriverMainCSS";

const CarDrowsyControl: React.FC = () => {
  return (
    <>
      <CarRightBody>
        <DriverText color="#E0E0E0" fontSize="15px" fontWeight={700}>
          운전자의 졸음 운전이 감지되었을 때 작동하는 기능입니다. <br /> 안전
          운행을 위해 하나 이상의 졸음 경고 기능을 활성화해 주십시오.
        </DriverText>
      </CarRightBody>
    </>
  );
};

export default CarDrowsyControl;
