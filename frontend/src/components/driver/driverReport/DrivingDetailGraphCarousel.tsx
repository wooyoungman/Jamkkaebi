import { useState } from "react";
import {
  DrivingDetailGraphDiv,
  ConditionGraphWrapper,
  ConditionGraphDiv,
  CustomGlassDiv,
} from "./DriverReportCSS";
import DriverConditionGraph from "../driverMain/DriverConditionGraph";
import { DriverText } from "../driverMain/DriverMainCSS";
import styled from "styled-components";
import DriverGraphDetail from "./DriverGraphDetail";

const IndicatorContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const IndicatorButton = styled(CustomGlassDiv)<{ $isActive: boolean }>`
  width: 15px;
  height: 4px;
  border-radius: 5px;
  background: ${({ $isActive }) =>
    $isActive
      ? "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%)"
      : "rgba(255, 255, 255, 0.5)"};
  box-shadow: ${({ $isActive }) =>
    $isActive
      ? "0px 0px 8px rgba(255, 255, 255, 0.8)" // 활성화 시 추가된 글로우 효과
      : "none"};
  transition:
    background 0.3s ease,
    transform 0.3s ease;
  cursor: pointer;
`;

const DrivingDetailGraphCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const graphData = [
    {
      content: (
        <ConditionGraphWrapper>
          <ConditionGraphDiv>
            <DriverConditionGraph graphType="concentration" score={34} />
          </ConditionGraphDiv>
          <ConditionGraphDiv>
            <DriverConditionGraph graphType="drowsy" score={72} />
          </ConditionGraphDiv>
        </ConditionGraphWrapper>
      ),
      title: "당일 평균 집중/졸음 지수",
    },
    {
      content: (
        <ConditionGraphWrapper>
          <DriverGraphDetail
            // xFontSize={10}
            xTickSize={10}
            yFontSize={10}
            yTickSize={10}
          />
        </ConditionGraphWrapper>
      ),
      title: "당일 집중 /졸음 지수 변화 추이",
    },
  ];

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <DrivingDetailGraphDiv>
        <DriverText fontSize="15px" fontWeight={700}>
          {graphData[currentIndex].title}
        </DriverText>
        {graphData[currentIndex].content}

        <IndicatorContainer>
          {graphData.map((_, index) => (
            <IndicatorButton
              key={index}
              $isActive={index === currentIndex}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </IndicatorContainer>
      </DrivingDetailGraphDiv>
    </>
  );
};

export default DrivingDetailGraphCarousel;
