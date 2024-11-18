// import { useAtom } from "jotai";
// import { mapInstanceAtom, polylineAtom } from "@/atoms/driver/mapStore";
import { NaviRightDiv } from "./DriverNaviCSS";
import DriverMap from "../DriverMap";

const DriverNaviRight: React.FC = () => {
  // const [mapInstance] = useAtom(mapInstanceAtom);
  // const [polyline] = useAtom(polylineAtom);

  return (
    <>
      <NaviRightDiv>
        {/* {mapInstance ? <DriverMap /> : <p>Loading map...</p>} */}
        <DriverMap />
      </NaviRightDiv>
    </>
  );
};

export default DriverNaviRight;
