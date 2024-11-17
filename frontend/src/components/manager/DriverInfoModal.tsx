import styled from "styled-components";
import { DriverState, RealTimeDriver } from "@interfaces/manager";

interface DriverInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: RealTimeDriver;
  realtimeState?: DriverState;
}

const DriverInfoModal = ({ isOpen, onClose, driver, realtimeState }: DriverInfoModalProps) => {
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
            <span>{driver.status}</span>
          </div>
          <div>
            <label>현재 위치:</label>
            <span>
              {driver.location.lat.toFixed(6)}, {driver.location.lng.toFixed(6)}
            </span>
          </div>
          {realtimeState && (
            <>
              <div>
                <label>졸음 수준:</label>
                <span>{realtimeState.drowsy_level}</span>
              </div>
              <div>
                <label>집중도:</label>
                <span>{(realtimeState.concentration_level * 100).toFixed(1)}%</span>
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

export default DriverInfoModal;