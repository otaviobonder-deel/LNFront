import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/main";
import Navbar from "./components/navbar";
import Watchtower from "./pages/watchtower";
import Channels from "./pages/channels";
import Comparision from "./pages/comparision";
import Drawer from "./components/drawer";

const Routes = () => {
  // state to manage drawer
  const [drawer, setDrawer] = useState(false);

  return (
    <Fragment>
      <Router>
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
            <Route exact path="/" component={Main} />
            <Route exact path="/watchtower" component={Watchtower} />
            <Route exact path="/channels" component={Channels} />
            <Route exact path="/comparision" component={Comparision} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
};

export default Routes;
