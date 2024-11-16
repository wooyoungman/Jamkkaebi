import styled from "styled-components";
import { DriverText } from "@/components/driver/driverMain/DriverMainCSS";

const GoodDrivingTag = styled.div`
  /* width: 55px; */
  /* height: 18px; */
  padding: 3px 4px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #cfffc7;
  border-radius: 4px;
`;

export const GoodDrivingBadge = () => {
  return (
    <GoodDrivingTag>
      <DriverText color="#10A957" fontSize="14px" fontWeight={400}>
        정상 운행
      </DriverText>
    </GoodDrivingTag>
  );
};

interface BadDrivingProps {
  drowsy: number;
  focusLoss: number;
}

const BadDrivingTag = styled.div`
  /* height: 16px; */
  padding: 4px 4px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff0f0;
  border-radius: 4px;
`;

export const BadDrivingBadge: React.FC<BadDrivingProps> = ({
  drowsy,
  focusLoss,
}) => {
  return (
    <>
      {drowsy > 0 && (
        <BadDrivingTag>
          <DriverText color="#FF5E5E" fontSize="14px" fontWeight={400}>
            졸음 {drowsy}회
          </DriverText>
        </BadDrivingTag>
      )}
      {focusLoss > 0 && (
        <BadDrivingTag>
          <DriverText color="#FF5E5E" fontSize="14px" fontWeight={400}>
            집중 저하 {focusLoss}회
          </DriverText>
        </BadDrivingTag>
      )}
    </>
  );
};
