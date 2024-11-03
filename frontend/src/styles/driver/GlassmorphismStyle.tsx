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

interface SizeProps {
  cardWidth?: string;
  cardHeight?: string;
  opacity?: number;
}

const Card = styled.div<SizeProps>`
  width: ${(props) => props.cardWidth || "420px"};
  height: ${(props) => props.cardHeight || "900px"};
  position: relative;
`;

const GrayTopLine = styled.hr<SizeProps>`
  width: ${(props) => props.cardWidth || "289px"};
  /* height: ${(props) => props.cardHeight || "1px"}; */
  opacity: ${(props) => props.opacity || 0.5};
  background-color: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  position: absolute;
  top: 0;
  left: 35px;
`;

const GrayBottomLine = styled.hr<SizeProps>`
  width: ${(props) => props.cardWidth || "289px"};
  /* height: ${(props) => props.cardHeight || "1px"}; */
  opacity: ${(props) => props.opacity || 0.5};
  background-color: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  position: absolute;
  bottom: 0;
  right: 25px;
`;

const BlueEclipseDiv = styled.div<SizeProps>`
  width: ${(props) => props.cardWidth || "247px"};
  height: ${(props) => props.cardHeight || "77px"};
  flex-shrink: 0;
  /* fill: #3055e3; */
  opacity: 0.6;
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
`;

const BlueEclipseSVG: React.FC<SizeProps> = ({ cardWidth, cardHeight }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={cardWidth || "247px"}
    height={cardHeight || "77px"}
    viewBox="0 0 247 77"
    fill="none"
  >
    <ellipse
      opacity="0.6"
      cx="123.5"
      cy="38.5"
      rx="123.5"
      ry="38.5"
      fill="#3055E3"
    />
  </svg>
);

const GrayEclipseDiv = styled.div<SizeProps>`
  width: ${(props) => props.cardWidth || "247px"};
  height: ${(props) => props.cardHeight || "77px"};
  flex-shrink: 0;
  /* fill: #727272; */
  opacity: 0.6;
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
`;

const GrayEclipseSVG: React.FC<SizeProps> = ({ cardWidth, cardHeight }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={cardWidth || "247px"}
    height={cardHeight || "77px"}
    viewBox="0 0 247 77"
    fill="none"
  >
    <ellipse
      opacity="0.6"
      cx="123.5"
      cy="38.5"
      rx="123.5"
      ry="38.5"
      fill="#727272"
    />
  </svg>
);

const ModalGlassDiv = styled.div`
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: rgba(137, 137, 137, 0.05);
  backdrop-filter: blur(75px);
`;

export const ReportModalGlassDiv = () => {
  return (
    <Card>
      <GrayTopLine cardWidth="197px" opacity={0.6} />
      <GrayEclipseDiv cardWidth="247px" cardHeight="77px">
        <GrayEclipseSVG cardWidth="247px" cardHeight="77px" />
      </GrayEclipseDiv>
      <BlueEclipseDiv cardWidth="247px" cardHeight="77px">
        <BlueEclipseSVG cardWidth="247px" cardHeight="77px" />
      </BlueEclipseDiv>
      <GrayBottomLine cardWidth="289px" opacity={0.6} />
      <ModalGlassDiv />
    </Card>
  );
};
