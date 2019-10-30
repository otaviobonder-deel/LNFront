import React from "react";
import { Divider, List, ListItemText, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { StyledDrawer } from "./styles";

export default function Drawer(props) {
  const { drawer, setDrawer } = props;

  // function to toggle drawer
  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(open);
  };

  return (
    <StyledDrawer open={drawer} onClose={toggleDrawer(false)}>
      <div style={{ marginTop: 15 }}>
        <Link to="/" onClick={toggleDrawer(false)}>
          <Typography color="secondary">
            Lightning Boost{" "}
            <span role="img" aria-label="Lightning Boost">
              ⚡
            </span>
          </Typography>
        </Link>
        <Divider
          variant="middle"
          style={{ backgroundColor: "white", marginTop: 10 }}
        />
        <List>
          <ListItemText onClick={toggleDrawer(false)}>
            <Link to="/">
              <Typography color="secondary">Home</Typography>
            </Link>
          </ListItemText>
          <ListItemText onClick={toggleDrawer(false)}>
            <Link to="/channels">
              <Typography color="secondary">Channels</Typography>
            </Link>
          </ListItemText>
          <ListItemText onClick={toggleDrawer(false)}>
            <Link to="/comparision">
              <Typography color="secondary">How BTC compares</Typography>
            </Link>
          </ListItemText>
          <ListItemText onClick={toggleDrawer(false)}>
            <Link to="/watchtower">
              <Typography color="secondary">WatchTower</Typography>
            </Link>
          </ListItemText>
        </List>
      </div>
    </StyledDrawer>
  );
}
