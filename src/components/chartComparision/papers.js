import React from "react";
import { StyledPapers } from "./styles";
import { Grid, Paper, Typography } from "@material-ui/core";

export default function Papers(props) {
  const { investments } = props;

  function CreatePapers(props) {
    const { accumulation, icon, invested, investment, value, type } = props;
    const profit = (value / invested - 1) * 100;

    return (
      <Paper className="paper">
        <Grid container alignItems="center" spacing={2} wrap="nowrap">
          <Grid item>
            <img
              src={require(`../../assets/icons/${icon}.svg`)}
              alt="bitcoin icon"
              width={48}
            />
          </Grid>
          <Grid item>
            <Typography variant="h6">{investment}</Typography>
            <Typography component="p">
              You would have accumulated{" "}
              {parseFloat(accumulation).toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 4
              })}{" "}
              {type}
            </Typography>
            <Typography component="p">
              This would value{" "}
              {value.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                currencyDisplay: "symbol"
              })}
            </Typography>
            <Typography component="p">
              Your {profit > 0 ? "profit" : "deficit"} would be{" "}
              {profit.toLocaleString("en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 0
              })}
              %
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  return (
    <StyledPapers>
      <Grid container spacing={2} justify="space-between">
        <Grid item>
          <CreatePapers
            investment={"Investing in Bitcoin"}
            accumulation={investments.btcTotal}
            icon="bitcoin"
            value={
              investments.chart[investments.chart.length - 1]
                .investment_total_btc
            }
            invested={investments.invested}
            type="bitcoins"
          />
        </Grid>
        <Grid item>
          <CreatePapers
            investment={`Investing in ${investments.symbol}`}
            accumulation={investments.stockTotal}
            icon="stocks"
            value={
              investments.chart[investments.chart.length - 1]
                .investment_total_stock
            }
            invested={investments.invested}
            type="stocks"
          />
        </Grid>
      </Grid>
    </StyledPapers>
  );
}
