import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";

export default function Error(props) {
    return (
        <Fragment>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly"
                }}
            >
                <img
                    src={require("../../assets/icons/monitor.svg")}
                    alt="Monitor"
                    width="75vw"
                />

                <img
                    src={require("../../assets/icons/right-and-left-arrows.svg")}
                    alt="Arrows"
                    width="75vw"
                />

                <img
                    src={require("../../assets/icons/database.svg")}
                    alt="Server"
                    width="75vw"
                />
            </div>
            <div className="section">
                <Typography align="center">
                    There are too many requests right now. Wait a bit and try
                    again
                </Typography>
            </div>
        </Fragment>
    );
}
