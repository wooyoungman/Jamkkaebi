import {
  RightBottom,
  RightBottomDiv,
  RightTop,
  DriverText,
  RightBottomMain,
  RightBottomImage,
  RightBottomContent,
  RightBottomWeather,
} from "./DriverMainCSS";
import RestStoreInfo from "../RestStoreInfo";
import LocationIcon from "@/styles/driver/LocationIcon";
import restImg from "@/assets/restImg.png";
import styled from "styled-components";
import DriverMap from "../DriverMap";

const CustomRightBottomDiv = styled(RightBottomDiv)`
  padding: 20px;
  gap: 10px;
`;

const CustomDriverText = styled(DriverText)`
  text-align: start;
`;

const DriverMainRight: React.FC = () => {
  return (
    <>
      <RightTop>
        <DriverMap />
      </RightTop>
      <RightBottom>
        <CustomRightBottomDiv>
          <CustomDriverText fontSize="20px" fontWeight={700}>
            근처 휴게시설
          </CustomDriverText>
          <RightBottomMain>
            <RightBottomImage src={restImg} alt="Rest Image" />
            <RightBottomContent>
              <RestStoreInfo />
              <LocationIcon />
            </RightBottomContent>
          </RightBottomMain>
        </CustomRightBottomDiv>

        <RightBottomWeather />
      </RightBottom>
    </>
  );
};

export default DriverMainRight;
