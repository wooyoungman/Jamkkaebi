import { Body } from "@/components/driver/DriverStructure";
import DriverMainLeft from "@/components/driver/driverMain/DriverMainLeft";
import DriverCarRight from "@/components/driver/driverCarControl/DriverCarRight";

const DriverCarPage: React.FC = () => {
  return (
    <>
      <Body>
        <DriverMainLeft />
        <DriverCarRight />
      </Body>
    </>
  );
};
export default DriverCarPage;
