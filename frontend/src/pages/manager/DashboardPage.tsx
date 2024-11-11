import { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import MapContainer from "@components/manager/MapContainer";
import DriverMarker from "@components/manager/DriverMarker";
import RoutePolyline from "@components/manager/RoutePolyline";
import DriverInfoModal from "@components/manager/DriverInfoModal";
import AlertModal from "@components/manager/AlertModal";
import { MapDriver } from "@/interfaces/manager";
import { dummyMapDrivers, dummySleepEvent } from "@interfaces/dummydrivers";
import { useAtom } from "jotai";
import { mapInstanceAtom } from "@components/manager/MapContainer";

// 드라이버별 경로 색상 설정
const ROUTE_COLORS = [
  "#FF3B3B", // 선명한 빨간색
  "#4B7BFF", // 선명한 파란색
  "#FF2DC2", // 선명한 분홍색
  "#7B3DFF", // 보라색
  "#FF8A00", // 진한 주황색
  "#00D1B2", // 청록색
];

const MIN_ZOOM = 9; // 최소 줌 레벨 (가장 멀리)
const MAX_ZOOM = 16; // 최대 줌 레벨 (가장 가까이)

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

  // 대각선 거리에 따른 줌 레벨 결정
  if (distance < 2) return MAX_ZOOM; // 2km 미만
  if (distance < 5) return 15; // 2-5km
  if (distance < 10) return 14; // 5-10km
  if (distance < 20) return 13; // 10-20km
  if (distance < 40) return 12; // 20-40km
  if (distance < 80) return 11; // 40-80km
  if (distance < 160) return 10; // 80-160km
  return MIN_ZOOM; // 160km 이상
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
  const [mapInstance] = useAtom(mapInstanceAtom);

  const { data: drivers = [] } = useQuery<MapDriver[]>({
    queryKey: ["drivers"],
    queryFn: async () => {
      return dummyMapDrivers;
    },
  });

  // 모든 경로를 고려하여 지도 뷰 최적화
  useEffect(() => {
    if (mapInstance && drivers.length > 0) {
      // 모든 경로의 모든 포인트를 하나의 배열로 합치기
      const allPoints = drivers.flatMap((driver) => [
        driver.location,
        ...driver.route,
      ]);

      // 전체 경로의 범위 계산
      const bounds = findBounds(allPoints);

      // 중심점 계산
      const centerLat = (bounds.maxLat + bounds.minLat) / 2;
      const centerLng = (bounds.maxLng + bounds.minLng) / 2;
      const centerPoint = new window.Tmapv2.LatLng(centerLat, centerLng);

      // 중심점 설정
      mapInstance.setCenter(centerPoint);

      // 최적의 줌 레벨 계산 및 설정
      const optimalZoom = calculateOptimalZoom(bounds);
      mapInstance.setZoom(optimalZoom);

      // 부드러운 전환을 위한 미세 조정
      setTimeout(() => {
        mapInstance.setZoom(optimalZoom - 0.5);
      }, 100);
    }
  }, [mapInstance, drivers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertInfo({
        driverName: dummySleepEvent.driverName,
        eventTime: dummySleepEvent.time,
        eventLocation: dummySleepEvent.location,
      });
      setShowAlert(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDriverClick = (driver: MapDriver) => {
    setSelectedDriver(driver.id);
    setShowDriverInfo(true);

    if (mapInstance) {
      // 선택된 드라이버의 경로 범위 계산
      const bounds = findBounds([driver.location, ...driver.route]);

      // 중심점 계산 및 설정
      const centerLat = (bounds.maxLat + bounds.minLat) / 2;
      const centerLng = (bounds.maxLng + bounds.minLng) / 2;
      mapInstance.setCenter(new window.Tmapv2.LatLng(centerLat, centerLng));

      // 줌 레벨 조정
      const newZoom = calculateOptimalZoom(bounds);
      mapInstance.setZoom(newZoom + 1); // 선택된 드라이버는 좀 더 가깝게 보여주기
    }
  };

  return (
    <DashboardPage.Container>
      <DashboardPage.MapSection>
        <MapContainer
          width="100%"
          height="100%"
          initialCenter={{ lat: 37.5666805, lng: 126.9784147 }}
        >
          {drivers.map((driver, index) => (
            <div key={`driver-group-${driver.id}`}>
              <DriverMarker
                position={driver.location}
                driverId={driver.id}
                onClick={() => handleDriverClick(driver)}
              />
              <RoutePolyline
                path={driver.route}
                color={ROUTE_COLORS[index % ROUTE_COLORS.length]}
                width={50}
              />
            </div>
          ))}
        </MapContainer>

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

export default DashboardPage;
