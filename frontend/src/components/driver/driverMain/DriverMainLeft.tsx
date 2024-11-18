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
import { useState, useEffect } from "react";
import { userInfoAtom } from "@/atoms/driver/carInfo";

import driverImg from "@/assets/driverImg.png";

import { useAtom } from "jotai";
import {
  driverStateDataAtom,
  isFastAPISuccessAtom,
  serverDriverStateDataAtom,
} from "@/atoms/driver/socket"; // atoms.ts 경로에 맞게 수정하세요

// 초기값 설정
const INITIAL_DISTANCE = 204;
const INITIAL_MINUTES = 27;

const DriverMainLeft: React.FC = () => {
  // Jotai에서 WebSocket 데이터를 관리
  const [driverStateData] = useAtom(driverStateDataAtom);
  const [serverDriverStateData] = useAtom(serverDriverStateDataAtom);
  const [isFastAPISuccess] = useAtom(isFastAPISuccessAtom);
  const [userInfo] = useAtom(userInfoAtom);

  const [distance, setDistance] = useState(INITIAL_DISTANCE); // 거리 상태 관리
  const [minutes, setMinutes] = useState(INITIAL_MINUTES); // 분 상태

  useEffect(() => {
    // 1분마다 distance 증가
    const distanceInterval = setInterval(() => {
      setDistance((prev) => prev + 1); // 1분마다 거리 증가
    }, 60000); // 1분 = 60,000ms

    return () => clearInterval(distanceInterval); // 타이머 정리
  }, []);

  useEffect(() => {
    // 1분마다 minutes 감소
    const minutesInterval = setInterval(() => {
      setMinutes((prev) => (prev <= 0 ? INITIAL_MINUTES : prev - 1)); // 0이면 초기값으로
    }, 60000); // 1분 = 60,000ms

    return () => clearInterval(minutesInterval); // 타이머 정리
  }, []);

  // 현재 사용할 데이터 결정
  const activeData = isFastAPISuccess ? driverStateData : serverDriverStateData;

  // Jotai에서 attention과 meditation 값 가져오기
  const attentionScore = Math.round(activeData?.predictions?.attention || 0);
  const meditationScore = Math.round(activeData?.predictions?.meditation || 0);

  // // 현재 활성화된 데이터만 console에 출력
  // useEffect(() => {
  //   if (isFastAPISuccess) {
  //     console.log("Active Data (FastAPI):", driverStateData);
  //   } else {
  //     console.log("Active Data (Spring Server):", serverDriverStateData);
  //   }
  // }, [isFastAPISuccess, driverStateData, serverDriverStateData]);

  return (
    <>
      <Left>
        <DriverWrapper>
          <DriverInfo>
            <DriverImage src={driverImg} alt="Driver Image" />
            <DriverTextDiv>
              <InlineTextDiv>
                <DriverText fontSize="27px">{userInfo.memberName}</DriverText>
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
                {distance}
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
                {minutes}
              </DriverText>
              <DriverText fontSize="18px" fontWeight={400}>
                M
              </DriverText>
            </InlineTextDiv>
          </DrivingTextDiv>
        </DrivingInfo>
        <ConditionGraphWrapper>
          <ConditionGraphDiv>
            {/* 집중 지수 그래프 */}
            <DriverConditionGraph
              graphType="concentration"
              score={attentionScore}
            />
          </ConditionGraphDiv>
          <ConditionGraphDiv>
            {/* 졸음 지수 그래프 */}
            <DriverConditionGraph graphType="drowsy" score={meditationScore} />
          </ConditionGraphDiv>
        </ConditionGraphWrapper>
      </Left>
    </>
  );
};

export default DriverMainLeft;
