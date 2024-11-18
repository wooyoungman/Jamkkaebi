import styled from "styled-components";

export const GlassDiv = styled.div`
  border-radius: 20px;
  border: 1px solid rgba(84, 63, 212, 0.3);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  box-shadow:
    -5px -5px 4px 0px rgba(255, 255, 255, 0.04) inset,
    5px 5px 4px 0px rgba(255, 255, 255, 0.08) inset;
  backdrop-filter: blur(10px);
`;

export const ModalGlassDiv2 = styled.div`
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 100%
  );
  box-shadow:
    -5px -5px 4px 0px rgba(255, 255, 255, 0.04) inset,
    5px 5px 4px 0px rgba(255, 255, 255, 0.08) inset;
  backdrop-filter: blur(10px);
`;

export interface SizeProps {
  cardwidth?: string;
  cardheight?: string;
  opacity?: number;
}

export interface LineProps extends SizeProps {
  position?: "top" | "bottom" | "left" | "right";
  offsetleft?: string;
  offsetRight?: string;
  offsetTop?: string;
  centered?: boolean;
}

export interface EclipseDivProps extends SizeProps {
  top?: string;
  bottom?: string;
}

export const Card = styled.div<SizeProps>`
  width: ${(props) => props.cardwidth || "420px"};
  /* min-width: 650px; */
  height: ${(props) => props.cardheight || "600px"};
  position: relative;
  border-radius: 30px;
`;

export const GrayLine = styled.hr<LineProps>`
  width: ${(props) => props.cardwidth || "289px"};
  height: 1px;
  opacity: ${(props) => props.opacity || 0.6};
  border: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  position: absolute;
  ${(props) => (props.position === "top" ? "top: 0;" : "bottom: 0;")}
  ${(props) =>
    props.centered
      ? `
        left: 50%;
        transform: translateX(-50%);
      `
      : `
        ${props.offsetleft ? `left: ${props.offsetleft};` : ""}
        ${props.offsetRight ? `right: ${props.offsetRight};` : ""}
      `}
  margin: 0;
`;

export const EclipseDiv = styled.div<EclipseDivProps>`
  width: ${(props) => props.cardwidth || "247px"};
  height: ${(props) => props.cardheight || "77px"};
  flex-shrink: 0;
  opacity: 1;
  position: absolute;
  ${(props) => (props.top ? `top: ${props.top};` : "")}
  ${(props) => (props.bottom ? `bottom: ${props.bottom};` : "")}

  left: 50%;
  transform: translateX(-50%);
`;

export const RightRedEclipseDiv = styled.div<EclipseDivProps>`
  position: absolute;
  top: ${(props) => props.top || "0"}; /* 상단에서 떨어진 거리 */
  right: 0; /* 우측 끝에 고정 */
`;

export const LeftRedEclipseDiv = styled.div<EclipseDivProps>`
  position: absolute;
  top: ${(props) => props.top || "0"}; /* 상단에서 떨어진 거리 */
  left: 0; /* 우측 끝에 고정 */
`;

export const BlueEclipseSVG: React.FC<SizeProps> = ({
  cardwidth,
  cardheight,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={cardwidth || "247px"}
    height={cardheight || "77px"}
    viewBox="0 0 528 88"
    fill="none"
  >
    <ellipse opacity="0.8" cx="50%" cy="50%" rx="50%" ry="50%" fill="#3055E3" />
  </svg>
);

export const GrayEclipseSVG: React.FC<SizeProps> = ({
  cardwidth,
  cardheight,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={cardwidth || "247px"}
    height={cardheight || "77px"}
    viewBox="0 0 528 88"
    fill="none"
  >
    <ellipse opacity="0.8" cx="50%" cy="50%" rx="50%" ry="50%" fill="#727272" />
  </svg>
);

export const ModalGlassDiv = styled.div<SizeProps>`
  width: ${(props) => props.cardwidth || "420px"};
  height: ${(props) => props.cardheight || "600px"};
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background-color: rgba(137, 137, 137, 0.05);
  backdrop-filter: blur(75px);
  /* border: 1px solid rgba(255, 255, 255, 0.5);
  background: linear-gradient(
    86deg,
    rgba(255, 255, 255, 0.2) 11.14%,
    rgba(255, 255, 255, 0.04) 113.29%
  );
  box-shadow: 0px 1.197px 29.915px 0px rgba(69, 42, 124, 0.1);
  backdrop-filter: blur(35px); */

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
`;

export const RedLine = styled.hr<LineProps>`
  width: 1px;
  height: 20%;
  opacity: ${(props) => props.opacity || 0.6};
  border: 0;
  margin: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 15, 60, 0) 0%,
    rgba(255, 15, 60, 0.6) 50%,
    rgba(255, 15, 60, 0) 100%
  );
  position: absolute;
  top: ${(props) => props.offsetTop || "20%"}; /* 상단에서의 위치 */
  ${(props) =>
    props.position === "left"
      ? "left: 0;" /* 좌측 끝에 맞춤 */
      : "right: 0;"}/* 우측 끝에 맞춤 */
`;

export const RightRedEclipse = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="86"
    height="85"
    viewBox="0 0 86 85"
    fill="none"
  >
    <ellipse
      opacity="0.56"
      cx="65.5"
      cy="42.5"
      rx="65.5"
      ry="42.5"
      fill="#FF0F3C"
    />
  </svg>
);

export const LeftRedEclipse = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="83"
    height="85"
    viewBox="0 0 83 85"
    fill="none"
  >
    <ellipse
      opacity="0.56"
      cx="17.5"
      cy="42.5"
      rx="65.5"
      ry="42.5"
      fill="#FF0F3C"
    />
  </svg>
);
