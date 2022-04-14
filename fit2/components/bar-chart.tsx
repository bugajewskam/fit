import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

export default function BarGraph({ data, bars }) {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis type="number" />
        <Tooltip />
        <Legend />
        {bars.map((bar) => (
          <Bar dataKey={bar.key} fill={bar.fill} name={bar.name} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
