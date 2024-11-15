import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import MapContainer from "@components/manager/MapContainer";
import DriverMarker from "@components/manager/DriverMarker";
import RoutePolyline from "@components/manager/RoutePolyline";
import DriverInfoModal from "@components/manager/DriverInfoModal";
import AlertModal from "@components/manager/AlertModal";
import { mapInstanceAtom } from "@atoms/index";
import { useDriverList } from "@queries/manager/driver";
import { useDriversWithRoutes } from "@queries/manager/routes";
import { DriverState, BrainData } from "@interfaces/manager";

// 드라이버별 경로 색상 설정
const ROUTE_COLORS = [
  "#FF3B3B", // 선명한 빨간색
  "#4B7BFF", // 선명한 파란색
  "#FF2DC2", // 선명한 분홍색
  "#7B3DFF", // 보라색
  "#FF8A00", // 진한 주황색
  "#00D1B2", // 청록색
];

const MIN_ZOOM = 9;
const MAX_ZOOM = 16;

const SPRING_WS_URL = "wss://k11c106.p.ssafy.io/ws/v1/device/data";
const FASTAPI_WS_URL = "wss://k11c106.p.ssafy.io/fastapi/ws";

// 위도/경도의 최대/최소값을 찾는 함수
const findBounds = (locations: Array<{ lat: number; lng: number }>) => {
  let minLat = locations[0].lat;
  let maxLat = locations[0].lat;
  let minLng = locations[0].lng;
  let maxLng = locations[0].lng;

  locations.forEach((loc) => {
    minLat = Math.min(minLat, loc.lat);
    maxLat = Math.max(maxLat, loc.lat);
    minLng = Math.min(minLng, loc.lng);
    maxLng = Math.max(maxLng, loc.lng);
  });

  return { minLat, maxLat, minLng, maxLng };
};

// 두 지점 간의 거리를 계산하는 함수 (km 단위)
const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  const R = 6371; // 지구의 반경 (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// 모든 경로의 범위에 따라 적절한 줌 레벨을 계산하는 함수
const calculateOptimalZoom = (bounds: ReturnType<typeof findBounds>) => {
  const distance = calculateDistance(
    bounds.minLat,
    bounds.minLng,
    bounds.maxLat,
    bounds.maxLng
  );

  if (distance < 2) return MAX_ZOOM;
  if (distance < 5) return 15;
  if (distance < 10) return 14;
  if (distance < 20) return 13;
  if (distance < 40) return 12;
  if (distance < 80) return 11;
  if (distance < 160) return 10;
  return MIN_ZOOM;
};

const DashboardPage = () => {
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [showDriverInfo, setShowDriverInfo] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    driverName: "",
    eventTime: "",
    eventLocation: "",
  });
  const [mapInstance, setMapInstance] = useAtom(mapInstanceAtom);
  const [springSocket, setSpringSocket] = useState<WebSocket | null>(null);
  const [fastApiSocket, setFastApiSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [realtimeDriverStates, setRealtimeDriverStates] = useState<
    DriverState[]
  >([]);
  const [realtimeLocations, setRealtimeLocations] = useState<
    Record<string, { lat: number; lng: number }>
  >({});
  const [needFastApiConnection, setNeedFastApiConnection] = useState(false);

  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 3000;

  const { data: driverList, isLoading: isLoadingDrivers } =
    useDriverList("managed");
  const driverQueries = useDriversWithRoutes(driverList);
  const driversWithRoutes = driverQueries
    .map((query) => query.data)
    .filter((data): data is NonNullable<typeof data> => !!data)
    .map((driver) => ({
      ...driver,
      location:
        realtimeLocations[driver.driverId.toString()] || driver.location,
    }));

  // FastAPI WebSocket 연결 함수
  const connectFastApiSocket = useCallback(() => {
    const newFastApiSocket = new WebSocket(FASTAPI_WS_URL);

    newFastApiSocket.onopen = () => {
      console.log("FastAPI WebSocket connected");
    };

    newFastApiSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.predictions?.classification) {
          setRealtimeDriverStates((prev) => {
            const existingIndex = prev.findIndex(
              (state) => state.driverId === data.driverId
            );
            const newState = {
              driverId: data.driverId,
              drowsy_level:
                data.predictions.classification === "ASLEEP" ? 1 : 0,
              concentration_level: 1,
            };

            if (existingIndex >= 0) {
              const newStates = [...prev];
              newStates[existingIndex] = newState;
              return newStates;
            }
            return [...prev, newState];
          });
        }
      } catch (error) {
        console.error("Error parsing FastAPI WebSocket message:", error);
      }
    };

    setFastApiSocket(newFastApiSocket);
  }, []);

  // Spring WebSocket 연결 함수
  const connectSpringSocket = useCallback(() => {
    if (connectionAttempts >= MAX_RECONNECT_ATTEMPTS) {
      console.log("Max reconnection attempts reached");
      return;
    }

    try {
      const newSpringSocket = new WebSocket(SPRING_WS_URL);

      newSpringSocket.onopen = () => {
        console.log("Spring WebSocket connected");
        setIsConnected(true);
        setConnectionAttempts(0);
      };

      newSpringSocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as BrainData;

          // 좌표 데이터 처리
          if (data.coordinate) {
            setRealtimeLocations((prev) => ({
              ...prev,
              [data.driverId]: {
                lng: data.coordinate[0],
                lat: data.coordinate[1],
              },
            }));
          }

          // classification 데이터 처리
          if (data.predictions?.classification) {
            setRealtimeDriverStates((prev) => {
              const existingIndex = prev.findIndex(
                (state) => state.driverId === data.driverId
              );
              const newState = {
                driverId: data.driverId,
                drowsy_level:
                  data.predictions?.classification === "ASLEEP" ? 1 : 0,
                concentration_level: 1,
              };

              if (existingIndex >= 0) {
                const newStates = [...prev];
                newStates[existingIndex] = newState;
                return newStates;
              }
              return [...prev, newState];
            });
          } else {
            // classification이 없는 경우 FastAPI 연결 필요
            setNeedFastApiConnection(true);
          }
        } catch (error) {
          console.error("Error parsing Spring WebSocket message:", error);
        }
      };

      newSpringSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
      };

      newSpringSocket.onclose = () => {
        console.log("WebSocket closed");
        setIsConnected(false);
        setSpringSocket(null);

        if (connectionAttempts < MAX_RECONNECT_ATTEMPTS) {
          setTimeout(() => {
            setConnectionAttempts((prev) => prev + 1);
            connectSpringSocket();
          }, RECONNECT_DELAY);
        }
      };

      setSpringSocket(newSpringSocket);
    } catch (error) {
      console.error("Error creating Spring WebSocket:", error);
    }
  }, [connectionAttempts]);

  // Spring WebSocket 연결
  useEffect(() => {
    connectSpringSocket();

    return () => {
      if (springSocket && springSocket.readyState === WebSocket.OPEN) {
        springSocket.close();
      }
    };
  }, [connectSpringSocket]);

  // FastAPI WebSocket 연결 (필요한 경우에만)
  useEffect(() => {
    if (needFastApiConnection && !fastApiSocket) {
      connectFastApiSocket();
    }

    return () => {
      if (fastApiSocket && fastApiSocket.readyState === WebSocket.OPEN) {
        fastApiSocket.close();
      }
    };
  }, [needFastApiConnection, fastApiSocket, connectFastApiSocket]);

  // 지도 최적화
  useEffect(() => {
    if (mapInstance && driversWithRoutes.length > 0) {
      const allPoints = driversWithRoutes.flatMap((driver) => [
        driver.location,
        ...driver.route,
      ]);

      const bounds = findBounds(allPoints);
      const centerLat = (bounds.maxLat + bounds.minLat) / 2;
      const centerLng = (bounds.maxLng + bounds.minLng) / 2;
      const centerPoint = new window.Tmapv2.LatLng(centerLat, centerLng);

      mapInstance.setCenter(centerPoint);
      const optimalZoom = calculateOptimalZoom(bounds);
      mapInstance.setZoom(optimalZoom);

      setTimeout(() => {
        mapInstance.setZoom(optimalZoom - 0.5);
      }, 100);
    }
  }, [mapInstance, driversWithRoutes]);

  const handleDriverClick = (driverId: number) => {
    const driver = driversWithRoutes.find((d) => d.driverId === driverId);
    if (!driver || !mapInstance) return;

    setSelectedDriver(driverId);
    setShowDriverInfo(true);

    const bounds = findBounds([driver.location, ...driver.route]);
    const centerLat = (bounds.maxLat + bounds.minLat) / 2;
    const centerLng = (bounds.maxLng + bounds.minLng) / 2;

    mapInstance.setCenter(new window.Tmapv2.LatLng(centerLat, centerLng));
    const newZoom = calculateOptimalZoom(bounds);
    mapInstance.setZoom(newZoom + 1);
  };

  if (isLoadingDrivers) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardPage.Container>
      {!isConnected && connectionAttempts >= MAX_RECONNECT_ATTEMPTS && (
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
                  onClick={() => handleDriverClick(driver.driverId)}
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
