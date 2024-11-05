import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { styled } from "styled-components";
import { mapInstanceAtom } from "@components/manager/MapContainer";
import { dummyDrowsyEvents } from "@interfaces/drowsyData";
import { DrowsyEvent } from "@interfaces/manager";
import DriverDetailCard from "@components/manager/DriverDetailCard";
import MapContainer from "@components/manager/MapContainer";
import DriverMarker from "@components/manager/DriverMarker";

const HistoryPage = () => {
  const [selectedHistory, setSelectedHistory] = useState<DrowsyEvent | null>(
    null
  );
  const [mapInstance] = useAtom(mapInstanceAtom);

  // 콘솔 확인용
  useEffect(() => {
    console.log("HistoryPage mapInstance:", mapInstance);
    console.log("Window Tmapv2 exists:", !!window.Tmapv2);
  }, [mapInstance]);

  // mapInstance가 변경될 때마다 초기 설정
  useEffect(() => {
    if (mapInstance && dummyDrowsyEvents.length > 0) {
      // 첫 번째 이벤트 위치로 지도 중심 이동
      console.log("첫번째 위치:", dummyDrowsyEvents[0].location);
      const firstEvent = dummyDrowsyEvents[0];
      const position = new window.Tmapv2.LatLng(
        firstEvent.location.lat,
        firstEvent.location.lng
      );
      mapInstance.setCenter(position);
      console.log("첫 위치는 잘 찾음");
    }
  }, [mapInstance]);

  const handleCardClick = (history: DrowsyEvent) => {
    console.log("카드 클릭됨:", history);
    setSelectedHistory(history);

    if (mapInstance && window.Tmapv2) {
      const position = new window.Tmapv2.LatLng(
        history.location.lat,
        history.location.lng
      );

      // 지도 중심 이동
      mapInstance.setCenter(position);
      console.log("지도 중심 이동:", position);

      // 지도 레벨 설정 (줌)
      mapInstance.setZoom(15);
      console.log("Map zoom set to 15");
    } else {
      console.warn("Map instance, Tmap 둘중 하나 문제다:", {
        mapInstance: !!mapInstance,
        Tmapv2: !!window.Tmapv2,
      });
    }

    console.log("HistoryPage render. Selected history:", selectedHistory?.id);
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
            lat: 30.0444,
            lng: 31.2357,
          }}
          initialZoom={15}
        >
          {selectedHistory && (
            <DriverMarker
              position={selectedHistory.location}
              driverId={selectedHistory.id}
              onClick={() => {
                console.log("마커 클릭됨:", selectedHistory);
              }}
            />
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
