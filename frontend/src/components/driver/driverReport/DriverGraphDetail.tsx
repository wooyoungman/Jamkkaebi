import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Filler
);

const DriverGraphDetail: React.FC = () => {
  const labels = Array.from({ length: 25 }, (_, i) => `${i}:00`);
  const concentrateValues = Array.from({ length: 25 }, () =>
    Math.floor(Math.random() * 101)
  );

  const drowsyeValues = Array.from({ length: 25 }, () =>
    Math.floor(Math.random() * 101)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "집중 지수",
        data: concentrateValues,
        borderColor: "rgba(155, 246, 45, 1)",
        backgroundColor: "rgba(155, 246, 45, 0.3)",
        fill: "origin",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: "졸음 지수",
        data: drowsyeValues,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        fill: "origin",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    // responsive: true,
    maintainAspectRatio: false, // 이 옵션을 false로 설정하여 원하는 높이와 너비를 지정할 수 있도록 함
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          color: "#e0e0e0",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "시간대",
          color: "#e0e0e0",
          font: {
            size: 12,
          },
        },
        ticks: {
          color: "#e0e0e0",
          font: {
            size: 11,
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "수치",
          color: "#e0e0e0",
          font: {
            size: 12,
          },
        },
        ticks: {
          color: "#e0e0e0",
          font: {
            size: 11,
          },
        },
        grid: {
          color: function (context: any) {
            const value = context.tick.value;
            return value === 20 || value === 60 || value === 100
              ? "#e0e0e0"
              : "transparent";
          },
          lineWidth: 0.5,
        },
        border: {
          display: false,
        },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "calc(100% - 25px)", zIndex: 1 }}>
      <Line
        data={data}
        options={options}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default DriverGraphDetail;
