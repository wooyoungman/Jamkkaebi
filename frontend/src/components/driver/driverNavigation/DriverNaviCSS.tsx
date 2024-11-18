import styled from "styled-components";
import { GlassDiv } from "@/styles/driver/GlassmorphismStyle";
import navigationImg from "@/assets/navigationImg.png";

export const DriverNaviDiv = styled(GlassDiv)`
  width: 100%;
  min-width: 1100px;
  height: 100%;
  display: flex;
  align-items: stretch;
  overflow: hidden;
`;

export const NaviLeftDiv = styled.div`
  width: 27%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 25px 22px;
  box-sizing: border-box;
  gap: 30px;
`;

interface DriverProps {
  fontSize?: string;
  color?: string;
  fontWeight?: number;
  lineHeight?: number | string;
  gap?: string;
}

export const DriverText = styled.p<DriverProps>`
  color: ${(props) => props.color || "#fff"};
  text-align: center;
  font-size: ${(props) => props.fontSize || "22px"};
  font-style: normal;
  font-weight: ${(props) => props.fontWeight || 700};
  line-height: ${(props) => props.lineHeight || 1.2};
  margin: 0;
`;

export const InlineTextDiv = styled.div<DriverProps>`
  display: flex;
  align-items: baseline;
  gap: ${(props) => props.gap || "4px"};
`;

export const TextGapDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const RestStoreList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const RestStoreContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RestStoreInfoBody = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RestStoreLeftDiv = styled.div`
  width: 85%;
`;

export const RestStoreRightDiv = styled.div`
  width: 15%;
`;

export const HRLine = styled.hr`
  width: 100%;
  /* height: 0.5px; */
  background-color: #fff;
`;

export const NaviRightDiv = styled.div`
  width: 73%;
  min-width: 800px;
  height: 100%;
`;
export const NavigationBody = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  background-image: url(${navigationImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
