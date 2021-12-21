import { createContext, useContext } from "react";
import ThemeStore from "./tripStore/themeStore";
import TripStore from "./tripStore/tripStore";

interface Store {
  tripStore: TripStore;
  themeStore: ThemeStore;
}

export const store: Store = {
  tripStore: new TripStore(),
  themeStore: new ThemeStore(),
};

export const StoreContext = createContext(store);
// create react hoock of store
export function useStore() {
  return useContext(StoreContext);
}
