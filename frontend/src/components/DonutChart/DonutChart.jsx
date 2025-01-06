import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./DonutChart.css";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DONE_COLORS = [
  "rgb(119,25,246)",
  "rgb(240,175,64)",
  "rgb(233,78,82)",
  "rgb(233,78,246)",
  "rgb(247,215,216)",
  "rgb(250,238,216)",
  "rgb(225,94,136)",
];

const DonutChart = ({ doneTasks }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!doneTasks) {
      doneTasks = [];
    }

    if (doneTasks.length === 0) {
      setChartData({
        labels: ["No tasks done"],
        datasets: [
          {
            label: "Empty",
            data: [1],
            backgroundColor: ["#e0e0e0"],
            hoverBackgroundColor: ["#c0c0c0"],
          },
        ],
      });
      return;
    }

    const labels = doneTasks.map((task) => task.name);
    const data = doneTasks.map(() => 1);
    const backgroundColor = doneTasks.map(
      (_, idx) => DONE_COLORS[idx % DONE_COLORS.length]
    );
    const hoverBackgroundColor = doneTasks.map(
      (_, idx) => DONE_COLORS[idx % DONE_COLORS.length]
    );

    setChartData({
      labels,
      datasets: [
        {
          label: "Done Tasks",
          data,
          backgroundColor,
          hoverBackgroundColor,
        },
      ],
    });
  }, [doneTasks]);

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  return (
    <div className="donut-chart-container">
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            datalabels: {
              color: "#000",
              font: {
                size: 50, // 아이콘 크기
                weight: "bold",
              },
              formatter: (value, context) => {
                const label = context.chart.data.labels[context.dataIndex];
                return label;
              },
              anchor: "end",
              align: "end",
              offset: 15, // 도넛 바깥쪽으로 얼마나 떨어질지
            },
            legend: {
              display: false,
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
          cutout: "70%", // 도넛 차트 가운데 두께
        }}
      />
    </div>
  );
};

export default DonutChart;
