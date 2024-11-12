import React from "react";
// import OffBulbIcon from "@styles/driver/driverCar/OffBulbRenewal.svg?react";
// import OffBulbIconV2 from "@styles/driver/driverCar/OffBulbV2.svg?react";
import OnBulbIconV1 from "@styles/driver/driverCar/OnBulbV1.svg?react";
import OffBulbIcon from "@styles/driver/driverCar/OffBulbV3.svg?react";
import bulbTailImg from "@assets/bulbTail.png";
import styled from "styled-components";

const BulbContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
// 스타일 컴포넌트 정의
const StyledBulbTail = styled.img`
  width: 75px;
  height: 80px;
`;

const OffBulbSVG: React.FC = () => {
  // return <OffBulbIconV2 />;
  return (
    <BulbContainer>
      <StyledBulbTail src={bulbTailImg} />
      <OffBulbIcon />
      {/* <OnBulbIconV1 /> */}
    </BulbContainer>
  );
};

export default OffBulbSVG;
