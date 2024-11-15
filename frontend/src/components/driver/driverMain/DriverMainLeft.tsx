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
import {
  driverStateDataAtom,
  secondDriverStateDataAtom,
} from "@/atoms/driver/socket";
import { useEffect } from "react";

const DriverMainLeft: React.FC = () => {
  const [driverStateData, setDriverStateData] = useAtom(driverStateDataAtom);
  // const [secondDriverStateData, setSecondDriverStateData] = useAtom(secondDriverStateDataAtom);

  useEffect(() => {
    // WebSocket 연결 설정
    const socket = new WebSocket("wss://k11c106.p.ssafy.io/fastapi/ws");

    // WebSocket 연결 성공 시
    socket.onopen = () => {
      console.log("WebSocket connected opened");
    };

    // WebSocket 메시지 수신 시
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // 수신한 데이터 콘솔에 출력
      // console.log("Data received from WebSocket:", data);

      // Jotai atom에 데이터 저장
      setDriverStateData(data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // 컴포넌트 언마운트 시 Websocket 닫기
    return () => {
      socket.close();
    };
  }, [setDriverStateData]);

  // useEffect(() => {
  //   const socket2 = new WebSocket("wss://k11c106.p.ssafy.io/ws/v1/device/data");

  //   socket2.onopen = () => {
  //     console.log("WebSocket 2 connected opened")
  //   }

  //   socket2.onmessage = (event) => {
  //     const data = JSON.parse(event.data)
  //     console.log("Data received from WebSocket 2:", data);
  //     setSecondDriverStateData(data)
  //   }

  //   socket2.onerror = (error) => {
  //     console.error("WebSocket 2 error: ", error)
  //   }

  //   socket2.onclose = () => {
  //     console.log("WebSocket 2 connection closed")
  //   }

  //   return () => {
  //     socket2.close()
  //   }
  // }, [setSecondDriverStateData])

  // Jotai에 저장된 데이터를 확인
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
