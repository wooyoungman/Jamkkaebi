import styled from "styled-components";
import { GlassDiv } from "@/styles/driver/GlassmorphismStyle";
import { CustomGlassDiv } from "../driverReport/DriverReportCSS";

export const CarRightDiv = styled.div`
  width: 65%;
  min-width: 500px;
  padding: 0px 100px;
`;

export const CarRightMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const CarRightMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const CarMenuDiv = styled(GlassDiv)`
  width: 120px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 17px;
  box-sizing: border-box;

  cursor: pointer;
  // 호버 스타일 추가
  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.2) 100%
    );
    transform: scale(1.05); // 살짝 확대되는 효과
    transition:
      background 0.3s ease,
      transform 0.3s ease;
  }
`;

export const CarMenuDivBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const CarRightBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const CarRightUpperBody = styled.div`
  width: 100%;
  height: 80%;
  /* min-height: 365px; */
  display: flex;
`;

export const CarPowerDiv = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
`;

export const CarPowerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
  padding-left: 20px;
`;

export const CarControlUIDiv = styled.div`
  width: 75%;
  height: 100%;
  /* padding-top: 40px;
  padding-right: 25%; */
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  position: absolute; // CarRightUpperBody 내부에서의 절대 위치
  top: 60%; // 세로 중앙
  left: 50%; // 가로 중앙
  transform: translate(-50%, -50%);
`;

export const CarSeatUIDiv = styled.div`
  width: 75%;
  height: 100%;
  padding-top: 40px;
  padding-right: 25%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;

export const CarRightLowerBody = styled.div`
  width: 80%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  /* gap: 5px; */
`;

export const SliderRGBContainer = styled.div`
  display: flex;
  justify-content: space-around;
  z-index: 10;
  /* gap: 5px; */
`;

export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  /* padding: 10px 15px; */
  gap: 15px;
  width: 100%;
  border-radius: 10px;
  margin-top: 15px;
`;

export const OnToggleDiv = styled.div`
  display: flex;
  width: 57px;
  padding-left: 5px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 278.049px;
  background: #00ff47;
  cursor: pointer;
`;

export const OffToggleDiv = styled.div`
  display: flex;
  width: 57px;
  padding-right: 5px;
  align-items: center;
  border-radius: 278.049px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  cursor: pointer;
`;

export const ToggleContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOn",
})<{ isOn: boolean }>`
  display: flex;
  align-items: center;
  width: 57px;
  height: 30px;
  border-radius: 278.049px;
  cursor: pointer;
  background: ${({ isOn }) => (isOn ? "#00ff47" : "rgba(255, 255, 255, 0.08)")};
  border: ${({ isOn }) =>
    isOn ? "none" : "1px solid rgba(255, 255, 255, 0.15)"};
  padding: ${({ isOn }) => (isOn ? "2px 0px 2px 5px" : "2px 5px 2px 0px")};
  /* justify-content: ${({ isOn }) => (isOn ? "flex-end" : "flex-start")}; */
  position: relative;
  transition:
    background 0.3s ease,
    padding 0.3s ease,
    border 0.3s ease;
`;

// ToggleCircle (SVG를 감싸는 요소)
export const ToggleCircle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOn",
})<{ isOn: boolean }>`
  position: absolute;
  top: 50%;
  left: ${({ isOn }) => (isOn ? "calc(100% - 36px)" : "0")}; /* 좌우 이동 */
  transform: translateY(-50%);
  transition: left 0.3s ease;
  width: 36px;
  height: 36px;
`;

// export const ColorPickerContainer = styled.div`
//   position: absolute;
//   z-index: 100;
// `;

export const CarEctContainer = styled(GlassDiv)`
  width: 250px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 40px 20px 30px 20px;
  box-sizing: border-box;
  gap: 25px;
`;

export const CarEctIconContainer = styled(GlassDiv)`
  display: flex;
  width: 70px;
  height: 70px;
  padding: 15px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  box-sizing: border-box;
`;

export const CarWindowButtonContainer = styled.div`
  display: flex;
  gap: 15px;
`;

export const CarWindowButton = styled(CustomGlassDiv)`
  width: 85px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;

  cursor: pointer;
  // 호버 스타일 추가
  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.2) 100%
    );
    transform: scale(1.05); // 살짝 확대되는 효과
    transition:
      background 0.3s ease,
      transform 0.3s ease;
  }
`;

export const CarVibrationControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
