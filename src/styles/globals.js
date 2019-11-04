import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  .main {
    margin-top: 2%;
  }
  
  .paper {
    padding: 24px 16px;
  }

  .section {
    margin-bottom: 5%;
  }
  
  .spacing-bottom {
    margin-bottom: 20px;
  }
  
  .spacing-top {
    margin-top: 20px;
  }
  
  .spinner {
    align-items: center;
    display: flex;
    justify-content: center;
  }

`;

export default GlobalStyle;
