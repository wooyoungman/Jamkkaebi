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
} from "@/styles/driver/driverMain/DriverMainCSS";
import DriverImg from "@/assets/driver/DriverImg.png";

const DriverMainLeft: React.FC = () => {
  return (
    <>
      <Left>
        <DriverWrapper>
          <DriverInfo>
            <DriverImage src={DriverImg} alt="Driver Image" />
            <DriverTextDiv>
              <InlineTextDiv>
                <DriverText>김싸피</DriverText>
                <DriverText fontSize="15px">님</DriverText>
              </InlineTextDiv>
              <DriverText fontSize="13px">오늘도 안전운행 하세요!</DriverText>
            </DriverTextDiv>
          </DriverInfo>
        </DriverWrapper>

        <DrivingInfo>
          <DrivingTextDiv>
            <DriverText fontSize="15px" fontWeight={500} color="#C4C4C4">
              Today's
            </DriverText>
            <InlineTextDiv gap="6px">
              <DriverText fontSize="28px" fontWeight={800}>
                204
              </DriverText>
              <DriverText fontSize="15px" fontWeight={400}>
                km
              </DriverText>
            </InlineTextDiv>
          </DrivingTextDiv>
          <DrivingTextDiv>
            <DriverText fontSize="15px" fontWeight={500} color="#C4C4C4">
              Next rest
            </DriverText>
            <InlineTextDiv gap="4px">
              <DriverText fontSize="28px" fontWeight={800}>
                1
              </DriverText>
              <DriverText fontSize="15px" fontWeight={400}>
                H
              </DriverText>
              <DriverText fontSize="28px" fontWeight={800}>
                25
              </DriverText>
              <DriverText fontSize="15px" fontWeight={400}>
                M
              </DriverText>
            </InlineTextDiv>
          </DrivingTextDiv>
        </DrivingInfo>
      </Left>
    </>
  );
};

export default DriverMainLeft;
