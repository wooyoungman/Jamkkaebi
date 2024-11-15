import styled from "styled-components";
import { useState } from "react";
import MapContainer from "@components/manager/MapContainer";
import DriverMarker from "@components/manager/DriverMarker";
import RoutePolyline from "@components/manager/RoutePolyline";
import DriverInfoModal from "@components/manager/DriverInfoModal";
import AlertModal from "@components/manager/AlertModal";
import { useDriverList } from "@queries/manager/driver";
import { useDriversWithRoutes } from "@queries/manager/routes";
import { useMapController } from "@/hooks/useMapController";
import { useWebSocketController } from "@/hooks/useWebSocketController";

const ROUTE_COLORS = [
  "#FF3B3B",
  "#4B7BFF",
  "#FF2DC2",
  "#7B3DFF",
  "#FF8A00",
  "#00D1B2",
];

const DashboardPage = () => {
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [showDriverInfo, setShowDriverInfo] = useState(false);

  const { data: driverList, isLoading: isLoadingDrivers } =
    useDriverList("managed");
  const driverQueries = useDriversWithRoutes(driverList);
  const driversWithRoutes = driverQueries
    .map((query) => query.data)
    .filter((data): data is NonNullable<typeof data> => !!data)
    .map((driver) => ({
      ...driver,
      location: realtimeLocations[driver.driverId] || driver.location,
    }));

  const {
    isConnected,
    connectionAttempts,
    realtimeDriverStates,
    realtimeLocations,
    showAlert,
    alertInfo,
    setShowAlert,
  } = useWebSocketController(driversWithRoutes);

  const { handleDriverClick } = useMapController(driversWithRoutes);

  const onDriverClick = (driverId: number) => {
    setSelectedDriver(driverId);
    setShowDriverInfo(true);
    handleDriverClick(driverId);
  };

  if (isLoadingDrivers) {
    return <div>Loading...</div>;
  }

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
          {driversWithRoutes.map((driver, index) => {
            const realtimeState = realtimeDriverStates.find(
              (state) => state.driverId === driver.driverId
            );

            return (
              <div key={`driver-group-${driver.driverId}`}>
                <DriverMarker
                  position={driver.location}
                  driverId={driver.driverId}
                  onClick={() => onDriverClick(driver.driverId)}
                  status={
                    realtimeState?.drowsy_level === 1
                      ? "drowsy"
                      : (realtimeState?.concentration_level ?? 1) < 0.3
                        ? "low_focus"
                        : "normal"
                  }
                />
                <RoutePolyline
                  path={driver.route}
                  color={ROUTE_COLORS[index % ROUTE_COLORS.length]}
                  width={50}
                />
              </div>
            );
          })}
        </MapContainer>

        {showDriverInfo && selectedDriver && (
          <DashboardPage.DriverOverlay>
            <DriverInfoModal
              isOpen={showDriverInfo}
              onClose={() => setShowDriverInfo(false)}
              driver={
                driversWithRoutes.find((d) => d.driverId === selectedDriver)!
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
        {...alertInfo}
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
  top: 20px;
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
