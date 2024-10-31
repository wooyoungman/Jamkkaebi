import styled from "styled-components";
import { NaviLeftDiv } from "./DriverNaviCSS";
import {
  DriverText,
  RestStoreInfoBody,
  RestStoreLeftDiv,
  RestStoreRightDiv,
  RestStoreList,
  HRLine,
} from "./DriverNaviCSS";
import RestStoreInfo from "../RestStoreInfo";
import LocationIcon from "@/styles/driver/LocationIcon";

const CustomDriverText = styled(DriverText)`
  text-align: start;
`;

const DriverNaviLeft: React.FC = () => {
  return (
    <>
      <NaviLeftDiv>
        <CustomDriverText fontSize="23px" fontWeight={700}>
          근처 휴게시설
        </CustomDriverText>

        <RestStoreList>
          <RestStoreInfoBody>
            <RestStoreLeftDiv>
              <RestStoreInfo />
            </RestStoreLeftDiv>
            <RestStoreRightDiv>
              <LocationIcon />
            </RestStoreRightDiv>
          </RestStoreInfoBody>
          <HRLine />
        </RestStoreList>
      </NaviLeftDiv>
    </>
  );
};

export default DriverNaviLeft;
