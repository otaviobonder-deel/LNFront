import React from "react";
import {
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line
} from "recharts";

export default function Chart(props) {
  const { chartContent } = props;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ComposedChart
        width={600}
        height={300}
        data={chartContent.content.chart}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="investment_total_btc"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Area
          type="monotone"
          dataKey="investment_total_stock"
          stroke="#82ca9d"
        />
        <Line dataKey="invested" type="monotone" stroke="#ff0000" dot={false} />
      </ComposedChart>
    </div>
  );
}
