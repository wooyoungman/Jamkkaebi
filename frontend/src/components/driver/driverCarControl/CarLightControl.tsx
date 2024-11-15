import {
  CarControlUIDiv,
  CarPowerDiv,
  CarPowerWrapper,
  CarRightLowerBody,
  CarRightUpperBody,
  ToggleContainer,
  SliderRGBContainer,
  ToggleCircle,
  ColorPickerContainer,
} from "./DriverCarCSS";
import { DriverText } from "../driverMain/DriverMainCSS";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";
import {
  ToggleEclipseSVG,
  EclipseRGB,
} from "@/styles/driver/driverCar/DriverCarSVG";
import BulbSVG from "@/styles/driver/driverCar/BulbSVG";
import CarPowerSlider from "./CarPowerSlider";
import OffBulbSVG from "@/styles/driver/driverCar/OffBulbSVG";

import {
  lightOnOffAtom,
  lightPowerAtom,
  lightColorAtom,
} from "@/atoms/driver/carControl";
import axios from "axios";
import { useAtom } from "jotai";
import { vehicleIdAtom, tokenAtom } from "@/atoms/driver/carInfo";

const CustomDriverText = styled(DriverText)`
  text-align: start;
`;

const CarLightControl: React.FC = () => {
  const [power, setPower] = useAtom(lightPowerAtom);
  const [isOn, setIsOn] = useAtom(lightOnOffAtom);
  const [selectedRGB, setSelectedRGB] = useAtom(lightColorAtom);

  const [showPicker, setShowPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ x: 0, y: 0 });
  // 컬러 피커의 초기 색상
  // const [initialColor, setInitialColor] = useState("#ffffff");

  const [vehicleId] = useAtom(vehicleIdAtom);
  const [token] = useAtom(tokenAtom);

  const pickerRef = useRef<HTMLDivElement>(null);

  // axios.patch 요청 함수
  const sendPatchRequest = (status: number) => {
    const target = "LIGHT";
    const control = status;

    const red = parseInt(selectedRGB.slice(1, 3), 16) || 0;
    const green = parseInt(selectedRGB.slice(3, 5), 16) || 0;
    const blue = parseInt(selectedRGB.slice(5, 7), 16) || 0;

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
    sendPatchRequest(3);
  };

  // power 변경 핸들러 (슬라이더)
  const handleChange = (value: number) => {
    setPower(value);
  };

  // 전원 토글 시 요청 전송
  const togglePower = () => {
    setIsOn((prev) => !prev);
    const status = isOn ? 1 : 0;
    sendPatchRequest(status);
  };

  // EclipseRGB 한 번 클릭 핸들러 -> 색상 선택시 요청 전송
  const handleEclipseClick = (color: string) => {
    setSelectedRGB(color); // 선택된 RGB 값만 저장
    sendPatchRequest(2);
  };

  // EclipseRGB 더블 클릭 핸들러
  const handleEclipseDoubleClick = (event: React.MouseEvent, color: string) => {
    // 피커 초기 색상 설정
    // setInitialColor(color);
    setShowPicker(true);
    setPickerPosition({ x: event.clientX, y: event.clientY });
  };

  // 컬러 피커의 색상 변경 핸들러 -> 색상 선택 시 요청 전송
  const handleColorChange = (color: any) => {
    // setInitialColor(color.hex);
    setSelectedRGB(color.hex); // 선택된 RGB 값만 저장
    sendPatchRequest(2);
    console.log("Selected RGB:", color.hex);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 클릭한 영역이 컬러 피커가 아닐 경우 닫기
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // 이벤트 리스너 추가
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);

  return (
    <>
      <CarRightUpperBody
        style={{ marginBottom: isOn === false ? "34px" : "0" }}
      >
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
          {isOn === false ? (
            <OffBulbSVG />
          ) : (
            // <p>전구</p>
            <BulbSVG isOn={isOn} power={power} selectedRGB={selectedRGB} />
          )}
        </CarControlUIDiv>
      </CarRightUpperBody>

      <CarRightLowerBody>
        <SliderRGBContainer>
          <EclipseRGB
            color="#FF0000"
            onClick={() => handleEclipseClick("#FF0000")}
            onDoubleClick={(e) => handleEclipseDoubleClick(e, "#FF0000")}
            isOn={isOn}
          />
          <EclipseRGB
            color="#0000FF"
            onClick={() => handleEclipseClick("#0000FF")}
            onDoubleClick={(e) => handleEclipseDoubleClick(e, "#0000FF")}
            isOn={isOn}
          />
          <EclipseRGB
            color="#00FF00"
            onClick={() => handleEclipseClick("#00FF00")}
            onDoubleClick={(e) => handleEclipseDoubleClick(e, "#00FF00")}
            isOn={isOn}
          />
        </SliderRGBContainer>
        <CarPowerSlider
          power={power}
          handleChange={(e) => handleChange(e.target.valueAsNumber)}
          onMouseUp={handleSliderChangeEnd}
          powerType="light"
          isOn={isOn}
        />
      </CarRightLowerBody>

      {/* 컬러 피커 */}
      {showPicker && (
        <ColorPickerContainer
          ref={pickerRef}
          style={{ top: pickerPosition.y, left: pickerPosition.x }}
        >
          <SketchPicker color={selectedRGB} onChange={handleColorChange} />
        </ColorPickerContainer>
      )}
    </>
  );
};

export default CarLightControl;
