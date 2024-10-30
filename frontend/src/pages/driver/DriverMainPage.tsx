import styled from "styled-components";
import { GlassDiv } from "@/components/driver/GlassmorphismStyle";

const Left = styled(GlassDiv)`
  width: 430px;
  height: 600px;
  flex-shrink: 0;
`;

const DriverMainPage: React.FC = () => {
  return (
    <>
      <Left />
    </>
  );
};

export default DriverMainPage;
