import React, { useEffect, useState } from "react";
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
import { useAtom } from "jotai";
import {
  driverStateDataAtom,
  isFastAPISuccessAtom,
  serverDriverStateDataAtom,
} from "@/atoms/driver/socket";

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

interface DriverGraphDetailProps {
  // xFontSize: number;
  xTickSize: number;
  yFontSize: number;
  yTickSize: number;
}

const DriverGraphDetail: React.FC<DriverGraphDetailProps> = ({
  // xFontSize,
  xTickSize,
  yFontSize,
  yTickSize,
}) => {
  const [driverStateData] = useAtom(driverStateDataAtom);
  const [serverDriverStateData] = useAtom(serverDriverStateDataAtom);
  const [isFastAPISuccess] = useAtom(isFastAPISuccessAtom);

  // 현재 사용할 데이터 결정
  const activeData = isFastAPISuccess ? driverStateData : serverDriverStateData;

  // 실시간 데이터를 저장할 상태 배열
  const [attentionValues, setAttentionValues] = useState<number[]>([]);
  const [meditationValues, setMeditationValues] = useState<number[]>([]);

  useEffect(() => {
    if (activeData?.predictions) {
      // 집중도(attention) 업데이트
      setAttentionValues((prev) => {
        if (activeData.predictions.attention !== null) {
          const updated = [...prev, activeData.predictions.attention];
          return updated.slice(-25); // 최근 25개의 데이터만 유지
        }
        return prev; // `null`이면 이전 상태를 유지
      });

      // 졸음도(meditation) 업데이트
      setMeditationValues((prev) => {
        if (activeData.predictions.meditation !== null) {
          const updated = [...prev, activeData.predictions.meditation];
          return updated.slice(-25); // 최근 25개의 데이터만 유지
        }
        return prev; // `null`이면 이전 상태를 유지
      });
    }
  }, [activeData?.predictions]);

  const labels = Array.from(
    { length: attentionValues.length },
    (_, i) => `${i + 1}`
  );

  const data = {
    labels,
    datasets: [
      {
        label: "집중 지수",
        data: attentionValues,
        borderColor: "rgba(155, 246, 45, 1)",
        backgroundColor: "rgba(155, 246, 45, 0.3)",
        fill: "origin",
        tension: 0.2,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: "졸음 지수",
        data: meditationValues,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        fill: "origin",
        tension: 0.2,
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
          font: {
            size: xTickSize, // 객체로 감싸서 전달
          },
        },
      },
    },
    scales: {
      // x: {
      //   title: {
      //     display: true,
      //     text: "시간대",
      //     color: "#e0e0e0",
      //     font: {
      //       size: xFontSize,
      //     },
      //   },
      //   ticks: {
      //     color: "#e0e0e0",
      //     font: {
      //       size: xTickSize,
      //     },
      //   },
      //   grid: {
      //     display: false,
      //   },
      //   border: {
      //     display: false,
      //   },
      // },
      x: {
        display: false, // x축 완전히 제거
      },
      y: {
        title: {
          display: true,
          text: "수치",
          color: "#e0e0e0",
          font: {
            size: yFontSize,
          },
        },
        ticks: {
          color: "#e0e0e0",
          font: {
            size: yTickSize,
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
