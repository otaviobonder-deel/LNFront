import React from "react";
import { StyledNavbar } from "./styles";
import { Container, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <StyledNavbar>
      <Container maxWidth="lg">
        <div className="header">
          <div>
            <Typography variant="h5" align="center">
              <span role="img" aria-label="Lightning Network">
                ⚡
              </span>
            </Typography>
          </div>
          <div className="links">
            <Link to="/">
              <Typography color="secondary">Home</Typography>
            </Link>
            <Link to="/watchtower">
              <Typography color="secondary">WatchTower</Typography>
            </Link>
          </div>
        </div>
      </Container>
    </StyledNavbar>
  );
}
