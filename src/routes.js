import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./pages/main";
import Navbar from "./components/navbar";
import Watchtower from "./pages/watchtower";

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
          <Route exact path="/" component={Main} />
          <Route exact path="/watchtower" component={Watchtower} />
        </div>
      </Router>
    </Fragment>
  );
};

export default Routes;
