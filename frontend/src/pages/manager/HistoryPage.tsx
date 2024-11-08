import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import styled from "styled-components";
import { mapInstanceAtom } from "@components/manager/MapContainer";
import { dummyDrowsyEvents } from "@interfaces/drowsyData";
import { DrowsyEvent } from "@/interfaces/manager";
import DriverDetailCard from "@components/manager/DriverDetailCard";
import MapContainer from "@components/manager/MapContainer";
import DriverMarker from "@components/manager/DriverMarker";
import RoutePolyline from "@components/manager/RoutePolyline";

// 경로 표시를 위한 단일 색상 정의
const ROUTE_COLOR = "#FF3B3B"; // 선명한 빨간색

const MIN_ZOOM = 10; // 최소 줌 레벨 (가장 멀리)
const MAX_ZOOM = 16; // 최대 줌 레벨 (가장 가까이)

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

// 경로의 거리에 따라 적절한 줌 레벨을 계산하는 함수
const calculateZoomLevel = (route: Array<{ lat: number; lng: number }>) => {
  if (route.length < 2) return 13; // 기본값

  // 경로의 시작점과 끝점 사이의 거리 계산
  const distance = calculateDistance(
    route[0].lat,
    route[0].lng,
    route[route.length - 1].lat,
    route[route.length - 1].lng
  );

  // 거리에 따른 줌 레벨 결정
  if (distance < 1) return MAX_ZOOM; // 1km 미만
  if (distance < 3) return 15; // 1-3km
  if (distance < 5) return 14; // 3-5km
  if (distance < 10) return 13; // 5-10km
  if (distance < 20) return 12; // 10-20km
  if (distance < 40) return 11; // 20-40km
  return MIN_ZOOM; // 40km 이상
};

const HistoryPage = () => {
  const [selectedHistory, setSelectedHistory] = useState<DrowsyEvent | null>(
    null
  );
  const [mapInstance] = useAtom(mapInstanceAtom);

  useEffect(() => {
    console.log("HistoryPage mapInstance:", mapInstance);
    console.log("Window Tmapv2 exists:", !!window.Tmapv2);
  }, [mapInstance]);

  useEffect(() => {
    if (mapInstance && dummyDrowsyEvents.length > 0) {
      const firstEvent = dummyDrowsyEvents[0];

      // 경로의 모든 좌표를 포함하는 positions 배열 생성
      const positions = firstEvent.route.map(
        (point) => new window.Tmapv2.LatLng(point.lat, point.lng)
      );

      // 경로의 중간 지점을 중심으로 설정
      const centerPoint = positions[Math.floor(positions.length / 2)];
      mapInstance.setCenter(centerPoint);

      // 경로 거리에 따른 적절한 줌 레벨 설정
      const zoomLevel = calculateZoomLevel(firstEvent.route);
      mapInstance.setZoom(zoomLevel);
    }
  }, [mapInstance]);

  const handleCardClick = (history: DrowsyEvent) => {
    console.log("카드 클릭됨:", history);
    setSelectedHistory(history);

    if (mapInstance && window.Tmapv2) {
      const positions = history.route.map(
        (point) => new window.Tmapv2.LatLng(point.lat, point.lng)
      );

      // 경로의 중간 지점을 중심으로 설정
      const centerPoint = positions[Math.floor(positions.length / 2)];
      mapInstance.setCenter(centerPoint);

      // 경로 거리에 따른 적절한 줌 레벨 설정
      const zoomLevel = calculateZoomLevel(history.route);
      mapInstance.setZoom(zoomLevel);

      // 애니메이션 효과를 위해 약간의 딜레이 후 미세 조정
      setTimeout(() => {
        mapInstance.setZoom(zoomLevel + 0.5);
      }, 100);
    } else {
      console.warn("Map instance, Tmap 둘중 하나 문제다:", {
        mapInstance: !!mapInstance,
        Tmapv2: !!window.Tmapv2,
      });
    }
  };

  return (
    <Container>
      <LeftPanel>
        <ScrollableList>
          {dummyDrowsyEvents.map((history) => (
            <DriverDetailCard
              key={history.id}
              event={history}
              isSelected={selectedHistory?.id === history.id}
              onClick={() => handleCardClick(history)}
            />
          ))}
        </ScrollableList>
      </LeftPanel>
      <MapPanel>
        <MapContainer
          initialCenter={{
            lat: 36.5,
            lng: 127.5,
          }}
          initialZoom={7}
        >
          {selectedHistory && (
            <>
              <RoutePolyline
                path={selectedHistory.route}
                color={ROUTE_COLOR}
                width={5}
              />
              <DriverMarker
                position={selectedHistory.location}
                driverId={selectedHistory.id}
                onClick={() => {
                  console.log("마커 클릭됨:", selectedHistory);
                }}
              />
            </>
          )}
        </MapContainer>
      </MapPanel>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f8f9fa;
  margin: 10px;
  border-radius: 16px;
  background-color: #f8fafb;
`;

const LeftPanel = styled.div`
  width: 480px;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
`;

const ScrollableList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f8f9fa;
  }

  &::-webkit-scrollbar-thumb {
    background: #dee2e6;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #adb5bd;
  }
`;

const MapPanel = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  min-height: 100%;
`;

export default HistoryPage;
