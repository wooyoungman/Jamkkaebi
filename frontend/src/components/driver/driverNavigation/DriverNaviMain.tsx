import DriverNaviLeft from "./DriverNaviLeft";
import { DriverNaviDiv, NavigationBody } from "./DriverNaviCSS";
import DriverNaviRight from "./DriverNaviRight";

const DriverNaviMain: React.FC = () => {
  return (
    <>
      <DriverNaviDiv>
        <DriverNaviLeft />
        <DriverNaviRight />
        {/* <NavigationBody /> */}
      </DriverNaviDiv>
    </>
  );
};

export default DriverNaviMain;
