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
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";

import * as moment from "moment";
import Papers from "./papers";
import { Typography } from "@material-ui/core";
import { withRouter } from "react-router";

function Chart(props) {
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

  // Full URL
  const url = `https://www.lightningboost.info/${props.history.location.search}`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%"
      }}
    >
      <div className="section">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={chartContent.content.chart}
            //data={data}
            margin={{ top: 5, bottom: 5, left: 5 }}
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
            />
            <Area
              name={`Total invested in ${chartContent.content.symbol}`}
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
      <div className="section">
        <Papers investments={chartContent.content} />
      </div>
      <div>
        <Typography align="center">Share this simulation</Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FacebookShareButton
            url={url}
            quote={`See how bitcoin compares against $${chartContent.content.symbol}`}
          >
            <FacebookIcon size={24} round={true} />
          </FacebookShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={24} round={true} />
          </LinkedinShareButton>
          <TwitterShareButton
            url={url}
            title={`See how bitcoin compares against $${chartContent.content.symbol}`}
          >
            <TwitterIcon size={24} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton
            url={url}
            title={`See how bitcoin compares against $${chartContent.content.symbol}`}
          >
            <WhatsappIcon size={24} round={true} />
          </WhatsappShareButton>
          <RedditShareButton
            url={url}
            title={`See how bitcoin compares against $${chartContent.content.symbol}`}
          >
            <RedditIcon size={24} round={true} />
          </RedditShareButton>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Chart);
