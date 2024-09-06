import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const ChartPie = () => {
  const data = [
    { name: "Python", students: 40,color:"#0088FE" },
    { name: "Web Development", students: 30,color:"#00C49F" },
    { name: "DevOps", students: 10,color:"#FFBB28" },
    { name: "JavaScript", students: 20,color:"#FF8042" },
  ];

  return (
    <div className="mx-auto mt-4">
      <ResponsiveContainer width={"100%"} minHeight={300}>
        <PieChart>
          <Pie data={data}  dataKey="students">
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={entry.color}
                stroke={entry.color}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="top" iconSize={10} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPie;
