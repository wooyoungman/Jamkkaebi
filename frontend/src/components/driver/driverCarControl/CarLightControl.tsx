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
// import OffBulbSVG from "@/styles/driver/driverCar/OffBulb.svg?react";
import OffBulbSVG from "@/styles/driver/driverCar/OffBulbSVG";
// import OffBulbSVG from "@/styles/driver/driverCar/OffBulbNoTailV1.svg?react";

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

  // EclipseRGB 한 번 클릭 핸들러
  const handleEclipseClick = (color: string) => {
    setSelectedRGB(color); // 선택된 RGB 값만 저장
  };

  // EclipseRGB 더블 클릭 핸들러
  const handleEclipseDoubleClick = (event: React.MouseEvent, color: string) => {
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
          <SketchPicker color={initialColor} onChange={handleColorChange} />
        </ColorPickerContainer>
      )}
    </>
  );
};

export default CarLightControl;
