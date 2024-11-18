import React, { useRef } from "react";
import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  driverStateDataAtom,
  initializeWebSocket,
  serverDriverStateDataAtom,
  initializeServerWebSocket,
  isFastAPISuccessAtom,
  startPointAtom,
} from "@/atoms/driver/socket";
import DrivingWarningModal from "./DrivingWarningModal";
import DriverLogin from "./DriverLogin";

import { Outlet } from "react-router-dom";
import {
  DriverBackground,
  DriverContainer,
} from "../../styles/driver/DriverBackground";
import Header, { Body } from "./DriverStructure";
import Footer from "./Footer";
import { vehicleIdAtom, memberIdAtom } from "@/atoms/driver/carInfo";

const DriverLayout: React.FC = () => {
  const [vehicleId] = useAtom(vehicleIdAtom);
  const [memberId] = useAtom(memberIdAtom);
  const setDriverStateData = useSetAtom(driverStateDataAtom); // Jotai Atom 업데이트 함수 가져오기
  const setServerDriverStateData = useSetAtom(serverDriverStateDataAtom);
  const setIsFastAPISuccess = useSetAtom(isFastAPISuccessAtom);
  const setStartPoint = useSetAtom(startPointAtom);

  // WebSocket 인스턴스를 추적 (중복 방지)
  const fastAPISocketRef = useRef<WebSocket | null>(null);
  const serverSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (vehicleId) {
      // WebSocket 초기화
      const socket = initializeWebSocket(
        setDriverStateData,
        setIsFastAPISuccess
      );
      fastAPISocketRef.current = socket;

      // 컴포넌트 언마운트 시 WebSocket 연결 닫기
      return () => {
        if (fastAPISocketRef.current) {
          fastAPISocketRef.current.close();
          fastAPISocketRef.current = null;
        }
      };
    }
  }, [setDriverStateData, setIsFastAPISuccess, vehicleId]);

  // Spring WebSocket 초기화
  useEffect(() => {
    if (vehicleId && memberId) {
      const serverSocket = initializeServerWebSocket(
        setServerDriverStateData,
        setStartPoint,
        memberId
      );
      serverSocketRef.current = serverSocket;

      // 컴포넌트 언마운트 시 Spring WebSocket 연결 닫기
      return () => {
        if (serverSocketRef.current) {
          serverSocketRef.current.close();
          serverSocketRef.current = null;
        }
      };
    }
  }, [setServerDriverStateData, vehicleId, memberId]);

  // // 차량 ID가 없으면 DriverLogin 렌더링
  // if (!vehicleId) {
  //   return <DriverLogin />;
  // }

  return (
    <DriverContainer>
      {/* <DriverLogin /> */}
      <DriverBackground>
        <DrivingWarningModal />
        <Header />
        <Body>
          <Outlet />
        </Body>
        <Footer />
      </DriverBackground>
    </DriverContainer>
  );
};

export default DriverLayout;
