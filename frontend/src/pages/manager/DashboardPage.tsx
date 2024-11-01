import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";

import MapContainer from "@components/manager/MapContainer";
import DriverMarker from "@components/manager/DriverMarker";
import RoutePolyline from "@components/manager/RoutePolyline";
import DriverInfoModal from "@components/manager/DriverInfoModal";
import AlertModal from "@components/manager/AlertModal";
import DriverDetailCard from "@components/manager/DriverDetailCard";

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
    // TODO: WebSocket 연결 및 이벤트 구독
    const handleSleepEvent = (event: any) => {
      setAlertInfo({
        driverName: event.driverName,
        eventTime: event.time,
        eventLocation: event.location,
      });
      setShowAlert(true);
    };

    return () => {
      // WebSocket 연결 해제
    };
  }, []);

  return (
    <DashboardPage.Container>
      <DashboardPage.Sidebar>
        <h2>실시간 차량 현황</h2>
        <DashboardPage.DriverList>
          {drivers.map((driver) => (
            <DriverDetailCard
              key={driver.id}
              driver={driver}
              onClick={() => setSelectedDriver(driver.id)}
              isSelected={selectedDriver === driver.id}
            />
          ))}
        </DashboardPage.DriverList>
      </DashboardPage.Sidebar>

      <DashboardPage.MapSection>
        <MapContainer
          width="100%"
          height="100%"
          initialCenter={{ lat: 37.5666805, lng: 126.9784147 }}
        >
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
          {selectedDriver && (
            <RoutePolyline
              path={drivers.find((d) => d.id === selectedDriver)?.route || []}
              color="#4A90E2"
              width={3}
            />
          )}
        </MapContainer>
      </DashboardPage.MapSection>

      {/* 모달 */}
      {showDriverInfo && selectedDriver && (
        <DriverInfoModal
          isOpen={showDriverInfo}
          onClose={() => setShowDriverInfo(false)}
          driver={drivers.find((d) => d.id === selectedDriver)!}
        />
      )}

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
  display: flex;
  height: 100vh;
`;

DashboardPage.Sidebar = styled.div`
  width: 400px;
  padding: 20px;
  background: #f5f5f5;
  overflow-y: auto;

  h2 {
    margin-bottom: 20px;
  }
`;

DashboardPage.DriverList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

DashboardPage.MapSection = styled.div`
  flex: 1;
  position: relative;
`;

export default DashboardPage;
