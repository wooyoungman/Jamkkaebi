import { styled } from "styled-components";

interface DriverDetail {
  id: string;
  name: string;
  vehicleNumber: string;
  status: string;
  sleepEvents: number;
  lastLocation: string;
  lastUpdate: string;
}

interface DriverDetailCardProps {
  driver: DriverDetail;
  onClick: () => void;
  isSelected?: boolean;
}

const DriverDetailCard = ({
  driver,
  onClick,
  isSelected = false,
}: DriverDetailCardProps) => {
  return (
    <DriverDetailCard.Container onClick={onClick} isSelected={isSelected}>
      <DriverDetailCard.Header>
        <h3>{driver.name}</h3>
        <span>{driver.vehicleNumber}</span>
      </DriverDetailCard.Header>
      <DriverDetailCard.Body>
        <div>
          <label>상태:</label>
          <span>{driver.status}</span>
        </div>
        <div>
          <label>졸음운전 감지:</label>
          <span>{driver.sleepEvents}회</span>
        </div>
        <div>
          <label>최근위치:</label>
          <span>{driver.lastLocation}</span>
        </div>
        <div>
          <label>최종업데이트:</label>
          <span>{driver.lastUpdate}</span>
        </div>
      </DriverDetailCard.Body>
    </DriverDetailCard.Container>
  );
};

// 스타일 컴포넌트
DriverDetailCard.Container = styled.div<{ isSelected: boolean }>`
  background: ${({ isSelected }) => (isSelected ? "#f0f0f0" : "white")};
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

DriverDetailCard.Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  h3 {
    margin: 0;
    font-size: 18px;
  }

  span {
    color: #666;
  }
`;

DriverDetailCard.Body = styled.div`
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;

    label {
      color: #666;
    }

    span {
      font-weight: 500;
    }
  }
`;

export default DriverDetailCard;
