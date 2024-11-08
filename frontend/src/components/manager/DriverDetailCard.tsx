import styled from "styled-components";
import { DrowsyEvent } from "@/interfaces/manager";

interface DriverDetailCardProps {
  event: DrowsyEvent;
  isSelected: boolean;
  onClick: () => void;
}

const DriverDetailCard = ({
  event,
  isSelected,
  onClick,
}: DriverDetailCardProps) => {
  return (
    <CardWrapper isSelected={isSelected} onClick={onClick}>
      <ProfileSection>
        <ProfileImage src={event.profileImage} alt={event.driverName} />
        <UserInfo>
          <NameText>{event.driverName}</NameText>
          <SubInfo>
            {event.age} / {event.gender}
          </SubInfo>
        </UserInfo>
        <TimeStamp>
          <span>발생일시</span>
          {"\n"}
          {event.timestamp}
        </TimeStamp>
      </ProfileSection>

      <StatsList>
        <StatItem>
          <StatLabel>졸음 횟수</StatLabel>
          <ProgressBarWrapper>
            <ProgressBar count={event.drowsyCount} color="#4A47D6" />
            <CountText blue>{event.drowsyCount}회</CountText>
          </ProgressBarWrapper>
        </StatItem>

        <StatItem>
          <StatLabel>졸음 시간</StatLabel>
          <ProgressBarWrapper>
            <ProgressBar count={event.drowsyTime / 2} color="#FF4141" />
            <CountText red>{event.drowsyTime}초 이상</CountText>
          </ProgressBarWrapper>
        </StatItem>

        <StatItem>
          <StatLabel>피로도</StatLabel>
          <ProgressBarWrapper>
            <ProgressBar
              count={
                event.fatigueLevel === "강함"
                  ? 5
                  : event.fatigueLevel === "보통"
                    ? 3
                    : 1
              }
              color={event.fatigueLevel === "강함" ? "#FF4141" : "#FFA927"}
            />
            <CountText
              red={event.fatigueLevel === "강함"}
              orange={event.fatigueLevel === "보통"}
            >
              {event.fatigueLevel}
            </CountText>
          </ProgressBarWrapper>
        </StatItem>
      </StatsList>
    </CardWrapper>
  );
};

const CardWrapper = styled.div<{ isSelected: boolean }>`
  padding: 20px;
  border-radius: 16px;
  background: ${({ isSelected }) => (isSelected ? "#F0EFFF" : "#FFFFFF")};
  border: ${({ isSelected }) =>
    isSelected ? "7px solid rgba(97, 74, 211, 0.80)" : "1px solid #E8E8E8"};
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: #e8e8e8;
  margin-right: 12px;
`;

const UserInfo = styled.div`
  flex: 2;
`;

const NameText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 4px;
`;

const SubInfo = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
`;

const TimeStamp = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  white-space: pre-line;

  span {
    display: inline-block;
    color: black;
    margin-bottom: 4px;
  }
`;

const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StatItem = styled.div``;

const StatLabel = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 8px;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const ProgressBar = styled.div<{ count: number; color: string }>`
  height: 8px;
  flex: 1;
  background: #e8e8e8;
  border-radius: 4px;
  position: relative;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ count }) => Math.min(count * 20, 100)}%;
    background: ${({ color }) => color};
    border-radius: 4px;
  }
`;

const CountText = styled.span<{
  blue?: boolean;
  red?: boolean;
  orange?: boolean;
}>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ blue, red, orange }) =>
    blue ? "#4A47D6" : red ? "#FF4141" : orange ? "#FFA927" : "#000000"};
  min-width: 60px;
`;

export default DriverDetailCard;
