import styled from "styled-components";

export const StyledChannels = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .channel-active {
    color: green;
  }
  .channel-inactive {
    color: red;
  }

  .divider {
    margin-bottom: 2%;
    margin-top: 2%;
  }
`;
