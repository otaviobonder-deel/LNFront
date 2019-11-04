import React, { Fragment, useState } from "react";
import useOpenDonateDialog from "../../hooks/useOpenDonateDialog";
import { StyledDonation } from "./styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography
} from "@material-ui/core";
import Lightning from "./lightning";

export default function Donate() {
  const openDialogContext = useOpenDonateDialog();
  const openDialogState = openDialogContext.state;
  const handleClose = () => {
    openDialogContext.closeDialog();
    setDonationType(null);
  };

  // donation state
  const [donationType, setDonationType] = useState(null);

  return (
    <StyledDonation>
      <Dialog
        open={openDialogState.open}
        onClose={handleClose}
        aria-labelledby="Donate"
        fullWidth
      >
        <DialogTitle id="Donate">Help this website</DialogTitle>
        <DialogContent>
          {donationType === null && (
            <Fragment>
              <div className="section">
                <Typography align="center">
                  Maintain a website like this running demands hosting costs.
                  Please, consider making a donation to keep it running. You can
                  make a Lightning Donation or an on-chain donation. Choose
                  which one you prefer
                </Typography>
              </div>
              <div className="section">
                <Button
                  variant="outlined"
                  fullWidth
                  color="primary"
                  onClick={() => setDonationType("lightning")}
                >
                  <span role="img" aria-label="Lightning Donation">
                    ⚡️
                  </span>{" "}
                  Lightning Donation
                </Button>
                <div className="spacing-top">
                  <Button
                    variant="outlined"
                    fullWidth
                    color="primary"
                    onClick={() => setDonationType("on-chain")}
                  >
                    <span role="img" aria-label="On-chain Donation">
                      ⛓️
                    </span>{" "}
                    On-chain Donation
                  </Button>
                </div>
              </div>
            </Fragment>
          )}
          {donationType === "lightning" && <Lightning />}
          {donationType === "on-chain" && <div></div>}
        </DialogContent>
      </Dialog>
    </StyledDonation>
  );
}
