import styled from "styled-components";

import {
  DriverText,
  TextGapDiv,
  RestStoreContent,
  InlineTextDiv,
} from "./driverNavigation/DriverNaviCSS";

const CustomDriverText = styled(DriverText)`
  text-align: start;
`;

const RestStoreInfo: React.FC = () => {
  return (
    <>
      <RestStoreContent>
        <CustomDriverText fontSize="15px" fontWeight={600}>
          원지 휴게소
        </CustomDriverText>
        <TextGapDiv>
          <InlineTextDiv>
            <CustomDriverText fontSize="11px" fontWeight={600}>
              970m
            </CustomDriverText>
            <CustomDriverText color="#e0e0e0" fontSize="11px" fontWeight={500}>
              · 휴게소, 하남대로 154
            </CustomDriverText>
          </InlineTextDiv>

          <InlineTextDiv>
            <CustomDriverText color="#46E900" fontSize="11px" fontWeight={500}>
              영업 중
            </CustomDriverText>
            <CustomDriverText color="#e0e0e0" fontSize="11px" fontWeight={500}>
              · 24시간 영업
            </CustomDriverText>
          </InlineTextDiv>
        </TextGapDiv>
      </RestStoreContent>
    </>
  );
};

export default RestStoreInfo;
