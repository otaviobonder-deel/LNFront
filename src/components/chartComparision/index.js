import React, { useEffect, useState } from "react";
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
import LoadingModal from "./loadingModal";
import debounce from "debounce-promise";
import { useLocation, withRouter } from "react-router-dom";

function ChartComparision(props) {
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
    date: moment().subtract(1, "y"),
    investment: ""
  });

  // check if there are query strings
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let qs = useQuery();
  let queries = {};
  useEffect(() => {
    if (qs.has("periodicity")) {
      queries.periodicity = qs.get("periodicity");
    }
    if (qs.has("start_date")) {
      queries.date = moment(qs.get("start_date"));
    }
    if (qs.has("symbol")) {
      queries.stock = { value: qs.get("symbol"), label: qs.get("symbol") };
    }
    if (qs.has("investment")) {
      queries.investment = qs.get("investment");
    }
    setQuery({ ...query, ...queries });
  }, []);

  // function to query stock
  function getAsyncOptions(inputValue) {
    return new Promise((resolve, reject) => {
      const results = api
        .get("/finance/stocksearch", {
          params: { keywords: inputValue }
        })
        .then(response => {
          if (!Object.keys(response.data).length) return [];
          return response.data;
        })
        .catch(() => {
          return { label: "Error loading stocks" };
        });
      resolve(results);
    });
  }
  const loadOptions = inputValue => getAsyncOptions(inputValue);
  const debouncedLoadOptions = debounce(loadOptions, 500, {
    leading: true
  });

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
    props.history.push(
      `/?periodicity=${query.periodicity}&start_date=${moment(
        query.date
      ).format("YYYY-MM-DD")}&symbol=${query.stock.value}&investment=${
        query.investment
      }`
    );
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
                minDate={new Date("2014-04-15")}
                openTo="year"
                maxDate={moment().subtract(1, "days")}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} md={4} className="input-grid">
            <div className={classes.root}>
              <NoSsr>
                <AsyncSelect
                  cacheOptions
                  loadOptions={debouncedLoadOptions}
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
          <Grid item xs={12} md={2} className="input-grid">
            <TextField
              id="investment"
              name="investment"
              label="Investment"
              type="number"
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
        {chart.received &&
          (chart.content !== {} ? <Chart chartContent={chart} /> : "Error")}
      </div>
      <LoadingModal open={chart.loading} />
    </StyledChartComparision>
  );
}

export default withRouter(ChartComparision);
