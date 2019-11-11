import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ReactGA from "react-ga";
import "./i18n";

ReactGA.initialize("UA-151329445-1");

ReactDOM.render(<App />, document.getElementById("root"));
