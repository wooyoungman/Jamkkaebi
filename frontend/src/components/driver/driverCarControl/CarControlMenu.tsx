import { CarRightMenu, CarMenuDiv, CarMenuDivBody } from "./DriverCarCSS";
import { DriverText } from "../driverMain/DriverMainCSS";
import {
  CeilingLightSVG,
  SoundSVG,
  AirSVG,
  EtcSVG,
} from "@/styles/driver/driverCar/DriverCarSVG";

interface CarControlMenuProps {
  setSelectedControl: (control: string) => void;
}

const CarControlMenu: React.FC<CarControlMenuProps> = ({
  setSelectedControl,
}) => {
  return (
    <>
      <CarRightMenu>
        <CarMenuDiv onClick={() => setSelectedControl("light")}>
          <CarMenuDivBody>
            <CeilingLightSVG />
            <DriverText color="#E0E0E0" fontSize="18px" fontWeight={700}>
              조명
            </DriverText>
          </CarMenuDivBody>
        </CarMenuDiv>

        <CarMenuDiv onClick={() => setSelectedControl("sound")}>
          <CarMenuDivBody>
            <SoundSVG />
            <DriverText color="#E0E0E0" fontSize="18px" fontWeight={700}>
              음량
            </DriverText>
          </CarMenuDivBody>
        </CarMenuDiv>

        <CarMenuDiv onClick={() => setSelectedControl("ac")}>
          <CarMenuDivBody>
            <AirSVG />
            <DriverText color="#E0E0E0" fontSize="18px" fontWeight={700}>
              A/C
            </DriverText>
          </CarMenuDivBody>
        </CarMenuDiv>

        <CarMenuDiv onClick={() => setSelectedControl("ect")}>
          <CarMenuDivBody>
            <EtcSVG />
            <DriverText color="#E0E0E0" fontSize="18px" fontWeight={700}>
              기타
            </DriverText>
          </CarMenuDivBody>
        </CarMenuDiv>
      </CarRightMenu>
    </>
  );
};

export default CarControlMenu;
