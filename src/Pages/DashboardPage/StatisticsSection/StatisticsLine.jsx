import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatisticsLine = () => {
  const data = [
    {
      month: 1,
      count: 30,
    },
    {
      month: 2,
      count: 20,
    },
    {
      month: 3,
      count: 70,
    },
    {
      month: 4,
      count: 80,
    },
    {
      month: 5,
      count: 20,
    },
    {
      month: 6,
      count: 20,
    },
    {
      month: 7,
      count: 90,
    },
  ];
  const options = {
    scales: {
      x: {
        ticks: {
          font: {
            size: 14,
          },
          color: "black",
        },
      },
    },
    y: {
      ticks: {
        font: {
          size: 15,
        },
        color: "black",
      },
    },

    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        color: "rgb(108, 115, 127)",
        text: "Number of Question Per Month",
        font: {
          size: 20,
          family: "Poppins, sans-serif",
        },
      },
    },
  };

  const labels = data.map((item) => {
    return item.month;
  });

  const predictdata = {
    labels,
    datasets: [
      {
        label: "actual",
        borderColor: "rgb(53, 162, 235)",
        data: data.map((item) => {
          return item.count;
        }),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <Line style={{ width: "100%" }} options={options} data={predictdata} />
  );
};

export default StatisticsLine;
