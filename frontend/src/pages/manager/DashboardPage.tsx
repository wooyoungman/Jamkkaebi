import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";

import MapContainer from "@components/manager/MapContainer";
import DriverMarker from "@components/manager/DriverMarker";
import RoutePolyline from "@components/manager/RoutePolyline";
import DriverInfoModal from "@components/manager/DriverInfoModal";
import AlertModal from "@components/manager/AlertModal";

// API 응답 타입
interface Driver {
  id: string;
  name: string;
  vehicleNumber: string;
  status: string;
  location: {
    lat: number;
    lng: number;
  };
  lastLocation: string; // 실시간 위치 추적을 위해 필요
  route: Array<{
    lat: number;
    lng: number;
  }>;
  sleepEvents: number;
  lastUpdate: string;
}

const DashboardPage = () => {
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [showDriverInfo, setShowDriverInfo] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    driverName: "",
    eventTime: "",
    eventLocation: "",
  });

  // 운전자 데이터 조회
  const { data: drivers = [] } = useQuery<Driver[]>({
    queryKey: ["drivers"],
    queryFn: async () => {
      // TODO: API 호출
      return [];
    },
  });

  // 졸음운전 이벤트 실시간 구독
  useEffect(() => {
    // WebSocket 연결 시 졸음 이벤트 발생하면 AlertModal 표시
    const handleSleepEvent = (event: any) => {
      setAlertInfo({
        driverName: event.driverName,
        eventTime: event.time,
        eventLocation: event.location,
      });
      setShowAlert(true);
    };

    // TODO: WebSocket으로 실시간 위치 업데이트도 처리

    return () => {
      // WebSocket 연결 해제
    };
  }, []);

  return (
    <DashboardPage.Container>
      <DashboardPage.MapSection>
        <MapContainer
          width="100%"
          height="100%"
          initialCenter={{ lat: 37.5666805, lng: 126.9784147 }}
        >
          {/* 운전자 마커들 */}
          {drivers.map((driver) => (
            <DriverMarker
              key={driver.id}
              position={driver.location}
              driverId={driver.id}
              onClick={() => {
                setSelectedDriver(driver.id);
                setShowDriverInfo(true);
              }}
            />
          ))}
          {/* 선택된 운전자의 경로 */}
          {selectedDriver && (
            <RoutePolyline
              path={drivers.find((d) => d.id === selectedDriver)?.route || []}
              color="#4A90E2"
              width={3}
            />
          )}
        </MapContainer>

        {/* 선택된 운전자 정보 카드 (맵 위에 오버레이) */}
        {showDriverInfo && selectedDriver && (
          <DashboardPage.DriverOverlay>
            <DriverInfoModal
              isOpen={showDriverInfo}
              onClose={() => setShowDriverInfo(false)}
              driver={drivers.find((d) => d.id === selectedDriver)!}
            />
          </DashboardPage.DriverOverlay>
        )}
      </DashboardPage.MapSection>

      {/* 졸음 이벤트 발생 시 나타나는 알림 모달 */}
      <AlertModal
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        {...alertInfo}
      />
    </DashboardPage.Container>
  );
};

// 스타일 컴포넌트
DashboardPage.Container = styled.div`
  position: relative;
  height: 100vh;
  margin: 10px;
  border-radius: 16px;
`;

DashboardPage.MapSection = styled.div`
  width: 100%;
  height: 100vh;
  border-radius: 16px;
`;

DashboardPage.DriverOverlay = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
`;

export default DashboardPage;
