import {
  CarRightBody,
  CarWindowButton,
  CarWindowButtonContainer,
  CarEctIconContainer,
  ToggleContainer,
  ToggleCircle,
  CarVibrationControlContainer,
} from "./DriverCarCSS";
import {
  ToggleEclipseSVG,
  WindowSVG,
  ButtonWindowSVG,
  ButtonWindowUpSVG,
  ButtonWindowDownSVG,
  VibrationSVG,
} from "@/styles/driver/driverCar/DriverCarSVG";
import { DriverText } from "../driverMain/DriverMainCSS";
import { useState } from "react";
import styled from "styled-components";
import { CarEctContainer } from "./DriverCarCSS";
import CarPowerSlider from "./CarPowerSlider";

const CustomCarRightBody = styled(CarRightBody)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 6%;
`;

const CarEctControl: React.FC = () => {
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
      <CustomCarRightBody>
        {/* <DriverText color="#E0E0E0" fontSize="15px" fontWeight={700}>
          운전자의 졸음 운전이 감지되었을 때 작동하는 기능입니다. <br /> 안전
          운행을 위해 하나 이상의 졸음 경고 기능을 활성화해 주십시오.
        </DriverText> */}
        <CarEctContainer>
          <CarEctIconContainer>
            <WindowSVG />
          </CarEctIconContainer>
          <DriverText color="#e0e0e0" fontSize="18px" fontWeight={700}>
            창문
          </DriverText>
          <CarWindowButtonContainer>
            <CarWindowButton>
              <ButtonWindowSVG />
              <ButtonWindowUpSVG />
            </CarWindowButton>
            <CarWindowButton>
              <ButtonWindowSVG />
              <ButtonWindowDownSVG />
            </CarWindowButton>
          </CarWindowButtonContainer>
        </CarEctContainer>

        <CarEctContainer>
          <CarEctIconContainer>
            <VibrationSVG />
          </CarEctIconContainer>
          <DriverText color="#e0e0e0" fontSize="18px" fontWeight={700}>
            진동
          </DriverText>

          <CarVibrationControlContainer>
            <ToggleContainer isOn={isOn} onClick={togglePower}>
              <ToggleCircle isOn={isOn}>
                <ToggleEclipseSVG isOn={isOn} />
              </ToggleCircle>
            </ToggleContainer>
            <CarPowerSlider
              power={power}
              handleChange={(e) => handleChange(e.target.valueAsNumber)}
              powerType="air"
              isOn={isOn}
            />
          </CarVibrationControlContainer>
        </CarEctContainer>
      </CustomCarRightBody>
    </>
  );
};

export default CarEctControl;
