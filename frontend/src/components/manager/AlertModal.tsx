// 졸음 일어났을 때 나오는 알림 모달
// 추후에 여기서 운전자 쪽 차량 컨트롤 할 수 있는 기능도 추가
import styled from "styled-components";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  driverName: string;
  eventTime: string;
  eventLocation: string;
}

const AlertModal = ({
  isOpen,
  onClose,
  driverName,
  eventTime,
  eventLocation,
}: AlertModalProps) => {
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
          <p>발생위치: {eventLocation}</p>
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

export default AlertModal;
