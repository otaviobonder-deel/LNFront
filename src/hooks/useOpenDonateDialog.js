import { useContext } from "react";
import { StoreContext } from "../providers/store";
import { types } from "../reducers/types";

export default function useOpenDonateDialog() {
  const { state, dispatch } = useContext(StoreContext);

  const openDialog = () => {
    dispatch({ type: types.OPEN_DONATE_DIALOG });
  };

  const closeDialog = () => {
    dispatch({ type: types.CLOSE_DONATE_DIALOG });
  };

  return {
    state: state.openDonateDialog,
    openDialog,
    closeDialog
  };
}
