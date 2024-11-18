import styled from "styled-components";
import backgroundPNG from "@/assets/backgroundPNG.png";

export const DriverContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const DriverBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 1280px;
  height: 800px;
  gap: 17px;
  padding: 12px 25px;
  overflow: hidden;
  border-radius: 40px;
  background-image: url(${backgroundPNG});
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
`;
