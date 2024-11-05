// 운전자 정보 모달(in 지도)
import styled from "styled-components";
import { useState, useEffect } from "react";

interface DriverInfo {
  id: string;
  name: string;
  vehicleNumber: string;
  status: string;
  location: {
    lat: number;
    lng: number;
  };
  sleepEvents: number;
  lastUpdate: string;
}

interface DriverInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: DriverInfo;
}

const DriverInfoModal = ({ isOpen, onClose, driver }: DriverInfoModalProps) => {
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    // 여기서 Tmap API를 사용하여 위도/경도를 주소로 변환
    const fetchAddress = async () => {
      try {
        // Tmap 역지오코딩 API 호출
        // 예: const response = await tmapAPI.reverseGeocode(driver.location);
        // setAddress(response.address);

        // 임시로 "주소 로딩 중..." 표시
        setAddress("서울시 강남구 삼성동 123-45");
      } catch (error) {
        setAddress("주소를 불러올 수 없습니다");
      }
    };

    if (isOpen) {
      fetchAddress();
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
            <span>{driver.name}</span>
          </div>
          <div>
            <label>차량번호:</label>
            <span>{driver.vehicleNumber}</span>
          </div>
          <div>
            <label>상태:</label>
            <span>{driver.status}</span>
          </div>
          <div>
            <label>현재위치:</label>
            <span>{address}</span>
          </div>
          <div>
            <label>최종업데이트:</label>
            <span>{driver.lastUpdate}</span>
          </div>
        </DriverInfoModal.Body>
      </DriverInfoModal.Content>
    </DriverInfoModal.Overlay>
  );
};

// 스타일 컴포넌트 부분은 동일하게 유지
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
    }
  }
`;

export default DriverInfoModal;
