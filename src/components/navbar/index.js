import React, { Fragment } from "react";
import { StyledNavbar } from "./styles";
import {
  Button,
  Container,
  Menu,
  MenuItem,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import useOpenDonateDialog from "../../hooks/useOpenDonateDialog";
import { useTranslation } from "react-i18next";

export default function Navbar(props) {
  const { setDrawer } = props;
  const { t, i18n } = useTranslation("navbar");

  const dialogContext = useOpenDonateDialog();
  const openDialog = () => dialogContext.openDialog();

  function LanguageMenu() {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
      setOpen(!open);
    };
    const handleClose = language => {
      if (language) {
        i18n.changeLanguage(language);
      }
      setOpen(false);
    };

    return (
      <Fragment>
        <Button onClick={handleClick}>
          <img
            src={require("../../assets/icons/translation.svg")}
            alt="Translations"
            width={32}
            color="white"
          />
        </Button>
        <Menu
          id="language"
          keepMounted
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose()}
        >
          <MenuItem onClick={() => handleClose("en-US")}>
            <img
              src={require("../../assets/icons/flags/en-us.svg")}
              alt="English"
              width={28}
            />
          </MenuItem>
          <MenuItem onClick={() => handleClose("pt-BR")}>
            <img
              src={require("../../assets/icons/flags/pt-br.svg")}
              alt="Portuguese"
              width={28}
            />
          </MenuItem>
        </Menu>
      </Fragment>
    );
  }

  function ComputerNavbar() {
    return (
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
              <Typography color="secondary">{t("How BTC compares")}</Typography>
            </Link>
            <Link to="/channels">
              <Typography color="secondary">{t("Channels")}</Typography>
            </Link>
            <Link to="/watchtower">
              <Typography color="secondary">{t("WatchTower")}</Typography>
            </Link>
            <Button
              style={{ marginLeft: 20 }}
              variant="outlined"
              color="secondary"
              onClick={openDialog}
            >
              {t("Donate")}
            </Button>
            <Button
              style={{ marginLeft: 20 }}
              variant="outlined"
              color="secondary"
              href="https://twitter.com/messages/compose?recipient_id=214867640&ref_src=twsrc%5Etfw"
            >
              {t("Contact")}
            </Button>
            <LanguageMenu />
          </div>
        </div>
      </Container>
    );
  }

  function MobileNavbar() {
    return (
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
    );
  }

  return (
    <StyledNavbar>
      {window.innerWidth > 480 ? <ComputerNavbar /> : <MobileNavbar />}
    </StyledNavbar>
  );
}
