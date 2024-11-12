import React from "react";
import { useNavigate } from "react-router-dom";
import { Car, UserCog } from "lucide-react";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    to bottom,
    rgb(239, 246, 255),
    rgb(219, 234, 254)
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const HeaderWrapper = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: rgb(30, 58, 138);
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: rgb(29, 78, 216);
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 56rem;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const StyledCardContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconWrapper = styled.div<{ variant: "driver" | "manager" }>`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 9999px;
  background-color: ${(props) =>
    props.variant === "driver" ? "rgb(219, 234, 254)" : "rgb(220, 252, 231)"};
  transition: all 0.3s;

  ${StyledCard}:hover & {
    background-color: ${(props) =>
      props.variant === "driver" ? "rgb(191, 219, 254)" : "rgb(187, 247, 208)"};
  }
`;

const StyledIcon = styled.div<{ variant: "driver" | "manager" }>`
  color: ${(props) =>
    props.variant === "driver" ? "rgb(37, 99, 235)" : "rgb(22, 163, 74)"};
`;

const CardTitle = styled.h2<{ variant: "driver" | "manager" }>`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${(props) =>
    props.variant === "driver" ? "rgb(30, 58, 138)" : "rgb(20, 83, 45)"};
`;

const CardText = styled.p<{ variant: "driver" | "manager" }>`
  text-align: center;
  color: ${(props) =>
    props.variant === "driver" ? "rgb(37, 99, 235)" : "rgb(22, 163, 74)"};
`;

type RoleType = "driver" | "manager";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: RoleType): void => {
    navigate(`/${role}`);
  };

  return (
    <Container>
      <HeaderWrapper>
        <Title>차량 관리 시스템</Title>
        <Subtitle>역할을 선택하여 시작하세요</Subtitle>
      </HeaderWrapper>

      <CardGrid>
        <StyledCard onClick={() => handleRoleSelect("driver")}>
          <StyledCardContent>
            <IconWrapper variant="driver">
              <StyledIcon variant="driver">
                <Car size={48} />
              </StyledIcon>
            </IconWrapper>
            <CardTitle variant="driver">운전자</CardTitle>
            <CardText variant="driver">
              • 내비게이션
              <br />
              • 차량 제어
              <br />
              • 보고서 작성
              <br />• 온도 관리
            </CardText>
          </StyledCardContent>
        </StyledCard>

        <StyledCard onClick={() => handleRoleSelect("manager")}>
          <StyledCardContent>
            <IconWrapper variant="manager">
              <StyledIcon variant="manager">
                <UserCog size={48} />
              </StyledIcon>
            </IconWrapper>
            <CardTitle variant="manager">관리자</CardTitle>
            <CardText variant="manager">
              • 대시보드
              <br />
              • 운전자 관리
              <br />
              • 보고서 확인
              <br />• 이력 관리
            </CardText>
          </StyledCardContent>
        </StyledCard>
      </CardGrid>
    </Container>
  );
};

export default LandingPage;
