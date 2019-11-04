import React, { useState } from "react";
import {
  Button,
  InputAdornment,
  TextField,
  Typography
} from "@material-ui/core";
import api from "../../services/api";
import QRCode from "qrcode.react";

export default function Lightning(props) {
  const [invoice, setInvoice] = useState({
    loading: false,
    error: false,
    content: null,
    paid: false
  });

  const [values, setValues] = useState({
    amount: ""
  });

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  function createInvoice() {
    setInvoice({ ...invoice, loading: true });
    api
      .post("/lightning/createinvoice", {
        amount: values.amount
      })
      .then(response => {
        setInvoice({
          loading: false,
          error: false,
          content: response.data,
          paid: false
        });
        return api.get("/lightning/invoicestatus", {
          params: { id: response.data.id }
        });
      })
      .then(response => {
        if (response.data.status === "Confirmed")
          setInvoice({ ...invoice, paid: true });
      })
      .catch(() => {
        setInvoice({ loading: false, error: true, content: null });
      });
  }

  return !invoice.error ? (
    <div>
      {!invoice.content && !invoice.paid && (
        <div>
          <Typography>
            Thank you for helping this website. Type the amount you'd like to
            donate:
          </Typography>
          <div className="spacing-top">
            <TextField
              id="amount"
              name="amount"
              label="Amount"
              type="number"
              value={values.amount.toLocaleString("en-US")}
              onChange={handleChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">sats</InputAdornment>
                )
              }}
            />
          </div>
          <div className="spacing-top spacing-bottom">
            <Button
              color="primary"
              variant="outlined"
              fullWidth
              onClick={createInvoice}
            >
              Create invoice
            </Button>
          </div>
        </div>
      )}
      {!invoice.paid && invoice.content && (
        <div>
          <Typography align="center">
            Here is your invoice. Scan the QR Code with your wallet or
            copy/paste the invoice
          </Typography>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column"
            }}
            className="spacing-top spacing-bottom"
          >
            <QRCode value={invoice.content.request} />
            <Typography style={{ wordBreak: "break-all" }} variant="subtitle2">
              {invoice.content.request}
            </Typography>
          </div>
          <div className="spacing-bottom">
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              href={`lightning:${invoice.content.request}`}
            >
              Open in wallet
            </Button>
          </div>
        </div>
      )}
      {invoice.paid && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <img
            src={require("../../assets/stickers/confirmed.gif")}
            alt="Payment confirmed"
          />
          <div className="spacing-bottom">
            <Typography align="center">
              Your payment has been confirmed. Thank you for your donation!
            </Typography>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <img
        src={require("../../assets/stickers/fail.gif")}
        alt="Payment failed"
      />
      <div className="spacing-bottom spacing-top">
        <Typography align="center">
          Error processing your payment. Please, try again!
        </Typography>
      </div>
    </div>
  );
}
