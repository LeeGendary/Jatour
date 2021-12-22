import { createContext, useContext } from "react";
import CommonStore from "./commonStore/commonStore";
import ModalStore from "./ModalStore/modalStore";
import SnackBarStore from "./SnackbarStore/snackbarStore";
import ThemeStore from "./tripStore/themeStore";
import TripStore from "./tripStore/tripStore";
import UserStore from "./UserStore/userStore";

interface Store {
  tripStore: TripStore;
  themeStore: ThemeStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  snackbarStore: SnackBarStore;
}

export const store: Store = {
  tripStore: new TripStore(),
  themeStore: new ThemeStore(),
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
  snackbarStore: new SnackBarStore(),
};

export const StoreContext = createContext(store);
// create react hoock of store
export function useStore() {
  return useContext(StoreContext);
}
