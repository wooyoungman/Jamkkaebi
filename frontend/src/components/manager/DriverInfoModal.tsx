import styled from "styled-components";
import { DriverState, DriverWithRoute } from "@interfaces/manager";

interface DriverInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: DriverWithRoute;
  realtimeState?: DriverState;
}

const DriverInfoModal = ({ isOpen, onClose, driver }: DriverInfoModalProps) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 졸음 운전 감지 횟수 계산
  const sleepEvents = driver.deliveryInfo.route_sleep.features.length;

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
            <span>{driver.status}</span>
          </div>
          <div>
            <label>출발지:</label>
            <span>{driver.deliveryInfo.origin}</span>
          </div>
          <div>
            <label>도착지:</label>
            <span>{driver.deliveryInfo.destination}</span>
          </div>
          <div>
            <label>출발 시간:</label>
            <span>{formatDate(driver.deliveryInfo.departureDate)}</span>
          </div>
          <div>
            <label>도착 예정:</label>
            <span>{formatDate(driver.deliveryInfo.arrivalDate)}</span>
          </div>
          <div>
            <label>총 이동거리:</label>
            <span>{Math.round(driver.deliveryInfo.length / 1000)}km</span>
          </div>
          <div>
            <label>졸음운전 감지:</label>
            <span>{sleepEvents}회</span>
          </div>
          <div>
            <label>낮은 집중도 구간:</label>
            <span>
              {driver.deliveryInfo.route_low_focus.features.length}구간
            </span>
          </div>
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

export default DriverInfoModal;
