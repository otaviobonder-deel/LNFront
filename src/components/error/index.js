import React from "react";
import { Typography } from "@material-ui/core";

export default function Error(props) {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Typography variant="body2">
        There was an error loading the {props.content}. Please, try again.
      </Typography>
    </div>
  );
}
