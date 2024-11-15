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

import styled from "styled-components";
import { CarEctContainer } from "./DriverCarCSS";
import CarPowerSlider from "./CarPowerSlider";
import axios from "axios";
import { useAtom } from "jotai";
import {
  vibrationOnOffAtom,
  vibrationPowerAtom,
  windowControlStateAtom,
} from "@/atoms/driver/carControl";
import { vehicleIdAtom, tokenAtom } from "@/atoms/driver/carInfo";
import { useEffect } from "react";

const CustomCarRightBody = styled(CarRightBody)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 6%;
`;

const CarEctControl: React.FC = () => {
  const [power, setPower] = useAtom(vibrationPowerAtom);
  const [isOn, setIsOn] = useAtom(vibrationOnOffAtom);
  const [, setWindowControlState] = useAtom(windowControlStateAtom);
  const [vehicleId] = useAtom(vehicleIdAtom);
  const [token] = useAtom(tokenAtom);

  const sendPatchRequest = (state: string, controlValue: number) => {
    const target = state;
    const control = controlValue;
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
    return;
  };

  const handleChange = (value: number) => {
    setPower(value);
  };

  const togglePower = () => {
    setIsOn((prev) => !prev);
  };

  useEffect(() => {
    const value = isOn ? 1 : 0;
    sendPatchRequest("VIBRATION", value);
  }, [isOn]);

  // Up 버튼을 누를 때 상태를 1로 변경
  const handleMouseDownUp = () => {
    setWindowControlState(1);
    sendPatchRequest("WINDOW", 1);
  };

  // Down 버튼을 누를 때 상태를 2로 변경
  const handleMouseDownDown = () => {
    setWindowControlState(2);
    sendPatchRequest("WINDOW", 2);
  };

  // 버튼에서 손을 뗄 때 상태를 0으로 재설정
  const handleMouseUp = () => {
    setWindowControlState(0);
    sendPatchRequest("WINDOW", 0);
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
            <CarWindowButton
              onMouseDown={handleMouseDownUp}
              onMouseUp={handleMouseUp}
            >
              <ButtonWindowSVG />
              <ButtonWindowUpSVG />
            </CarWindowButton>
            <CarWindowButton
              onMouseDown={handleMouseDownDown}
              onMouseUp={handleMouseUp}
            >
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
              onMouseUp={handleSliderChangeEnd}
              powerType="vibration"
              isOn={isOn}
            />
          </CarVibrationControlContainer>
        </CarEctContainer>
      </CustomCarRightBody>
    </>
  );
};

export default CarEctControl;
