import styled from "styled-components";
import { DriverState, RealTimeDriver } from "@interfaces/manager";
import { useState, useEffect } from "react";

const STATUS_DISPLAY = {
  ON_ROUTE: "운행 중",
  REST: "휴식 중",
  IDLE: "휴일",
} as const;

interface DriverInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: RealTimeDriver;
  realtimeState?: DriverState;
}

const DriverInfoModal = ({
  isOpen,
  onClose,
  driver,
  realtimeState,
}: DriverInfoModalProps) => {
  const [address, setAddress] = useState<string>("");
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  // Tmap 역지오코딩 함수
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      setIsLoadingAddress(true);
      const response = await fetch(
        `https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat=${lat}&lon=${lng}&coordType=WGS84GEO&addressType=A10&format=json&callback=result`,
        {
          headers: {
            Accept: "application/json",
            appKey: import.meta.env.VITE_TMAP_API_KEY,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch address");

      const data = await response.json();
      if (data.addressInfo) {
        // 도로명 주소가 있으면 도로명 주소 사용, 없으면 지번 주소 사용
        const fullAddress = data.addressInfo.fullAddress;
        setAddress(fullAddress);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("주소를 불러올 수 없습니다");
    } finally {
      setIsLoadingAddress(false);
    }
  };

  useEffect(() => {
    if (isOpen && driver.location) {
      reverseGeocode(driver.location.lat, driver.location.lng);
    }
  }, [isOpen, driver.location]);

  if (!isOpen) return null;

  return (
    <DriverInfoModal.Overlay onClick={onClose}>
      <DriverInfoModal.Content onClick={(e) => e.stopPropagation()}>
        <DriverInfoModal.Header>
          <h2>운전자 정보</h2>
          <button onClick={onClose}>&times;</button>
        </DriverInfoModal.Header>
        <DriverInfoModal.Body>
          <div>
            <label>이름:</label>
            <span>{driver.driverName}</span>
          </div>
          <div>
            <label>차량번호:</label>
            <span>{driver.vehicleNumber}</span>
          </div>
          <div>
            <label>상태:</label>
            <span>
              {STATUS_DISPLAY[driver.status as keyof typeof STATUS_DISPLAY]}
            </span>
          </div>
          <div>
            <label>현재 위치:</label>
            <LocationSpan>
              {isLoadingAddress
                ? "주소 검색 중..."
                : address || "주소를 불러올 수 없습니다"}
            </LocationSpan>
          </div>
          {realtimeState && (
            <>
              <div>
                <label>졸음 수준:</label>
                <span>{realtimeState.drowsy_level}</span>
              </div>
              <div>
                <label>집중도:</label>
                <span>
                  {(realtimeState.concentration_level * 100).toFixed(0)}점
                </span>
              </div>
            </>
          )}
          {driver.phoneNumber && (
            <div>
              <label>연락처:</label>
              <span>{driver.phoneNumber}</span>
            </div>
          )}
        </DriverInfoModal.Body>
      </DriverInfoModal.Content>
    </DriverInfoModal.Overlay>
  );
};
DriverInfoModal.Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

DriverInfoModal.Content = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
`;

DriverInfoModal.Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
  }

  button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
`;

DriverInfoModal.Body = styled.div`
  div {
    margin-bottom: 10px;

    label {
      font-weight: bold;
      margin-right: 10px;
      min-width: 100px;
      display: inline-block;
    }

    span {
      color: #666;
    }
  }
`;

const LocationSpan = styled.span`
  word-break: keep-all;
  white-space: pre-wrap;
`;

export default DriverInfoModal;
