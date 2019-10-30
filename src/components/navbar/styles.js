import styled from "styled-components";
import theme from "../../styles/customMuiTheme";

export const StyledNavbar = styled.div`
  align-items: center;
  background-color: ${theme.palette.primary.light};
  display: flex;
  height: 40px;

  .header {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .links {
    align-items: center;
    display: flex;
    flex-direction: row;

    a {
      padding-left: 20px;
      text-decoration: none;
    }
  }
`;
