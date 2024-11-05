import { NavigationBody, NaviRightDiv } from "./DriverNaviCSS";
import DriverMap from "../driverMap";

const DriverNaviRight: React.FC = () => {
  return (
    <>
      <NaviRightDiv>
        {/* <NavigationBody /> */}
        <DriverMap />
      </NaviRightDiv>
    </>
  );
};

export default DriverNaviRight;
