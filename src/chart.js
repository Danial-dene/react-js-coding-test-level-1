import React from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
} from "recharts";

const Chart = ({ stats }) => {
  const data = stats.map((obj) => ({
    name: obj.stat.name,
    base_stat: obj.base_stat,
  }));

  return (
    <BarChart
      width={500}
      height={200}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="base_stat" fill="#8884d8" />
    </BarChart>
  );
};

export default Chart;
