import { types } from "./types";

export const initialState = {
  open: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.OPEN_DONATE_DIALOG:
      return { open: true };
    case types.CLOSE_DONATE_DIALOG:
      return { open: false };
    default:
      return { ...state };
  }
};

export const register = globalState => {
  globalState.openDonateDialog = initialState;
};
