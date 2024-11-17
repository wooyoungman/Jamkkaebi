import React from "react";
import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  driverStateDataAtom,
  initializeWebSocket,
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
import { vehicleIdAtom } from "@/atoms/driver/carInfo";

const DriverLayout: React.FC = () => {
  const [vehicleId] = useAtom(vehicleIdAtom);
  const setDriverStateData = useSetAtom(driverStateDataAtom); // Jotai Atom 업데이트 함수 가져오기

  useEffect(() => {
    if (vehicleId) {
      // WebSocket 초기화
      const socket = initializeWebSocket(setDriverStateData);

      // 컴포넌트 언마운트 시 WebSocket 연결 닫기
      return () => {
        socket.close();
      };
    }
  }, [setDriverStateData, vehicleId]);

  // 차량 ID가 없으면 DriverLogin 렌더링
  if (!vehicleId) {
    return <DriverLogin />;
  }

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
