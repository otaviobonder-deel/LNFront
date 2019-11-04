import {
  register as openDonateDialogRegister,
  reducer as openDonateDialogReducer
} from "./openDonateDialog";

export const initialState = {};
export const actions = {};

openDonateDialogRegister(initialState, actions);

export const reducer = (state, action) => {
  return {
    openDonateDialog: openDonateDialogReducer(state.openDonateDialog, action)
  };
};
