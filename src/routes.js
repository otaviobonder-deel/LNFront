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
import AdSense from "react-adsense";

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
          <Switch>
            <Route exact path="/" component={Comparision} />
            <Route exact path="/watchtower" component={Watchtower} />
            <Route exact path="/channels" component={Channels} />
          </Switch>
        </div>
        <AdSense.Google
          client="ca-pub-2081075856996783"
          slot=""
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        />
      </Router>
    </Fragment>
  );
};

export default Routes;
