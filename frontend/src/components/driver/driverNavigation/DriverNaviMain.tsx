import DriverNaviLeft from "./DriverNaviLeft";
import { DriverNaviDiv} from "./DriverNaviCSS";
import DriverNaviRight from "./DriverNaviRight";

const DriverNaviMain: React.FC = () => {
  return (
    <>
      <DriverNaviDiv>
        <DriverNaviLeft />
        <DriverNaviRight />
      </DriverNaviDiv>
    </>
  );
};

export default DriverNaviMain;
