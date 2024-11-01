import { useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { User, DUMMY_USERS } from "@interfaces/driveruser";

import MapContainer from "@components/manager/MapContainer";
import RoutePolyline from "@components/manager/RoutePolyline";

interface DrowsinessEvent {
  id: string;
  time: string;
  location: {
    lat: number;
    lng: number;
  };
  duration: number;
}

interface ReportData {
  id: string;
  driverName: string;
  vehicleId: string;
  travelRoute: Array<{
    lat: number;
    lng: number;
  }>;
  drowsinessEvents: DrowsinessEvent[];
}

// 더미로 만든 데이터로
const DUMMY_REPORTS: Record<string, ReportData> = {
  "1": {
    id: "1",
    driverName: DUMMY_USERS[0].name,
    vehicleId: DUMMY_USERS[0].employeeId,
    travelRoute: [
      { lat: 37.5665, lng: 126.978 },
      { lat: 37.5668, lng: 126.9785 },
      { lat: 37.5671, lng: 126.9789 },
    ],
    drowsinessEvents: [
      {
        id: "event1",
        time: "2024-11-01 14:30:00",
        location: { lat: 37.5668, lng: 126.9785 },
        duration: 5,
      },
      {
        id: "event2",
        time: "2024-11-01 15:45:00",
        location: { lat: 37.5671, lng: 126.9789 },
        duration: 3,
      },
    ],
  },
};

const ReportPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // 운전자 리포트 데이터 조회
  const { data: reportData } = useQuery<ReportData>({
    queryKey: ["reportData", id],
    queryFn: async () => {
      // 더미로 한번 해보기
      const driver = DUMMY_USERS.find((user) => user.id === id);
      if (!driver) {
        throw new Error("해당 운전자가 없습니다");
      }

      return (
        DUMMY_REPORTS[id!] || {
          id: id!,
          driverName: driver.name,
          vehicleId: driver.employeeId,
          travelRoute: [
            { lat: 37.5665, lng: 126.978 },
            { lat: 37.5668, lng: 126.9785 },
          ],
          drowsinessEvents: [],
        }
      );
    },
  });

  if (!reportData) return null;

  const driver = DUMMY_USERS.find((user) => user.id === id);
  if (!driver) return <div>운전자를 찾을 수 없습니다.</div>;

  return (
    <ReportPage.Container>
      <ReportPage.InfoSection>
        <ReportPage.Header>
          <h2>{driver.name}</h2>
          <span>{driver.employeeId}</span>
          <ReportPage.DriverInfo>
            <div>소속: {driver.company}</div>
            <div>연락처: {driver.phone}</div>
            <div>현재 상태: {driver.status}</div>
            <div>지역: {driver.location}</div>
          </ReportPage.DriverInfo>
        </ReportPage.Header>

        <ReportPage.EventList>
          <h3>졸음운전 발생 기록</h3>
          {reportData.drowsinessEvents.length === 0 ? (
            <ReportPage.NoEvents>졸음운전 기록이 없습니다.</ReportPage.NoEvents>
          ) : (
            reportData.drowsinessEvents.map((event) => (
              <ReportPage.EventItem
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                isSelected={selectedEventId === event.id}
              >
                <div>발생시각: {event.time}</div>
                <div>지속시간: {event.duration}초</div>
              </ReportPage.EventItem>
            ))
          )}
        </ReportPage.EventList>
      </ReportPage.InfoSection>

      <ReportPage.MapSection>
        <MapContainer width="100%" height="100%">
          <RoutePolyline
            path={reportData.travelRoute}
            color="#4A90E2"
            width={3}
          />
          {selectedEventId && (
            <RoutePolyline
              path={[
                reportData.drowsinessEvents.find(
                  (e) => e.id === selectedEventId
                )?.location || { lat: 0, lng: 0 },
              ]}
              color="#FF0000"
              width={5}
            />
          )}
        </MapContainer>
      </ReportPage.MapSection>
    </ReportPage.Container>
  );
};

// 스타일 컴포넌트
ReportPage.Container = styled.div`
  display: flex;
  height: 100vh;
`;

ReportPage.InfoSection = styled.div`
  width: 400px;
  padding: 20px;
  background: #f5f5f5;
  overflow-y: auto;
`;

ReportPage.Header = styled.div`
  margin-bottom: 30px;

  h2 {
    margin: 0 0 10px 0;
  }

  span {
    color: #666;
  }
`;

ReportPage.EventList = styled.div`
  h3 {
    margin-bottom: 15px;
  }
`;

ReportPage.EventItem = styled.div<{ isSelected: boolean }>`
  padding: 15px;
  background: ${({ isSelected }) => (isSelected ? "#e0e0e0" : "white")};
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e0e0e0;
  }

  div {
    margin-bottom: 5px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

ReportPage.MapSection = styled.div`
  flex: 1;
  position: relative;
`;

export default ReportPage;
