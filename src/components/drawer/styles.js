import styled from "styled-components";
import { Drawer } from "@material-ui/core";

export const StyledDrawer = styled(Drawer)`
    .language {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        margin-left: auto;
        margin-right: auto;
        width: 70%;
    }

    .links {
        a {
            text-decoration: none;
        }
    }

    .MuiDrawer-paper {
        background-color: #3e2e56;
    }

    p {
        margin-left: 15px;
        margin-right: 30px;
    }
`;
