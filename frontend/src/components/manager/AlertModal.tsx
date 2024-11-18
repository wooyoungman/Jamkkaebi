import styled from "styled-components";
import { useState, useEffect } from "react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  driverName: string;
  eventTime: string;
  eventLocation: {
    lat: number;
    lng: number;
  };
}

const AlertModal = ({
  isOpen,
  onClose,
  driverName,
  eventTime,
  eventLocation,
}: AlertModalProps) => {
  const [address, setAddress] = useState<string>("주소 검색 중...");

  // Tmap 역지오코딩 함수
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
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
        const fullAddress = data.addressInfo.fullAddress;
        setAddress(fullAddress);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("주소를 불러올 수 없습니다");
    }
  };

  useEffect(() => {
    if (isOpen && eventLocation) {
      reverseGeocode(eventLocation.lat, eventLocation.lng);
    }
  }, [isOpen, eventLocation]);

  if (!isOpen) return null;

  return (
    <AlertModal.Overlay>
      <AlertModal.Content>
        <AlertModal.Header>
          <h2>⚠️ 졸음운전 감지</h2>
          <button onClick={onClose}>&times;</button>
        </AlertModal.Header>
        <AlertModal.Body>
          <p>
            <strong>{driverName}</strong> 운전자 졸음운전 감지
          </p>
          <p>발생시각: {eventTime}</p>
          <LocationInfo>
            발생위치: {address}
            <Coordinates>
              ({eventLocation.lat.toFixed(6)}, {eventLocation.lng.toFixed(6)})
            </Coordinates>
          </LocationInfo>
        </AlertModal.Body>
        <AlertModal.Footer>
          <button onClick={onClose}>확인</button>
        </AlertModal.Footer>
      </AlertModal.Content>
    </AlertModal.Overlay>
  );
};

AlertModal.Overlay = styled.div`
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

AlertModal.Content = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
`;

AlertModal.Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    color: #ff4444;
  }

  button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
`;

AlertModal.Body = styled.div`
  margin-bottom: 20px;

  p {
    margin: 10px 0;
  }
`;

AlertModal.Footer = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    padding: 8px 16px;
    background-color: #ff4444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #ff6666;
    }
  }
`;

const LocationInfo = styled.p`
  margin: 10px 0;
  word-break: keep-all;
  white-space: pre-wrap;
`;

const Coordinates = styled.span`
  display: block;
  font-size: 0.8em;
  color: #666;
  margin-top: 4px;
`;

export default AlertModal;
