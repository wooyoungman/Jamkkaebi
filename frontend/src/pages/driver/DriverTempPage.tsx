import { Body } from "@/components/driver/DriverStructure";
import styled from "styled-components";
// import { ReportModalGlassDiv } from "@/styles/driver/GlassmorphismStyle";
const CustomBody = styled(Body)`
  gap: 20px;
`;

const DriverTempPage: React.FC = () => {
  return (
    <>
      <CustomBody>{/* <ReportModalGlassDiv /> */}</CustomBody>
    </>
  );
};

export default DriverTempPage;
