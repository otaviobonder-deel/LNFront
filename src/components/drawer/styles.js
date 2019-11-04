import styled from "styled-components";
import { Drawer } from "@material-ui/core";

export const StyledDrawer = styled(Drawer)`
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
