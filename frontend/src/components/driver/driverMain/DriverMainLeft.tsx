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
import { driverStateDataAtom } from "@/atoms/driver/socket";
import { useEffect, useState } from "react";

const DriverMainLeft: React.FC = () => {
  const [driverStateData, setDriverStateData] = useAtom(driverStateDataAtom);
  const [attentionScore, setAttentionScore] = useState<number>(0);
  const [meditationScore, setMeditationScore] = useState<number>(0);

  useEffect(() => {
    // WebSocket 연결 설정
    const socket = new WebSocket("wss://k11c106.p.ssafy.io/fastapi/ws");

    // WebSocket 연결 성공 시
    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    // WebSocket 메시지 수신 시
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // attention과 meditation 값 추출
      const attention = Math.round(data.predictions?.attention || 0);
      const meditation = Math.round(data.predictions?.meditation || 0);

      // Jotai atom에 데이터 저장
      setDriverStateData(data);

      // 상태 값 업데이트
      setAttentionScore(attention);
      setMeditationScore(meditation);
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
            <DriverConditionGraph
              graphType="concentration"
              score={attentionScore}
            />
          </ConditionGraphDiv>
          <ConditionGraphDiv>
            <DriverConditionGraph graphType="drowsy" score={meditationScore} />
          </ConditionGraphDiv>
        </ConditionGraphWrapper>
      </Left>
    </>
  );
};

export default DriverMainLeft;
