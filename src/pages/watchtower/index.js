import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { StyledWatchtower } from "./styles";
import { Container, Typography } from "@material-ui/core";
import Error from "../../components/error";

export default function Watchtower(props) {
  // get node WatchTower URI
  const [uri, setUri] = useState({ loading: true, error: false, content: {} });
  useEffect(() => {
    api
      .get("/lightning/watchtower")
      .then(response =>
        setUri({ loading: false, error: false, content: response.data })
      )
      .catch(() => setUri({ loading: false, error: true, content: {} }));
  }, []);

  return (
    <StyledWatchtower>
      <Container maxWidth="lg" className="main">
        <div className="section">
          <Typography align="center" variant="h4">
            What are Watchtowers{" "}
            <span role="img" aria-label="Watchtower">
              🗼
            </span>
          </Typography>
          <Typography align="center">
            Watchtowers act as a second line of defense in responding to
            malicious or accidental breach scenarios in the event that the
            client’s node is offline or unable to respond at the time of a
            breach, offering greater degree of safety to channel funds. The
            watchtower node will monitor the Lightning Network channel for
            breaches; if it notices one, the watchtower will launch a “penalty”
            transaction that will return the funds to the offline node.
          </Typography>
        </div>
        <div className="section">
          <Typography align="center" variant="h4">
            How to connect to a Watchtower
          </Typography>
          <Typography align="center" variant="h5">
            Using LND
          </Typography>
          <Typography align="center">
            In order to set up a watchtower client, you’ll need two things:
            <br />
            <br />
            1. The watchtower client must be enabled with the{" "}
            <code>--wtclient.active</code> flag.
          </Typography>
          <div className="code">
            <code>lnd --wtclient.active</code>
          </div>
          <Typography align="center" style={{ marginTop: "2%" }}>
            2. The watchtower URI of an active watchtower.
          </Typography>
          <div className="code">
            {uri.loading ? (
              <Typography variant="body2">Loading my node's URI</Typography>
            ) : uri.error ? (
              <Error content="node's URI" />
            ) : (
              <code style={{ wordBreak: "break-all" }}>
                lncli wtclient add {uri.content}
              </code>
            )}
          </div>
          <Typography align="center" style={{ marginTop: "2%" }}>
            That's it! As long as my node is connected and observing the
            network, you are safe.
          </Typography>
        </div>
      </Container>
    </StyledWatchtower>
  );
}
