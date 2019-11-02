import React, { useEffect, useState } from "react";
import { StyledChannels } from "./styles";
import {
  Container,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  LinearProgress,
  Typography
} from "@material-ui/core";
import { ExpandMore, FiberManualRecord } from "@material-ui/icons";
import api from "../../services/api";
import { GridLoader } from "react-spinners";
import Error from "../../components/error";
import QRCode from "qrcode.react";

export default function Channels(props) {
  // handle expansion panel
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // load channels
  const [channels, setChannels] = useState({
    loading: true,
    error: false,
    content: {}
  });
  function loadChannels() {
    api
      .get("/lightning/listchannels")
      .then(response =>
        setChannels({ loading: false, error: false, content: response.data })
      )
      .catch(() => setChannels({ error: true, loading: false, content: {} }));
  }
  useEffect(() => loadChannels(), []);

  // function to normalize balance proportion
  const normalize = (local_balance, remote_balance) =>
    Math.round((local_balance / (local_balance + remote_balance)) * 100);

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
    <StyledChannels>
      <Container maxWidth="lg" className="main">
        <div className="section">
          <div className="section">
            <Typography align="center" variant="h5">
              This page has the purpose to show some info about my LN node and
              the bitcoin network. Feel free to open a channel with me if you
              want to:
            </Typography>
          </div>
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
              className="section"
            >
              <QRCode value={uri.content} />
              <Typography style={{ wordBreak: "break-all" }}>
                URI: {uri.content}
              </Typography>
            </div>
          )}
        </div>
        <div className="section">
          <Typography align="center" variant="h4">
            My channels
          </Typography>
        </div>
        <div className="section">
          <Typography align="center">
            Here you can find a list of my public open channels and some info
            about them
          </Typography>
        </div>
        <div className="section">
          {channels.loading ? (
            <div className="spinner">
              <GridLoader color="#3e2e56" />
            </div>
          ) : channels.error ? (
            <Error content="channels list" />
          ) : (
            channels.content.map(channel => (
              <ExpansionPanel
                key={channel.id}
                expanded={expanded === channel.id}
                onChange={handleChange(channel.id)}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                  <FiberManualRecord
                    className={
                      channel.is_active ? "channel-active" : "channel-inactive"
                    }
                  />
                  <Typography>Channel {channel.id}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1
                    }}
                  >
                    <Typography>
                      Capacity: {channel.capacity.toLocaleString("en-US")}{" "}
                      satoshis
                    </Typography>
                    <Divider className="divider" />
                    <Typography style={{ wordBreak: "break-word" }}>
                      Partner: {channel.partner_public_key}
                    </Typography>
                    <Divider className="divider" />
                    <div
                      style={{
                        display: "flex",
                        flexGrow: 1,
                        flexDirection: "column"
                      }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={normalize(
                          channel.local_balance,
                          channel.remote_balance
                        )}
                        style={{ width: "100%" }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <Typography>Local Balance</Typography>
                        <Typography>Remote Balance</Typography>
                      </div>
                    </div>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))
          )}
        </div>
      </Container>
    </StyledChannels>
  );
}
