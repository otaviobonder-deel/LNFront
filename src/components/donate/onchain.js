import React, { Fragment, useEffect, useState } from "react";
import api from "../../services/api";
import QRCode from "qrcode.react";
import { Typography } from "@material-ui/core";
import { GridLoader } from "react-spinners";

export default function OnChain() {
  const [address, setAddress] = useState({
    loading: true,
    error: false,
    content: null
  });

  useEffect(() => {
    api
      .get("/lightning/btcaddress", { params: { format: "np2wpkh" } })
      .then(response =>
        setAddress({ loading: false, error: false, content: response.data })
      )
      .catch(() => setAddress({ loading: false, error: true, content: null }));
  }, []);

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
        className="section"
      >
        {address.error && (
          <Fragment>
            <img
              src={require("../../assets/stickers/fail.gif")}
              alt="Payment failed"
            />
            <div className="spacing-bottom spacing-top">
              <Typography align="center">
                Error processing your payment. Please, try again!
              </Typography>
            </div>
          </Fragment>
        )}
        {address.loading && <GridLoader color="#3e2e56" />}
        {!!address.content && (
          <Fragment>
            <div className="spacing-bottom spacing-top">
              <Typography align="center">
                Thank you for considering in making a donation and keep this
                website running!
              </Typography>
            </div>
            <QRCode value={address.content} />
            <Typography variant="subtitle2" style={{ wordBreak: "break-all" }}>
              {address.content}
            </Typography>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}
