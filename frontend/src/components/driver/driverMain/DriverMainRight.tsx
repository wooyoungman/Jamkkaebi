import {
  RightBottom,
  RightBottomDiv,
  RightTop,
  DriverText,
  RightBottomMain,
  RightBottomImage,
  RightBottomContent,
  InlineTextDiv,
  RightBottomWeather
} from "@/styles/driver/driverMain/DriverMainCSS";
import LocationIcon from "@/styles/driver/LocationIcon";
import RestImg from "@/assets/driver/RestImg.png";
import styled from "styled-components";

const CustomRightBottomDiv = styled(RightBottomDiv)`
  padding: 20px;
  gap: 10px;
`;

const CustomDriverText = styled(DriverText)`
  text-align: start;
`;

const TextGapDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DriverMainRight: React.FC = () => {
  return (
    <>
      <RightTop />
      <RightBottom>
        <CustomRightBottomDiv>
          <CustomDriverText fontSize="23px" fontWeight={700}>
            근처 휴게시설
          </CustomDriverText>
          <RightBottomMain>
            <RightBottomImage src={RestImg} alt="Rest Image" />
            <RightBottomContent>
              <CustomDriverText fontSize="15px" fontWeight={600}>
                원지 휴게소
              </CustomDriverText>
              <TextGapDiv>
                <InlineTextDiv>
                  <CustomDriverText fontSize="11px" fontWeight={600}>
                    970m
                  </CustomDriverText>
                  <CustomDriverText
                    color="#e0e0e0"
                    fontSize="11px"
                    fontWeight={500}
                  >
                    · 휴게소, 하남대로 154
                  </CustomDriverText>
                </InlineTextDiv>

                <InlineTextDiv>
                  <CustomDriverText
                    color="#46E900"
                    fontSize="11px"
                    fontWeight={500}
                  >
                    영업 중
                  </CustomDriverText>
                  <CustomDriverText
                    color="#e0e0e0"
                    fontSize="11px"
                    fontWeight={500}
                  >
                    · 24시간 영업
                  </CustomDriverText>
                </InlineTextDiv>
              </TextGapDiv>
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
