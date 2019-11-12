import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { GridLoader } from "react-spinners";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: "none"
    }
}));

export default function LoadingModal(props) {
    const { open, t } = props;

    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="Loading Chart"
                className={classes.modal}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
                disableAutoFocus
                disableEnforceFocus
            >
                <Fade in={open}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            maxWidth: 350
                        }}
                    >
                        <GridLoader color="#3e2e56" />
                        <Typography align="center" style={{ color: "white" }}>
                            {t(
                                "Some simulations may take a long time to finish. I'm improving the code to use a local database instead of a free API"
                            )}{" "}
                            <span role="img" aria-label="smile">
                                😄
                            </span>
                        </Typography>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
