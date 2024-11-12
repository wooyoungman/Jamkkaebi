import {
  CarRightUpperBody,
  CarPowerDiv,
  CarPowerWrapper,
  ToggleContainer,
  ToggleCircle,
  CarControlUIDiv,
  CarRightLowerBody,
} from "./DriverCarCSS";
import { ToggleEclipseSVG } from "@/styles/driver/driverCar/DriverCarSVG";
import { DriverText } from "../driverMain/DriverMainCSS";
import CarPowerSlider from "./CarPowerSlider";
import carSoundImg from "@/assets/speakerImg.png";

import styled from "styled-components";
import { useState } from "react";

const CustomDriverText = styled(DriverText)`
  text-align: start;
`;

const CarSoundControl: React.FC = () => {
  const [power, setPower] = useState(50);
  const [isOn, setIsOn] = useState(false);

  const togglePower = () => {
    setIsOn((prev) => !prev);
  };

  const handleChange = (value: number) => {
    setPower(value);
  };

  return (
    <>
      <CarRightUpperBody>
        <CarPowerDiv>
          <CarPowerWrapper>
            <CustomDriverText fontSize="20px" fontWeight={700}>
              Power
            </CustomDriverText>
            <ToggleContainer isOn={isOn} onClick={togglePower}>
              <ToggleCircle isOn={isOn}>
                <ToggleEclipseSVG isOn={isOn} />
              </ToggleCircle>
            </ToggleContainer>
          </CarPowerWrapper>
        </CarPowerDiv>
        <CarControlUIDiv>
          <img src={carSoundImg} />
        </CarControlUIDiv>
      </CarRightUpperBody>
      <CarRightLowerBody>
        <CarPowerSlider
          power={power}
          handleChange={(e) => handleChange(e.target.valueAsNumber)}
          powerType="sound"
        />
      </CarRightLowerBody>
    </>
  );
};

export default CarSoundControl;