import React from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const PieChart = () => {
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

  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [250, 50, 300],
        backgroundColor: getRandomColors(3),
      },
    ],
  };

  return (
    <div className="max-w-[350px] mx-auto">
      <Pie
        data={data}
        options={{
          // aspectRatio: 1 | 2,
          layout:{
            autoPadding:false
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
                font:{
                  size:16
                }
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
