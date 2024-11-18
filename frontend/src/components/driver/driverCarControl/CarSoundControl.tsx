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

import { useAtom } from "jotai";
import { soundOnOffAtom, soundPowerAtom } from "@/atoms/driver/carControl";

import wakeUp from "@/assets/wakeUp.wav";
import React from "react";

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
  width: 75%;
  height: 100%;
  padding-top: 40px;
  padding-right: 25%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
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
  top: 50%;
  left: 30%;
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
  const [isOn, setIsOn] = useAtom(soundOnOffAtom);
  const [power, setPower] = useAtom(soundPowerAtom);

  const audioInterval = React.useRef<NodeJS.Timeout | null>(null);

  // 슬라이더 변경 후 마우스를 뗄 때 요청 전송
  const handleSliderChangeEnd = () => {
    return;
  };

  const handleChange = (value: number) => {
    setPower(value);
  };

  const togglePower = () => {
    setIsOn((prev) => !prev);
  };

  // 경고음 재생 관리
  React.useEffect(() => {
    const playWarningSound = () => {
      const audio = new Audio(wakeUp);
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    };

    if (isOn) {
      // 경고음 반복 재생 시작
      playWarningSound(); // 즉시 재생
      audioInterval.current = setInterval(() => {
        playWarningSound();
      }, 2000); // 2초 간격으로 재생
    } else {
      // 경고음 재생 중단
      if (audioInterval.current) {
        clearInterval(audioInterval.current);
        audioInterval.current = null;
      }
    }

    return () => {
      // 컴포넌트 언마운트 시 경고음 정지
      if (audioInterval.current) {
        clearInterval(audioInterval.current);
        audioInterval.current = null;
      }
    };
  }, [isOn]);

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
          onMouseUp={handleSliderChangeEnd}
          powerType="sound"
          isOn={isOn}
        />
      </CarRightLowerBody>
    </>
  );
};

export default CarSoundControl;
