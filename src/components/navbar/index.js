import React from "react";
import { StyledNavbar } from "./styles";
import { Button, Container, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import useOpenDonateDialog from "../../hooks/useOpenDonateDialog";

export default function Navbar(props) {
  const { setDrawer } = props;

  const dialogContext = useOpenDonateDialog();
  const openDialog = () => dialogContext.openDialog();

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
                <Typography color="secondary">How BTC compares</Typography>
              </Link>
              <Link to="/channels">
                <Typography color="secondary">Channels</Typography>
              </Link>
              <Link to="/watchtower">
                <Typography color="secondary">WatchTower</Typography>
              </Link>
              <Button
                style={{ marginLeft: 20 }}
                variant="outlined"
                color="secondary"
                onClick={openDialog}
              >
                Donate
              </Button>
              <Button
                style={{ marginLeft: 20 }}
                variant="outlined"
                color="secondary"
                href="https://twitter.com/messages/compose?recipient_id=214867640&ref_src=twsrc%5Etfw"
              >
                Contact
              </Button>
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
