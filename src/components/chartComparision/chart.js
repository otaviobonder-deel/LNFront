import React from "react";
import {
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Line
} from "recharts";

import * as moment from "moment";

export default function Chart(props) {
  const { chartContent } = props;

  // format date
  function formatDate(tickItem) {
    return moment(tickItem).format("MMM Do YY");
  }

  // format currency
  function formatYAxis(tickItem) {
    return parseInt(tickItem).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    });
  }

  // function to format tooltip
  function formatTooltip(value, name, props) {
    return parseInt(value).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    });
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={chartContent.content.chart}
          margin={{ top: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorBtc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff9500" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff9500" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00a1e4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00a1e4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tickFormatter={formatDate} />
          <YAxis tickFormatter={formatYAxis} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip formatter={formatTooltip} labelFormatter={formatDate} />
          <Legend />
          <Area
            name="Total invested in BTC"
            type="monotone"
            dataKey="investment_total_btc"
            stroke="#ff9500"
            fillOpacity={1}
            fill="url(#colorBtc)"
            activeDot={{ r: 8 }}
          />
          <Area
            name="Total invested in stock"
            type="monotone"
            dataKey="investment_total_stock"
            stroke="#00a1e4"
            fillOpacity={1}
            fill="url(#colorStock)"
          />
          <Line
            name="Total invested in $"
            dataKey="invested"
            type="monotone"
            stroke="#ff0000"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
