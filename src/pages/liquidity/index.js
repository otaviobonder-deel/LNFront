import React, { useState } from "react";
import { StyledLiquidity } from "./styles";
import { Container, TextField, Typography } from "@material-ui/core";

export default function Liquidity(props) {
  const [publicKey, setPublicKey] = useState("");

  return (
    <StyledLiquidity>
      <Container maxWidth="lg" className="main">
        <Typography align="center" variant="h5">
          Need liquidity for your node?
        </Typography>
        <div className="section">
          <Typography align="center">
            Here you can create a channel with your node. Paste your node public
            key and select the amount to open a channel. I'll automatically open
            a channel with you, providing you liquidity to receive payments
          </Typography>
        </div>
        <div className="section">
          <form>
            <TextField id="public-key" label="Your node's public key" />
          </form>
        </div>
      </Container>
    </StyledLiquidity>
  );
}
