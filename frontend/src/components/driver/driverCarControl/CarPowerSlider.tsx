import React from "react";
import styled, { css } from "styled-components";
import { SliderContainer } from "./DriverCarCSS";
import {
  SliderLightSVG,
  SliderSoundSVG,
  SliderAirSVG,
} from "@/styles/driver/driverCar/DriverCarSVG";

interface StyledSliderProps {
  value: number;
}

interface CarPowerSliderProps {
  power: number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  powerType: string;
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

const CarPowerSlider: React.FC<CarPowerSliderProps> = ({
  power,
  handleChange,
  powerType,
}) => {
  // powerType에 따라 렌더링할 SVG 컴포넌트를 선택
  const renderSVGIcon = () => {
    switch (powerType) {
      case "light":
        return <SliderLightSVG />;
      case "sound":
        return <SliderSoundSVG />;
      case "air":
        return <SliderAirSVG />;
      default:
        return null;
    }
  };

  return (
    <SliderContainer>
      {renderSVGIcon()}
      <StyledSlider
        value={power}
        min={0}
        max={100}
        step={1}
        onChange={handleChange}
      />
      <SliderValue>{power}</SliderValue>
    </SliderContainer>
  );
};

export default CarPowerSlider;
