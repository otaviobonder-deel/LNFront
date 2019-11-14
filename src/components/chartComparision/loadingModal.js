import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { GridLoader } from "react-spinners";

const useStyles = makeStyles(() => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: "none"
    }
}));

export default function LoadingModal(props) {
    const { open } = props;

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
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
