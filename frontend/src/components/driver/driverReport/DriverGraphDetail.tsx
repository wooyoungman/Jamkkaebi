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
  Title
);

const DriverGraphDetail: React.FC = () => {
  const labels = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (13 - i));
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });

  const dataValues = Array.from({ length: 14 }, () =>
    Math.floor(Math.random() * 101)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "집중 지수",
        data: dataValues,
        borderColor: "rgba(155, 246, 45, 1)", // 라인 색상
        backgroundColor: "rgba(155, 246, 45, 0.2)", // 라인 아래의 배경 색상
        fill: true, // 라인 아래에 배경 색상 채우기
        tension: 0.4, // 곡선의 부드러운 정도
        pointBackgroundColor: "rgba(155, 246, 45, 1)", // 포인트 색상
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "최근 14일간 집중 지수 변화",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "날짜",
        },
      },
      y: {
        title: {
          display: true,
          text: "집중 지수",
        },
        min: 0,
        max: 100,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default DriverGraphDetail;
