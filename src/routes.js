import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/main";
import Navbar from "./components/navbar";
import Watchtower from "./pages/watchtower";
import Channels from "./pages/channels";

const Routes = () => {
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
          <Navbar />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/watchtower" component={Watchtower} />
            <Route exact path="/channels" component={Channels} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
};

export default Routes;
