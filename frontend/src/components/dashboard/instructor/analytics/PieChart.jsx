import React from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const PieChart = ({ pieType }) => {
  const getRandomColors = (numOfColors) => {
    const colors = [];

    for (let i = 0; i < numOfColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`;

      colors.push(color);
    }

    return colors;
  };

  const getRandomValues = (numOfValues) => {
    const numbers = [];

    for (let i = 0; i < numOfValues; i++) {
      const value = Math.floor(Math.random() * 120);
      numbers.push(value);
    }

    return numbers;
  };

  const data1 = {
    labels: ["Python", "Web Development"],
    datasets: [
      {
        data: getRandomValues(2),
        backgroundColor: getRandomColors(2),
      },
    ],
  };
  const data2 = {
    labels: ["Python", "Web Development"],
    datasets: [
      {
        data: getRandomValues(2),
        backgroundColor: getRandomColors(2),
      },
    ],
  };

  return (
    <div className="max-w-[350px] mx-auto">
      <Pie
        data={pieType === "students" ? data1 : data2}
        options={{
          // aspectRatio: 1 | 2,
          layout: {
            autoPadding: false,
          },
          responsive: true,
          // maintainAspectRatio:false,
          plugins: {
            legend: {
              position: "right",

              labels: {
                boxWidth: 10,
                boxHeight: 10,
                color: "#DBDDEA",
                font: {
                  size: 16,
                },
              },
            },
          },
        }}
        onResize={(res) => console.log(res)}
      />
    </div>
  );
};

export default PieChart;
