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
    Typography,
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
import { scroller } from "react-scroll";
import { useTranslation } from "react-i18next";

function ChartComparision(props) {
    // translation
    const { t } = useTranslation("chart");

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
    const initialState = {
        periodicity: "",
        stock: "",
        date: moment().subtract(1, "y"),
        investment: ""
    };

    // check if there are query strings
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let qs = useQuery();
    let queries = {
        periodicity: "",
        stock: "",
        date: "",
        investment: ""
    };

    if (qs.has("periodicity")) {
        queries.periodicity = qs.get("periodicity");
    }

    if (qs.has("start_date")) {
        queries.date = qs.get("start_date");
    }
    if (qs.has("symbol")) {
        queries.stock = { value: qs.get("symbol"), label: qs.get("symbol") };
    }
    if (qs.has("investment")) {
        queries.investment = qs.get("investment");
    }

    const [query, setQuery] = useState(
        receivedQueryString(queries) ? queries : initialState
    );

    useEffect(() => {
        if (receivedQueryString(query)) {
            simulate();
        }
    }, []);

    function receivedQueryString(query) {
        return (
            query.periodicity !== "" &&
            query.stock !== "" &&
            query.investment !== ""
        );
    }

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
                    return { label: t("Error loading stocks") };
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

        api.get("/finance/simulate", {
            params: {
                start_date: formatDate(query.date),
                investment: query.investment,
                periodicity: query.periodicity,
                symbol: query.stock.value
            }
        })
            .then(response => {
                if (response.data.btcTotal == Infinity) {
                    setChart({
                        loading: false,
                        error: true,
                        received: true,
                        content: []
                    });
                } else {
                    setChart({
                        loading: false,
                        error: false,
                        received: true,
                        content: response.data
                    });
                    scroller.scrollTo("chart", {
                        duration: 500,
                        smooth: "easeInOutQuad",
                        offset: 10
                    });
                }
            })
            .catch(() => setChart({ ...chart, error: true, loading: false }));
    }

    return (
        <StyledChartComparision name="chart">
            <div className="section">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={2} className="input-grid">
                        <FormControl fullWidth>
                            <InputLabel htmlFor="stock">
                                {t("Periodicity")}
                            </InputLabel>
                            <Select
                                autoWidth
                                value={query.periodicity}
                                onChange={handleChange}
                                inputProps={{
                                    name: "periodicity",
                                    id: "periodicity"
                                }}
                            >
                                <MenuItem value="daily">{t("Daily")}</MenuItem>
                                <MenuItem value="weekly">
                                    {t("Weekly")}
                                </MenuItem>
                                <MenuItem value="monthly">
                                    {t("Monthly")}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2} className="input-grid">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                fullWidth
                                label={t("Starting date")}
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
                                    placeholder={t("Type the stock")}
                                    noOptionsMessage={inputValue =>
                                        inputValue.inputValue === ""
                                            ? t("Start typing the stock name")
                                            : t("Couldn't find any")
                                    }
                                    classes={classes}
                                    styles={selectStyles}
                                    components={components}
                                    inputId="react-select-single"
                                    TextFieldProps={{
                                        label: t("Stock"),
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
                            label={t("Investment")}
                            type="number"
                            value={query.investment.toLocaleString("en-US")}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={2} className="input-grid">
                        {Object.values(query).indexOf("") > -1 ? (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled
                            >
                                {t("Simulate")}
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={simulate}
                            >
                                {t("Simulate")}
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </div>
            <div className="section">
                {chart.received &&
                    (!chart.error ? (
                        <Chart chartContent={chart} t={t} />
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <Typography align="center">{t("Error")}</Typography>
                        </div>
                    ))}
            </div>
            <LoadingModal open={chart.loading} t={t} />
        </StyledChartComparision>
    );
}

export default withRouter(ChartComparision);
