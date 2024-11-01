import { CarRightBody } from "./DriverCarCSS";
import { DriverText } from "../driverMain/DriverMainCSS";

const CarSoundControl: React.FC = () => {
  return (
    <>
      <CarRightBody>
        <DriverText color="#E0E0E0" fontSize="15px" fontWeight={700}>
          평상시와 졸음 감지용 음량의 세기를 조절할 수 있으며, <br /> 졸음 감지
          시 경고 음성 메시지의 작동 여부를 설정할 수 있습니다.
        </DriverText>
      </CarRightBody>
    </>
  );
};

export default CarSoundControl;
