import React, { useEffect } from "react";
import { Chart as GoogleChart } from "react-google-charts";

export default function Chart(props) {
  const { chartContent } = props;
  console.log(chartContent);

  const data = [["Date", "Stock", "Bitcoin"]];

  return (
    <div style={{ display: "flex" }}>
      <GoogleChart
        chartType="Line"
        loader={<div>Loading Chart</div>}
        data={data}
      />
    </div>
  );
}
