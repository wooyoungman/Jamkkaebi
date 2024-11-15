import {
  CarRightUpperBody,
  CarPowerDiv,
  CarPowerWrapper,
  ToggleContainer,
  ToggleCircle,
  CarRightLowerBody,
  CarSeatUIDiv,
} from "./DriverCarCSS";
import { ToggleEclipseSVG } from "@/styles/driver/driverCar/DriverCarSVG";
import { DriverText } from "../driverMain/DriverMainCSS";
import CarPowerSlider from "./CarPowerSlider";
import carSeatImg from "@/assets/carSeatImg.png";

import styled, { keyframes, css } from "styled-components";
import axios from "axios";
import { useAtom } from "jotai";
import { motorOnOffAtom, motorPowerAtom } from "@/atoms/driver/carControl";
import { vehicleIdAtom, tokenAtom } from "@/atoms/driver/carInfo";
import { useEffect } from "react";

// 자연스럽게 흐르는 바람 애니메이션 keyframes 정의
const flowAir = keyframes`
  0% {
    opacity: 0;
    transform: translateX(60px) translateY(-20px) scaleY(1);
  }
  50% {
    opacity: 0.5;
    transform: translateX(10px) translateY(0px) scaleY(1.1);
  }
  100% {
    opacity: 0;
    transform: translateX(-20px) translateY(20px) scaleY(1.3); /* 바람이 의자 쪽으로 흐르며 퍼짐 */
  }
`;

// 바람 효과 스타일
const AirFlow = styled.div<{ isOn: boolean }>`
  position: absolute;
  width: 120px;
  height: 40px;
  background: rgba(0, 140, 255, 0.8); // 푸른색으로 변경
  border-radius: 50%;
  filter: blur(10px);
  ${({ isOn }) =>
    isOn &&
    css`
      animation: ${flowAir} 2s ease-in-out infinite;
    `}
`;

// 의자 이미지와 바람 효과 컨테이너
const SeatContainer = styled.div`
  position: relative;
  /* display: inline-block; */
`;

const CustomDriverText = styled(DriverText)`
  text-align: start;
`;

const CarAirControl: React.FC = () => {
  const [power, setPower] = useAtom(motorPowerAtom);
  const [isOn, setIsOn] = useAtom(motorOnOffAtom);

  const [vehicleId] = useAtom(vehicleIdAtom);
  const [token] = useAtom(tokenAtom);

  const sendPatchRequest = () => {
    const target = "MOTOR";
    const control = isOn ? 1 : 0;
    const red = 0;
    const green = 0;
    const blue = 0;

    const responseData = {
      target,
      control,
      red,
      green,
      blue,
      brightness: power,
    };
    console.log("responseData: ", responseData);
    axios
      .patch(
        `https://k11c106.p.ssafy.io/api/v1/vehicle/control/command/${vehicleId}`,
        responseData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
          },
        }
      )
      .then((response) => {
        console.log("Patch request successful:", response.data);
      })
      .catch((error) => {
        console.error("Patch request failed:", error);
      });
  };

  // 슬라이더 변경 후 마우스를 뗄 때 요청 전송
  const handleSliderChangeEnd = () => {
    sendPatchRequest();
  };

  const handleChange = (value: number) => {
    setPower(value);
  };

  const togglePower = () => {
    setIsOn((prev) => !prev);
  };

  useEffect(() => {
    sendPatchRequest();
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
        <CarSeatUIDiv>
          <SeatContainer>
            <img src={carSeatImg} alt="Car Seat" />
            {isOn && (
              <>
                <AirFlow isOn={isOn} style={{ top: "45%", left: "70%" }} />
                <AirFlow
                  isOn={isOn}
                  style={{ top: "55%", left: "75%", animationDelay: "0.5s" }}
                />
                <AirFlow
                  isOn={isOn}
                  style={{ top: "65%", left: "80%", animationDelay: "1s" }}
                />
              </>
            )}
          </SeatContainer>
        </CarSeatUIDiv>
      </CarRightUpperBody>
      <CarRightLowerBody>
        <CarPowerSlider
          power={power}
          handleChange={(e) => handleChange(e.target.valueAsNumber)}
          onMouseUp={handleSliderChangeEnd}
          powerType="air"
          isOn={isOn}
        />
      </CarRightLowerBody>
    </>
  );
};

export default CarAirControl;
