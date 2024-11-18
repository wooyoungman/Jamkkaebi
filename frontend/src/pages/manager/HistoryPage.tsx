import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import styled from "styled-components";
import { DrowsyEvent } from "@/interfaces/manager";
import { mapInstanceAtom } from "@atoms/index";
import DriverDetailCard from "@components/manager/DriverDetailCard";
import MapContainer from "@components/manager/MapContainer";
import DriverMarker from "@components/manager/DriverMarker";
import RoutePolyline from "@components/manager/RoutePolyline";
import { dummyDrowsyEvents } from "@/interfaces/drowsyData";

// 경로 표시를 위한 단일 색상 정의
const ROUTE_COLOR = "#FF3B3B"; // 선명한 빨간색

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
  if (route.length < 2) return 17; // 기본값

  const distance = calculateDistance(
    route[0].lat,
    route[0].lng,
    route[route.length - 1].lat,
    route[route.length - 1].lng
  );

  // 더 세밀한 줌 레벨 조정
  if (distance < 0.1) return 18; // 100m 미만
  if (distance < 0.2) return 17.5; // 200m 미만
  if (distance < 0.3) return 17; // 300m 미만
  if (distance < 0.5) return 16.5; // 500m 미만
  return 16; // 그 이상
};

// route의 중간 지점을 찾는 함수
const findMiddlePoint = (route: Array<{ lat: number; lng: number }>) => {
  const middleIndex = Math.floor(route.length / 2);
  return route[middleIndex];
};

const HistoryPage = () => {
  const [selectedHistory, setSelectedHistory] = useState<DrowsyEvent | null>(
    null
  );
  const [mapInstance, setMapInstance] = useAtom(mapInstanceAtom);

  useEffect(() => {
    if (mapInstance && dummyDrowsyEvents.length > 0) {
      const firstEvent = dummyDrowsyEvents[0];
      const centerPoint = new window.Tmapv2.LatLng(
        findMiddlePoint(firstEvent.route).lat,
        findMiddlePoint(firstEvent.route).lng
      );
      mapInstance.setCenter(centerPoint);
      const zoomLevel = calculateZoomLevel(firstEvent.route);
      mapInstance.setZoom(zoomLevel);
    }
  }, [mapInstance]);

  const handleCardClick = (history: DrowsyEvent) => {
    setSelectedHistory(history);

    if (mapInstance && window.Tmapv2) {
      const centerPoint = new window.Tmapv2.LatLng(
        findMiddlePoint(history.route).lat,
        findMiddlePoint(history.route).lng
      );
      mapInstance.setCenter(centerPoint);
      const zoomLevel = calculateZoomLevel(history.route);
      mapInstance.setZoom(zoomLevel);
    } else {
      console.warn("Map instance 또는 Tmap에 문제가 있습니다:", {
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
                width={8}
              />
              <DriverMarker
                position={findMiddlePoint(selectedHistory.route)}
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
