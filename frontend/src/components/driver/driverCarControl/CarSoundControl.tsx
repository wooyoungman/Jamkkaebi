import {
  CarRightUpperBody,
  CarPowerDiv,
  CarPowerWrapper,
  ToggleContainer,
  ToggleCircle,
  CarRightLowerBody,
} from "./DriverCarCSS";
import { ToggleEclipseSVG } from "@/styles/driver/driverCar/DriverCarSVG";
import { DriverText } from "../driverMain/DriverMainCSS";
import CarPowerSlider from "./CarPowerSlider";
import carSoundImg from "@/assets/speakerImg.png";

import styled, { keyframes, css } from "styled-components";
import { useState } from "react";

// 진동 애니메이션 keyframes 정의
const vibrate = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(1deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-1deg); }
  100% { transform: rotate(0deg); }
`;

// 퍼지는 음파 애니메이션 keyframes 정의
const soundWave = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0.8;
  }
  100% {
    transform: scale(5);
    opacity: 0;
  }
`;

// 진동 애니메이션을 적용한 스피커 이미지 스타일
const SpeakerImgContainer = styled.div<{ isOn: boolean }>`
  position: relative;
  display: inline-block;
  ${({ isOn }) =>
    isOn &&
    css`
      animation: ${vibrate} 0.15s infinite;
    `}
`;

// 음파 효과를 위한 스타일
const SoundWave = styled.div<{ isOn: boolean; delay: number }>`
  position: absolute;
  top: 38%;
  left: 50%;
  width: 60px;
  height: 60px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  ${({ isOn, delay }) =>
    isOn &&
    css`
      animation: ${soundWave} 1s infinite;
      animation-delay: ${delay}s;
    `}
  transform: translate(-50%, -50%);
`;

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
        {/* 스피커 이미지에 진동 효과 적용 */}
        <SpeakerImgContainer isOn={isOn}>
          <img src={carSoundImg} alt="Speaker" />
          {isOn && (
            <>
              <SoundWave isOn={isOn} delay={0} />
              <SoundWave isOn={isOn} delay={0.5} />
              <SoundWave isOn={isOn} delay={1} />
            </>
          )}
        </SpeakerImgContainer>
      </CarRightUpperBody>
      <CarRightLowerBody>
        <CarPowerSlider
          power={power}
          handleChange={(e) => handleChange(e.target.valueAsNumber)}
          powerType="sound"
          isOn={isOn}
        />
      </CarRightLowerBody>
    </>
  );
};

export default CarSoundControl;
