import React from "react";
import { StyledPapers } from "./styles";
import { Grid, Paper, Typography } from "@material-ui/core";

export default function Papers(props) {
  const { investments, t } = props;

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
              {t("You would have accumulated")}{" "}
              {parseFloat(accumulation).toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 4
              })}{" "}
              {type}
            </Typography>
            <Typography component="p">
              {t("This would value")}{" "}
              {value.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                currencyDisplay: "symbol"
              })}
            </Typography>
            <Typography component="p">
              {t("Your")} {profit > 0 ? t("profit") : t("deficit")}{" "}
              {t("would be")}{" "}
              {profit.toLocaleString("en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 0
              })}
              %
            </Typography>
            <Typography component="p">
              {t("And you would have invested")}{" "}
              {invested.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                currencyDisplay: "symbol"
              })}
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
            investment={t("Investing in Bitcoin")}
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
            investment={`${t("Investing in")} ${investments.symbol}`}
            accumulation={investments.stockTotal}
            icon="stocks"
            value={
              investments.chart[investments.chart.length - 1]
                .investment_total_stock
            }
            invested={investments.invested}
            type={t("shares")}
          />
        </Grid>
      </Grid>
    </StyledPapers>
  );
}
