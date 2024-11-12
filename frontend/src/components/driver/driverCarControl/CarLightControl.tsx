import {
  CarControlUIDiv,
  CarPowerDiv,
  CarPowerWrapper,
  CarRightLowerBody,
  CarRightUpperBody,
  OnToggleDiv,
  OffToggleDiv,
} from "./DriverCarCSS";
import { DriverText } from "../driverMain/DriverMainCSS";
import { useState } from "react";
import styled, { css } from "styled-components";
import {
  OnToggleEclipseSVG,
  OffToggleEclipseSVG,
} from "@/styles/driver/driverCar/DriverCarSVG";

import OffBulbSVG from "@/styles/driver/driverCar/OffBulbSVG";

const CustomDriverText = styled(DriverText)`
  text-align: start;
`;
// 슬라이더 배경이 되는 GlassDiv 스타일을 추가
const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  gap: 10px;
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  margin-top: 15px;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPower(e.target.valueAsNumber);
  };

  return (
    <>
      {/* <DriverText color="#E0E0E0" fontSize="15px" fontWeight={700}>
        평상시와 졸음 감지용 조명의 세기를 조절할 수 있으며, <br /> 졸음 감지 시
        조명의 자동 작동 여부를 설정할 수 있습니다.
      </DriverText> */}
      <CarRightUpperBody>
        <CarPowerDiv>
          <CarPowerWrapper>
            <CustomDriverText fontSize="20px" fontWeight={700}>
              Power
            </CustomDriverText>
            <OffToggleDiv>
              <OffToggleEclipseSVG />
            </OffToggleDiv>
            {/* <OnToggleDiv>
              <OnToggleEclipseSVG />
            </OnToggleDiv> */}
          </CarPowerWrapper>
        </CarPowerDiv>
        <CarControlUIDiv>
          <OffBulbSVG />
        </CarControlUIDiv>
      </CarRightUpperBody>

      <CarRightLowerBody>
        <SliderContainer>
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
    </>
  );
};

export default CarLightControl;
