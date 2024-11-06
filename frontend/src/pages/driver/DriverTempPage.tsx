import { Body } from "@/components/driver/DriverStructure";
import styled from "styled-components";
import {
  Card,
  GrayLine,
  EclipseDiv,
  GrayEclipseSVG,
  BlueEclipseSVG,
  ModalGlassDiv,
} from "@/styles/driver/GlassmorphismStyle";
const CustomBody = styled(Body)`
  gap: 20px;
`;

const DriverTempPage: React.FC = () => {
  return (
    <>
      <CustomBody>
        <Card cardwidth="800px" cardheight="630px">
          <GrayLine
            cardwidth="56%"
            opacity={0.6}
            position="top"
            offsetleft="7%"
          />
          <EclipseDiv cardwidth="66%" cardheight="14%" top="1%">
            <GrayEclipseSVG cardwidth="100%" cardheight="100%" />
          </EclipseDiv>
          <EclipseDiv cardwidth="66%" cardheight="14%" bottom="1%">
            <BlueEclipseSVG cardwidth="100%" cardheight="100%" />
          </EclipseDiv>
          <GrayLine
            cardwidth="289px"
            opacity={0.6}
            position="bottom"
            centered={true}
          />
          <ModalGlassDiv
            onClick={(e) => e.stopPropagation()}
            cardwidth="100%"
            cardheight="100%"
          ></ModalGlassDiv>
        </Card>
      </CustomBody>
    </>
  );
};

export default DriverTempPage;
