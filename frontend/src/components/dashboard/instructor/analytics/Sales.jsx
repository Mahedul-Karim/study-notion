import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Sales = () => {
  const data = [
    {
      name: "Jan",
      student: 27,
      completed:14
    },
    {
      name: "Feb",
      student: 13,
      completed:3
    },
    {
      name: "Mar",
      student: 39,
      completed:24
    },
    {
      name: "April",
      student: 25,
      completed:8
    },
    {
      name: "May",
      student: 68,
      completed:44
    },
  ];
  return (
    <ResponsiveContainer width={"100%"} minHeight={300}>
      <AreaChart data={data}>
        <XAxis dataKey="name" />
        <YAxis dataKey={"student"} />
        <CartesianGrid strokeDasharray={"4"} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="completed"
          stroke="#8884d8"
          fillOpacity={0.2}
          strokeWidth={2}
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="student"
          stroke="#82ca9d"
          strokeWidth={2}
          fillOpacity={0.2}
          fill="#82ca9d"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Sales;
