import React, { useState } from "react";
import { StyledChartComparision } from "./styles";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  NoSsr,
  Select,
  TextField,
  useTheme
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AsyncSelect from "react-select/async";
import api from "../../services/api";
import { components, useStyles } from "./selectComponents";
import * as moment from "moment";
import Chart from "./chart";

export default function ChartComparision(props) {
  // select stock styles
  const classes = useStyles();
  const theme = useTheme();
  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit"
      }
    })
  };

  // state for chart
  const [chart, setChart] = useState({
    loading: false,
    error: false,
    received: false,
    content: {}
  });

  // state for query
  const [query, setQuery] = useState({
    periodicity: "",
    stock: "",
    date: new Date(),
    investment: ""
  });

  // function to query stock
  async function queryStocks(inputValue) {
    return await api
      .get("/finance/stocksearch", {
        params: { keywords: inputValue }
      })
      .then(response => {
        return response.data;
      })
      .catch(() => {
        return { label: "Error loading stocks" };
      });
  }

  // function to handle selected stock option
  const handleSelectChange = selectedOption => {
    setQuery({ ...query, stock: selectedOption });
  };

  function handleChange(event) {
    setQuery({
      ...query,
      [event.target.name]: event.target.value
    });
  }

  const handleDateChange = date => {
    setQuery({ ...query, date: date });
  };

  // function to get simulation from API
  function simulate() {
    setChart({ ...chart, loading: true });

    function formatDate(date) {
      let month = "" + (moment(date).month() + 1),
        day = "" + moment(date).date(),
        year = moment(date).year();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }

    api
      .get("/finance/simulate", {
        params: {
          start_date: formatDate(query.date),
          investment: query.investment,
          periodicity: query.periodicity,
          symbol: query.stock.value
        }
      })
      .then(response =>
        setChart({
          loading: false,
          error: false,
          received: true,
          content: response.data
        })
      )
      .catch(() => setChart({ ...chart, error: true, loading: false }));
  }

  return (
    <StyledChartComparision>
      <div className="section">
        <Grid container spacing={2}>
          <Grid item xs={12} md={2} className="input-grid">
            <FormControl fullWidth>
              <InputLabel htmlFor="stock">Periodicity</InputLabel>
              <Select
                autoWidth
                value={query.periodicity}
                onChange={handleChange}
                inputProps={{
                  name: "periodicity",
                  id: "periodicity"
                }}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2} className="input-grid">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                fullWidth
                label="Starting date"
                value={query.date}
                onChange={handleDateChange}
                animateYearScrolling
                disableFuture
                format="MM/dd/yyyy"
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} md={3} className="input-grid">
            <div className={classes.root}>
              <NoSsr>
                <AsyncSelect
                  cacheOptions
                  loadOptions={queryStocks}
                  value={query.stock}
                  onChange={handleSelectChange}
                  placeholder="Type the stock"
                  noOptionsMessage={inputValue =>
                    inputValue.inputValue === ""
                      ? "Start typing the stock name"
                      : "Couldn't find any"
                  }
                  classes={classes}
                  styles={selectStyles}
                  components={components}
                  inputId="react-select-single"
                  TextFieldProps={{
                    label: "Stock",
                    InputLabelProps: {
                      htmlFor: "react-select-single",
                      shrink: true
                    }
                  }}
                />
              </NoSsr>
            </div>
          </Grid>
          <Grid item xs={12} md={3} className="input-grid">
            <TextField
              id="investment"
              name="investment"
              label="Investment"
              value={query.investment.toLocaleString("en-US")}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={2} className="input-grid">
            {Object.values(query).indexOf("") > -1 ? (
              <Button variant="contained" color="primary" fullWidth disabled>
                Simulate
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={simulate}
              >
                Simulate
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
      <div className="section">
        {chart.received && <Chart chartContent={chart} />}
      </div>
    </StyledChartComparision>
  );
}
