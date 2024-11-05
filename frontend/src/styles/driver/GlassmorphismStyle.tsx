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
  cardWidth?: string;
  cardHeight?: string;
  opacity?: number;
}

export interface LineProps extends SizeProps {
  position?: "top" | "bottom";
  offsetLeft?: string;
  offsetRight?: string;
  centered?: boolean;
}

export interface EclipseDivProps extends SizeProps {
  top?: string;
  bottom?: string;
}

export const Card = styled.div<SizeProps>`
  width: ${(props) => props.cardWidth || "420px"};
  min-width: 650px;
  height: ${(props) => props.cardHeight || "600px"};
  position: relative;
  border-radius: 30px;
`;

export const GrayLine = styled.hr<LineProps>`
  width: ${(props) => props.cardWidth || "289px"};
  opacity: ${(props) => props.opacity || 0.6};
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
        ${props.offsetLeft ? `left: ${props.offsetLeft};` : ""}
        ${props.offsetRight ? `right: ${props.offsetRight};` : ""}
      `}
  margin: 0;
`;

export const EclipseDiv = styled.div<EclipseDivProps>`
  width: ${(props) => props.cardWidth || "247px"};
  height: ${(props) => props.cardHeight || "77px"};
  flex-shrink: 0;
  opacity: 0.6;
  position: absolute;
  ${(props) => (props.top ? `top: ${props.top};` : "")}
  ${(props) => (props.bottom ? `bottom: ${props.bottom};` : "")}

  left: 50%;
  transform: translateX(-50%);
`;

export const BlueEclipseSVG: React.FC<SizeProps> = ({
  cardWidth,
  cardHeight,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={cardWidth || "247px"}
    height={cardHeight || "77px"}
    viewBox="0 0 528 88"
    fill="none"
  >
    <ellipse opacity="0.6" cx="50%" cy="50%" rx="50%" ry="50%" fill="#3055E3" />
  </svg>
);

export const GrayEclipseSVG: React.FC<SizeProps> = ({
  cardWidth,
  cardHeight,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={cardWidth || "247px"}
    height={cardHeight || "77px"}
    viewBox="0 0 528 88"
    fill="none"
  >
    <ellipse opacity="0.6" cx="50%" cy="50%" rx="50%" ry="50%" fill="#727272" />
  </svg>
);

export const ModalGlassDiv = styled.div<SizeProps>`
  width: ${(props) => props.cardWidth || "420px"};
  height: ${(props) => props.cardHeight || "600px"};
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: rgba(137, 137, 137, 0.05);
  backdrop-filter: blur(75px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
`;

// export const ReportModalGlassDiv: React.FC = () => {
//   return (
//     <Card>
//       <GrayLine
//         cardWidth="197px"
//         opacity={0.6}
//         position="top"
//         offsetLeft="35px"
//       />
//       <EclipseDiv cardWidth="247px" cardHeight="77px" top="5px">
//         <GrayEclipseSVG cardWidth="247px" cardHeight="77px" />
//       </EclipseDiv>
//       <EclipseDiv cardWidth="247px" cardHeight="77px" bottom="15px">
//         <BlueEclipseSVG cardWidth="247px" cardHeight="77px" />
//       </EclipseDiv>
//       <GrayLine
//         cardWidth="289px"
//         opacity={0.6}
//         position="bottom"
//         offsetRight="25px"
//       />
//       <ModalGlassDiv />
//     </Card>
//   );
// };

// export default ReportModalGlassDiv;
