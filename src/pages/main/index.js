import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { StyledHome } from "./styles";
import api from "../../services/api";
import QRCode from "qrcode.react";
import { Link } from "react-router-dom";
import { GridLoader } from "react-spinners";
import Error from "../../components/error";

export default function Main(props) {
  // get node URI
  const [uri, setUri] = useState({ loading: true, error: false, content: {} });
  useEffect(() => {
    api
      .get("/lightning/uri")
      .then(response =>
        setUri({ loading: false, error: false, content: response.data })
      )
      .catch(() => setUri({ loading: false, error: true, content: {} }));
  }, []);

  return (
    <StyledHome>
      <Container maxWidth="lg" className="main">
        <div className="section">
          <Grid container justify="center">
            <Grid item>
              <Typography
                variant={window.innerWidth <= 480 ? "h5" : "h2"}
                align="center"
              >
                <span role="img" aria-label="Lightning Network">
                  ⚡
                </span>
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant={window.innerWidth <= 480 ? "h5" : "h2"}
                align="center"
              >
                Lightning Booster
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant={window.innerWidth <= 480 ? "h5" : "h2"}
                align="center"
              >
                <span role="img" aria-label="Lightning Network">
                  ⚡
                </span>
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div className="section">
          <Typography
            variant={window.innerWidth <= 480 ? "h6" : "h5"}
            align="center"
          >
            Hey, welcome to my page!
          </Typography>
        </div>
        <div className="section">
          <Typography align="center">
            This page has the purpose to show some info about my LN node and the
            bitcoin network. Feel free to open a channel with me if you want to:
          </Typography>
          {uri.loading ? (
            <div className="spinner">
              <GridLoader color="#3e2e56" />
            </div>
          ) : uri.error ? (
            <Error content="URI from the node" />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <QRCode value={uri.content} />
              <Typography style={{ wordBreak: "break-all" }}>
                URI: {uri.content}
              </Typography>
            </div>
          )}
        </div>
        <div className="section">
          <Typography align="center">
            My node is online 24/7. You can use it as a WatchTower service, so
            you don't need to be online all the time and there is no risk of
            losing funds. If you are offline and someone try to steal your funds
            (publishing and old state), and you are connected to a WatchTower,
            the scammer will be punished by losing all his funds of the channel,
            that will be credited to you.
          </Typography>
          <Typography align="center">
            If you want to use this service,{" "}
            <Link to="/watchtower">
              click here to be redirected to the WatchTower page
            </Link>
          </Typography>
        </div>
      </Container>
    </StyledHome>
  );
}
