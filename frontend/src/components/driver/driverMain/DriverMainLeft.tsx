import {
  Left,
  DriverWrapper,
  DriverInfo,
  DriverImage,
  DriverTextDiv,
  InlineTextDiv,
  DriverText,
  DrivingInfo,
  DrivingTextDiv,
  ConditionGraphWrapper,
  ConditionGraphDiv,
} from "./DriverMainCSS";
import DriverConditionGraph from "./DriverConditionGraph";

import driverImg from "@/assets/driverImg.png";

const DriverMainLeft: React.FC = () => {
  return (
    <>
      <Left>
        <DriverWrapper>
          <DriverInfo>
            <DriverImage src={driverImg} alt="Driver Image" />
            <DriverTextDiv>
              <InlineTextDiv>
                <DriverText fontSize="27px">김싸피</DriverText>
                <DriverText fontSize="18px">님</DriverText>
              </InlineTextDiv>
              <DriverText fontSize="15px">오늘도 안전운행 하세요!</DriverText>
            </DriverTextDiv>
          </DriverInfo>
        </DriverWrapper>

        <DrivingInfo>
          <DrivingTextDiv>
            <DriverText fontSize="18px" fontWeight={500} color="#C4C4C4">
              Today's
            </DriverText>
            <InlineTextDiv gap="6px">
              <DriverText fontSize="30px" fontWeight={800}>
                204
              </DriverText>
              <DriverText fontSize="18px" fontWeight={400}>
                km
              </DriverText>
            </InlineTextDiv>
          </DrivingTextDiv>
          <DrivingTextDiv>
            <DriverText fontSize="18px" fontWeight={500} color="#C4C4C4">
              Next rest
            </DriverText>
            <InlineTextDiv gap="4px">
              <DriverText fontSize="30px" fontWeight={800}>
                1
              </DriverText>
              <DriverText fontSize="18px" fontWeight={400}>
                H
              </DriverText>
              <DriverText fontSize="28px" fontWeight={800}>
                25
              </DriverText>
              <DriverText fontSize="18px" fontWeight={400}>
                M
              </DriverText>
            </InlineTextDiv>
          </DrivingTextDiv>
        </DrivingInfo>
        <ConditionGraphWrapper>
          <ConditionGraphDiv>
            <DriverConditionGraph graphType="concentration" score={34} />
          </ConditionGraphDiv>
          <ConditionGraphDiv>
            <DriverConditionGraph graphType="drowsy" score={72} />
          </ConditionGraphDiv>
        </ConditionGraphWrapper>
      </Left>
    </>
  );
};

export default DriverMainLeft;
