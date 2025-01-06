import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./DonutChart.css";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DonutChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["🧹", "🍳", "🧼", "Mow the lawn", "♻️"],
    datasets: [
      {
        label: "Breakdown",
        data: [55, 32.7, 12.3, 10, 20],
        backgroundColor: ["#FFD166", "#6A4C93", "#EF476F"],
        hoverBackgroundColor: ["#FFB100", "#522D6C", "#D43E5B"],
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: prev.datasets[0].data.map(() => Math.random() * 100),
          },
        ],
      }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="donut-chart-container">
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            datalabels: {
              color: "#000", // 텍스트 색상
              font: {
                size: 80, // 텍스트 크기
                weight: "bold",
              },
              formatter: (value, context) => {
                const label = context.chart.data.labels[context.dataIndex];
                const percentage = (
                  (value / context.dataset.data.reduce((a, b) => a + b)) *
                  100
                ).toFixed(1);
                return `${label}`; // 예: "Shopping: 51%"
              },
              anchor: "end", // 텍스트 위치 조정
              align: "end", // 텍스트 정렬
              offset: 10, // 도넛 바깥쪽으로 얼마나 떨어질지
            },
            legend: {
              display: false, // 기본 범례 제거 (필요 시 유지)
            },
          },
          layout: {
            padding: {
              top: 0,
              bottom: 0,
              left: 200,
              right: 200,
            }, // 차트 내부 여백 추가
          },
          maintainAspectRatio: false,
          cutout: "70%", // 도넛 두께 조정
        }}
      />
    </div>
  );
};

export default DonutChart;
