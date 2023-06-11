import React, { useContext, useEffect, useState } from "react";
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
import AuthContext from "../../../Components/Store/AuthProvider";
import axios from "axios";

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
  const authContext = useContext(AuthContext);
  const [questionsStatistics, setQuestionsStatistics] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://localhost:7127/api/statistics/questions-per-month`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${authContext.token}`,
          },
        })
        .then((response) => {
          setQuestionsStatistics(response.data);
        });
    };
    fetchData();
  }, [authContext]);

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

  const labels = questionsStatistics.map((item) => {
    return item.month;
  });

  const values = {
    labels,
    datasets: [
      {
        label: "actual",
        borderColor: "rgb(53, 162, 235)",
        data: questionsStatistics.map((item) => {
          return item.numOfQuestions;
        }),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Line style={{ width: "100%" }} options={options} data={values} />;
};

export default StatisticsLine;
