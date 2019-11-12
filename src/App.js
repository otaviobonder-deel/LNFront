import React, { Suspense } from "react";
import Routes from "./routes";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/customMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";
import GlobalStyle from "./styles/globals";
import { StoreProvider } from "./providers/store";
import { GridLoader } from "react-spinners";
require("dotenv").config();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <StoreProvider>
                <CssBaseline />
                <GlobalStyle />
                <Suspense
                    fallback={
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1,
                                minHeight: "100vh"
                            }}
                        >
                            <GridLoader color="#3e2e56" />
                        </div>
                    }
                >
                    <Routes />
                </Suspense>
            </StoreProvider>
        </ThemeProvider>
    );
}

export default App;
