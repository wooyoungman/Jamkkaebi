import {
  CarControlUIDiv,
  CarPowerDiv,
  CarPowerWrapper,
  CarRightLowerBody,
  CarRightUpperBody,
  ToggleContainer,
  SliderContainer,
  SliderRGBContainer,
  ToggleCircle,
  ColorPickerContainer,
} from "./DriverCarCSS";
import { DriverText } from "../driverMain/DriverMainCSS";
import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { SketchPicker } from "react-color";
import {
  ToggleEclipseSVG,
  EclipseRGB,
  SliderLightSVG,
} from "@/styles/driver/driverCar/DriverCarSVG";
import OffBulbSVG from "@/styles/driver/driverCar/OffBulbSVG";

const CustomDriverText = styled(DriverText)`
  text-align: start;
`;

interface StyledSliderProps {
  value: number;
}

// 슬라이더 스타일 커스터마이징
const StyledSlider = styled.input.attrs({ type: "range" })<StyledSliderProps>`
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 20px;
  background: ${({ value }) => css`
    linear-gradient(
      to right,
      #0072ff 0%,
      #00b3ff ${value}%,
      #0033cc ${value}%,
      #333333 ${value}%
    );
  `};
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 25px;
    background-color: #ffffff;
    border-radius: 20%;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
  }

  &::-webkit-slider-thumb:hover {
    background-color: #e0e0e0;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    border-radius: 50%;
    border: none;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
  }

  &::-moz-range-thumb:hover {
    background-color: #e0e0e0;
  }
`;

// 슬라이더의 현재 값을 표시할 텍스트 스타일
const SliderValue = styled.div`
  font-size: 18px;
  color: #e0e0e0;
  width: 40px;
  text-align: right;
`;

const CarLightControl: React.FC = () => {
  const [power, setPower] = useState(50);
  const [isOn, setIsOn] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ x: 0, y: 0 });
  const [initialColor, setInitialColor] = useState("#ffffff"); // 컬러 피커의 초기 색상
  const [selectedRGB, setSelectedRGB] = useState<string>("#ffffff"); // 선택된 RGB 저장 변수

  const pickerRef = useRef<HTMLDivElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPower(e.target.valueAsNumber);
  };

  const togglePower = () => {
    setIsOn((prev) => !prev);
  };

  // EclipseRGB 클릭 핸들러
  const handleEclipseClick = (event: React.MouseEvent, color: string) => {
    setInitialColor(color); // 피커 초기 색상 설정
    setShowPicker(true);
    setPickerPosition({ x: event.clientX, y: event.clientY });
  };

  // 컬러 피커의 색상 변경 핸들러
  const handleColorChange = (color: any) => {
    setSelectedRGB(color.hex); // 선택된 RGB 값만 저장
    setInitialColor(color.hex);
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
          <OffBulbSVG />
        </CarControlUIDiv>
      </CarRightUpperBody>

      <CarRightLowerBody>
        <SliderRGBContainer>
          <EclipseRGB
            color="red"
            onClick={(e) => handleEclipseClick(e, "red")}
          />
          <EclipseRGB
            color="blue"
            onClick={(e) => handleEclipseClick(e, "blue")}
          />
          <EclipseRGB
            color="green"
            onClick={(e) => handleEclipseClick(e, "green")}
          />
        </SliderRGBContainer>
        <SliderContainer>
          <SliderLightSVG />
          <StyledSlider
            value={power}
            min={0}
            max={100}
            step={1}
            onChange={handleChange}
          />
          <SliderValue>{power}</SliderValue>
        </SliderContainer>
      </CarRightLowerBody>

      {/* 컬러 피커 */}
      {showPicker && (
        <ColorPickerContainer
          ref={pickerRef}
          style={{ top: pickerPosition.y, left: pickerPosition.x }}
        >
          <SketchPicker color={initialColor} onChange={handleColorChange} />
        </ColorPickerContainer>
      )}
    </>
  );
};

export default CarLightControl;
