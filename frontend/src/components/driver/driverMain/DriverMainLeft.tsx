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

import { useAtom } from "jotai";
import { driverStateDataAtom } from "@/atoms/driver/socket"; // atoms.ts 경로에 맞게 수정하세요
import { useEffect } from "react";

const DriverMainLeft: React.FC = () => {
  // Jotai에서 WebSocket 데이터를 관리
  const [driverStateData, setDriverStateData] = useAtom(driverStateDataAtom);

  useEffect(() => {
    // WebSocket 연결 설정
    const socket = new WebSocket("wss://k11c106.p.ssafy.io/fastapi/ws");

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // WebSocket에서 받은 데이터를 Jotai atom에 저장
      setDriverStateData(data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // 컴포넌트 언마운트 시 WebSocket 닫기
    return () => {
      socket.close();
    };
  }, [setDriverStateData]);

  // Jotai에서 attention과 meditation 값 가져오기
  const attentionScore = Math.round(
    driverStateData?.predictions?.attention || 0
  );
  const meditationScore = Math.round(
    driverStateData?.predictions?.meditation || 0
  );

  useEffect(() => {
    console.log("Current driverStateData in Jotai:", driverStateData);
  }, [driverStateData]);

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
