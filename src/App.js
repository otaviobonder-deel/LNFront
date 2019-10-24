import React from "react";
import Routes from "./routes";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/customMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";
require("dotenv").config();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
