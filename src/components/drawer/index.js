import React, { useState } from "react";
import {
    Collapse,
    Divider,
    Link as MUILink,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { StyledDrawer } from "./styles";
import useOpenDonateDialog from "../../hooks/useOpenDonateDialog";
import { useTranslation } from "react-i18next";

export default function Drawer(props) {
    const { t, i18n } = useTranslation("navbar");
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

    // dialog donate
    const openDonateDialogContext = useOpenDonateDialog();
    function openDonate() {
        setDrawer(false);
        openDonateDialogContext.openDialog();
    }

    // state to manage language nested list
    const [languageOpen, setLanguageOpen] = useState(false);
    const handleClick = () => {
        setLanguageOpen(!languageOpen);
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
                <List className="links">
                    <ListItemText onClick={toggleDrawer(false)}>
                        <Link to="/">
                            <Typography color="secondary">
                                {t("How BTC compares")}
                            </Typography>
                        </Link>
                    </ListItemText>
                    <ListItemText onClick={toggleDrawer(false)}>
                        <Link to="/channels">
                            <Typography color="secondary">
                                {t("Channels")}
                            </Typography>
                        </Link>
                    </ListItemText>
                    <ListItemText onClick={toggleDrawer(false)}>
                        <Link to="/watchtower">
                            <Typography color="secondary">
                                {t("WatchTower")}
                            </Typography>
                        </Link>
                    </ListItemText>
                    <ListItemText onClick={openDonate}>
                        <Typography color="secondary">{t("Donate")}</Typography>
                    </ListItemText>
                    <ListItemText onClick={toggleDrawer(false)}>
                        <Typography color="secondary">
                            <MUILink
                                color="inherit"
                                href="https://twitter.com/messages/compose?recipient_id=214867640&ref_src=twsrc%5Etfw"
                            >
                                {t("Contact")}
                            </MUILink>
                        </Typography>
                    </ListItemText>
                    <ListItem button onClick={handleClick}>
                        <img
                            src={require("../../assets/icons/translation.svg")}
                            alt="Language"
                            width={25}
                        />
                        {languageOpen ? (
                            <ExpandLess style={{ color: "white" }} />
                        ) : (
                            <ExpandMore style={{ color: "white" }} />
                        )}
                    </ListItem>
                    <Collapse in={languageOpen} timeout="auto" unmountOnExit>
                        <List
                            component="div"
                            disablePadding
                            className="language"
                        >
                            <ListItem
                                button
                                onClick={() => i18n.changeLanguage("en-US")}
                            >
                                <img
                                    src={require("../../assets/icons/flags/en-us.svg")}
                                    alt="English"
                                    width={30}
                                />
                            </ListItem>
                            <ListItem
                                button
                                onClick={() => i18n.changeLanguage("pt-BR")}
                            >
                                <img
                                    src={require("../../assets/icons/flags/pt-br.svg")}
                                    alt="Portuguese"
                                    width={30}
                                />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </div>
        </StyledDrawer>
    );
}
