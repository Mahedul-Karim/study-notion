import React, { useState } from "react";

import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import PieChart from "./PieChart";

Chart.register(...registerables);

const Analytics = () => {
  const [pieType, setPieType] = useState("students");

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
    <main className="text-richblack-25">
      <h2 className="text-2xl font-semibold">Hi Himanshu</h2>
      <p className="text-sm text-richblack-300 my-1">
        Let&apos;s start something new
      </p>
      <div className="grid grid-cols-[1fr_0.4fr] gap-4 my-4">
        <div className="bg-richblack-800 rounded-md p-4">
          <div className="flex items-center justify-between">
            <p className="font-bold text-lg">Visualize</p>
            <div className="flex items-center gap-2">
              <button
                className={`${
                  pieType === "students" ? "bg-richblack-900 text-yellow" : ""
                }  px-3 py-2 rounded-md`}
                onClick={setPieType.bind(null, "students")}
              >
                Students
              </button>
              <button
                className={`${
                  pieType === "revenue" ? "bg-richblack-900 text-yellow" : ""
                }  px-3 py-2 rounded-md`}
                onClick={setPieType.bind(null, "revenue")}
              >
                Revenue
              </button>
            </div>
          </div>
          <PieChart />
        </div>
        <div className="bg-richblack-800 rounded-md p-4"></div>
      </div>
    </main>
  );
};

export default Analytics;
