import {
  CarControlUIDiv,
  CarPowerDiv,
  CarPowerWrapper,
  CarRightLowerBody,
  CarRightUpperBody,
  ToggleContainer,
  SliderRGBContainer,
  ToggleCircle,
  // ColorPickerContainer,
} from "./DriverCarCSS";
import { DriverText } from "../driverMain/DriverMainCSS";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
// import { SketchPicker } from "react-color";
import ColorPicker from "@radial-color-picker/react-color-picker";
import "@radial-color-picker/react-color-picker/dist/style.css";
import {
  ToggleEclipseSVG,
  EclipseRGB,
  EclipsePickerSVG,
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

// CarRightUpperBody를 기준으로 ColorPickerContainer를 중앙에 위치시키도록 스타일 설정
const CenteredColorPickerContainer = styled.div`
  position: absolute; // CarRightUpperBody 내부에서의 절대 위치
  top: 50%; // 세로 중앙
  left: 50%; // 가로 중앙
  transform: translate(-50%, -50%); // 정확히 중앙으로 이동
  z-index: 1000; // 다른 요소보다 위에 나타나도록 설정
  padding: 10px; // 여백 추가
`;

// RGB 타입 정의
interface RGB {
  r: number;
  g: number;
  b: number;
}

function rgbToHue(r: number, g: number, b: number): number {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue = 0;

  if (delta === 0) {
    hue = 0; // 회색 계열 (색상 없음)
  } else if (max === r) {
    hue = ((g - b) / delta) % 6;
  } else if (max === g) {
    hue = (b - r) / delta + 2;
  } else if (max === b) {
    hue = (r - g) / delta + 4;
  }

  hue = Math.round(hue * 60); // 0-360 범위로 변환
  if (hue < 0) hue += 360; // 음수 방지

  return hue;
}

function hueToRgb(hue: number): { r: number; g: number; b: number } {
  const saturation = 1; // 최대 채도
  const value = 1; // 최대 밝기

  const c = value * saturation;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = value - c;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= hue && hue < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= hue && hue < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= hue && hue < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= hue && hue < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= hue && hue < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= hue && hue < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

const CarLightControl: React.FC = () => {
  const [power, setPower] = useAtom(lightPowerAtom);
  const [isOn, setIsOn] = useAtom(lightOnOffAtom);
  const [selectedRGB, setSelectedRGB] = useAtom(lightColorAtom);
  const initialHue = rgbToHue(selectedRGB.r, selectedRGB.g, selectedRGB.b);

  const [showPicker, setShowPicker] = useState(false);

  const [vehicleId] = useAtom(vehicleIdAtom);
  const [token] = useAtom(tokenAtom);

  const pickerRef = useRef<HTMLDivElement>(null);

  // axios.patch 요청 함수
  const sendPatchRequest = (status: number, color?: RGB) => {
    const target = "LIGHT";
    const control = status;

    const { r, g, b } = color || selectedRGB;

    const responseData = {
      target,
      control,
      red: r,
      green: g,
      blue: b,
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
    sendPatchRequest(2);
  };

  // power 변경 핸들러 (슬라이더)
  const handleChange = (value: number) => {
    setPower(value);
  };

  // 전원 토글 시 요청 전송
  const togglePower = () => {
    setIsOn((prev) => !prev);
  };

  useEffect(() => {
    const status = isOn ? 1 : 0;
    sendPatchRequest(status);
  }, [isOn]);

  // EclipseRGB 한 번 클릭 핸들러 -> 색상 선택시 요청 전송
  const handleEclipseClick = (color: RGB) => {
    setSelectedRGB(color); // 선택된 RGB 값만 저장
    sendPatchRequest(3, color);
  };

  // EclipseRGB 더블 클릭 핸들러
  const handleEclipseDoubleClick = () => {
    // 피커 초기 색상 설정
    // setInitialColor(color);
    setShowPicker(true);
  };

  // EclipsePickerSVG를 클릭했을 때 컬러 피커를 열도록 하는 함수
  const handlePickerClick = () => {
    setShowPicker(true);
  };

  // 최종 색상 선택 시 호출되는 함수
  const handleSelect = (hue: number) => {
    const rgb = hueToRgb(hue); // hue 값을 RGB로 변환
    setSelectedRGB(rgb); // 변환된 RGB 값을 상태로 설정
    sendPatchRequest(3, rgb);
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
      <CarRightUpperBody style={{ position: "relative" }}>
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

        {/* 컬러 피커 */}
        {showPicker && (
          <CenteredColorPickerContainer ref={pickerRef}>
            <ColorPicker
              hue={initialHue} // 초기 hue 값 설정
              onSelect={handleSelect} // 최종 색상 선택 시 호출
            />
          </CenteredColorPickerContainer>
        )}
        <CarControlUIDiv>
          {isOn === false ? (
            <OffBulbSVG />
          ) : (
            !showPicker && ( // 컬러피커가 표시되지 않을 때만 전구(BulbSVG)를 렌더링
              <BulbSVG isOn={isOn} power={power} selectedRGB={selectedRGB} />
            )
          )}
        </CarControlUIDiv>
      </CarRightUpperBody>

      <CarRightLowerBody>
        <SliderRGBContainer>
          <EclipseRGB
            color={{ r: 255, g: 0, b: 0 }}
            onClick={() => handleEclipseClick({ r: 255, g: 0, b: 0 })}
            onDoubleClick={handleEclipseDoubleClick}
            isOn={isOn}
          />
          <EclipseRGB
            color={{ r: 0, g: 255, b: 0 }}
            onClick={() => handleEclipseClick({ r: 0, g: 255, b: 0 })}
            onDoubleClick={handleEclipseDoubleClick}
            isOn={isOn}
          />
          <EclipseRGB
            color={{ r: 0, g: 0, b: 255 }}
            onClick={() => handleEclipseClick({ r: 0, g: 0, b: 255 })}
            onDoubleClick={handleEclipseDoubleClick}
            isOn={isOn}
          />
          <EclipseRGB
            color={{ r: 255, g: 255, b: 255 }}
            onClick={() => handleEclipseClick({ r: 255, g: 255, b: 255 })}
            onDoubleClick={handleEclipseDoubleClick}
            isOn={isOn}
          />
          <EclipsePickerSVG onClick={handlePickerClick} isOn={isOn} />
        </SliderRGBContainer>
        <CarPowerSlider
          power={power}
          handleChange={(e) => handleChange(e.target.valueAsNumber)}
          onMouseUp={handleSliderChangeEnd}
          powerType="light"
          isOn={isOn}
        />
      </CarRightLowerBody>
    </>
  );
};

export default CarLightControl;
