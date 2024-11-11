import styled from "styled-components";
import { GlassDiv } from "../../../styles/driver/GlassmorphismStyle";
import naviImg from "@/assets/naviImg.png";
import cloudyImg from "@/assets/cloudyImg.png";

export const Left = styled(GlassDiv)`
  width: 35%;
  min-width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding: 10px 0px;
  gap: 10px;
  box-sizing: border-box;
`;

export const DriverWrapper = styled.div`
  padding: 0px 115px;
  gap: 10px;
`;

export const DriverInfo = styled.div`
  display: flex;
  padding: 20px 10px 12px 8px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;

export const DriverImage = styled.img`
  width: 110px;
  height: 110px;
`;

interface DriverProps {
  fontSize?: string;
  color?: string;
  fontWeight?: number;
  lineHeight?: number | string;
  gap?: string;
}

export const DriverTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const InlineTextDiv = styled.div<DriverProps>`
  display: flex;
  align-items: baseline;
  gap: ${(props) => props.gap || "4px"};
`;

export const DrivingInfo = styled.div`
  display: inline-flex;
  padding: 0px 25px;
  align-items: center;
  gap: 83px;
`;

export const DrivingTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
`;

export const DriverText = styled.p<DriverProps>`
  color: ${(props) => props.color || "#fff"};
  text-align: center;
  font-size: ${(props) => props.fontSize || "22px"};
  font-style: normal;
  font-weight: ${(props) => props.fontWeight || 700};
  line-height: ${(props) => props.lineHeight || 1.2};
  margin: 0;
`;

export const RightTop = styled(GlassDiv)`
  width: 100%;
  height: 60%;
  flex-shrink: 0;
  /* background-image: url(${naviImg}); */
  background-size: cover; // 이미지가 컴포넌트에 맞게 채워지도록 설정
  background-repeat: no-repeat; // 이미지 반복 방지
  background-position: center; // 이미지 가운데 정렬
  overflow: hidden;
`;

export const RightBottom = styled.div`
  width: 100%;
  /* height: 230px; */
  height: 36%;
  display: flex;
  gap: 20px;
`;

export const RightBottomDiv = styled(GlassDiv)`
  width: 49%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* padding: 20px; */
  box-sizing: border-box;
`;

export const RightBottomMain = styled.div`
  display: flex;
  gap: 21px;
`;

export const RightBottomImage = styled.img`
  width: 130px;
  height: 130px;
`;

export const RightBottomContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RightBottomWeather = styled(RightBottomDiv)`
  flex-shrink: 0;
  background-image: url(${cloudyImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const ConditionGraphWrapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  /* background-color: white; */
  box-sizing: border-box;
`;

export const ConditionGraphDiv = styled.div`
  width: 50%;
  height: 80%;
  position: relative;
  /* background-color: gray; */
`;

export const GraphText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
