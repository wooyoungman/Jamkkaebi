import { CarRightDiv, CarRightMain, CarRightBody } from "./DriverCarCSS";
import { DriverText } from "../driverMain/DriverMainCSS";
import CarControlMenu from "./CarControlMenu";
import CarLightControl from "./CarLightControl";
import CarSoundControl from "./CarSoundControl";
import CarAirControl from "./CarAirControl";
import CarEctControl from "./CarEctControl";

import { useState } from "react";

const DriverCarRight: React.FC = () => {
const [selectedControl, setSelectedControl] = useState("light")

const renderControlComponent = () => {
    switch (selectedControl) {
        case "light":
            return <CarLightControl />
        case "sound":
            return <CarSoundControl />
        case "ac":
            return <CarAirControl />
        case "ect":
            return <CarEctControl />
        default:
            return <CarLightControl />
    }
}
  return (
    <>
      <CarRightDiv>
        <CarRightMain>
          <DriverText color="#E0E0E0" fontSize="22px" fontWeight={700}>
            Car Control
          </DriverText>
          <CarControlMenu setSelectedControl={setSelectedControl} />
          <CarRightBody>
            {renderControlComponent()}
          </CarRightBody>
        </CarRightMain>
      </CarRightDiv>
    </>
  );
};

export default DriverCarRight;
