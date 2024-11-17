import { GraphText } from "./DriverMainCSS";
import { DriverText } from "./DriverMainCSS";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DriverConditionGraphProps {
  graphType: string;
  score: number;
}

const DriverConditionGraph: React.FC<DriverConditionGraphProps> = ({
  graphType,
  score,
}) => {
  const outerData = {
    datasets: [
      {
        data: [100],
        // backgroundColor: ["rgba(88, 185, 10, 0.5)"],
        backgroundColor:
          graphType === "concentration"
            ? ["rgba(88, 185, 10, 0.2)"]
            : ["rgba(255, 15, 60, 0.2)"],
        borderColor: "transparent",
        borderRadius: [0],
        cutout: "85%",
      },
    ],
  };

  const innerData = {
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor:
          graphType === "concentration"
            ? ["#A5FF32", "transparent"]
            : ["#FF0F3C", "transparent"],
        borderColor: "transparent",
        borderRadius: [50, 0],
        cutout: "85%",
      },
    ],
  };

  const options = {
    // responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  const title = graphType === "concentration" ? "집중지수" : "졸음지수";

  return (
    // <ConditionGraphDiv>
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // backgroundColor: "white",
        }}
      >
        <Doughnut data={outerData} options={options} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Doughnut data={innerData} options={options} />
      </div>

      <GraphText>
        <DriverText
          color={graphType === "concentration" ? "#9BF62D" : "#FF5172"}
          // fontSize="calc(max(1.1vw, 14px))"
          fontSize="20px"
          fontWeight={700}
        >
          {title}
        </DriverText>
        {/* <DriverText fontSize="calc(max(1.3vw, 17px))" fontWeight={700}> */}
        <DriverText fontSize="25px" fontWeight={700}>
          100
        </DriverText>
        <DriverText
          color={graphType === "concentration" ? "#9BF62D" : "#FF5172"}
          // fontSize="calc(max(4vw, 65px))"
          fontSize="70px"
          fontWeight={700}
          style={{ marginTop: "-0.6vw" }}
        >
          {score}
        </DriverText>
      </GraphText>
    </>
    // </ConditionGraphDiv>
  );
};

export default DriverConditionGraph;
