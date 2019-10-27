import React from "react";
import Routes from "./routes";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/customMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";
import GlobalStyle from "./styles/globals";
require("dotenv").config();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
