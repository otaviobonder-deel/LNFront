import React from "react";
import { StyledNavbar } from "./styles";
import { Container, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

export default function Navbar(props) {
  const { setDrawer } = props;

  return (
    <StyledNavbar>
      {window.innerWidth > 480 ? (
        <Container maxWidth="lg">
          <div className="header">
            <div>
              <Link to="/">
                <Typography variant="h5" align="center">
                  <span role="img" aria-label="Lightning Network">
                    ⚡
                  </span>
                </Typography>
              </Link>
            </div>
            <div className="links">
              <Link to="/">
                <Typography color="secondary">Home</Typography>
              </Link>
              <Link to="/channels">
                <Typography color="secondary">Channels</Typography>
              </Link>
              <Link to="/comparision">
                <Typography color="secondary">How BTC compares</Typography>
              </Link>
              <Link to="/watchtower">
                <Typography color="secondary">WatchTower</Typography>
              </Link>
            </div>
          </div>
        </Container>
      ) : (
        <Container maxWidth="md">
          <div className="header">
            <div style={{ display: "flex", alignItems: "center" }}>
              <MenuIcon color="secondary" onClick={() => setDrawer(true)} />
            </div>
            <div>
              <Link to="/">
                <Typography variant="h5" align="center">
                  <span role="img" aria-label="Lightning Network">
                    ⚡
                  </span>
                </Typography>
              </Link>
            </div>
          </div>
        </Container>
      )}
    </StyledNavbar>
  );
}
