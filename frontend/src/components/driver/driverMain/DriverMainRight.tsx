import {
  RightBottom,
  RightBottomDiv,
  RightTop,
  DriverText,
  RightBottomMain,
  RightBottomImage,
  RightBottomContent,
  RightBottomWeather,
  WeatherInfoDiv,
  InlineTextDiv,
} from "./DriverMainCSS";
import RestStoreInfo from "../RestStoreInfo";
import LocationIcon from "@/styles/driver/LocationIcon";
import restImg from "@/assets/restImg.png";
import styled from "styled-components";
import DriverMap from "../DriverMap";
import {
  CloudSVG,
  LocationSVG,
} from "@/styles/driver/driverMain/DriverWeatherSVG";
import { HRLine } from "../driverReport/DriverReportCSS";

const CustomHRLine = styled(HRLine)`
  height: 12px;
`;

const CustomInlineTextDiv = styled(InlineTextDiv)`
  align-items: center;
`;

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
          <CustomDriverText fontSize="22px" fontWeight={700}>
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

        <RightBottomWeather>
          <WeatherInfoDiv>
            <CustomInlineTextDiv>
              <LocationSVG />
              <CustomDriverText fontSize="17px" fontWeight={500}>
                광주광역시
              </CustomDriverText>
            </CustomInlineTextDiv>
            <CustomDriverText fontSize="30px" fontWeight={500}>
              구름 많음
            </CustomDriverText>
            <CustomDriverText fontSize="40px" fontWeight={600}>
              8°C
            </CustomDriverText>
            <CustomInlineTextDiv gap="7px">
              <CustomDriverText fontSize="13px" fontWeight={400}>
                TuesDay
              </CustomDriverText>
              <CustomHRLine />
              <CustomDriverText fontSize="13px" fontWeight={400}>
                18 Nov 2024
              </CustomDriverText>
            </CustomInlineTextDiv>
          </WeatherInfoDiv>
          <CloudSVG />
        </RightBottomWeather>
      </RightBottom>
    </>
  );
};

export default DriverMainRight;
