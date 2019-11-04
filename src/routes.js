import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/main";
import Navbar from "./components/navbar";
import Watchtower from "./pages/watchtower";
import Channels from "./pages/channels";
import Comparision from "./pages/comparision";
import Drawer from "./components/drawer";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";
import Donate from "./components/donate";
import { Link, Typography } from "@material-ui/core";
import useOpenDonateDialog from "./hooks/useOpenDonateDialog";

const history = createBrowserHistory();

// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

const Routes = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  // state to manage drawer
  const [drawer, setDrawer] = useState(false);

  // function to open donation
  const openDonationDialogContext = useOpenDonateDialog();
  const openDonationDialog = () => openDonationDialogContext.openDialog();

  return (
    <Fragment>
      <Router history={history}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh"
          }}
        >
          <Navbar setDrawer={setDrawer} />
          <Drawer drawer={drawer} setDrawer={setDrawer} />
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <Switch>
              <Route exact path="/" component={Comparision} />
              <Route exact path="/watchtower" component={Watchtower} />
              <Route exact path="/channels" component={Channels} />
            </Switch>
            <div className="section">
              <Typography align="center">
                <Link onClick={openDonationDialog} component="button">
                  Please, consider making a donation 🤓
                </Link>
              </Typography>
            </div>
          </div>
          <Donate />
        </div>
      </Router>
    </Fragment>
  );
};

export default Routes;
