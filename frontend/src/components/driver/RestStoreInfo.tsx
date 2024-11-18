import styled from "styled-components";

import {
  DriverText,
  TextGapDiv,
  RestStoreContent,
  InlineTextDiv,
} from "./driverNavigation/DriverNaviCSS";
import { useEffect, useState } from "react";

const CustomDriverText = styled(DriverText)`
  text-align: start;
`;

const INITIAL_DISTANCE = 11;

const RestStoreInfo: React.FC = () => {
  const [distance, setDistance] = useState(INITIAL_DISTANCE); // 거리 상태

  useEffect(() => {
    // 1분마다 distance 감소
    const interval = setInterval(() => {
      setDistance((prev) => (prev <= 0 ? INITIAL_DISTANCE : prev - 1)); // 0 미만이면 초기화
    }, 60000); // 1분 = 60,000ms

    return () => clearInterval(interval); // 타이머 정리
  }, []);

  return (
    <>
      <RestStoreContent>
        <CustomDriverText fontSize="18px" fontWeight={600}>
          원지 휴게소
        </CustomDriverText>
        <TextGapDiv>
          <InlineTextDiv>
            <CustomDriverText fontSize="13px" fontWeight={600}>
              {distance}km
            </CustomDriverText>
            <CustomDriverText color="#e0e0e0" fontSize="13px" fontWeight={500}>
              · 휴게소, 영남대로 154
            </CustomDriverText>
          </InlineTextDiv>

          <InlineTextDiv>
            <CustomDriverText color="#46E900" fontSize="13px" fontWeight={500}>
              영업 중
            </CustomDriverText>
            <CustomDriverText color="#e0e0e0" fontSize="13px" fontWeight={500}>
              · 24시간 영업
            </CustomDriverText>
          </InlineTextDiv>
        </TextGapDiv>
      </RestStoreContent>
    </>
  );
};

export default RestStoreInfo;
