import React from "react";
import Routes from "./routes";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/customMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";
import GlobalStyle from "./styles/globals";
import { StoreProvider } from "./providers/store";
require("dotenv").config();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <CssBaseline />
        <GlobalStyle />
        <Routes />
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
