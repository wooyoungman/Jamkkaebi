import styled from "styled-components";
import { useState, useRef } from "react";
import MapContainer from "@components/manager/MapContainer";
import DriverMarker from "@components/manager/DriverMarker";
import RoutePolyline from "@components/manager/RoutePolyline";
import DriverInfoModal from "@components/manager/DriverInfoModal";
import AlertModal from "@components/manager/AlertModal";
import { useDriverList } from "@queries/manager/driver";
import { useDriversWithRoutes } from "@queries/manager/routes";
import { useMapController } from "@/hooks/useMapController";
import { useWebSocketController } from "@/hooks/useWebSocketController";
import { useGetUserInfo } from "@queries/index";
import { RealTimeDriver, DriverResponse } from "@interfaces/manager";

interface AlertInfo {
  driverName: string;
  eventTime: string;
  eventLocation: {
    lat: number;
    lng: number;
  };
}

const ROUTE_COLORS = [
  "#9361ff",
  "#4B7BFF",
  "#FF2DC2",
  "#7B3DFF",
  "#FF8A00",
  "#00D1B2",
];

const DashboardPage = () => {
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [showDriverInfo, setShowDriverInfo] = useState(false);
  const isInitialMount = useRef(true);

  const { data: userInfo } = useGetUserInfo();
  const managerId = userInfo?.memberId || 0;

  const { data: driverList, isLoading: isLoadingDrivers } =
    useDriverList("managed");

  const {
    isConnected,
    connectionAttempts,
    realtimeDriverStates,
    realtimeLocations,
    showAlert,
    alertInfo,
    setShowAlert,
  } = useWebSocketController(managerId);

  // 드라이버 경로 데이터 쿼리
  const driversWithRoutesQueries = useDriversWithRoutes(driverList);

  // 실시간 위치 정보만을 사용하는 드라이버 목록
  const driversWithRealtimeLocations: RealTimeDriver[] =
    driverList?.drivers.map((driver: DriverResponse) => ({
      ...driver,
      location: realtimeLocations[driver.driverId] || {
        lat: 37.5666805,
        lng: 126.9784147,
      },
      route: [], // 초기 빈 경로 배열 추가
    })) || [];

  const { handleDriverClick } = useMapController(driversWithRealtimeLocations);

  const onDriverClick = (driverId: number) => {
    setSelectedDriver(driverId);
    setShowDriverInfo(true);
    handleDriverClick(driverId);
  };

  if (isLoadingDrivers) {
    return <div>Loading...</div>;
  }

  // 선택된 드라이버의 경로 데이터 찾기
  const selectedDriverRouteQuery = driversWithRoutesQueries.find(
    (query) => query.data?.driverId === selectedDriver
  );

  return (
    <DashboardPage.Container>
      {!isConnected && connectionAttempts >= 5 && (
        <DashboardPage.ErrorMessage>
          실시간 데이터 연결에 실패했습니다. 페이지를 새로고침 해주세요.
        </DashboardPage.ErrorMessage>
      )}
      <DashboardPage.MapSection>
        <MapContainer
          width="100%"
          height="100%"
          initialCenter={{ lat: 37.5666805, lng: 126.9784147 }}
        >
          {driversWithRealtimeLocations.map(
            (driver: RealTimeDriver, index: number) => (
              <div key={`driver-group-${driver.driverId}`}>
                <DriverMarker
                  position={driver.location}
                  driverId={driver.driverId}
                  onClick={() => onDriverClick(driver.driverId)}
                  status={
                    realtimeDriverStates.find(
                      (state) => state.driverId === driver.driverId
                    )?.drowsy_level === 1
                      ? "drowsy"
                      : (realtimeDriverStates.find(
                            (state) => state.driverId === driver.driverId
                          )?.concentration_level ?? 1) < 0.3
                        ? "low_focus"
                        : "normal"
                  }
                />
                {selectedDriver === driver.driverId &&
                  selectedDriverRouteQuery?.data?.route && (
                    <RoutePolyline
                      path={selectedDriverRouteQuery.data.route}
                      color={ROUTE_COLORS[index % ROUTE_COLORS.length]}
                      width={15}
                    />
                  )}
              </div>
            )
          )}
        </MapContainer>

        {showDriverInfo && selectedDriver && (
          <DashboardPage.DriverOverlay>
            <DriverInfoModal
              isOpen={showDriverInfo}
              onClose={() => {
                setShowDriverInfo(false);
                setSelectedDriver(null);
              }}
              driver={
                driversWithRealtimeLocations.find(
                  (d: RealTimeDriver) => d.driverId === selectedDriver
                )!
              }
              realtimeState={realtimeDriverStates.find(
                (state) => state.driverId === selectedDriver
              )}
            />
          </DashboardPage.DriverOverlay>
        )}
      </DashboardPage.MapSection>

      <AlertModal
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        driverName={alertInfo?.driverName || ''}
        eventTime={alertInfo?.eventTime || ''}
        eventLocation={alertInfo?.eventLocation || { lat: 37.5666805, lng: 126.9784147 }}
      />
    </DashboardPage.Container>
  );
};

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

DashboardPage.ErrorMessage = styled.div`
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff4444;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export default DashboardPage;