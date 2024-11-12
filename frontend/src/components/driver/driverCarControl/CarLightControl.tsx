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
import OffBulbSVG from "@/styles/driver/driverCar/OffBulbSVG";
import CarPowerSlider from "./CarPowerSlider";

const CustomDriverText = styled(DriverText)`
  text-align: start;
`;

const CarLightControl: React.FC = () => {
  const [power, setPower] = useState(50);
  const [isOn, setIsOn] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ x: 0, y: 0 });
  const [initialColor, setInitialColor] = useState("#ffffff"); // 컬러 피커의 초기 색상
  const [selectedRGB, setSelectedRGB] = useState<string>("#ffffff"); // 선택된 RGB 저장 변수

  const pickerRef = useRef<HTMLDivElement>(null);
  const handleChange = (value: number) => {
    setPower(value);
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
          <OffBulbSVG isOn={isOn} />
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
        <CarPowerSlider
          power={power}
          handleChange={(e) => handleChange(e.target.valueAsNumber)}
          powerType="light"
        />
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
